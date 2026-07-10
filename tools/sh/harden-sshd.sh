#!/usr/bin/env bash
# =============================================================================
# tools/sh/harden-sshd.sh
#
# Amaç: SSH kopma / kex reset riskini azaltmak için güvenli sshd ayarları
#       (drop-in; ana sshd_config’e dokunmaz).
#
# Yapar:
#   - /etc/ssh/sshd_config.d/99-gi-keepalive.conf yazar
#   - sshd -t ile test, sonra reload
#   - Anahtarı / portu / PermitRootLogin’i DEĞİŞTİRMEZ
#
# Kullanım (sunucuda, sudo):
#   bash tools/sh/harden-sshd.sh
#   bash tools/sh/harden-sshd.sh --yes
#
# Geri alma:
#   sudo rm /etc/ssh/sshd_config.d/99-gi-keepalive.conf
#   sudo sshd -t && sudo systemctl reload ssh
# =============================================================================
set -euo pipefail

YES=0
for a in "$@"; do
  case "$a" in
    -y|--yes) YES=1 ;;
    -h|--help)
      sed -n '2,25p' "$0" | sed 's/^# \?//'
      exit 0
      ;;
  esac
done

DROP_IN="/etc/ssh/sshd_config.d/99-gi-keepalive.conf"
BACKUP_DIR="/etc/ssh/backup-gi"
TS="$(date -u +%Y%m%dT%H%M%SZ)"

if [[ "$(id -u)" -ne 0 ]]; then
  if command -v sudo >/dev/null 2>&1; then
    exec sudo -E bash "$0" "$@"
  fi
  echo "HATA: root veya sudo gerekli."
  exit 1
fi

echo "=== Global Impact — sshd dayanıklılık ==="
echo "Hedef drop-in: $DROP_IN"
echo ""
echo "Uygulanacak (özet):"
echo "  UseDNS no"
echo "  LoginGraceTime 45"
echo "  MaxStartups 30:50:60"
echo "  ClientAliveInterval 30"
echo "  ClientAliveCountMax 8"
echo "  MaxSessions 20"
echo ""
echo "DEĞİŞMEYECEK: Port, anahtarlar, PasswordAuthentication, PermitRootLogin"
echo ""

if [[ "$YES" -ne 1 ]]; then
  if [[ ! -t 0 ]]; then
    echo "Onay yok.: bash tools/sh/harden-sshd.sh --yes"
    exit 1
  fi
  read -r -p "Devam? [y/N] " ans
  case "$ans" in y|Y|yes|YES|evet|Evet|EVET) ;; *) echo "İptal."; exit 0 ;; esac
fi

mkdir -p "$BACKUP_DIR"
if [[ -f "$DROP_IN" ]]; then
  cp -a "$DROP_IN" "$BACKUP_DIR/99-gi-keepalive.conf.$TS"
  echo "Eski drop-in yedek: $BACKUP_DIR/99-gi-keepalive.conf.$TS"
fi
# Ana config yedeği (salt okunur kopya; düzenlenmez)
if [[ -f /etc/ssh/sshd_config ]]; then
  cp -a /etc/ssh/sshd_config "$BACKUP_DIR/sshd_config.$TS"
fi

cat > "$DROP_IN" <<'EOF'
# Managed by tools/sh/harden-sshd.sh (Global Impact / Küresel Etki)
# Purpose: reduce SSH drop / kex backlog issues; keep sessions alive on NAT.
# Do NOT put secrets here. Safe to delete this file and reload sshd to undo.

UseDNS no
LoginGraceTime 45
MaxStartups 30:50:60
ClientAliveInterval 30
ClientAliveCountMax 8
MaxSessions 20
EOF

chmod 644 "$DROP_IN"

if ! sshd -t 2>/tmp/gi-sshd-t.err; then
  echo "HATA: sshd -t başarısız — drop-in geri alınıyor."
  cat /tmp/gi-sshd-t.err 2>/dev/null || true
  rm -f "$DROP_IN"
  if [[ -f "$BACKUP_DIR/99-gi-keepalive.conf.$TS" ]]; then
    cp -a "$BACKUP_DIR/99-gi-keepalive.conf.$TS" "$DROP_IN"
  fi
  exit 1
fi

# Ubuntu: service name often "ssh"
if systemctl list-unit-files | grep -q '^ssh\.service'; then
  systemctl reload ssh
  SVC=ssh
elif systemctl list-unit-files | grep -q '^sshd\.service'; then
  systemctl reload sshd
  SVC=sshd
else
  service ssh reload 2>/dev/null || service sshd reload 2>/dev/null || true
  SVC=ssh
fi

echo ""
echo "OK — sshd ayarları uygulandı (reload: $SVC)."
echo "Drop-in: $DROP_IN"
echo "Yedekler: $BACKUP_DIR/"
echo ""
echo "Doğrulama:"
sshd -T 2>/dev/null | grep -E '^(usedns|logingracetime|maxstartups|clientaliveinterval|clientalivecountmax|maxsessions) ' || true
echo ""
echo "Not: OCI Security List’te 22 hâlâ açık olmalı. Kilitlenirsen Console connection kullan."
exit 0

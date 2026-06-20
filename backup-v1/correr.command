#!/bin/bash
# Doble clic para correr el backup v1 (sirve esta carpeta y abre el navegador).
cd "$(dirname "$0")"
PORT=8765
if command -v python3 >/dev/null 2>&1; then
  echo "Sirviendo en http://localhost:$PORT  —  Ctrl+C para detener."
  ( sleep 1; open "http://localhost:$PORT/" ) &
  python3 -m http.server "$PORT"
else
  echo "No encontré python3."
  echo "Instalá las Command Line Tools:  xcode-select --install"
  echo "o usá Node:  npx serve ."
  read -p "Enter para cerrar… "
fi

# DISCO.GRAMA.CO — backup v1

Copia congelada y autocontenida de la versión 1. Tiene sus propios modelos y
bailes en `assets/`, así que funciona sola, sin depender del proyecto principal
(master) ni de servicios externos para los assets.

## Contenido
- `index.html` — la obra (carga `./assets` y `config.js`).
- `config.js` — estado inicial de esta versión.
- `config.html` — editor visual de la configuración.
- `assets/` — 2 cuerpos + 15 bailes (.glb).

## Cómo correrla

Los navegadores **no** dejan cargar archivos `.glb` locales con doble clic (por
seguridad), así que hace falta un pequeño servidor local. Dos opciones:

**A) Launcher (macOS):** doble clic en `correr.command`. Levanta un servidor y
abre la obra en el navegador. (Ctrl+C en la Terminal para detenerlo.)

**B) Manual:** abrí una terminal en esta carpeta y corré uno de estos:
```
python3 -m http.server 8765
# o, si tenés Node:
npx serve .
```
Después abrí `http://localhost:8765/` (la obra) o `…/config.html` (el editor).

> Nota: Three.js se carga desde su CDN (jsDelivr), así que se necesita internet.
> Los modelos y bailes sí son locales.

## Atajos en la obra
`R` dados · `espacio` nuevo reparto · `E` estrobo · `S` sonido · `C` cámara ·
`F` formación · `T` tamaño · `H` ocultar panel · `P` pantalla completa.

# Handoff — DISCO.GRAMA.CO (discoteca)

Pieza de arte generativo en Three.js: una multitud de figuras humanoides grises ("clay")
ejecutando captura de movimiento (baile / emociones) en un espacio atmosférico con luces y
estrobo. Desplegada en **disco.grama.co** vía GitHub Pages.

> **Hay DOS versiones vivas, ambas funcionando:**
> - **v2 (actual)** = la raíz del repo → `disco.grama.co`. Cuerpos SMPL-X + bailes DanceDB.
> - **v1 (congelada)** = carpeta `backup-v1/` → `disco.grama.co/backup-v1/`. Cuerpos RPM + bailes Mixamo/RPM.
> Cada versión es **autocontenida** (su propio `index.html`, manifiestos y `assets/`). Tocar una no rompe la otra.

---

## 1. Despliegue
- **Repo:** `gramagrass/discoteca` (cuenta de usuario, NO org), rama **main**.
- **Hosting:** GitHub Pages. `CNAME` = `disco.grama.co`. Pages sirve toda la raíz, así que
  `backup-v1/` queda automáticamente accesible en `disco.grama.co/backup-v1/`.
- **Three.js:** r0.160.0 por importmap (jsdelivr). Todo lo demás (cuerpos, movimientos) es self-hosted.
- **Guardar config desde el editor:** `config.html` tiene un botón que escribe `config.js` vía
  GitHub Contents API. Requiere un **PAT fine-grained** (Contents: read+write) sobre el repo
  `discoteca`. El token lo pega el usuario en el editor; Claude no lo maneja.
- Cuidado: el usuario tuvo un repo vacío llamado `disco` por error — el correcto es **discoteca**.

## 2. Estructura de archivos (raíz = lo que se publica)
**v2 (raíz):**
- **`index.html`** — la obra entera (toda la lógica en un `<script type="module">`).
- **`config.js`** — estado inicial (`window.CONFIG`). Lo regenera `config.html`.
- **`config.html`** — editor visual de config + checkboxes de RANDOM por parámetro + guardado a GitHub.
- **`models.js`** — `window.MODELS = [...]` manifiesto de cuerpos (nombres sin `.glb`).
- **`motions.js`** — `window.MOTIONS = {familia: [nombres]}` manifiesto de movimientos.
- **`assets/bodies/*.glb`** — 14 cuerpos SMPL-X (~variados).
- **`assets/motions/<familia>/*.glb`** — 574 clips en 45 familias.

**v1 (congelada):**
- **`backup-v1/`** — copia completa y autocontenida de la v1 (su `index.html`, `config.js`,
  `models.js`, `motions.js` y `assets/` propios). NO comparte assets con la raíz.

**Docs y otros:**
- `handoff_discoteca.md` (este archivo), `MIXAMO.md`, `bases_de_movimiento.md` — notas de proceso.
- **`_local/`** — **gitignored** (NO se publica): herramientas, descargas crudas, modelos SMPL-X,
  el dataset DanceDB, builds intermedios y `_local/archive_v0/` (ver §8, limpieza).

## 3. v2 — Cuerpos (14 SMPL-X)
Generados con el modelo paramétrico **SMPL-X** (variando género y complexión). Nombres en `models.js`:
- género: `m_` masculino · `f_` femenino · `n_` neutro.
- complexión: `thin` · `avg` · `heavy` · `obese` · `petite` · `tall` · `rand` (aleatorio).
- Lista: `f_avg f_heavy f_obese f_rand f_thin · m_avg m_heavy m_obese m_rand m_thin · n_avg n_petite n_rand n_tall`.
- Pipeline (en `index.html`): renombra cualquier prefijo `mixamorig:` → "bare", **descarta texturas**
  (los pinta gris clay `0xc9c9cd`) y **normaliza la altura** de cada cuerpo. La variedad viene de la
  FORMA/silueta, no del color.

## 4. v2 — Movimientos (574 clips, 45 familias)
Segmentos de **DanceDB** (mocap real, AMASS) reorientados al rig y cortados en segmentos ≥15 s.
Dos grupos semánticos:
- **`baile_*` — 29 familias, 320 clips:** bachata, capoeira, dimitroula, flamenco, haniotikos,
  hasapiko, hiphop, karsilamas, kolo, laziotikos, maleviziotikos, mix, musical, outsai, pastirske,
  podaraki, rasopoulos, reggaeton, rnb, roditikos, salsa, syrtos, tatsia, tsamiko, zaloggo,
  zeibekiko, zonaradiko, zorbas, zumba. (Muchos son bailes folclóricos griegos.)
- **`emo_*` — 16 familias, 254 clips:** afraid, angry, annoyed, bored, curiosity, excited, happy,
  miserable, nervous, neutral, pleased, relaxed, sad, satisfied, scary, tired.
- El **selector de familia es dinámico** (se arma desde `Object.keys(MOTIONS)`), con dos modos
  paraguas: **`BAILES`** (todos los `baile_*`) y **`EMOCIONES`** (todos los `emo_*`), más `todas`.
- **`motions.js` es la fuente de verdad** — solo se carga lo listado ahí. Estado actual: el disco
  está limpio, los 574 GLB en disco coinciden exactamente con el manifiesto (0 huérfanos).
- `config.js → familia` admite: `todas | BAILES | EMOCIONES | <familia baile_*/emo_*>`. (Default actual: `BAILES`.)

## 5. v1 — qué contiene `backup-v1/`
- **Cuerpos:** su `models.js` carga 2 (`Masculine`, `Feminine`, RPM TPose). En su `assets/bodies/`
  hay además 5 avatares RPM (`GothicGirl, Julia, Andra, Harry, Chen`) disponibles para reactivar
  agregándolos a su `models.js`.
- **Movimientos:** 112 clips en 5 familias — `dance:15 locomotion:34 idle:18 expression:15 fisico:30`.
  `dance` = los 15 bailes RPM (`M_Dances_*`/`F_Dances_*`); el resto son Mixamo convertidos.
- Es la versión que el usuario prefería por la **pulcritud de los bailes RPM**; se congeló al pasar a v2.

## 6. Decisiones técnicas clave / gotchas (válidas para AMBAS versiones)
- **`neutralizeRoot(clip)` quita TODAS las pistas `.position`** (solo la cadera las tiene). Así el
  clip **solo rota** los huesos y cada cuerpo se para a su altura de bind, sin importar si el clip
  viene en cm o m. Movimiento en el sitio, sin deriva. NO volver a conservar la Y de la cadera.
- **Cada cuerpo va envuelto en un `THREE.Group`** en `placeCrowd`. La obra escala/orienta el GRUPO
  (no el cuerpo), así no pisa la escala/rotación natural de modelos de distinta convención. El
  `AnimationMixer` se crea sobre el grupo (liga huesos por nombre).
- **Normalización de altura** en `loadAssets`: mide el primer cuerpo como `TARGET_H`, escala cada
  cuerpo a esa altura, lo centra en XZ y le pone los pies en y=0.
- **Material clay** uniforme (`0xc9c9cd`, roughness alto) sobre todas las mallas. Por eso da igual
  perder texturas al convertir.
- **Carga resiliente** (`loadSafe` por cuerpo): si un cuerpo falla, se omite, la obra no rompe.
- **Blur general** (`blurGen`, default 0): aplica `filter: blur()` al canvas vía `applyBlur()`.
- **Zoom de cámara (radio):** mín 0.4 — máx 13. Modos automáticos `sobrevuelo`/`tv` acotados a ~1.1–7.
- **Sobre los hombros de Mixamo (de la v1, resuelto):** la causa era el *skinning*/bind en T-pose, NO
  el retarget. La "rest-pose compensation" fue probada y EMPEORA — **no reintentar**. Los cuerpos
  A-pose (RPM v1 / SMPL-X v2) no tienen el problema.

## 7. Pipeline de conversión in-sandbox (RECREAR — los scripts viven en /tmp y se borran)
Three.js puede parsear FBX/GLB y exportar GLB en Node con shims de DOM. Setup:
```
cd /tmp && mkdir fbxprobe && cd fbxprobe && npm i three@0.160.0
```
**Shims al inicio de cada script** (si no, falla por `window`/`FileReader`/`Image` undefined):
```js
globalThis.self=globalThis; globalThis.window=globalThis;
globalThis.FileReader=class{readAsArrayBuffer(b){b.arrayBuffer().then(ab=>{this.result=ab;this.onloadend&&this.onloadend();this.onload&&this.onload();});}};
globalThis.window.URL={createObjectURL:()=>'blob:noop',revokeObjectURL:()=>{}};
function imgStub(){const o={width:1,height:1,complete:true,_cbs:{},addEventListener(t,f){(o._cbs[t]=o._cbs[t]||[]).push(f);},removeEventListener(t,f){if(o._cbs[t])o._cbs[t]=o._cbs[t].filter(x=>x!==f);},set src(v){setTimeout(()=>{o.onload&&o.onload();(o._cbs.load||[]).forEach(f=>f());},0);},get src(){return '';}};return o;}
globalThis.Image=function(){return imgStub();};
globalThis.document={createElementNS:()=>imgStub(),createElement:t=>t==='canvas'?{getContext:()=>({drawImage(){},getImageData:()=>({data:new Uint8Array(4)})}),toDataURL:()=>''}:imgStub()};
```
**Receta general:** parse → renombrar huesos `mixamorig*` → bare → `material=clay` + drop morphs →
`GLTFExporter.parse(g, …, {binary:true, animations})`. Para clips: filtrar pistas `.position`.
- **v2 (SMPL-X + DanceDB):** material/datasets crudos en `_local/` (`smplx_model`, `amass/DanceDB`,
  `smplx_bodies_fbx`, `v2_build`). Reglas: segmentos ≥15 s, compresión meshopt.
- **v1 (Mixamo):** personajes vía **FBX2glTF** en la Mac del usuario (binario en `_local/`,
  `--skinning-weights 4`); animaciones bulk en `_local/MixamoHarvester/`.
- **Sandbox ARM (aarch64): NO corre binarios x86** (fbx2gltf, chromium) → **no render-test**.
  Validación solo numérica (`node --check`, cruce de IDs, posar con `AnimationMixer`, `Box3`).

## 8. Limpieza realizada (28-jun-2026)
Se ordenó el repo dejando solo las dos versiones vivas:
- **Borrado (basura):** 32 carpetas vacías `"… 2"` (conflictos de sync de macOS) en `assets/motions/`,
  y todos los `.DS_Store` del árbol.
- **Movido a `_local/archive_v0/`** (gitignored — fuera del repo y del sitio, pero conservado en disco):
  los snapshots pre-v1 `disco-grama-co.zip`, `discoteca_grama.zip`, `zibZqQgY` (zip),
  `discoteca_procedural_backup.html`, la carpeta `build/`, y la carpeta huérfana `assets/dances/`
  (su contenido vive en `backup-v1/`).
- **Corregido:** `config.js → familia` pasó de `"dance"` (valor v1, ya inexistente) a `"BAILES"`.
- **Verificado:** ambas versiones resuelven al 100% (v2: 14 cuerpos + 574 clips; v1: 2 cuerpos +
  112 clips; 0 archivos faltantes; `node --check` OK en todos los manifiestos).
- Nota git: los cambios están en el árbol de trabajo (41 borrados + `config.js`) pero **sin commitear/pushear**.

## 9. Restricciones del entorno (sandbox)
- ARM: no x86 binarios, no GPU, **no render testing**.
- El borrado de archivos en el mount requiere habilitar la tool `mcp__cowork__allow_cowork_file_delete`
  (ya habilitada en esta carpeta). Antes de borrar algo valioso, copiar a `_local/…`.
- `_local/` está en `.gitignore` (con `.DS_Store`, `node_modules/`) — no llega al sitio.

## 10. Pendientes / próximos pasos posibles
- **Carga de subconjunto rotativo:** cargar al azar N cuerpos por sesión para variar la multitud.
  No implementado (la carga ya es resiliente por cuerpo).
- **Más bailes/emociones:** trivial sumar más segmentos DanceDB al manifiesto v2.
- **Capas de render experimentales** (DoF / oclusión / god-rays) — diferidas.

## 11. Estado / preferencias del usuario (David)
- Comunica en español; prefiere respuestas **directas y concisas**, con calidez.
- Le importa la **pulcritud visual**. La obra ya está desplegada y funcionando en disco.grama.co.
- Trabaja en Mac; corre conversiones locales con su propio token/binarios (Claude no maneja secretos).

---
*Estado: v2 (raíz) = 14 cuerpos SMPL-X + 574 clips DanceDB en 45 familias (29 baile_* / 16 emo_*).
v1 congelada y autocontenida en `backup-v1/` (servida en `/backup-v1/`). Repo limpio; snapshots
pre-v1 archivados en `_local/archive_v0/`. Cambios sin pushear.*

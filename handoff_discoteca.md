# Handoff — DISCO.GRAMA.CO (discoteca)

Pieza de arte generativa en Three.js: una multitud de figuras humanoides ejecutando
mocap (baile / locomoción / gestos / idle / físico) en un espacio atmosférico con luces.
Desplegada en **disco.grama.co** vía GitHub Pages.

---

## 1. Despliegue
- **Repo:** `gramagrass/discoteca` (cuenta de usuario, NO org), rama **main**.
- **Hosting:** GitHub Pages. `CNAME` = `disco.grama.co`.
- **Three.js:** r0.160.0 por importmap (jsdelivr). Todo lo demás (cuerpos, movimientos) es self-hosted.
- **Guardar config desde el editor:** `config.html` tiene un botón que escribe `config.js` vía
  GitHub Contents API. Requiere un **PAT fine-grained** (Contents: read+write) sobre el repo
  `discoteca`. El token lo pega el usuario en el editor; Claude no lo maneja.
- Cuidado: el usuario tuvo un repo vacío llamado `disco` por error — el correcto es **discoteca**.

## 2. Archivos (raíz = lo que se publica)
- **`index.html`** — la obra entera (toda la lógica en un `<script type="module">`).
- **`config.js`** — estado inicial (`window.CONFIG`). Lo regenera el editor.
- **`config.html`** — editor visual de config + checkboxes de RANDOM por parámetro + guardado a GitHub.
- **`models.js`** — `window.MODELS = [...]` manifiesto de cuerpos (nombres sin `.glb`).
- **`motions.js`** — `window.MOTIONS = {familia: [nombres]}` manifiesto de movimientos.
- **`assets/bodies/*.glb`** — 20 cuerpos (~32MB).
- **`assets/motions/{dance,locomotion,idle,expression,fisico}/*.glb`** — clips.
- **`backup-v1/`** — v1 congelada (incl. `assets/dances/` con los 15 bailes originales RPM).
- **`_local/`** — **gitignored** (NO se publica): herramientas y descargas crudas.

## 3. Cuerpos (20)
Todos comparten el rig RPM/Mixamo (estructura idéntica; nombres de hueso "bare": `Hips`,
`Spine`, `LeftArm`…). El pipeline **renombra** cualquier prefijo `mixamorig\d*:?` → bare,
**descarta texturas** (la obra los pinta gris "clay") y la obra **normaliza la altura** de cada uno.

- **RPM nativos (A-pose, los más limpios con los bailes):**
  - `Masculine`, `Feminine` (RPM TPose originales).
  - `GothicGirl`, `Cyberpunk`, `Julia`, `CyberMale`, `Andra`, `Harry`, `Chen` — avatares RPM
    bajados de Sketchfab por el usuario (estaban en `_local/rpm_models/*/source/*.glb`).
- **Mixamo (T-pose):** `Ch01,Ch02,Ch13,Ch16,Ch17,Ch22,Ch26,Ch27,Ch37,Ch38,Ch49` — personajes de
  Mixamo con malla, bajados por el usuario como FBX (`_local/characters/`), convertidos con
  **FBX2glTF** (ver §6) y procesados a GLB clay (~2MB c/u).

## 4. Movimientos (manifiesto: 112 clips en 5 familias)
`dance:15  locomotion:34  idle:18  expression:15  fisico:30`
- **`dance` = los 15 bailes de la v1** (RPM, `M_Dances_*`/`F_Dances_*`), por preferencia del
  usuario (los considera mejores que los de Mixamo). Copiados desde `backup-v1/assets/dances/`.
- **locomotion / idle / expression / fisico = Mixamo**, convertidos del bulk FBX (ver §6).
- El **selector de familia es dinámico** (se arma desde `Object.keys(MOTIONS)` en `index.html`),
  con etiquetas en `FAM_LABELS` (dance→baile, fisico→físico…). Opciones: "todas" + cada familia.
- Nota: en disco hay más GLB que los listados (clips Mixamo viejos quedaron); **`motions.js` es
  la fuente de verdad** — solo se cargan los listados ahí.

## 5. Decisiones técnicas clave / gotchas (IMPORTANTE)
- **`neutralizeRoot(clip)` quita TODAS las pistas `.position`** (solo la cadera las tiene). Así el
  clip **solo rota** los huesos y cada cuerpo se para a su altura de bind, sin importar si el clip
  viene en cm (Mixamo, cadera ~124) o m (RPM, ~1). Movimiento en el sitio, sin deriva. NO volver a
  conservar la Y de la cadera: rompe (manda cuerpos RPM a 124 m de altura).
- **Cada cuerpo va envuelto en un `THREE.Group`** en `placeCrowd`. La obra escala/orienta el GRUPO
  (no el cuerpo), así no pisa la escala/rotación natural de modelos de distinta convención. El
  `AnimationMixer` se crea sobre el grupo (liga huesos por nombre).
- **Normalización de altura** en `loadAssets`: mide `bodies[0]` (Masculine) como `TARGET_H` (~1.84m),
  escala cada cuerpo a esa altura, lo centra en XZ y le pone los pies en y=0. Esto absorbe que RPM
  esté en metros y Mixamo en cm, y que algunos tengan rotación de raíz.
- **Sobre la "deformación de hombros" de los Mixamo (resuelto/entendido):** se verificó
  numéricamente que el ESQUELETO se posa idéntico al cuerpo RPM limpio (0° de diferencia en la
  dirección del brazo). O sea NO es un problema de pose/retarget. La compensación de pose de reposo
  fue PROBADA y **EMPEORA** (descartada). La causa real es la calidad del *skinning* + el bind en
  T-pose. Los avatares RPM (A-pose) no tienen el problema. Por eso los bailes v1 lucen impecables en
  RPM y con leve tensión de hombro en Mixamo. **No reintentar "rest-pose compensation".**
- **Material clay** uniforme (`0xc9c9cd`, roughness alto) sobre todas las mallas: la variedad viene de
  la FORMA/silueta, no del color/textura. Por eso da igual perder las texturas al convertir.

## 6. Pipeline de conversión in-sandbox (RECREAR — los scripts viven en /tmp y se borran)
Three.js puede parsear FBX y exportar GLB en Node con shims de DOM. Setup:
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
**Receta general (cualquier cuerpo o clip):**
1. `new FBXLoader().parse(arrayBuffer,'')` (animaciones FBX) o `new GLTFLoader().parse(...)` (GLB).
2. `traverse`: si `o.name` matchea `/^mixamorig\d*:?/i` → reemplazar por '' (huesos bare).
   Para clips, también: `clip.tracks.forEach(t=>t.name=t.name.replace(/^mixamorig\d*:?/i,''))`.
3. Cuerpos: `o.material = clay`; `o.geometry.morphAttributes={}`; quitar morphs; `g.animations=[]`.
4. `new GLTFExporter().parse(g, onDone, onErr, {binary:true, animations: clipsSiHay})`.
- **Sandbox ARM (aarch64): NO corre binarios x86** (fbx2gltf, chromium) → **no se puede render-testear**.
  Validación solo numérica: `node --check`, cruces de IDs, `Box3.setFromObject` + posar con
  `AnimationMixer` para medir que el rig liga y deforma.

**Personajes Mixamo — usar FBX2glTF, no FBXLoader:**
- El FBXLoader del sandbox, con estos FBX, genera huesos **triplicados** (mismo nombre anidado,
  nodos identidad — inofensivo pero feo) y **recorta pesos de skinning a 4** → hombros menos pulcros.
- Vía pulcra: el usuario corre **FBX2glTF en su Mac** (binario `_local/FBX2glTF-macos-x86_64`,
  script `_local/convertir-fbx2gltf.command`). `FBX2glTF --skinning-weights 4 -b -i X.fbx -o out/X`.
  Da esqueleto limpio (65 huesos, 0 duplicados, en METROS). Luego en sandbox se procesan esos GLB
  (renombrar + clay + drop morphs) → `assets/bodies/`. Así se hicieron los Ch##.
- **Bulk de Mixamo:** `_local/MixamoHarvester/` (parcheado para 1 personaje) bajó ~1287 animaciones
  FBX (sin skin) a `_local/MixamoHarvester/animations/`. Se curaron/convirtieron 112 (ver §4). Quedan
  cientos sin usar para más variedad.

## 7. Restricciones del entorno (sandbox)
- ARM: no x86 binarios, no GPU, **no render testing**.
- El mount del usuario: **no se pueden borrar archivos** (`rm` → "Operation not permitted"). Por eso
  quedan GLB viejos en `assets/motions/*`; el manifiesto los ignora.
- `_local/` está en `.gitignore` (con `.DS_Store`, `node_modules/`) — no llega al sitio.

## 8. Pendientes / próximos pasos posibles
- **Carga de subconjunto rotativo:** con 20 cuerpos (~32MB) + 112 clips (~20MB) el primer load es
  algo pesado. Plan (anotado por el usuario): cargar al azar N cuerpos por sesión (ej. 6 de 20),
  más liviano y la multitud cambia en cada recarga. NO implementado. La carga es resiliente
  (`loadSafe` por cuerpo: si uno falla, se omite).
- **Más cuerpos:** la tubería soporta cualquier FBX Mixamo (vía FBX2glTF) o GLB RPM (Sketchfab/RPM
  creator). Quedan personajes Mixamo no-humanos (Mutant/robots/criaturas) por sumar si se quiere.
- **Más bailes Mixamo:** si el usuario quiere recuperar también los 30 bailes Mixamo junto a los 15
  v1, es trivial sumarlos al manifiesto.
- **Capas de render experimentales** (DoF / oclusión / god-rays) — diferidas.
- Posible slider "brillo de cuerpos" en vivo — ofrecido, sin confirmar.

## 9. Estado / preferencias del usuario (David)
- Comunica en español; prefiere respuestas **directas y concisas**, con calidez.
- Le importa la **pulcritud visual** (notó la deformación de hombros). Prioriza los **bailes v1**.
- Trabaja en Mac; corre conversiones locales con su propio token/binarios (Claude no maneja secretos).
- La obra ya está desplegada y funcionando en disco.grama.co.

---
*Estado: 20 cuerpos (2 RPM orig + 7 RPM Sketchfab + 11 Mixamo) y 112 movimientos (dance=15 v1, resto
Mixamo). Selector de familia dinámico. Clips solo-rotación + cuerpos envueltos y normalizados.*

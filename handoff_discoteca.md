# Handoff — Discoteca / "cuerpos" (obra web)

> Documento para retomar el proyecto en una sesión de Cowork. Captura el estado, las
> decisiones tomadas y la siguiente tarea, con links a todos los assets. Título provisional.

---

## 1. Qué es

Una obra web: una discoteca de figuras humanoides bailando en un espacio casi vacío,
oscuro, con unas pocas luces de color y música de fondo. El foco está en **el movimiento,
no en el personaje** — figuras genéricas, idénticas, donde lo único que varía es el baile.
Tiempo real, alto framerate, hecha en **Three.js** para correr en navegador. Pensada como
**una de varias obras** publicables en web.

Conexión con la práctica (para mantener la obra alineada): es la versión dimensional de
un hilo que ya existe en el archivo — los *bailes algorítmicos* de Daniela y Jeanie, la
*Danza DEXOHIPORETROHIPOTAMELA*, "el bar como discoteca que es además un libro", el coro al
que el TTS le dicta pasos de baile. Misma lógica de "una sola población recurriendo" del
tríptico isométrico de *Materia Historiada*: cuerpos idénticos, comportamientos distintos.

---

## 2. Estado actual (qué ya existe)

Hay un **prototipo funcional**: `discoteca.html` (traer este archivo a la sesión de Cowork).

Es una página Three.js autónoma con **danza procedural** (no mocap real todavía):
- ~20 maniquíes grises idénticos, construidos con primitivas (cápsulas + esferas), en un
  vacío oscuro con piso, niebla y 3 luces de color que orbitan y pulsan con el beat.
- Pulso colectivo compartido (todos hacen el mismo *bounce* sobre el beat) + un **genoma**
  por figura (energía, balanceo, brazos, codos, torsión, cabeceo) que la hace única.
- Botón **"tirar dados"**: reconfigura todos los bailes sin mover las posiciones.
- **Bucle perfecto por construcción**: toda la animación es periódica sobre 16 beats; las
  luces orbitan una vuelta por loop y la cámara hace un vaivén que vuelve a su punto. El
  panel muestra la duración exacta del loop.
- Audio sintetizado (kick + hi-hat) en el mismo bpm — original, sin derechos de terceros.
- Controles: arrastrar para orbitar, rueda para zoom; teclas R (dados), S (sonido),
  H (ocultar panel), F (pantalla completa). Sliders de bpm y nº de cuerpos.

**Limitación conocida**: la danza procedural lee como cuerpos con groove, pero no tiene la
rareza orgánica de un bailarín real. Por eso la siguiente fase pasa a mocap real.

---

## 3. Dirección decidida

Pasar de **danza procedural** a **mocap real**, con modelos de **hombre y mujer** (y/o los
maniquíes genéricos), conservando lo que ya funciona: estética de "una forma, muchos
movimientos", botón de re-roll, espacio oscuro con luces, salida loopeable para instalación.

---

## 4. Assets investigados (con links)

### Modelos 3D (rigged)
- **Mixamo** — https://www.mixamo.com — la opción más limpia: personajes hombre/mujer y
  maniquíes genéricos (X Bot / Y Bot) ya rigged, gratis. Exporta FBX → convertir a glTF/GLB
  para Three.js. **Quirk**: descarga un clip de animación por archivo; se ensamblan varios
  en Blender o por código.
- **Sketchfab — "Human Models Set – Male/Female (Rigged)"** — base mesh neutra de hombre y
  mujer, versiones rigged + low poly, topología limpia.
  https://sketchfab.com/3d-models/human-models-set-malefemale-rigged-7311fcfdc03e4234900eeced42a1e669
- **Ready Player Me** — avatares glTF pensados para web. (alternativa genérica)
- **Quaternius** — humanos CC0 low-poly. (alternativa genérica)

### Bases de datos de baile
- **Mixamo (clips de baile)** — https://www.mixamo.com — decenas de bailes que se
  retargetean **automáticamente** a los personajes de Mixamo. **Cero retargeting.** Es la
  ruta de menor fricción.
- **Motorica Dance Dataset** — https://github.com/simonalexanderson/MotoricaDanceDataset —
  ~6 h de mocap + audio, 8 estilos (krump, hiphop, popping, jazz vintage, pop casual), a
  120 fps. **BVH ya retargeteado a un solo esqueleto.** La mejor para texturas reales.
- **AIST++** — https://google.github.io/aichoreographer/ — 5.2 h, 10 géneros, formato SMPL,
  emparejado con música. Research-grade; SMPL pide más conversión.
- **CMU Graphics Lab** — http://mocap.cs.cmu.edu/ (conversión FBX/BVH amigable:
  cgspeed) — colección enorme y libre; tiene sección de baile, no especializada.
- **DanceDB (Univ. de Chipre)** — https://dancedb.cs.ucy.ac.cy/ — danzas de expertos en
  FBX/C3D, también en SMPL vía AMASS. Veta de danza tradicional.
- **Bandai-Namco Research** — 3.000+ movimientos BVH (incl. baile, con "humores": activo,
  cansado, feliz), licencia CC no comercial.

---

## 5. El cruce técnico que decide la ruta

Los personajes de Mixamo usan el **esqueleto de Mixamo**. Motorica y CMU vienen en **BVH**;
AIST++ y DanceDB en **SMPL**. Para vestir un modelo de Mixamo con un baile de Motorica hay
que **retargetear** (pasar la animación de un esqueleto a otro) — en Blender con Auto-Rig
Pro o el plugin de Rokoko, o por código.

- **Mixamo sobre Mixamo** → sin retargeting, funciona directo en Three.js.
- **Motorica / AIST++ sobre cualquier modelo** → más autenticidad, pero cuesta el paso de
  retargeting.

**Ruta recomendada**: arrancar 100% Mixamo (modelos + clips de baile) para poblar la
discoteca con movimiento real rápido, y luego injertar Motorica encima para subir la rareza.

---

## 6. Tarea para la sesión de Cowork

**Objetivo inmediato**: reescribir `discoteca.html` para que cargue personajes reales en
`.glb` (en vez de los maniquíes procedurales) con clips de baile reales asignados al azar.

Pasos concretos:
1. Tomar 2–3 personajes de Mixamo (p. ej. uno masculino, uno femenino, un maniquí genérico)
   + ~6 clips de baile. Exportar de Mixamo en FBX, convertir a `.glb` (Blender o gltf-pipeline).
   Idealmente cada personaje con sus animaciones embebidas en un solo `.glb`.
2. En Three.js: cargar con `GLTFLoader`, instanciar N copias repartidas en una grilla con
   jitter (como ya hace el prototipo), y a cada una asignarle un clip de baile **aleatorio**
   con un `AnimationMixer`. Desfasar el `.time` de cada mixer para que no bailen en sincronía
   perfecta (queda más vivo).
3. Conservar del prototipo: espacio oscuro, niebla, las 3 luces de color que orbitan/pulsan,
   el botón **re-roll** (que reasigne clips al azar), los controles de cámara y de teclado, y
   el audio sintetizado opcional.
4. Dejar la carga de assets como "drop-in": una carpeta `/models` y `/dances` (o `.glb` con
   todo embebido) para que solo haya que soltar archivos de Mixamo y listo.
5. Mantener el espíritu de **bucle**: como los clips de mocap no son matemáticamente
   periódicos, loopear cada clip y/o hacer crossfade suave entre repeticiones para evitar
   saltos al grabar.

**Después (opcional)**: pipeline de retargeting Motorica → esqueleto Mixamo para sumar
estilos reales (krump, popping, jazz).

---

## 7. Especificaciones técnicas

- **Three.js** vía importmap (el prototipo usa `three@0.160.0` desde jsdelivr).
- Render: `ACESFilmicToneMapping`, `SRGBColorSpace`, sombras `PCFSoftShadowMap`, `FogExp2`.
- Loaders a usar: `GLTFLoader` (y opcional `FBXLoader` si se carga FBX directo, aunque mejor
  convertir a `.glb`).
- Animación: `THREE.AnimationMixer` por personaje; `clipAction(clip).play()`.
- Performance: 20 personajes skinned a 60fps es trivial; no se necesita C++ ni instancing.
  Si se sube mucho el conteo, considerar reusar geometrías y limitar a 1 luz con sombra.
- Material genérico: gris mate (`MeshStandardMaterial`, roughness ~0.55) para que las luces
  de color lo tiñan — el look "maniquí Y Bot".

---

## 8. Workflow de video para la instalación

- **Procedural (prototipo actual)**: el panel muestra la duración exacta del loop. Grabar la
  pantalla por *exactamente* esa duración → el video calza sin costura en bucle.
- **Mocap real**: el loop perfecto se pierde; loopear/crossfade cada clip y grabar una toma
  larga, o componer un loop limpio en edición.
- Para grabar limpio: tecla **H** oculta el panel, **F** pantalla completa.

---

## 9. Decisiones pendientes

- Título definitivo de la obra (provisional: "cuerpos" / "discoteca").
- ¿Hombre + mujer reconocibles, maniquíes genéricos, o una mezcla? (afecta el peso conceptual
  de "mirar el movimiento, no el personaje").
- ¿Mixamo puro (rápido) o injertar Motorica/AIST++ (más auténtico) en esta primera versión?
- Estructura del "portafolio web" donde vivirá esta y otras obras.

---

## 10. Archivos del proyecto

- `discoteca.html` — prototipo procedural funcional (traer a la sesión).
- `handoff_discoteca.md` — este documento.

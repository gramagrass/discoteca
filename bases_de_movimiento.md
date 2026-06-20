# Bases de datos de movimiento para modelos 3D — panorama

> Investigación para DISCO.GRAMA.CO. Objetivo: ver qué hay disponible para animar
> los cuerpos con captura de movimiento real — **baile como prioridad**, más
> locomoción/cotidiano, interacción social/gestos, deporte y trabajo/actividades.
> Cada base aparece con su **licencia marcada** y el **esfuerzo de retargeting**
> hacia el rig que usa la obra (Ready Player Me / glTF). Junio 2026.

---

## 0. La lente que decide todo: el esqueleto y el retargeting

La obra ya funciona porque cuerpos y bailes **comparten el mismo esqueleto**
(el de Ready Player Me, con huesos `Hips`, `Spine`, `LeftArm`… — estructura
*compatible con Mixamo* pero **sin** el prefijo `mixamorig:`). Por eso los clips
se aplican sin retargeting. Sumar movimientos de **otra** base implica, casi
siempre, **retargetear** ese movimiento a este esqueleto. El costo se reparte en
tres niveles:

- **NINGUNO** — mismo esqueleto, se cae directo (lo que ya hacemos con la librería de RPM).
- **MODERADO** — formato BVH/FBX con esqueleto propio → Blender (Rokoko gratis o Auto-Rig Pro) → renombrar/mapear huesos → exportar `.glb`. Días para dejar el pipeline fino, después rápido por clip.
- **PESADO** — formato research **SMPL/SMPL-X** (no es un esqueleto sino un modelo de malla paramétrica). Hay que pasarlo por el add-on de Blender de Meshcapade → FBX → y **encima** retargetear. Es el camino de especialista.

Detalle técnico importante: en Three.js, reproducir un `AnimationClip` externo
exige que **los nombres de los huesos coincidan**. `SkeletonUtils.clone()` (que
usamos para instanciar) anda bien; `SkeletonUtils.retarget()` está reportado como
**poco confiable** entre esqueletos distintos (pies invertidos, manos al revés) —
por eso el retargeting conviene hacerlo **offline en Blender**, no en el navegador.
([hilo three.js](https://discourse.threejs.org/t/skeletonutils-retarget-doesnt-work-with-mixamorig-skeleton-inverted-feet-backward-hands/54892))

**Nota de licencia para una obra que se publica:** muchas bases buenas son
"research / no comercial". Una pieza artística mostrada públicamente suele caber en
uso no comercial, pero **no es automático** — y las licencias **NC-ND**
(*NoDerivatives*: LAFAN1, Bandai-Namco) son más restrictivas porque retargetear
puede considerarse "obra derivada". Lo más limpio para publicar sin dudas son las
**CC0 / dominio público / CC-BY** (CMU, 100STYLE, ACCAD, AIST++).

---

## 1. Lo más fácil (mismo esqueleto / casi drop-in)

| Base | Contenido | Formato | Licencia | Retargeting |
|---|---|---|---|---|
| **Ready Player Me — Animation Library** | 200+ clips ya retargeteados al rig RPM: idle, locomoción, expresión, **baile** (lo que ya usamos: 15 de baile) | glTF/GLB + FBX | Libre para usar en proyectos (hecha para la comunidad) | **NINGUNO** — es el rig de la obra |
| **Mixamo (Adobe)** | ~2.500 clips: locomoción, combate, **baile**, deporte, reacciones, gestos | FBX | **Libre, royalty-free, comercial OK** (no revender los clips sueltos) | **MODERADO-bajo**: renombrar `mixamorig:`→nombres llanos para RPM; hay herramientas que automatizan |

**Lectura:** la expansión inmediata y sin fricción es **sacar más clips de la
propia librería de RPM** (ya tiene locomoción, expresión y más baile que los 15
que usamos). El siguiente escalón, enorme y de licencia limpia, es **Mixamo** — solo
hace falta el renombrado de huesos, que herramientas como
[mixamo2gltf.com](https://mixamo2gltf.com/) o
[Mixamo2GLBAnimationMerger](https://github.com/enomie/Mixamo2GLBAnimationMerger)
hacen casi solas (juntan muchos FBX en un `.glb` con todas las animaciones).

Fuentes: [RPM animation-library](https://github.com/readyplayerme/animation-library/blob/master/README.md) · [RPM full-body avatars (huesos)](https://docs.readyplayer.me/ready-player-me/api-reference/avatars/full-body-avatars) · [Mixamo FAQ](https://helpx.adobe.com/creative-cloud/faq/mixamo-faq.html)

---

## 2. BVH/FBX con esqueleto propio (retargeting MODERADO en Blender)

Todas estas se importan a Blender, se mapean los huesos (Rokoko gratis / Auto-Rig
Pro ~US$40) y se exportan `.glb`. Difieren sobre todo en **licencia**.

### Baile
| Base | Contenido | Tamaño / fps | Formato | Licencia |
|---|---|---|---|---|
| **Motorica Dance Dataset** | 8 estilos: hiphop, krump, popping, locking, jazz, charleston, tap, casual (con dedos en partes) | ~6 h · 120 fps | BVH (un solo esqueleto) | **Research / no comercial** |
| **DanceDB (Univ. Chipre)** | Danza expresiva/emocional + folclore chipriota | varias performances · 24 fps | BVH | **Propietaria UCY, click-through** (research) |
| **Bandai-Namco Research (subset baile)** | Movimiento general con **etiquetas de "humor"** (activo, cansado, feliz); baile es un subconjunto | ~3.000+ clips total | BVH + JSON | **CC BY-NC-ND** (ojo: *no derivados*) |
| **FineDance** | 16 géneros, **incluye manos** (52 joints) | ~7.7 h · 30 fps | **FBX** + SMPL | **No comercial** |
| **PhantomDance** | 13 géneros, hecho por animadores (limpio) | 260 pares · ~9.5 h · 30 fps | FBX → JSON | **Sin aclarar** (verificar) |

### Locomoción / cotidiano / general
| Base | Contenido | Tamaño / fps | Formato | Licencia |
|---|---|---|---|---|
| **CMU Graphics Lab** | El clásico amplio: caminar, correr, saltar, **deporte**, artes marciales, interacción, baile | ~2.500 clips · 144 sujetos · 120 fps | ASF/AMC, C3D; **BVH/FBX** vía cgspeed | **≈ dominio público** ("copiar, modificar, redistribuir sin permiso") — **la mejor licencia** |
| **100STYLE** | Locomoción en **100 estilos** distintos (caminar/correr adelante, atrás, lateral, idle) | >4M frames · 60 fps | BVH | **CC BY 4.0** (comercial OK con atribución) |
| **ACCAD (Ohio State)** | Locomoción, gestos, artes marciales, breakdance (set chico: 3 sujetos) | ~300+ archivos · 120 fps | BVH, ASF/AMC, C3D | **CC BY 3.0** (comercial OK con atribución) |
| **Eyes Japan / mocapdata.com** | Muy amplio, cotidiano + estilizado | ~4.197 gratis (+ premium) | BVH, FBX, C3D | **CC BY 2.1 JP** (tier gratis; verificar por archivo) |
| **SFU Motion Capture DB** | ~12 categorías: locomoción, cotidiano, deporte/acrobacia | ~30 sujetos | BVH, C3D, FBX | **Research / no comercial** |
| **Ubisoft LAFAN1** | Producción AAA: caminar, correr, **baile, pelea, deporte**, caídas | 5 sujetos · ~4.6 h · 30 fps | BVH (un esqueleto) | **CC BY-NC-ND** (*no derivados*) |
| **Truebones "Motherlode"** | Catálogo enorme: humano + criaturas (locomoción, combate, baile, deporte) | 10.000+ movs | BVH + FBX | **Comercial pago** (royalty-free tras compra; muestra gratis de 500 BVH) |

### Social / gestos
| Base | Contenido | Tamaño / fps | Formato | Licencia |
|---|---|---|---|---|
| **BEAT / BEAT2** | Gestos co-speech conversacionales: 30 hablantes, 8 emociones, 4 idiomas, cuerpo + cara | ~76 h (BEAT) · 30 fps | **BVH** (BEAT) / SMPL-X (BEAT2) | **No comercial** (CC BY-NC-SA en BEAT2) |
| **Trinity / GENEA** | Habla espontánea + gesto conversacional | ~244 min · 60 fps | BVH | **Research** (acuerdo firmado) |
| **InterHuman / InterGen** | **Dos personas** interactuando: saludos, pasar objetos, también taekwondo/baile/box | 6.022 clips · 30 fps | Esqueletal (compatible SMPL) | **CC BY-NC-SA** |

### Deporte / físico
| Base | Contenido | Tamaño / fps | Formato | Licencia |
|---|---|---|---|---|
| **HUMAN4D** | 19 actividades: físicas (saltar, bailar), cotidianas, sociales; 1 y multi-persona | 50.000+ muestras · 120 fps | Mocap esqueletal + RGBD | **Research** (verificar) |
| **Fit3D** | Fitness: 47 ejercicios (calistenia, mancuernas, barra) | 611 secuencias · ~3M frames · 50 fps | Esqueleto + SMPL-X | **Research / no comercial** |
| *(CMU también trae deporte: básquet, béisbol, golf, natación, artes marciales — ver arriba)* | | | | |

---

## 3. Research-grade SMPL / AMASS (retargeting PESADO, casi todo no comercial)

Son los datasets más grandes y ricos, pero vienen en **SMPL/SMPL-X** (modelo de
malla, no esqueleto). Camino real: `.npz` → **add-on de Blender de Meshcapade** →
FBX/glTF → **+ retargeting** al rig RPM. Casi todos son **no comercial / requieren
registro**. Útiles si necesitás su escala o géneros específicos.

| Base | Contenido | Tamaño | Formato | Licencia |
|---|---|---|---|---|
| **AMASS** | **Unifica 15+ bases** (CMU, KIT, ACCAD, SFU…) en un solo formato: locomoción, deporte, cotidiano, gestos | 40+ h · 11.000+ movs · 300+ sujetos | SMPL-H/-X `.npz` | **No comercial** (Max Planck) |
| **BABEL** | Etiquetas de acción sobre AMASS (250+ categorías) | ~43 h etiquetadas | JSON (motion = AMASS) | **No comercial** |
| **HumanML3D** | Texto→movimiento (cotidiano, baile, gestos), derivado de AMASS | 14.616 clips · ~28 h · 20 fps | features / SMPL | Código MIT, **datos = licencia AMASS (no comercial)** |
| **Motion-X / Motion-X++** | Cuerpo completo (cara + manos), social/deporte/cotidiano/objetos, con texto | 15.6M frames · ~144 h | SMPL-X | **CC BY-NC-SA** (no comercial) |
| **AIST++** | **10 géneros de baile**, 30 sujetos (reconstruido de video, algo de jitter) | 1.408 secuencias · 60 fps | SMPL + keypoints | **CC BY 4.0** (la mejor licencia del grupo SMPL) |
| **GRAB** | Cuerpo completo + **manos** agarrando 51 objetos cotidianos (comer, beber, hablar por teléfono) | 10 sujetos · ~1.6M frames · 120 fps | SMPL-X + MANO | **No comercial** (Max Planck) |
| **BEHAVE** | Interacción cuerpo-objeto en entornos naturales | 321 secuencias | SMPL + objetos | **Research** custom |
| **CIRCLE** | Movimiento de **alcanzar/tareas** en escenas amuebladas | ~10 h | SMPL-X + escena | **Research** (verificar) |
| **Inter-X** | **Dos personas** con gestos de manos + texto | ~11K secuencias · 8.1M frames | SMPL-X | **Research** (formulario) |
| **Human3.6M** | 15 actividades cotidianas (saludar, comer, fumar, esperar…) | 3.6M poses · 11 sujetos · 50 Hz | Joints 3D + video (SMPL vía terceros) | **Solo académico** (email institucional) |

Pipeline SMPL: [add-on Meshcapade](https://github.com/Meshcapade/SMPL_blender_addon) · [SMPL-to-FBX](https://github.com/softcat477/SMPL-to-FBX) · [AMASS](https://amass.is.tue.mpg.de/) · [licencia AMASS](https://amass.is.tue.mpg.de/license.html)

---

## 4. Recomendación práctica para esta obra

Ordenado por menor fricción sobre el rig RPM/glTF:

1. **Exprimir la librería de RPM que ya usamos** — tiene locomoción, idle, expresión y más baile, todo drop-in. Cero retargeting, expansión inmediata de variedad.
2. **Mixamo** — el salto grande con licencia comercial limpia: miles de movimientos (baile + cotidiano + deporte + gestos). Solo el renombrado `mixamorig:`→llano, automatizable. **Mejor relación valor/esfuerzo.**
3. **CMU (vía cgspeed)** — licencia casi dominio público y enorme cobertura (deporte, artes marciales, interacción). Retargeting moderado en Blender. La opción más libre para meterse en mocap "real".
4. **100STYLE / ACCAD / AIST++** — CC-BY (publicables): 100STYLE para locomoción muy estilizada, ACCAD para gestos/marciales, AIST++ si querés sus 10 géneros de baile (aunque AIST++ es SMPL → pesado).
5. **Motorica / DanceDB / FineDance / BEAT** — texturas de baile y gesto muy ricas, pero **no comerciales**: ok para una pieza artística no comercial, respetando términos (y cuidado con NC-ND en Bandai-Namco/LAFAN1).
6. **SMPL/AMASS (GRAB, Motion-X, etc.)** — solo si necesitás específicamente manipulación de objetos, interacción social fina o su escala. Camino de especialista.

**Sugerencia de ruta:** la obra pide "aspectos del movimiento humano, no solo
baile". El combo que más abre el vocabulario con menos costo es
**RPM-library (ya) + Mixamo (cotidiano/deporte/gestos/baile, comercial) + CMU
(actividades y deporte real, libre)**. Eso cubre las cuatro categorías que pediste
sin entrar todavía en el terreno pesado de SMPL.

---

## 5. Verificar antes de comprometerse (banderas de los agentes)

- **NC-ND (LAFAN1, Bandai-Namco):** "no derivados" podría prohibir retargetear/adaptar para distribuir, no solo el uso comercial. Tratar como prototipo/research.
- **KIT Whole-Body:** licencia académica custom, estado comercial poco claro → contactar a KIT. Formato MMM/C3D = **pesado** (no es BVH directo).
- **Eyes Japan:** la CC BY 2.1 JP aplica al tier **gratis**; el premium es pago. Confirmar por archivo.
- **PhantomDance, SoulDance, OpenDance, CIRCLE, HUMAN4D, TED Gesture, SportsCap:** licencias sin aclarar del todo en el repo → verificar antes de cualquier uso.
- **Truebones:** sin licencia única; cada pack en Gumroad tiene sus términos.
- **Mixamo:** libre para usar las animaciones **en** proyectos, no para **revender** los clips sueltos.
- **Cifras** (horas, fps, sujetos): a veces difieren entre el paper y la versión publicada → confirmar en la página de descarga real.

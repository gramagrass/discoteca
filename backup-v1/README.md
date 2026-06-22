# backup-v1 — DISCO.GRAMA.CO (v1 congelada)

Copia **autocontenida y funcional** de la versión 1 de la obra, tal como estaba en el
root al congelarla (junio 2026). Corre sola si entrás a `https://disco.grama.co/backup-v1/`.

## Qué incluye
- `index.html` — la obra completa (idéntica al root al momento del snapshot).
- `config.js` · `models.js` · `motions.js` — estado inicial y manifiestos.
- `assets/bodies/` — los 7 cuerpos RPM (Masculine, Feminine, GothicGirl, Julia, Andra, Harry, Chen).
- `assets/motions/{dance,locomotion,idle,expression,fisico}/` — **solo** los 112 clips que el
  manifiesto realmente usa (dance=15 v1, resto Mixamo). No se copiaron los GLB sin usar.

## Estado de la v1 (resumen)
7 cuerpos RPM (A-pose, clay gris, altura normalizada). 112 movimientos en 5 familias, selector
de familia dinámico. Post: grade frío, niebla, bloom, blur general, y selector de **dither**
(off / fino anti-banding / blue-noise b/n / bayer ordenado 1px). Clips solo-rotación
(`neutralizeRoot`) + cuerpos envueltos en Group y normalizados.

## Por qué existe
El root se va a reescribir para la **v2** (arquitectura SMPL: cuerpos paramétricos + mocap nativo
SMPL, sin retargeting). Esta carpeta preserva la v1 corriendo intacta mientras tanto.

> Nota: las rutas de la obra son relativas (`./assets/...`, `src="models.js"`), por eso funciona
> sin cambios desde una subcarpeta. El editor `config.html` no se incluyó (guarda a la raíz del
> repo vía API); la v1 ya trae su `config.js` con el estado por defecto.

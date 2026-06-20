/* ───────────────────────────────────────────────────────────────
   personajes (cuerpos) a cargar — nombres de archivo en assets/bodies/ sin .glb
   Todos comparten el rig de Mixamo/RPM (la obra normaliza altura y orientación).
   Para sumar uno: dejá el .glb en assets/bodies/ y agregá su nombre acá.
   ─────────────────────────────────────────────────────────────── */
window.MODELS = [
  "Masculine", "Feminine",
  "Ch01", "Ch02", "Ch13", "Ch16", "Ch17", "Ch22",
  "Ch26", "Ch27", "Ch37", "Ch38", "Ch49"
];
// Ch## son personajes de Mixamo (FBX con skin) convertidos a GLB: huesos renombrados al
// rig base, texturas descartadas (la obra los pinta gris clay). 13 cuerpos en total.

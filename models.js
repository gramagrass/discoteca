/* ───────────────────────────────────────────────────────────────
   personajes (cuerpos) a cargar — nombres de archivo en assets/bodies/ sin .glb
   Todos comparten el rig de Mixamo/RPM (la obra normaliza altura y orientación).
   Para sumar uno: dejá el .glb en assets/bodies/ y agregá su nombre acá.
   ─────────────────────────────────────────────────────────────── */
window.MODELS = [
  // RPM nativos (rig Wolf3D) — impecables con los bailes
  "Masculine", "Feminine",
  "GothicGirl", "Cyberpunk", "Julia", "CyberMale", "Andra", "Harry", "Chen",
  // Mixamo (convertidos con FBX2glTF)
  "Ch01", "Ch02", "Ch13", "Ch16", "Ch17", "Ch22",
  "Ch26", "Ch27", "Ch37", "Ch38", "Ch49"
];
// 20 cuerpos. Texturas descartadas (la obra los pinta gris clay); solo importa forma y rig.

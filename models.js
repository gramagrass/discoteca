/* ───────────────────────────────────────────────────────────────
   personajes (cuerpos) a cargar — nombres de archivo en assets/bodies/ sin .glb
   Todos comparten el rig RPM/Wolf3D (la obra normaliza altura y orientación).
   Para sumar uno: dejá el .glb en assets/bodies/ y agregá su nombre acá.
   ─────────────────────────────────────────────────────────────── */
window.MODELS = [
  // Solo cuerpos RPM nativos (A-pose) — impecables con los bailes.
  "Masculine", "Feminine",
  "GothicGirl", "Julia", "Andra", "Harry", "Chen"
];
// Los 11 cuerpos Mixamo (Ch##) quedaron guardados en _local/bodies_mixamo/ para uso futuro.
// Para reactivarlos: copiarlos de vuelta a assets/bodies/ y agregar sus nombres acá.

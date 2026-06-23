/* ───────────────────────────────────────────────────────────────
   personajes (cuerpos) a cargar — nombres de archivo en assets/bodies/ sin .glb
   Todos comparten el rig RPM/Wolf3D (la obra normaliza altura y orientación).
   Para sumar uno: dejá el .glb en assets/bodies/ y agregá su nombre acá.
   ─────────────────────────────────────────────────────────────── */
window.MODELS = [
  // Solo los dos cuerpos RPM base (A-pose) — sin ropa, menos "videojuego".
  "Masculine", "Feminine",
  // Apartados (no gustaron: mucha ropa / look videojuego). Los .glb siguen en
  // assets/bodies/ — para reactivar uno, agregá su nombre acá:
  // "GothicGirl", "Julia", "Andra", "Harry", "Chen"
];
// Los 11 cuerpos Mixamo (Ch##) quedaron guardados en _local/bodies_mixamo/ para uso futuro.

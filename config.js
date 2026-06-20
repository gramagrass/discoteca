/* ───────────────────────────────────────────────────────────────
   discoteca — estado inicial  (generado por config.html)
   Reemplaza este archivo en la carpeta de discoteca.html y recarga.
   ─────────────────────────────────────────────────────────────── */
window.CONFIG = {

  // cuerpos
  cuerpos:            13,    // nº de cuerpos (1–30)
  familia:            "todas",    // pool de movimientos para las generaciones
  coreografia:        100,    // 0 = todos el mismo baile · 100 = cada quien el suyo
  cambioBaile:        0,    // frecuencia de cambio por modelo (0 = nunca)
  movimiento:         5,    // velocidad del baile (50 = normal, 0 = quietos, 100 = 2×)
  noise:              10,    // ruido de película (0 = off)
  autoRandomSeg:      10,    // intervalo del auto-random en segundos

  // espacio
  formacion:          "aleatorio",    // aleatorio | cuadricula | anillo | anillo_fuera | circulo | fila | espiral
  rotacionAzar:       100,    // 0 = miran igual · 100 = al azar
  cercania:           14,    // 0 = masa apretada · 100 = dispersos
  tamanoAzar:         0,    // 0 = igual tamaño · 100 = de mano a gigante

  // cámara
  vistaCamara:        "sobrevuelo",    // libre | orbita | sobrevuelo | tv | cenital | cenital_inclinada
  camVelocidad:       40,    // velocidad de cámara (cortes / vuelo / órbita)
  camAngulo:          293,    // ángulo horizontal en grados
  camAltura:          2,    // altura de cámara en grados
  camZoom:            3.8,    // distancia (menor = más cerca)

  // luz / estrobo
  luzGeneral:         98,    // -100..100 (bajo cero: cuerpos oscuros translúcidos)
  colorLuz:           "#8c8c8c",    // color del estrobo / luz
  bpm:                112,    // pulso de luces/audio
  estroboVel:         7.5,    // destellos por segundo
  estroboIntensidad:  1.6,    // fuerza del destello (0 = negro)
  luzBase:            33,    // luz entre destellos (0 = negro)

  // modo
  estrobo:            false,    // arrancar en modo estrobo (off = sin parpadeo)
  sonido:             false,    // arrancar con sonido (suena al primer clic)
  piso:               false,    // mostrar piso/rejilla
  autoRandom:         false,    // re-roll automático cada cierto tiempo
  capaNiebla:         true,    // niebla atmosférica (INSIDE)
  capaGrade:          true,    // grade frío/apagado (INSIDE)
  capaDither:         true,    // dither anti-banding
  capaBloom:          true,    // bloom
  fps:                true,    // mostrar FPS
  nieblaDens:         50,      // densidad de niebla 0–100
  brumaBrillo:        40,      // brillo del gris bruma 0–100 (0 = oscuro → atmósfera en negro)
  bloomFuerza:        50,      // fuerza del bloom 0–100
  gradeInt:           100,     // intensidad del grade 0–100
  panel:              true,    // mostrar el panel en escritorio (en móvil siempre oculto; botón ☰)
  sacudir:            true,    // sacudir el teléfono = nuevo RANDOM

  // qué parámetros entran al botón RANDOM
  random: {
    cuerpos:          true,
    familia:          false,
    coreografia:      true,
    cambioBaile:      true,
    movimiento:       false,
    noise:            false,
    formacion:        true,
    rotacionAzar:     true,
    cercania:         false,
    tamanoAzar:       true,
    vistaCamara:      false,
    luzGeneral:       false,
    colorLuz:         false,
    bpm:              false,
    estroboVel:       false,
    estroboIntensidad:false,
    luzBase:          false
  }
};

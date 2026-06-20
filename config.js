/* ───────────────────────────────────────────────────────────────
   discoteca — estado inicial
   Edita los valores de la derecha y recarga la página (no hace falta
   tocar nada más). Borra este archivo y la obra vuelve a sus valores
   por defecto. Los porcentajes van de 0 a 100.
   ─────────────────────────────────────────────────────────────── */
window.CONFIG = {
  cuerpos:           13,         // nº de cuerpos (1–30)
  bpm:               112,        // pulso de luces/audio (70–140)
  luzGeneral:        98,         // -100..100 (bajo cero: cuerpos negros translúcidos teñidos por la luz)
  colorLuz:          "#ffffff",  // color del estrobo / luz
  rotacionAzar:      100,        // hacia dónde miran: 0 = igual, 100 = al azar
  cercania:          14,         // 0 = masa apretada, 100 = dispersos
  tamanoAzar:        0,          // 0 = igual tamaño, 100 = de mano a gigante
  estroboVel:        7.5,        // destellos por segundo (0.5–20)
  estroboIntensidad: 1.6,        // fuerza del destello (0–12)
  luzBase:           33,         // luz entre destellos 0–100 (0 = negro)
  coreografia:       100,        // 0 = todos el mismo baile, 100 = cada quien el suyo
  cambioBaile:       0,          // frecuencia de cambio de baile por modelo 0–100 (0 = nunca)
  movimiento:        5,          // velocidad del baile 0–100 (50 = normal → aquí 0.1×)
  noise:             10,         // ruido de película 0–100 (0 = off)

  // disposición: aleatorio | cuadricula | anillo | anillo_fuera | circulo | fila | espiral
  formacion:         "aleatorio",
  // familia de movimiento activa: todas | dance | locomotion | expression | idle
  familia:           "todas",

  estrobo:           true,       // arrancar en modo estrobo
  sonido:            false,      // arrancar con sonido (suena al primer clic)
  piso:              false,      // mostrar piso/rejilla
  autoRandom:        false,      // re-rollear solo cada cierto tiempo (para dejarlo corriendo)
  autoRandomSeg:     10,         // intervalo del auto-random en segundos (1–60)

  // capas de render (look INSIDE) — cada una se prende/apaga por separado
  capaNiebla:        false,      // niebla atmosférica (densidad alta)
  capaGrade:         false,      // grade frío/apagado
  capaDither:        false,      // dither anti-banding
  capaBloom:         false,      // bloom
  fps:               false,      // mostrar medidor de FPS

  // cámara — lee los valores en vivo en el panel ("cámara") y cópialos aquí
  camAngulo:         293,        // ángulo horizontal en grados
  camAltura:         2,          // altura de la cámara en grados
  camZoom:           3.8,        // distancia (acercar/alejar)

  // modo de cámara: libre | orbita | sobrevuelo | tv | cenital | cenital_inclinada
  vistaCamara:       "sobrevuelo",
  camVelocidad:      40          // velocidad de cámara 0–100 (cortes / vuelo / órbita)
};

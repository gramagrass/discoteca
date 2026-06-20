# Migrar a Mixamo (bulk) — plan

Vos bajás los assets en lote (con tu sesión); yo los conecto. **No hace falta
convertir**: la obra va a leer los `.fbx` de Mixamo directo con `FBXLoader`.
La versión RPM queda congelada en `backup-v1/`.

## 1. Bajar en lote (tu máquina, tu sesión)

Mixamo no tiene descarga masiva oficial. Hay herramientas de la comunidad que usan
**tu token** (de tu sesión iniciada) para bajar todo vía los endpoints internos.
La más completa (baja **todos los personajes y animaciones**):

- **MixamoHarvester** — https://github.com/paulpierre/MixamoHarvester
  (pegás tu Bearer token en `mixamo_token.txt`; baja personajes + animaciones en FBX)
- Alternativas: juanjo4martinez/mixamo-downloader (GUI), gnuton/mixamo_anims_downloader.

⚠️ **Salvedad honesta:** esto usa endpoints no oficiales → **zona gris de los
términos de Mixamo**. Los clips en sí son libres/comercial-OK; lo no sancionado es
el scraping masivo del servicio. Lo corrés **vos** con tu token — yo no manejo tu
credencial ni ejecuto el scraper.

Cómo sacar el token: logueado en mixamo.com → DevTools (F12) → pestaña Network →
cualquier request a mixamo.com → copiás el header `Authorization: Bearer ...`.

## 2. Dejarme los FBX

Soltá los FBX en esta estructura (las subcarpetas = familias del selector):

```
mixamo_in/
  characters/   ← personajes (FBX con skin)
  dance/
  locomotion/
  expression/
  idle/
  sports/       ← opcional
  (las que quieras agregar)
```

- Personajes: bajalos **con skin**.
- Animaciones: **sin skin** (solo el movimiento). El desplazamiento de raíz lo
  neutralizo igual, así que el "In Place" no es obligatorio.
- Todos comparten el esqueleto `mixamorig` → cualquier movimiento anda en cualquier personaje.

## 3. Lo que hago yo

- Conecto `FBXLoader` en la obra (sin conversión).
- Genero los manifiestos (`models.js`, `motions.js`) desde lo que dejes.
- **Escala:** miles de clips no se pueden cargar todos de golpe ni servir enteros
  por web. Mantengo el **archivo completo** en disco y la obra **carga un
  subconjunto rotativo/curado por sesión** (variedad distinta cada vez, carga liviana).
  Eso lo armo yo.
- Verifico y te aviso para commitear.

## 4. Después (opcional, para el deploy)
Para que `disco.grama.co` cargue liviano, conviene convertir el subconjunto curado a
**GLB + compresión** (más chico que FBX). Esa conversión la podés correr en tu Mac
(`npx fbx2gltf` funciona en macOS) o lo vemos cuando lleguemos ahí. Para que
funcione, con FBX directo alcanza.

## Notas
- Licencia Mixamo: libre, royalty-free, comercial OK (no revender los clips sueltos).
- Conceptual: pasás de "cuerpos idénticos genéricos" a "personajes variados y
  reconocibles" (incluidos no-humanos) — que es lo que buscás.

# cuerpos — discoteca

Obra web: una población de cuerpos idénticos bailando captura de movimiento real
en un vacío oscuro con luces / estrobo. Three.js, tiempo real, sin backend.

Servida en **https://disco.grama.co** vía GitHub Pages.

## Archivos

- `index.html` — la obra.
- `config.html` — editor visual del estado inicial (genera `config.js`).
- `config.js` — estado inicial (cuerpos, luces, estrobo, cámara…). Editable a mano o con `config.html`.
- `assets/` — cuerpos (2) y bailes (15) en `.glb`, autohospedados.
- `CNAME` — dominio personalizado para GitHub Pages.

La librería Three.js se carga desde el CDN de jsDelivr (paquete npm versionado). Todo lo demás es local.

## Publicar (primera vez)

1. Crea un repositorio nuevo en GitHub (puede ser público o privado).
2. Sube estos archivos al repo. La forma más fácil sin terminal:
   - **GitHub Desktop**: "Add local repository" → elige esta carpeta → publica.
   - **o** en la web del repo: "Add file → Upload files" → arrastra el contenido de esta carpeta → Commit.
3. En el repo: **Settings → Pages** → "Build and deployment" → Source: *Deploy from a branch* → Branch: `main` / `/ (root)` → Save.
4. En **Settings → Pages → Custom domain** debería aparecer `disco.grama.co` (lo toma del archivo `CNAME`). Guarda.
5. Activa **Enforce HTTPS** cuando se habilite (puede tardar unos minutos en emitir el certificado).

## DNS (en grama.co)

Añade **un** registro CNAME:

```
Tipo:   CNAME
Nombre: disco
Valor:  <tu-usuario>.github.io.
```

(Reemplaza `<tu-usuario>` por tu usuario/organización de GitHub.) La propagación suele tardar de minutos a un par de horas.

## Actualizar

Edita los archivos y vuelve a subir/commitear (un paso en GitHub Desktop o en la web).
GitHub Pages republica solo en segundos.

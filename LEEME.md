# Ruta a la plaza — web propia

Web instalable (PWA) de estudio de la oposición. Es un sitio estático: no necesita servidor propio.

## Regenerar
    python herramientas/verificar.py      # comprueba las citas de las preguntas contra el BOE
    python herramientas/audio.py          # genera los mp3 de los podcasts (voces es-ES-Elvira y Alvaro)
    python herramientas/construir_web.py  # genera web/index.html

## Probar en local
    cd web && python -m http.server 8765   ->   http://127.0.0.1:8765

## Publicar (pendiente de tu autorización)
1. **Supabase** (progreso en la nube): crear proyecto, ejecutar `supabase.sql` en el editor SQL,
   activar Authentication > Email (enlace mágico) y copiar `url` y clave `anon` a `config.js`.
   En Authentication > URL Configuration añadir la dirección final de la web.
2. **Hosting gratuito** (Cloudflare Pages, Netlify o Vercel): subir la carpeta `web/` tal cual.
   Requiere HTTPS (lo dan por defecto); sin HTTPS el micrófono no funciona.
3. Abrir la web en el móvil Android (Chrome) > menú > «Instalar aplicación».

Sin `config.js` rellenado la web funciona igual y guarda el progreso solo en el dispositivo.

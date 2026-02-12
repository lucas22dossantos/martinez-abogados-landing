# Martinez & Asociados - Landing Page

Landing page estatica para estudio juridico, orientada a conversion de consultas con enfoque institucional, diseno elegante y experiencia responsive.

## Descripcion

Sitio one-page desarrollado con HTML, CSS y JavaScript vanilla. Incluye secciones de servicios, equipo, metodologia, formulario de contacto, CTA por WhatsApp y paginas legales.

## Stack

- `HTML5`
- `CSS3`
- `JavaScript` (vanilla)
- Google Fonts (`Playfair Display`, `Crimson Pro`)

## Estructura del Proyecto

```text
landing/
  index.html
  styles.css
  script.js
  sitemap.xml
  img/
    hero.webp
    abogado.webp
    abogado2.webp
    abogado3.webp
    favicon.svg
  legal/
    legal.css
    privacy.html
    terms.html
    ethics.html
```

Nota: tambien existen versiones `.png` de respaldo en `img/`.

## Funcionalidades Implementadas

- Navegacion fija con estado activo por seccion.
- Hero con efecto visual/parallax.
- Acordeon para areas de practica.
- Animaciones de entrada con `IntersectionObserver`.
- Formulario con validacion en cliente y modal de confirmacion.
- Modo demo de formulario (`action="#"`).
- Boton flotante de WhatsApp con seguridad (`rel="noopener noreferrer"`).
- SEO base implementado:
  - `meta description`
  - `canonical`
  - Open Graph
  - Twitter Cards
  - JSON-LD (`LegalService`)
  - `favicon`
  - `sitemap.xml`
- Accesibilidad base:
  - `skip link`
  - `:focus-visible`
  - landmark principal (`<main>`)
- Paginas legales conectadas desde footer:
  - `legal/privacy.html`
  - `legal/terms.html`
  - `legal/ethics.html`

## Ejecucion Local

No requiere build ni dependencias.

```powershell
cd landing
python -m http.server 5500
```

Abrir: `http://localhost:5500`

## Configuracion para Produccion

1. Reemplazar dominio de ejemplo:
- `https://martinez-abogados.com/` en `canonical`, Open Graph, Twitter y `sitemap.xml`.

2. Configurar endpoint real del formulario:
- Cambiar `action="#"` en `index.html` por endpoint real (Formspree u otro proveedor).

3. Validar datos comerciales:
- Telefono, WhatsApp, email, direccion y horarios.

4. Revisar contenido legal definitivo:
- `privacy.html`, `terms.html`, `ethics.html`.

## Estado Actual

- `SEO tecnico base`: completado para esta etapa.
- `Accesibilidad base`: completado para esta etapa.
- `Enlaces legales`: completado.
- `Imagenes`: optimizadas en `webp`.
- `Envio de formulario`: en modo demo (comportamiento intencional para prueba).

## Pendientes Reales

- Configurar endpoint real del formulario para entorno productivo.
- Ajustar copy final y datos reales del estudio.
- Ejecutar QA final responsive y de accesibilidad.

## Mantenimiento

- Estructura y contenido: `index.html`
- Estilos principales: `styles.css`
- Logica/interacciones: `script.js`
- Estilos de legales: `legal/legal.css`
- Paginas legales: `legal/*.html`

## Licencia

Uso interno/comercial segun acuerdos del proyecto.

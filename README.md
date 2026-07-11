# 🚗 ELHYDRIVE — Tu amigo al volante

![ELHYDRIVE](assets/chevrolet-sail-blanco.jpg)

**Aplicación web profesional (PWA)** de servicio personalizado de transporte (**Taxi Amigo**) + acompañamiento para **aprender a conducir desde cero** y **ganar confianza al volante**.

> Mobile First • 100% Responsive • Progressive Web App • Integración WhatsApp + Geolocalización

---

## ✨ Servicios

| Servicio | Descripción |
|----------|-------------|
| **Taxi Amigo** | Carreras personalizadas con atención 1 a 1. Solicitud directa por WhatsApp. |
| **Solicitud de carreras** | Formulario inteligente + geolocalización GPS. Mensaje pre-llenado. |
| **Geolocalización** | Botón "Usar mi ubicación actual" que genera enlace de Google Maps. |
| **Aprende a conducir desde cero** | Acompañamiento personalizado: controles, volante, arranque, estacionamiento, etc. |
| **Práctica para conductores con licencia** | Gana confianza: calles, avenidas, giros, maniobras, control del vehículo. |

---

## 🛠️ Tecnologías utilizadas

- **HTML5** semántico + SEO + Open Graph + Schema.org
- **CSS3** moderno (variables CSS, Flexbox, Grid, animaciones suaves)
- **JavaScript** vanilla (geolocation, PWA, WhatsApp deep links)
- **Bootstrap 5.3** (layout responsive)
- **Font Awesome 6** (iconos)
- **AOS** (animaciones al scroll)
- **Google Fonts** (Inter + Outfit)
- **Progressive Web App** (manifest.json + service-worker.js)
- **GitHub Pages** ready

---

## 📁 Estructura del proyecto

```
ELHYDRIVE/
├── index.html              # Página principal (SPA-like)
├── css/
│   └── styles.css          # Estilos premium Mobile First
├── js/
│   └── script.js           # Lógica: geo, forms, PWA, UX
├── assets/
│   ├── chevrolet-sail-blanco.jpg
│   ├── logo.jpg
│   └── logo.svg
├── icons/
│   ├── icon-192.png
│   ├── icon-512.png
│   ├── apple-touch-icon.png
│   ├── favicon-32.png
│   └── favicon-16.png
├── manifest.json           # PWA manifest
├── service-worker.js       # Offline + cache
└── README.md
```

---

## 🚀 Instalación y ejecución local

1. Clona el repositorio:
   ```bash
   git clone https://github.com/esancheza-eng/ELHYDRIVE.git
   cd ELHYDRIVE
   ```

2. Abre `index.html` en tu navegador **o** usa un servidor local:
   ```bash
   # Con Python
   python -m http.server 8080

   # Con Node (npx)
   npx serve .
   ```

3. Visita `http://localhost:8080`

> ⚠️ La geolocalización y el Service Worker requieren **HTTPS** o `localhost`.

---

## 🌐 Publicación en GitHub Pages

1. Ve a **Settings → Pages** del repositorio.
2. Source: **Deploy from a branch**
3. Branch: `main` / folder: `/ (root)`
4. Guarda. En unos minutos estará en:
   **https://esancheza-eng.github.io/ELHYDRIVE/**

Opcional: configura un dominio personalizado (CNAME).

---

## 📱 Configuración del número de WhatsApp

El número está centralizado en `js/script.js`:

```js
const WHATSAPP_NUMBER = '593989938910'; // Ecuador: 0989938910 → +593 989938910
```

Todos los botones y formularios usan este número.  
Para cambiarlo, edita esa constante y los `href` de `wa.me` en `index.html` (o genera un script de build).

**Formato correcto Ecuador:**  
`https://wa.me/593989938910?text=...` (sin el 0 inicial del celular).

---

## 📲 Instalar como PWA

1. Abre la web en Chrome / Safari / Edge (Android o iOS).
2. En Android: menú → “Agregar a la pantalla de inicio” o el banner de instalación.
3. En iOS Safari: Compartir → “Agregar a pantalla de inicio”.
4. La app se abre en **modo standalone** (sin barra del navegador).

---

## 🔮 Próximas mejoras (arquitectura preparada)

- [ ] Registro de clientes (LocalStorage / Firebase)
- [ ] Historial de carreras y alumnos
- [ ] Reservas programadas con calendario
- [ ] Estimación de tarifas aproximadas
- [ ] Mapa en tiempo real (Leaflet / Google Maps)
- [ ] Panel administrativo simple
- [ ] Notificaciones push
- [ ] Pagos digitales (opcional)
- [ ] Sistema de calificaciones y testimonios reales
- [ ] Promociones y cupones
- [ ] Modo offline mejorado + sincronización

---

## 🎨 Identidad visual

- **Colores principales:** Azul oscuro / Negro (`#0b1220`, `#0f172a`) + Acento cian (`#38bdf8`)
- **Tipografía:** Outfit (títulos) + Inter (cuerpo)
- **Estilo:** Premium, minimalista, tecnológico, confiable
- **Vehículo:** Chevrolet Sail blanco 2012

---

## 📞 Contacto del servicio

- **WhatsApp:** [0989938910](https://wa.me/593989938910)
- **Zona:** Milagro / Guayaquil y alrededores, Ecuador

---

## 📄 Licencia

Proyecto de uso personal/comercial del propietario de ELHYDRIVE.  
Código fuente disponible para mantenimiento y evolución.

---

**Hecho con ❤️ y mucho café para la movilidad y la confianza al volante.**  
© 2026 ELHYDRIVE

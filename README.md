# 🚗 ELHYDRIVE — Tu amigo al volante

**Aplicación web profesional (PWA)** de servicio personalizado de transporte (**Taxi Amigo**) + acompañamiento para **aprender a conducir desde cero** y **ganar confianza al volante** + **Mapa interactivo Google Maps**.

> Mobile First • 100% Responsive • Progressive Web App • Integración WhatsApp + Geolocalización + Google Maps

---

## ✨ Servicios

| Servicio | Descripción |
|----------|-------------|
| **Taxi Amigo** | Carreras personalizadas con atención 1 a 1. Solicitud directa por WhatsApp. |
| **Solicitud de carreras** | Formulario inteligente + geolocalización GPS. Mensaje pre-llenado. |
| **Geolocalización** | Botón "Usar mi ubicación actual" que genera enlace de Google Maps y actualiza el mapa. |
| **Mapa interactivo** | Google Maps embebido. Centrado en zona de cobertura. Se actualiza con tu pin al compartir ubicación. Zoom, pan, Street View. |
| **Aprende a conducir desde cero** | Acompañamiento personalizado: controles, volante, arranque, estacionamiento, etc. |
| **Práctica para conductores con licencia** | Gana confianza: calles, avenidas, giros, maniobras, control del vehículo. |

---

## 🗺️ Mapa interactivo (nuevo)

- Sección dedicada `#mapa` con iframe de Google Maps (sin API key requerida).
- Botones: **Zona** (vuelve al centro de cobertura) y **Mi ubicación** (pide GPS y centra el pin).
- Al usar "Usar mi ubicación" en el formulario:
  - El mapa principal se actualiza con tu pin.
  - Aparece preview del mapa debajo del campo de recogida.
  - Se muestran tus coordenadas + enlace "Abrir en Google Maps".
  - El mensaje de WhatsApp incluye el link de tu ubicación.

Coordenadas por defecto de zona: **Milagro / Guayaquil** (`-2.134, -79.594`).

---

## 🛠️ Tecnologías utilizadas

- HTML5 + CSS3 + JavaScript vanilla
- Bootstrap 5.3 + Font Awesome 6 + AOS
- Google Maps Embed (interactivo, sin API key)
- Progressive Web App (manifest + service worker)
- GitHub Pages ready

---

## 📁 Estructura

```
ELHYDRIVE/
├── index.html
├── css/
│   ├── styles.css
│   └── map.css          ← estilos del mapa
├── js/script.js         ← lógica geo + mapa
├── manifest.json
├── service-worker.js
├── assets/
├── icons/
└── README.md
```

---

## 🚀 Publicación en GitHub Pages

1. Merge del PR `feature/elhydrive` → `main`
2. Settings → Pages → Source: `main` / root
3. URL: **https://esancheza-eng.github.io/ELHYDRIVE/**

---

## 📱 WhatsApp

Número: `+593 989938910` (0989938910)  
Configurado en `js/script.js` y en todos los enlaces `wa.me`.

---

## 🔮 Próximas mejoras

- [ ] Google Maps JavaScript API (markers personalizados, directions, click-to-set-pickup)
- [ ] Registro de clientes + historial
- [ ] Reservas programadas
- [ ] Estimación de tarifas
- [ ] Panel administrativo
- [ ] Notificaciones push

---

**Hecho con ❤️ para tu movilidad y confianza al volante.**  
© 2026 ELHYDRIVE

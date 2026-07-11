/**
 * ELHYDRIVE - Main JavaScript
 * PWA + Geolocation + Google Maps Interactive + WhatsApp Integration + UX
 */

(function () {
  'use strict';

  // ========== CONFIG ==========
  const WHATSAPP_NUMBER = '593989938910'; // Ecuador format without +
  const WHATSAPP_BASE = `https://wa.me/${WHATSAPP_NUMBER}`;
  const DEFAULT_CENTER = { lat: -2.134, lng: -79.594 }; // Milagro / Guayaquil area
  const DEFAULT_ZOOM = 13;

  // ========== LOADER ==========
  window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
      setTimeout(() => {
        loader.classList.add('hidden');
        setTimeout(() => loader.remove(), 600);
      }, 800);
    }
  });

  // ========== AOS INIT ==========
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      offset: 60,
      easing: 'ease-out-cubic'
    });
  }

  // ========== NAVBAR SCROLL ==========
  const nav = document.getElementById('mainNav');
  const backToTop = document.getElementById('backToTop');

  function handleScroll() {
    const scrollY = window.scrollY;
    if (nav) {
      nav.classList.toggle('scrolled', scrollY > 40);
    }
    if (backToTop) {
      backToTop.classList.toggle('visible', scrollY > 400);
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Back to top
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ========== ACTIVE NAV LINKS ==========
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link, .bottom-nav-item[data-section]');

  function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href') || '';
      const section = link.dataset.section;
      if (href === `#${current}` || section === current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // Close mobile menu on link click
  document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const collapse = document.querySelector('.navbar-collapse');
      if (collapse && collapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(collapse);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });

  // ========== GOOGLE MAPS INTERACTIVE ==========
  const googleMap = document.getElementById('googleMap');
  const mapTitle = document.getElementById('mapTitle');
  const mapBadge = document.getElementById('mapBadge');
  const coordsBox = document.getElementById('coordsBox');
  const coordsValue = document.getElementById('coordsValue');
  const openInMaps = document.getElementById('openInMaps');
  const mapPreview = document.getElementById('mapPreview');

  function buildEmbedUrl(lat, lng, zoom = 16) {
    return `https://maps.google.com/maps?q=${lat},${lng}&z=${zoom}&hl=es&output=embed`;
  }

  function updateMap(lat, lng, zoom = 16, label = 'Tu ubicación') {
    if (!googleMap) return;
    const url = buildEmbedUrl(lat, lng, zoom);
    googleMap.src = url;

    if (mapTitle) mapTitle.textContent = label;
    if (mapBadge) {
      mapBadge.innerHTML = '<i class="fas fa-map-pin"></i> Ubicación del cliente';
      mapBadge.classList.add('active');
    }
    if (coordsBox) coordsBox.style.display = 'block';
    if (coordsValue) coordsValue.textContent = `${lat}, ${lng}`;
    if (openInMaps) {
      openInMaps.href = `https://www.google.com/maps?q=${lat},${lng}`;
    }

    // Also update form preview if exists
    if (mapPreview) {
      mapPreview.style.display = 'block';
      const prevIframe = mapPreview.querySelector('iframe');
      if (prevIframe) prevIframe.src = url;
    }
  }

  function resetMapToZone() {
    if (!googleMap) return;
    googleMap.src = buildEmbedUrl(DEFAULT_CENTER.lat, DEFAULT_CENTER.lng, DEFAULT_ZOOM);
    if (mapTitle) mapTitle.textContent = 'Zona ELHYDRIVE · Milagro / Guayaquil';
    if (mapBadge) {
      mapBadge.innerHTML = '<i class="fas fa-car-side"></i> Cobertura activa';
      mapBadge.classList.remove('active');
    }
    if (coordsBox) coordsBox.style.display = 'none';
  }

  // Buttons on map section
  const btnCentrar = document.getElementById('btnCentrarMapa');
  const btnMiUbicacionMapa = document.getElementById('btnMiUbicacionMapa');

  if (btnCentrar) {
    btnCentrar.addEventListener('click', resetMapToZone);
  }

  // ========== GEOLOCATION ==========
  const btnUbicacion = document.getElementById('btnUbicacion');
  const recogidaInput = document.getElementById('recogida');
  const geoStatus = document.getElementById('geoStatus');
  let currentLocation = null; // { lat, lng, mapsUrl }

  function setGeoStatus(msg, type = '') {
    if (!geoStatus) return;
    geoStatus.textContent = msg;
    geoStatus.className = type;
  }

  function getLocation(scrollToMap = false) {
    if (!navigator.geolocation) {
      setGeoStatus('Tu navegador no soporta geolocalización.', 'error');
      return;
    }

    setGeoStatus('Obteniendo ubicación...', '');
    if (btnUbicacion) {
      btnUbicacion.disabled = true;
      btnUbicacion.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Ubicando...';
    }
    if (btnMiUbicacionMapa) {
      btnMiUbicacionMapa.disabled = true;
      btnMiUbicacionMapa.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(6);
        const lng = position.coords.longitude.toFixed(6);
        const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
        currentLocation = { lat, lng, mapsUrl };

        if (recogidaInput) {
          recogidaInput.value = `Ubicación GPS: ${lat}, ${lng}`;
          recogidaInput.dataset.maps = mapsUrl;
        }

        // Update interactive map
        updateMap(lat, lng, 16, 'Tu ubicación actual');

        setGeoStatus(`✅ Ubicación obtenida. Mapa actualizado y se incluirá el enlace en WhatsApp.`, 'success');
        if (btnUbicacion) {
          btnUbicacion.disabled = false;
          btnUbicacion.innerHTML = '<i class="fas fa-check"></i> Ubicación lista';
        }
        if (btnMiUbicacionMapa) {
          btnMiUbicacionMapa.disabled = false;
          btnMiUbicacionMapa.innerHTML = '<i class="fas fa-location-crosshairs"></i> Mi ubicación';
        }

        if (scrollToMap) {
          document.getElementById('mapa')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      },
      (error) => {
        let msg = 'No se pudo obtener la ubicación.';
        if (error.code === 1) msg = 'Permiso denegado. Escribe la dirección manualmente.';
        if (error.code === 2) msg = 'Ubicación no disponible.';
        if (error.code === 3) msg = 'Tiempo de espera agotado.';
        setGeoStatus(msg, 'error');
        if (btnUbicacion) {
          btnUbicacion.disabled = false;
          btnUbicacion.innerHTML = '<i class="fas fa-location-crosshairs"></i> Usar mi ubicación';
        }
        if (btnMiUbicacionMapa) {
          btnMiUbicacionMapa.disabled = false;
          btnMiUbicacionMapa.innerHTML = '<i class="fas fa-location-crosshairs"></i> Mi ubicación';
        }
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 }
    );
  }

  if (btnUbicacion) {
    btnUbicacion.addEventListener('click', () => getLocation(false));
  }

  if (btnMiUbicacionMapa) {
    btnMiUbicacionMapa.addEventListener('click', () => getLocation(true));
  }

  // Bottom nav geo also triggers
  const bottomGeo = document.getElementById('bottomGeo');
  if (bottomGeo) {
    bottomGeo.addEventListener('click', (e) => {
      e.preventDefault();
      const mapa = document.getElementById('mapa');
      if (mapa) {
        mapa.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => getLocation(false), 500);
      } else {
        document.getElementById('solicitar')?.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => getLocation(false), 600);
      }
    });
  }

  // ========== FORM → WHATSAPP ==========
  const form = document.getElementById('carreraForm');

  function buildCarreraMessage(data) {
    let msg = `Hola, ELHYDRIVE. 👋 Quiero solicitar una carrera.\n\n`;
    msg += `👤 *Nombre:* ${data.nombre}\n`;
    if (data.telefono) msg += `📱 *Teléfono:* ${data.telefono}\n`;
    msg += `📍 *Recogida:* ${data.recogida}\n`;
    if (data.mapsUrl) msg += `🗺️ *Mapa:* ${data.mapsUrl}\n`;
    msg += `🎯 *Destino:* ${data.destino}\n`;
    if (data.fecha) msg += `📅 *Fecha:* ${data.fecha}\n`;
    if (data.hora) msg += `🕐 *Hora:* ${data.hora}\n`;
    msg += `👥 *Pasajeros:* ${data.pasajeros}\n`;
    if (data.observaciones) msg += `📝 *Observaciones:* ${data.observaciones}\n`;
    msg += `\n¿Me puedes confirmar disponibilidad y el valor aproximado de la carrera?`;
    return msg;
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const data = {
        nombre: document.getElementById('nombre')?.value.trim() || '',
        telefono: document.getElementById('telefono')?.value.trim() || '',
        recogida: document.getElementById('recogida')?.value.trim() || '',
        destino: document.getElementById('destino')?.value.trim() || '',
        fecha: document.getElementById('fecha')?.value || '',
        hora: document.getElementById('hora')?.value || '',
        pasajeros: document.getElementById('pasajeros')?.value || '1',
        observaciones: document.getElementById('observaciones')?.value.trim() || '',
        mapsUrl: currentLocation?.mapsUrl || document.getElementById('recogida')?.dataset.maps || ''
      };

      if (!data.nombre || !data.recogida || !data.destino) {
        alert('Por favor completa Nombre, Ubicación de recogida y Destino.');
        return;
      }

      const message = buildCarreraMessage(data);
      const url = `${WHATSAPP_BASE}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }

  // ========== PWA SERVICE WORKER ==========
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./service-worker.js')
        .then(reg => console.log('SW registered:', reg.scope))
        .catch(err => console.log('SW registration failed:', err));
    });
  }

  // ========== PWA INSTALL PROMPT ==========
  let deferredPrompt = null;
  const pwaInstall = document.getElementById('pwaInstall');
  const pwaInstallBtn = document.getElementById('pwaInstallBtn');
  const pwaClose = document.getElementById('pwaClose');

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (pwaInstall && !localStorage.getItem('pwaDismissed')) {
      setTimeout(() => {
        pwaInstall.classList.remove('d-none');
      }, 4000);
    }
  });

  if (pwaInstallBtn) {
    pwaInstallBtn.addEventListener('click', async () => {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        pwaInstall?.classList.add('d-none');
      }
      deferredPrompt = null;
    });
  }

  if (pwaClose) {
    pwaClose.addEventListener('click', () => {
      pwaInstall?.classList.add('d-none');
      localStorage.setItem('pwaDismissed', '1');
    });
  }

  // ========== SET TODAY AS DEFAULT DATE ==========
  const fechaInput = document.getElementById('fecha');
  if (fechaInput) {
    const today = new Date().toISOString().split('T')[0];
    fechaInput.value = today;
    fechaInput.min = today;
  }

  console.log('%cELHYDRIVE + Google Maps listo 🚗📍', 'color: #38bdf8; font-weight: bold; font-size: 14px;');
})();

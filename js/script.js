/* =====================================================================
   Habaneros de la Lavanda Canarias — interactividad del sitio
   JS modular sin dependencias. Cada bloque tiene una responsabilidad.
   ===================================================================== */
(function () {
  "use strict";

  /* --- Año dinámico en el footer --- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* --- Menú móvil --- */
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      const open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    });
    // Cerrar al pulsar un enlace
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* --- Barra de progreso de lectura --- */
  const progress = document.getElementById("scrollProgress");
  if (progress) {
    const updateProgress = function () {
      const h = document.documentElement;
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
      progress.style.width = Math.max(0, Math.min(1, scrolled)) * 100 + "%";
    };
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
  }

  /* --- Contadores animados del hero --- */
  const counters = document.querySelectorAll("[data-count]");
  if (counters.length && "IntersectionObserver" in window) {
    const animate = function (el) {
      const target = parseInt(el.getAttribute("data-count"), 10);
      const suffix = el.getAttribute("data-suffix") || "";
      const duration = 1400;
      const start = performance.now();
      const step = function (now) {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
        el.textContent = Math.round(eased * target) + suffix;
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const cObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { animate(entry.target); cObs.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { cObs.observe(el); });
  }

  /* --- Botón "volver arriba" --- */
  const toTop = document.getElementById("toTop");
  if (toTop) {
    window.addEventListener("scroll", function () {
      toTop.classList.toggle("show", window.scrollY > 600);
    }, { passive: true });
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* --- Galería generada + lightbox --- */
  const galleryData = [
    { emoji: "🐶", bg: "linear-gradient(135deg,#e7c9a3,#c98a5b)" },
    { emoji: "🐾", bg: "linear-gradient(135deg,#f6efe6,#ddc9ad)" },
    { emoji: "🦴", bg: "linear-gradient(135deg,#a9764f,#6f4a31)" },
    { emoji: "🐕", bg: "linear-gradient(135deg,#c98a5b,#9a6b4a)" },
    { emoji: "❤️", bg: "linear-gradient(135deg,#e7c9a3,#b07d52)" },
    { emoji: "🌴", bg: "linear-gradient(135deg,#9fb19f,#6b8f71)" },
    { emoji: "🐩", bg: "linear-gradient(135deg,#f3e7d7,#cbb196)" },
    { emoji: "🎀", bg: "linear-gradient(135deg,#d39a6c,#8a5a3a)" }
  ];
  const gallery = document.getElementById("gallery");
  const lightbox = document.getElementById("lightbox");
  const lbContent = document.getElementById("lbContent");
  const lbClose = document.getElementById("lbClose");

  if (gallery) {
    galleryData.forEach(function (item) {
      const tile = document.createElement("button");
      tile.className = "tile";
      tile.type = "button";
      tile.style.background = item.bg;
      tile.textContent = item.emoji;
      tile.setAttribute("aria-label", "Ampliar imagen de la galería");
      tile.addEventListener("click", function () {
        if (!lightbox || !lbContent) return;
        lbContent.classList.remove("is-image");
        lbContent.style.background = item.bg;
        lbContent.textContent = item.emoji;
        lightbox.classList.add("open");
        lightbox.setAttribute("aria-hidden", "false");
      });
      gallery.appendChild(tile);
    });
  }

  /* --- Carrusel del alojamiento (selección editorial) --- */
  function openImg(src, alt) {
    if (!lightbox || !lbContent) return;
    lbContent.style.background = "transparent";
    lbContent.classList.add("is-image");
    lbContent.innerHTML = '<img src="' + src + '" alt="' + (alt || "") + '">';
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  }

  var lavandaPhotos = [
    { src: "assets/lavanda-16.jpg", alt: "Piscina con vistas a las montañas en La Lavanda" },
    { src: "assets/lavanda-1.jpg",  alt: "Comedor con vistas a las montañas" },
    { src: "assets/lavanda-2.jpg",  alt: "Una copa frente al paisaje, para desconectar" },
    { src: "assets/lavanda-6.jpg",  alt: "Salón con vistas al valle" },
    { src: "assets/lavanda-7.jpg",  alt: "Salón luminoso de techos altos" },
    { src: "assets/lavanda-4.jpg",  alt: "Cocina de la casa" },
    { src: "assets/lavanda-11.jpg", alt: "Dormitorio de matrimonio" },
    { src: "assets/lavanda-8.jpg",  alt: "Dormitorio con dos camas" },
    { src: "assets/lavanda-19.jpg", alt: "Baño con ducha de la casa" },
    { src: "assets/lavanda-21.jpg", alt: "Terraza para comer al aire libre con vistas" }
  ];
  var track = document.getElementById("entornoGallery");
  if (track) {
    lavandaPhotos.forEach(function (ph) {
      var b = document.createElement("button");
      b.className = "ph"; b.type = "button";
      b.setAttribute("aria-label", "Ampliar: " + ph.alt);
      var img = document.createElement("img");
      img.src = ph.src; img.alt = ph.alt; img.loading = "lazy";
      b.appendChild(img);
      b.addEventListener("click", function () { openImg(ph.src, ph.alt); });
      track.appendChild(b);
    });
    var carStep = function () {
      var first = track.querySelector(".ph");
      return (first ? first.getBoundingClientRect().width + 14 : 320) * 2;
    };
    var prev = document.getElementById("carPrev");
    var next = document.getElementById("carNext");
    if (prev) prev.addEventListener("click", function () { track.scrollBy({ left: -carStep(), behavior: "smooth" }); });
    if (next) next.addEventListener("click", function () { track.scrollBy({ left: carStep(), behavior: "smooth" }); });
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
  }
  if (lbClose) lbClose.addEventListener("click", closeLightbox);
  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeLightbox();
  });

  /* --- Formulario de contacto (validación front-end) --- */
  const form = document.getElementById("contactForm");
  const note = document.getElementById("formNote");
  if (form && note) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const nombre = form.nombre.value.trim();
      const email = form.email.value.trim();
      const mensaje = form.mensaje.value.trim();
      const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!nombre || !validEmail || !mensaje) {
        note.style.color = "#b5532f";
        note.textContent = "Por favor, completa nombre, un email válido y tu mensaje.";
        return;
      }
      note.style.color = "var(--green)";
      note.textContent = "¡Gracias, " + nombre + "! Hemos recibido tu mensaje y te responderemos pronto.";
      form.reset();
    });
  }

  /* --- Animación de aparición al hacer scroll --- */
  const revealEls = document.querySelectorAll(
    ".section-head, .card, .dog-card, .litter, .quote, .media-card, .care-strip, .guarantee, .accordion details"
  );
  revealEls.forEach(function (el) { el.classList.add("reveal"); });

  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { obs.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }
})();

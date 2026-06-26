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
        lbContent.style.background = item.bg;
        lbContent.textContent = item.emoji;
        lightbox.classList.add("open");
        lightbox.setAttribute("aria-hidden", "false");
      });
      gallery.appendChild(tile);
    });
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

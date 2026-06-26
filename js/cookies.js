/* Aviso de cookies — guarda la preferencia en localStorage.
   La web no usa cookies de seguimiento; este aviso informa y recuerda
   la elección del usuario. */
(function () {
  "use strict";
  var KEY = "hl_cookie_consent";
  var banner = document.getElementById("cookieBanner");
  if (!banner) return;

  var stored = null;
  try { stored = localStorage.getItem(KEY); } catch (e) {}
  if (stored) return; // ya eligió

  banner.hidden = false;
  // pequeño retardo para la transición de entrada
  requestAnimationFrame(function () { banner.classList.add("show"); });

  function decide(value) {
    try { localStorage.setItem(KEY, value); } catch (e) {}
    banner.classList.remove("show");
    setTimeout(function () { banner.hidden = true; }, 300);
  }

  var accept = document.getElementById("cookieAccept");
  var reject = document.getElementById("cookieReject");
  if (accept) accept.addEventListener("click", function () { decide("accepted"); });
  if (reject) reject.addEventListener("click", function () { decide("rejected"); });
})();

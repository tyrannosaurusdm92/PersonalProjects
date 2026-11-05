(function () {
  "use strict";
  const gate = document.getElementById("bookGateway");
  const library = document.getElementById("readerLibrary");
  const openButton = document.getElementById("openFloatingBook");
  const returnButton = document.getElementById("returnToBook");
  if (!gate || !library || !openButton || !returnButton) return;

  // Keep the library visible when JavaScript is unavailable.
  gate.hidden = false;
  library.hidden = true;
  returnButton.hidden = false;
  let isTransitioning = false;

  function enterLibrary() {
    if (isTransitioning) return;
    isTransitioning = true;
    openButton.setAttribute("aria-expanded", "true");
    gate.classList.add("is-opening");
    const finish = function () {
      gate.hidden = true;
      library.hidden = false;
      gate.classList.remove("is-opening");
      isTransitioning = false;
      window.scrollTo({ top: 0, behavior: "instant" });
      const storySelect = document.getElementById("storySelect");
      if (storySelect) storySelect.focus({ preventScroll: true });
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) finish();
    else window.setTimeout(finish, 380);
  }

  function returnToCover() {
    if (isTransitioning) return;
    library.hidden = true;
    gate.hidden = false;
    openButton.setAttribute("aria-expanded", "false");
    openButton.style.removeProperty("--book-x");
    openButton.style.removeProperty("--book-y");
    window.scrollTo({ top: 0, behavior: "instant" });
    openButton.focus({ preventScroll: true });
  }

  openButton.addEventListener("click", enterLibrary);
  returnButton.addEventListener("click", returnToCover);
  openButton.addEventListener("pointermove", function (event) {
    if (event.pointerType === "touch" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = openButton.getBoundingClientRect();
    const fx = (event.clientX - rect.left) / rect.width - .5;
    const fy = (event.clientY - rect.top) / rect.height - .5;
    openButton.style.setProperty("--book-x", (-fy * 8).toFixed(2) + "deg");
    openButton.style.setProperty("--book-y", (fx * 12).toFixed(2) + "deg");
  });
  openButton.addEventListener("pointerleave", function () {
    openButton.style.removeProperty("--book-x");
    openButton.style.removeProperty("--book-y");
  });
})();

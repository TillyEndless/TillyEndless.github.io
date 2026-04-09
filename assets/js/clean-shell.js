(() => {
  const drawer = document.querySelector("[data-cb-drawer]");
  if (!drawer) return;

  const hotzone = drawer.querySelector("[data-cb-drawer-hotzone]");
  const panel = drawer.querySelector("[data-cb-drawer-panel]");
  const toggle = drawer.querySelector("[data-cb-drawer-toggle]");

  if (!hotzone || !panel) return;

  let closeTimer = null;
  const OPEN_CLASS = "is-open";

  const open = () => {
    drawer.classList.add(OPEN_CLASS);
    if (closeTimer) {
      window.clearTimeout(closeTimer);
      closeTimer = null;
    }
  };

  const close = ({ immediate } = { immediate: false }) => {
    if (closeTimer) window.clearTimeout(closeTimer);
    if (immediate) {
      drawer.classList.remove(OPEN_CLASS);
      closeTimer = null;
      return;
    }

    closeTimer = window.setTimeout(() => {
      drawer.classList.remove(OPEN_CLASS);
      closeTimer = null;
    }, 180);
  };

  const openAndCancelClose = () => open();
  const scheduleClose = () => close();

  hotzone.addEventListener("mouseenter", openAndCancelClose);
  hotzone.addEventListener("mouseleave", scheduleClose);

  panel.addEventListener("mouseenter", openAndCancelClose);
  panel.addEventListener("mouseleave", scheduleClose);

  // Basic mobile/touch fallback.
  if (toggle) {
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      const isOpen = drawer.classList.contains(OPEN_CLASS);
      if (isOpen) close({ immediate: true });
      else open();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close({ immediate: true });
  });
})();


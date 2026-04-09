(() => {
  const drawer = document.querySelector("[data-cb-drawer]");
  if (!drawer) return;

  const panel = drawer.querySelector("[data-cb-drawer-panel]");
  const toggle = drawer.querySelector("[data-cb-drawer-toggle]");

  if (!panel) return;

  let closeTimer = null;
  const OPEN_CLASS = "is-open";
  let pointerInPanel = false;

  // We open the drawer when the pointer is in the "left empty gutter" region.
  // On wide screens that's the margin to the left of the centered content.
  // On narrow screens there is no gutter, so we keep a small trigger zone so
  // users don't have to hit the exact left edge.
  let triggerX = 56; // px
  let raf = null;
  let lastClientX = 0;

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

  const computeTriggerX = () => {
    // Prefer the blog index container; otherwise fall back to the post article.
    const content =
      document.querySelector(".cb-main__container") || document.querySelector(".cb-article");
    if (!content) return 56;

    const rect = content.getBoundingClientRect();
    const leftGutter = Math.max(0, rect.left);

    // If there is no gutter (content spans full width), keep a small trigger.
    // Otherwise, match the actual gutter so hovering anywhere in the blank area works.
    return leftGutter > 8 ? Math.round(leftGutter) : 56;
  };

  const updateTriggerX = () => {
    triggerX = computeTriggerX();
  };

  const onPointerMove = (e) => {
    // Only enable hover behavior for real mouse pointers.
    if (e.pointerType && e.pointerType !== "mouse") return;

    lastClientX = e.clientX;
    if (raf) return;

    raf = window.requestAnimationFrame(() => {
      raf = null;
      if (pointerInPanel) return;

      if (lastClientX <= triggerX) open();
      else scheduleClose();
    });
  };

  panel.addEventListener("pointerenter", () => {
    pointerInPanel = true;
    openAndCancelClose();
  });

  panel.addEventListener("pointerleave", () => {
    pointerInPanel = false;
    scheduleClose();
  });

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

  updateTriggerX();
  window.addEventListener("resize", updateTriggerX, { passive: true });
  document.addEventListener("pointermove", onPointerMove, { passive: true });
})();

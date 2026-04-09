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
  let lastClientY = 0;

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

  const computePanelLayout = () => {
    const content =
      document.querySelector(".cb-main__container") || document.querySelector(".cb-article");
    const header = document.querySelector(".cb-header");
    const top = header ? Math.round(header.getBoundingClientRect().bottom + 12) : 84;

    // Default positioning: inside the left gutter (no overlap with content).
    let left = 12;
    let width = 280;

    if (content) {
      const rect = content.getBoundingClientRect();
      const leftGutter = Math.max(0, rect.left);
      const maxWidthInGutter = Math.floor(leftGutter - 24);
      width = Math.min(320, maxWidthInGutter);

      // If the gutter is too small, fall back to a compact overlay width.
      if (!Number.isFinite(width) || width < 200) {
        width = Math.min(320, Math.max(220, Math.floor(window.innerWidth * 0.72)));
      }
    }

    // Keep within viewport.
    width = Math.min(width, Math.max(180, window.innerWidth - 24));

    drawer.style.setProperty("--cb-drawer-left", `${left}px`);
    drawer.style.setProperty("--cb-drawer-top", `${Math.max(12, top)}px`);
    drawer.style.setProperty("--cb-drawer-width", `${width}px`);
  };

  const updateTriggerX = () => {
    triggerX = computeTriggerX();
    computePanelLayout();
  };

  const onPointerMove = (e) => {
    // Only enable hover behavior for real mouse pointers.
    if (e.pointerType && e.pointerType !== "mouse") return;

    lastClientX = e.clientX;
    lastClientY = e.clientY;
    if (raf) return;

    raf = window.requestAnimationFrame(() => {
      raf = null;
      if (pointerInPanel) return;

      // "Blank area" heuristic: don't pop the menu when hovering interactive UI.
      const el = document.elementFromPoint(lastClientX, lastClientY);
      const overInteractive = !!(el && el.closest("a, button, input, textarea, select, label"));

      if (!overInteractive && lastClientX <= triggerX) open();
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

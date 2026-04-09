(() => {
  const bar = document.querySelector("[data-cb-category-bar]");
  if (!bar) return;

  const tabs = Array.from(bar.querySelectorAll("[data-category]"));
  const cards = Array.from(document.querySelectorAll(".cb-post-card[data-category]"));
  const emptyEl = document.querySelector("[data-cb-empty]");

  if (tabs.length === 0 || cards.length === 0) {
    if (emptyEl) emptyEl.hidden = false;
    return;
  }

  const valid = new Set(tabs.map((t) => t.dataset.category));
  const hasPosts = new Set(cards.map((c) => c.dataset.category));

  const url = new URL(window.location.href);
  const requested = url.searchParams.get("category");

  // Default to "research" to match the reference UI, but fall back to the first
  // category that actually has posts so the page never looks empty by default.
  let activeCategory =
    requested && valid.has(requested)
      ? requested
      : hasPosts.has("research")
        ? "research"
        : Array.from(hasPosts)[0];

  if (!valid.has(activeCategory)) activeCategory = Array.from(valid)[0];

  const setActive = (cat, { updateUrl } = { updateUrl: true }) => {
    let anyVisible = false;

    for (const tab of tabs) {
      const isActive = tab.dataset.category === cat;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
    }

    for (const card of cards) {
      const show = card.dataset.category === cat;
      card.hidden = !show;
      anyVisible ||= show;
    }

    if (emptyEl) emptyEl.hidden = anyVisible;

    if (updateUrl) {
      const next = new URL(window.location.href);
      next.searchParams.set("category", cat);
      window.history.replaceState({}, "", next);
    }
  };

  for (const tab of tabs) {
    tab.addEventListener("click", () => setActive(tab.dataset.category));
  }

  setActive(activeCategory, { updateUrl: !!requested });
})();


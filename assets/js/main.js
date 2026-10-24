/* Buildless, progressively enhanced. No framework or runtime dependencies. */
"use strict";
const CONTACT_EMAIL = "business@branqorinc.com";
document.documentElement.classList.remove("no-js");
document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = new Date().getFullYear();
});
document.querySelectorAll("[data-contact-email]").forEach((el) => {
  el.href = `mailto:${CONTACT_EMAIL}`;
});

// The mobile menu is a disclosure, with a working no-script navigation fallback.
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.getElementById("site-nav");
const setMenu = (open) => {
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  navigation.classList.toggle("is-open", open);
};
if (menuButton && navigation) {
  menuButton.addEventListener("click", () =>
    setMenu(menuButton.getAttribute("aria-expanded") !== "true"),
  );
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      menuButton.getAttribute("aria-expanded") === "true"
    ) {
      setMenu(false);
      menuButton.focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".site-header")) setMenu(false);
  });
  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenu(false);
  });
  window
    .matchMedia("(min-width: 701px)")
    .addEventListener("change", () => setMenu(false));
}

// Each gallery supports mouse, touch, arrows, Home and End.
document.querySelectorAll("[data-tabs]").forEach((group) => {
  const tabs = [...group.querySelectorAll('[role="tab"]')];
  const select = (active, focus = false) => {
    tabs.forEach((tab) => {
      const selected = tab === active;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
      document.getElementById(tab.getAttribute("aria-controls")).hidden =
        !selected;
    });
    if (focus) active.focus();
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => select(tab));
    tab.addEventListener("keydown", (event) => {
      let next;
      if (event.key === "ArrowRight") next = tabs[(index + 1) % tabs.length];
      if (event.key === "ArrowLeft")
        next = tabs[(index + tabs.length - 1) % tabs.length];
      if (event.key === "Home") next = tabs[0];
      if (event.key === "End") next = tabs[tabs.length - 1];
      if (next) {
        event.preventDefault();
        select(next, true);
      }
    });
  });
});

// A focused side-by-side comparison fits on a phone as well as a desktop.
const comparisons = [...document.querySelectorAll("[data-compare]")];
function selectComparison(active) {
  const selected = active.dataset.compare;
  comparisons.forEach((button) =>
    button.setAttribute("aria-pressed", String(button === active)),
  );
  document.querySelectorAll("[data-col]").forEach((cell) => {
    cell.hidden = cell.dataset.col !== selected;
  });
  document.getElementById("compare-status").textContent =
    `Comparing Convene365 with ${active.textContent.trim()}.`;
}
comparisons.forEach((button) =>
  button.addEventListener("click", () => selectComparison(button)),
);
if (comparisons.length) selectComparison(comparisons[0]);

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (_) {
      /* Use the selection fallback. */
    }
  }
  const previous = document.activeElement;
  const temporary = document.createElement("textarea");
  temporary.value = text;
  temporary.setAttribute("readonly", "");
  temporary.style.cssText = "position:fixed;top:0;left:-9999px;";
  document.body.append(temporary);
  temporary.select();
  let copied = false;
  try {
    copied = document.execCommand("copy");
  } catch (_) {
    /* Offer manual selection. */
  }
  temporary.remove();
  if (previous) previous.focus();
  return copied;
}
document.querySelectorAll("[data-copy-email]").forEach((button) => {
  button.addEventListener("click", async () => {
    const copied = await copyText(CONTACT_EMAIL);
    document.getElementById("email-copy-status").textContent = copied
      ? "Email address copied."
      : `Select and copy this address: ${CONTACT_EMAIL}`;
  });
});

/* Convene365 marketing site: shared behaviour.
   No build step and no dependencies. */

/* ------------------------------------------------------------------
   CONFIG: the address every "Contact" link and the contact form send to.
   Change this one line before you publish the site.
   ------------------------------------------------------------------ */
const CONTACT_EMAIL = 'business@branqorinc.com';

document.documentElement.classList.remove('no-js');

/* Contact address everywhere it appears */
document.querySelectorAll('[data-contact-email]').forEach((el) => {
  if (el.tagName === 'A') el.href = 'mailto:' + CONTACT_EMAIL;
  const text = el.querySelector('[data-email-text]') || (el.children.length ? null : el);
  if (text) text.textContent = CONTACT_EMAIL;
});

/* Footer year */
document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

/* Header shadow on scroll */
const header = document.querySelector('.site-header');
const onScroll = () => header && header.classList.toggle('is-scrolled', window.scrollY > 8);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* Mobile navigation */
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('is-open', !open);
  });
  nav.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
      toggle.focus();
    }
  });
}

/* Reveal on scroll */
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add('is-visible'));
}

/* Comparison: choose which alternatives to show next to Convene365 */
const chips = document.querySelectorAll('[data-compare-toggle]');
chips.forEach((chip) => {
  chip.addEventListener('click', () => {
    const col = chip.getAttribute('data-compare-toggle');
    const pressed = chip.getAttribute('aria-pressed') === 'true';
    const shown = document.querySelectorAll('[data-compare-toggle][aria-pressed="true"]').length;
    if (pressed && shown === 1) return; // keep at least one alternative visible
    chip.setAttribute('aria-pressed', String(!pressed));
    document.querySelectorAll(`[data-col="${col}"]`).forEach((cell) => { cell.hidden = pressed; });
    const status = document.getElementById('compare-status');
    if (status) {
      const names = [...document.querySelectorAll('[data-compare-toggle][aria-pressed="true"]')].map((c) => c.textContent.trim());
      status.textContent = 'Comparing Convene365 with ' + names.join(', ');
    }
  });
});

/* Contact form: opens the visitor's email app with the message filled in */
const form = document.getElementById('contact-form');
if (form) {
  const params = new URLSearchParams(window.location.search);
  const topic = params.get('topic');
  const interest = form.querySelector('#interest');
  if (topic && interest) {
    const match = [...interest.options].find((o) => o.value === topic);
    if (match) interest.value = topic;
  }

  const rules = {
    name: (v) => v.trim().length >= 2 || 'Please enter your name.',
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || 'Please enter a valid email address.',
    organisation: (v) => v.trim().length >= 2 || 'Please enter your organisation.',
    message: (v) => v.trim().length >= 10 || 'Please tell us a little about your events (at least 10 characters).',
  };

  const check = (field) => {
    const rule = rules[field.name];
    if (!rule) return true;
    const result = rule(field.value);
    const wrap = field.closest('.field');
    const err = wrap.querySelector('.error');
    const ok = result === true;
    wrap.classList.toggle('has-error', !ok);
    field.setAttribute('aria-invalid', String(!ok));
    err.textContent = ok ? '' : result;
    return ok;
  };

  form.querySelectorAll('input, textarea').forEach((f) => f.addEventListener('blur', () => check(f)));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fields = [...form.querySelectorAll('input[name], textarea[name]')];
    const results = fields.map(check);
    if (results.includes(false)) {
      const first = form.querySelector('[aria-invalid="true"]');
      if (first) first.focus();
      return;
    }
    const d = Object.fromEntries(new FormData(form).entries());
    const interestLabel = interest ? interest.options[interest.selectedIndex].text : '';
    const subject = `Convene365: ${interestLabel} - ${d.organisation}`;
    const body = [
      `Name: ${d.name}`,
      `Email: ${d.email}`,
      `Organisation: ${d.organisation}`,
      d.role ? `Role: ${d.role}` : '',
      `Interested in: ${interestLabel}`,
      d.events ? `Events per year: ${d.events}` : '',
      d.microsoft ? `Microsoft setup: ${d.microsoft}` : '',
      '',
      d.message,
    ].filter((line, i, arr) => line !== '' || arr[i - 1] !== '').join('\n');

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const status = document.getElementById('form-status');
    if (status) {
      status.hidden = false;
      status.textContent = `Your email app should now open with the message ready to send to ${CONTACT_EMAIL}. If nothing happened, email us directly at that address.`;
    }
  });
}

/* Copy email address */
document.querySelectorAll('[data-copy-email]').forEach((btn) => {
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      const old = btn.textContent;
      btn.textContent = 'Copied';
      setTimeout(() => { btn.textContent = old; }, 1800);
    } catch (err) {
      window.location.href = 'mailto:' + CONTACT_EMAIL;
    }
  });
});

/* On small screens start the comparison with one alternative, so the table fits; visitors can add the others. */
if (chips.length && window.matchMedia('(max-width: 700px)').matches) {
  chips.forEach((chip) => {
    if (chip.getAttribute('data-compare-toggle') !== 'cij') chip.click();
  });
}

/* Tabs: Power BI report pages on features.html (arrow keys, Home and End move between tabs) */
document.querySelectorAll('[role="tablist"]').forEach((list) => {
  const tabs = [...list.querySelectorAll('[role="tab"]')];
  const select = (tab, focus) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      const panel = document.getElementById(t.getAttribute('aria-controls'));
      if (panel) panel.hidden = !on;
    });
    if (focus) tab.focus();
  };
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(tab, false));
    tab.addEventListener('keydown', (e) => {
      let next = null;
      if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
      if (e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
      if (e.key === 'Home') next = tabs[0];
      if (e.key === 'End') next = tabs[tabs.length - 1];
      if (next) { e.preventDefault(); select(next, true); }
    });
  });
});

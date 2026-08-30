(() => {
  const root = document.documentElement;
  const themeKey = 'shrink-theme';
  const saved = localStorage.getItem(themeKey);
  if (saved === 'dark' || saved === 'light') root.dataset.theme = saved;

  const theme = document.querySelector('[data-theme-toggle]');
  if (theme) {
    theme.addEventListener('click', () => {
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      localStorage.setItem(themeKey, next);
    });
  }

  document.querySelectorAll('[data-target-option]').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-target-option]').forEach(item => item.removeAttribute('aria-current'));
      button.setAttribute('aria-current', 'true');
      const value = button.getAttribute('data-target-option');
      document.querySelectorAll('[data-target-value]').forEach(el => { el.textContent = value; });
      document.querySelectorAll('[data-target-note]').forEach(el => {
        const type = el.getAttribute('data-target-note');
        el.textContent = type === 'pdf'
          ? `A ${value} target is useful when a portal, application, or email system has a hard PDF limit.`
          : `A ${value} target is useful when a form, profile, application, or website sets a hard image limit.`;
      });
    });
  });

  const copy = document.querySelector('[data-copy-link]');
  if (copy) {
    copy.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(window.location.href);
        copy.textContent = 'Link copied';
        setTimeout(() => { copy.textContent = 'Copy page link'; }, 1400);
      } catch (_) {
        copy.textContent = 'Copy unavailable';
        setTimeout(() => { copy.textContent = 'Copy page link'; }, 1400);
      }
    });
  }

  const year = new Date().getFullYear();
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = year; });
})();

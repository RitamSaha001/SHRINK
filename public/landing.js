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

  const applyTarget = (button, scope = document) => {
    scope.querySelectorAll('[data-target-option]').forEach(item => item.removeAttribute('aria-current'));
    button.setAttribute('aria-current', 'true');
    const value = button.getAttribute('data-target-option') || '';
    const m = value.match(/(\d+)(KB|MB)/i);
    scope.querySelectorAll('[data-target-value]').forEach(el => { el.textContent = m ? m[1] : value; });
    scope.querySelectorAll('[data-target-unit]').forEach(el => { el.textContent = m ? m[2].toUpperCase() : ''; });
    scope.querySelectorAll('[data-target-note]').forEach(el => {
      const type = el.getAttribute('data-target-note');
      el.textContent = type === 'pdf'
        ? `A ${value} target is useful when a portal, application, or email system has a hard PDF limit.`
        : `A ${value} target is useful when a form, profile, application, or website sets a hard image limit.`;
    });
    const meter = scope.querySelector('[data-size-meter]');
    if (meter) {
      const num = m ? Number(m[1]) : 100;
      const unit = m ? m[2].toUpperCase() : 'KB';
      const normalized = unit === 'MB' ? num * 1024 : num;
      meter.style.setProperty('--budget', `${Math.max(16, Math.min(92, Math.round(100 - Math.log10(Math.max(normalized, 10)) * 22 + 55)))}%`);
      meter.setAttribute('aria-label', `Selected target ${value}`);
    }
  };

  document.querySelectorAll('[data-target-option]').forEach(button => {
    button.addEventListener('click', () => applyTarget(button, button.closest('.visual, .target-panel, body') || document));
  });

  const hero = document.querySelector('.hero');
  if (hero && !document.querySelector('[data-auto-visual]')) {
    const path = location.pathname.toLowerCase();
    const isPdf = path.includes('pdf') || path.includes('reduce-');
    const exact = path.match(/(\d+)(kb|mb)/i);
    const initial = exact ? `${exact[1]}${exact[2].toUpperCase()}` : (isPdf ? '200KB' : '100KB');
    const options = isPdf ? ['100KB','200KB','500KB'] : ['50KB','100KB','200KB'];
    const visual = document.createElement('section');
    visual.className = 'visual';
    visual.setAttribute('data-auto-visual','true');
    visual.setAttribute('aria-label', isPdf ? 'PDF target-size illustration' : 'Image target-size illustration');
    const m0 = initial.match(/(\d+)(KB|MB)/i);
    const initialNum = m0 ? m0[1] : '100';
    const initialUnit = m0 ? m0[2].toUpperCase() : 'KB';
    visual.innerHTML = `
      <div class="visual-top"><span>${isPdf ? 'PDF' : 'Image'} target workspace</span><span>${isPdf ? 'DOCUMENT' : 'IMAGE'} → target</span></div>
      <div class="visual-body">
        <div class="file-illus" aria-hidden="true"><div class="file-sheet"><div class="file-lines"><span></span><span></span><span></span></div></div><span class="file-badge">${isPdf ? 'PDF · source' : 'IMAGE · source'}</span></div>
        <div class="target-panel"><div class="target-kicker">A target you can understand</div><div class="target-size"><span data-target-value>${initialNum}</span> <small data-target-unit>${initialUnit}</small></div><p class="target-copy" data-target-note="${isPdf ? 'pdf' : 'image'}">${isPdf ? `A ${initial} target is useful when a portal, application, or email system has a hard PDF limit.` : `A ${initial} target is useful when a form, profile, application, or website sets a hard image limit.`}</p><div class="target-meter" data-size-meter style="--budget:52%" role="img" aria-label="Selected target ${initial}"><span></span></div><div class="target-options">${options.map(v => `<button type="button" class="target-option" data-target-option="${v}"${v===initial?' aria-current="true"':''}>${v}</button>`).join('')}</div></div>
      </div>`;
    hero.insertAdjacentElement('afterend', visual);
    visual.querySelectorAll('[data-target-option]').forEach(button => {
      button.addEventListener('click', () => applyTarget(button, visual));
    });
  }

  const copy = document.querySelector('[data-copy-link]');
  if (copy) {
    copy.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(window.location.href); copy.textContent = 'Link copied'; setTimeout(() => { copy.textContent = 'Copy page link'; }, 1400); }
      catch (_) { copy.textContent = 'Copy unavailable'; setTimeout(() => { copy.textContent = 'Copy page link'; }, 1400); }
    });
  }
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
})();

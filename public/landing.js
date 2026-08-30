(() => {
  const root = document.documentElement;
  const themeKey = 'shrink-theme';
  const saved = localStorage.getItem(themeKey);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (saved === 'dark' || saved === 'light') root.dataset.theme = saved;

  const injected = document.createElement('style');
  injected.textContent = `
    .nav-actions{display:flex;align-items:center;justify-content:flex-end;gap:10px}
    .nav-link{
      display:inline-flex !important;align-items:center !important;justify-content:center !important;
      height:44px !important;min-width:138px;padding:0 16px !important;
      line-height:1 !important;text-align:center !important;vertical-align:middle;
      white-space:nowrap;border-radius:13px !important;box-sizing:border-box;
      transform:none;transition:transform .16s ease,border-color .16s ease,background-color .16s ease,box-shadow .16s ease;
    }
    .nav-link:hover{transform:translateY(-1px);box-shadow:0 8px 22px rgba(27,27,24,.07)}
    .nav-link:active{transform:translateY(0) scale(.985)}
    .hero{padding-top:68px !important;padding-bottom:28px !important}
    .visual{margin-top:0 !important;position:relative;overflow:hidden;will-change:transform}
    .visual::before{
      content:"";position:absolute;inset:-45% -20%;pointer-events:none;opacity:.5;
      background:linear-gradient(105deg,transparent 42%,rgba(255,255,255,.34) 50%,transparent 58%);
      transform:translateX(-72%);transition:transform 1.2s cubic-bezier(.16,1,.3,1);
    }
    .visual:hover::before{transform:translateX(72%)}
    .visual-body{position:relative}
    .visual-body::before{content:"→";position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);z-index:4;color:var(--accent);font-size:26px;font-weight:500;opacity:.85;pointer-events:none}
    .file-illus{transition:transform .45s cubic-bezier(.16,1,.3,1),border-color .25s ease}
    .visual:hover .file-illus{transform:translateY(-2px)}
    .file-sheet{transition:transform .45s cubic-bezier(.16,1,.3,1)}
    .visual:hover .file-sheet{transform:translateY(-5px) rotate(-1deg)}
    .target-panel{transition:transform .28s cubic-bezier(.16,1,.3,1),box-shadow .28s ease,border-color .2s ease}
    .target-panel:hover{transform:translateY(-3px);box-shadow:0 20px 42px rgba(27,27,24,.09)}
    .target-size{font-variant-numeric:tabular-nums;transition:transform .24s ease}
    .target-option{min-width:58px;min-height:36px;display:inline-flex;align-items:center;justify-content:center;line-height:1 !important}
    .target-option:active{transform:scale(.96)}
    .target-option[aria-current=true]{box-shadow:0 0 0 3px color-mix(in srgb,var(--accent) 10%,transparent)}
    .target-meter span{transition:width .45s cubic-bezier(.16,1,.3,1)}
    .reveal{opacity:0;transform:translateY(18px);transition:opacity .65s ease,transform .65s cubic-bezier(.16,1,.3,1)}
    .reveal.is-visible{opacity:1;transform:none}
    .reveal-stagger > *{opacity:0;transform:translateY(12px);transition:opacity .55s ease,transform .55s cubic-bezier(.16,1,.3,1)}
    .reveal-stagger.is-visible > *{opacity:1;transform:none}
    .reveal-stagger.is-visible > *:nth-child(2){transition-delay:.05s}.reveal-stagger.is-visible > *:nth-child(3){transition-delay:.1s}
    .section{scroll-margin-top:88px}
    @media(max-width:800px){
      .nav-link{min-width:116px;height:42px}.visual-body::before{display:none}.hero{padding-top:48px !important}
    }
    @media(prefers-reduced-motion:reduce){
      .nav-link,.visual,.visual::before,.file-illus,.file-sheet,.target-panel,.target-size,.target-option,.target-meter span,.reveal,.reveal-stagger > *{transition:none !important;animation:none !important}
    }
  `;
  document.head.appendChild(injected);

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
    scope.querySelectorAll('[data-target-value]').forEach(el => { el.textContent = m ? m[1] : value; el.classList.add('data-animate'); setTimeout(() => el.classList.remove('data-animate'), 280); });
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
    if (!reduceMotion) {
      visual.addEventListener('pointermove', event => {
        const rect = visual.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5;
        const y = (event.clientY - rect.top) / rect.height - .5;
        visual.style.transform = `perspective(1100px) rotateX(${(-y * 1.5).toFixed(2)}deg) rotateY(${(x * 1.8).toFixed(2)}deg) translateY(-1px)`;
        visual.style.setProperty('--mx', `${((x + .5) * 100).toFixed(1)}%`);
        visual.style.setProperty('--my', `${((y + .5) * 100).toFixed(1)}%`);
      });
      visual.addEventListener('pointerleave', () => { visual.style.transform = ''; });
    }
  }

  document.querySelectorAll('.section,.final,.related,.visual').forEach(el => {
    el.classList.add('reveal');
  });
  if ('IntersectionObserver' in window && !reduceMotion) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } });
    }, { threshold: .12, rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
  }

  const copy = document.querySelector('[data-copy-link]');
  if (copy) {
    copy.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(window.location.href); copy.textContent = 'Link copied'; setTimeout(() => { copy.textContent = 'Copy page link'; }, 1400); }
      catch (_) { copy.textContent = 'Copy unavailable'; setTimeout(() => { copy.textContent = 'Copy page link'; }, 1400); }
    });
  }

  const crumbData = [];
  const canonical = document.querySelector('link[rel="canonical"]')?.href || location.href;
  crumbData.push({ '@type': 'ListItem', position: 1, name: 'Shrink', item: 'https://shrink.saharitam171.workers.dev/' });
  const path = location.pathname.split('/').filter(Boolean);
  if (path.length) {
    const name = document.querySelector('h1')?.textContent?.replace(/\s+/g,' ').trim() || document.title;
    crumbData.push({ '@type': 'ListItem', position: 2, name, item: canonical });
  }
  const breadcrumb = { '@context':'https://schema.org', '@type':'BreadcrumbList', itemListElement:crumbData };
  const script = document.createElement('script'); script.type='application/ld+json'; script.textContent=JSON.stringify(breadcrumb); document.head.appendChild(script);

  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
})();

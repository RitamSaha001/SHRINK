(() => {
  const root = document.documentElement;
  const themeKey = 'shrink-theme';
  const saved = localStorage.getItem(themeKey);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (saved === 'dark' || saved === 'light') root.dataset.theme = saved;

  const injected = document.createElement('style');
  injected.textContent = `
    .nav-actions{display:flex;align-items:center;justify-content:flex-end;gap:8px}
    .nav-link{display:inline-flex !important;align-items:center !important;justify-content:center !important;height:36px !important;min-width:0;padding:0 12px !important;line-height:1 !important;text-align:center !important;vertical-align:middle;white-space:nowrap;border-radius:11px !important;box-sizing:border-box;transform:none;transition:transform .16s ease,border-color .16s ease,background-color .16s ease,box-shadow .16s ease}
    .nav-link.primary-link{min-width:118px;height:38px;border-color:color-mix(in srgb,var(--accent) 22%,var(--line));color:var(--accent)}
    .nav-link:hover{transform:translateY(-1px);box-shadow:0 8px 22px rgba(27,27,24,.07)}
    .nav-link:active{transform:translateY(0) scale(.985)}
    .nav-link:focus-visible,.theme:focus-visible,.btn:focus-visible,.target-option:focus-visible,.related a:focus-visible,.faq summary:focus-visible,.intent-link:focus-visible{outline:3px solid color-mix(in srgb,var(--accent) 32%,transparent);outline-offset:3px}
    .hero{padding-top:68px !important;padding-bottom:28px !important}
    .visual{margin-top:0 !important;position:relative;overflow:hidden;will-change:transform}
    .visual::before{content:"";position:absolute;inset:-45% -20%;pointer-events:none;opacity:.5;background:linear-gradient(105deg,transparent 42%,rgba(255,255,255,.34) 50%,transparent 58%);transform:translateX(-72%);transition:transform 1.2s cubic-bezier(.16,1,.3,1)}
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
    .reveal[data-stagger='1']{transition-delay:.04s}.reveal[data-stagger='2']{transition-delay:.08s}.reveal[data-stagger='3']{transition-delay:.12s}.reveal[data-stagger='4']{transition-delay:.16s}
    .decision-card{margin-top:18px;border:1px solid var(--line);border-radius:20px;background:var(--surface-2);padding:20px 22px;display:grid;grid-template-columns:auto 1fr;gap:14px;align-items:start}
    .decision-icon{width:34px;height:34px;border-radius:11px;display:grid;place-items:center;background:var(--accent-soft);color:var(--accent);font-weight:800}
    .decision-card h2{font-size:15px;letter-spacing:-.02em;margin:1px 0 6px}.decision-card p{margin:0;color:var(--soft);font-size:13px;line-height:1.65}.decision-card strong{color:var(--ink)}
    .ai-cue{margin-top:10px;display:inline-flex;align-items:center;gap:7px;font-size:11px;color:var(--muted);padding:7px 10px;border:1px solid var(--line);border-radius:999px;background:color-mix(in srgb,var(--surface) 74%,transparent)}
    .ai-cue::before{content:"✦";color:var(--accent);font-size:11px}.ai-cue strong{font-weight:750;color:var(--soft)}
    .intent-strip{margin:20px 0 6px;display:grid;grid-template-columns:1.2fr .8fr;gap:12px;padding:18px;border:1px solid var(--line);border-radius:22px;background:linear-gradient(135deg,color-mix(in srgb,var(--surface) 94%,transparent),var(--surface-2));box-shadow:var(--shadow-soft)}
    .intent-main{min-width:0}.intent-kicker{font-size:10px;text-transform:uppercase;letter-spacing:.12em;color:var(--muted);font-weight:800}.intent-strip h2{font-size:18px;letter-spacing:-.035em;margin:6px 0 5px}.intent-strip p{margin:0;color:var(--soft);font-size:12.5px;line-height:1.6}.intent-meta{display:flex;gap:7px;flex-wrap:wrap;margin-top:12px}.intent-chip{display:inline-flex;align-items:center;gap:6px;padding:6px 9px;border:1px solid var(--line);background:var(--surface);border-radius:999px;color:var(--muted);font-size:10.5px;font-weight:700}.intent-chip b{color:var(--ink)}.intent-action{display:flex;align-items:center;justify-content:flex-end}.intent-link{display:inline-flex;align-items:center;justify-content:center;min-height:40px;padding:0 14px;border-radius:12px;background:var(--ink);color:var(--bg);text-decoration:none;font-size:12px;font-weight:800;transition:transform .16s ease,opacity .16s ease}.intent-link:hover{transform:translateY(-1px);opacity:.92}
    .guidance-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:8px}.guidance-card{border:1px solid var(--line);border-radius:18px;background:var(--surface);padding:16px}.guidance-card .label{font-size:10px;text-transform:uppercase;letter-spacing:.09em;color:var(--muted);font-weight:800}.guidance-card strong{display:block;font-size:13px;letter-spacing:-.02em;margin:5px 0 4px}.guidance-card p{margin:0;color:var(--soft);font-size:12px;line-height:1.55}.guidance-card:hover{transform:translateY(-2px);box-shadow:var(--shadow-soft);border-color:color-mix(in srgb,var(--accent) 18%,var(--line))}
    .trust-note{margin-top:14px;padding:12px 14px;border:1px solid var(--line);border-radius:14px;background:color-mix(in srgb,var(--surface-2) 72%,transparent);font-size:11px;line-height:1.55;color:var(--muted)}.trust-note b{color:var(--soft)}
    .read-progress{position:fixed;left:0;top:0;height:2px;width:0;background:var(--accent);z-index:80;pointer-events:none;transition:width .08s linear}
    .section{scroll-margin-top:88px}
    @media(max-width:800px){.nav-link.primary-link{min-width:108px;height:40px}.visual-body::before{display:none}.hero{padding-top:48px !important}.decision-card{grid-template-columns:1fr;padding:18px}.decision-icon{display:none}.ai-cue{margin-top:8px}.intent-strip{grid-template-columns:1fr;padding:16px}.intent-action{justify-content:flex-start;margin-top:2px}.guidance-grid{grid-template-columns:1fr}.intent-link{width:100%}}
    @media(prefers-reduced-motion:reduce){.nav-link,.visual,.visual::before,.file-illus,.file-sheet,.target-panel,.target-size,.target-option,.target-meter span,.reveal,.guidance-card,.intent-link{transition:none !important}.read-progress{transition:none}}
  `;
  document.head.appendChild(injected);

  const progress = document.createElement('div');
  progress.className = 'read-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.appendChild(progress);

  const navActions = document.querySelector('.nav-actions');
  if (navActions) {
    const path = location.pathname.toLowerCase();
    const isPdf = path.includes('pdf') || path.includes('reduce-pdf');
    const isImage = path.includes('image') || path.includes('jpg') || path.includes('png') || path.includes('webp') || path.includes('gif') || path.includes('bmp') || path.includes('svg');
    const existing = navActions.querySelector('.primary-link');
    if (!existing) {
      const link = document.createElement('a');
      link.className = 'nav-link primary-link';
      link.href = isPdf ? 'https://shrink.saharitam171.workers.dev/compress-pdf/' : isImage ? 'https://shrink.saharitam171.workers.dev/compress-image/' : 'https://shrink.saharitam171.workers.dev/';
      link.textContent = isPdf ? 'PDF tools' : isImage ? 'Image tools' : 'Compressor';
      const themeEl = navActions.querySelector('[data-theme-toggle], #theme');
      navActions.insertBefore(link, themeEl || null);
    }
  }

  const theme = document.querySelector('[data-theme-toggle], #theme');
  if (theme) {
    theme.addEventListener('click', () => {
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      localStorage.setItem(themeKey, next);
    });
  }

  const pagePath = location.pathname.toLowerCase();
  const exact = pagePath.match(/(\d+)(kb|mb)/i);
  const isPdfPage = pagePath.includes('pdf') || pagePath.includes('reduce-pdf');
  const isImagePage = !isPdfPage && (pagePath.includes('image') || pagePath.includes('jpg') || pagePath.includes('png') || pagePath.includes('webp') || pagePath.includes('gif') || pagePath.includes('bmp') || pagePath.includes('svg'));
  const targetValue = exact ? `${exact[1]}${exact[2].toUpperCase()}` : '';
  const pageType = isPdfPage ? 'PDF' : isImagePage ? 'image' : 'file';
  const format = pagePath.includes('jpg') ? 'JPG' : pagePath.includes('png') ? 'PNG' : pagePath.includes('webp') ? 'WEBP' : pagePath.includes('gif') ? 'GIF' : pagePath.includes('bmp') ? 'BMP' : pagePath.includes('svg') ? 'SVG' : isPdfPage ? 'PDF' : 'PDF or image';

  const decisionText = targetValue
    ? (isPdfPage
      ? `A ${targetValue} limit is a destination constraint, not a promise about what every PDF can reach. Start with the original document, try the target, then check readability before submitting.`
      : `A ${targetValue} limit is a destination constraint, not a guarantee that every image can reach it. Start with the original, set the target, then check dimensions and visual quality before uploading.`)
    : '';

  if (decisionText && document.querySelector('.hero') && !document.querySelector('[data-decision-card]')) {
    const card = document.createElement('section');
    card.className = 'decision-card reveal';
    card.setAttribute('data-decision-card', 'true');
    card.innerHTML = `<div class="decision-icon" aria-hidden="true">✓</div><div><h2>Before you start</h2><p>${decisionText.replace('destination constraint','<strong>destination constraint</strong>')}</p></div>`;
    document.querySelector('.hero').insertAdjacentElement('afterend', card);
  }

  const hero = document.querySelector('.hero');
  if (hero && !document.querySelector('[data-intent-strip]') && (targetValue || isPdfPage || isImagePage)) {
    const strip = document.createElement('section');
    strip.className = 'intent-strip reveal';
    strip.setAttribute('data-intent-strip', 'true');
    const targetLabel = targetValue || 'Exact target';
    const destination = pagePath.includes('passport') ? 'Passport photo upload' : pagePath.includes('signature') ? 'Signature upload' : pagePath.includes('resume') ? 'Resume / CV' : pagePath.includes('email') ? 'Email attachment' : pagePath.includes('online-application') || pagePath.includes('application') ? 'Online application' : pagePath.includes('phone-photo') ? 'Phone photo' : pagePath.includes('scanned') ? 'Scanned document' : pagePath.includes('exact-size') ? 'Exact size requirement' : 'Your upload requirement';
    const detail = targetValue
      ? `Set the destination limit first, then judge the finished ${pageType.toLowerCase()} by both size and usefulness.`
      : `Use the original file, choose a realistic destination, and inspect the result before you submit or share it.`;
    strip.innerHTML = `<div class="intent-main"><div class="intent-kicker">Built for this task</div><h2>${destination}</h2><p>${detail}</p><div class="intent-meta"><span class="intent-chip"><b>${format}</b> workflow</span><span class="intent-chip"><b>${targetLabel}</b>${targetValue ? ' target' : ''}</span><span class="intent-chip"><b>Local</b> normal compression</span></div></div><div class="intent-action"><a class="intent-link" href="${isPdfPage ? 'https://shrink.saharitam171.workers.dev/compress-pdf/' : isImagePage ? 'https://shrink.saharitam171.workers.dev/compress-image/' : 'https://shrink.saharitam171.workers.dev/'}">Open ${isPdfPage ? 'PDF' : isImagePage ? 'image' : 'file'} compressor →</a></div>`;
    hero.insertAdjacentElement('afterend', strip);
  }

  const guidanceAnchor = document.querySelector('.section') || document.querySelector('.visual');
  if (guidanceAnchor && !document.querySelector('[data-guidance-grid]') && (targetValue || isPdfPage || isImagePage)) {
    const grid = document.createElement('div');
    grid.className = 'guidance-grid reveal';
    grid.setAttribute('data-guidance-grid', 'true');
    const first = targetValue ? `Aim for ${targetValue}, then leave a little headroom when the destination has a hard maximum.` : `Start with the highest-quality original so you are not trying to recover detail later.`;
    const second = isPdfPage ? 'Prioritize readable small text, signatures, charts, and scanned pages after compression.' : isImagePage ? 'Check dimensions, text clarity, transparency, and visual quality as well as the final byte count.' : 'Check the finished file before you submit, attach, or publish it.';
    const third = 'Normal compression stays in the browser; optional AI-assisted tools are a separate workflow when enabled.';
    grid.innerHTML = `<article class="guidance-card"><span class="label">01 · Start</span><strong>${first}</strong><p>Match the workflow to the actual destination requirement rather than choosing an arbitrary quality preset.</p></article><article class="guidance-card"><span class="label">02 · Check</span><strong>${second}</strong><p>A smaller file is only useful when the result still works for its intended purpose.</p></article><article class="guidance-card"><span class="label">03 · Privacy</span><strong>Keep the normal workflow local</strong><p>${third}</p></article>`;
    guidanceAnchor.parentNode.insertBefore(grid, guidanceAnchor);
  }

  const micro = document.querySelector('.micro');
  if (micro && !document.querySelector('[data-ai-cue]') && (isPdfPage || isImagePage)) {
    const cue = document.createElement('span');
    cue.className = 'ai-cue';
    cue.setAttribute('data-ai-cue', 'true');
    cue.innerHTML = '<strong>Optional AI-assisted tools</strong> are available in Shrink for supported workflows.';
    micro.appendChild(cue);
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
      el.textContent = type === 'pdf' ? `A ${value} target is useful when a portal, application, or email system has a hard PDF limit.` : `A ${value} target is useful when a form, profile, application, or website sets a hard image limit.`;
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

  if (hero && !document.querySelector('[data-auto-visual]')) {
    const isPdf = pagePath.includes('pdf') || pagePath.includes('reduce-');
    const initial = targetValue || (isPdf ? '200KB' : '100KB');
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
      <div class="visual-body"><div class="file-illus" aria-hidden="true"><div class="file-sheet"><div class="file-lines"><span></span><span></span><span></span></div></div><span class="file-badge">${isPdf ? 'PDF · source' : 'IMAGE · source'}</span></div><div class="target-panel"><div class="target-kicker">A target you can understand</div><div class="target-size"><span data-target-value>${initialNum}</span> <small data-target-unit>${initialUnit}</small></div><p class="target-copy" data-target-note="${isPdf ? 'pdf' : 'image'}">${isPdf ? `A ${initial} target is useful when a portal, application, or email system has a hard PDF limit.` : `A ${initial} target is useful when a form, profile, application, or website sets a hard image limit.`}</p><div class="target-meter" data-size-meter style="--budget:52%" role="img" aria-label="Selected target ${initial}"><span></span></div><div class="target-options">${options.map(v => `<button type="button" class="target-option" data-target-option="${v}"${v===initial?' aria-current="true"':''}>${v}</button>`).join('')}</div></div></div>`;
    hero.insertAdjacentElement('afterend', visual);
    visual.querySelectorAll('[data-target-option]').forEach(button => button.addEventListener('click', () => applyTarget(button, visual)));
    if (!reduceMotion) {
      visual.addEventListener('pointermove', event => { const rect = visual.getBoundingClientRect(); const x = (event.clientX - rect.left) / rect.width - .5; const y = (event.clientY - rect.top) / rect.height - .5; visual.style.transform = `perspective(1100px) rotateX(${(-y * 1.5).toFixed(2)}deg) rotateY(${(x * 1.8).toFixed(2)}deg) translateY(-1px)`; });
      visual.addEventListener('pointerleave', () => { visual.style.transform = ''; });
    }
  }

  const privacy = document.querySelector('footer');
  if (privacy && !document.querySelector('[data-trust-note]')) {
    const note = document.createElement('div');
    note.className = 'trust-note';
    note.setAttribute('data-trust-note', 'true');
    note.innerHTML = '<b>Privacy note:</b> normal file compression runs in your browser. Optional AI tools are separate and may send selected content to the provider you choose.';
    privacy.parentNode.insertBefore(note, privacy);
  }

  const revealEls = document.querySelectorAll('.section,.final,.related,.visual,.decision-card,.intent-strip,.guidance-grid');
  revealEls.forEach((el, index) => { el.classList.add('reveal'); const n = Math.min(4, (index % 4) + 1); el.setAttribute('data-stagger', String(n)); });
  if ('IntersectionObserver' in window && !reduceMotion) {
    const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }); }, { threshold: .12, rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  } else document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));

  const updateProgress = () => {
    const doc = document.documentElement;
    const max = Math.max(1, doc.scrollHeight - window.innerHeight);
    progress.style.width = `${Math.min(100, Math.max(0, (window.scrollY / max) * 100))}%`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  const copy = document.querySelector('[data-copy-link]');
  if (copy) copy.addEventListener('click', async () => { try { await navigator.clipboard.writeText(window.location.href); copy.textContent = 'Link copied'; setTimeout(() => copy.textContent = 'Copy page link', 1400); } catch (_) { copy.textContent = 'Copy unavailable'; setTimeout(() => copy.textContent = 'Copy page link', 1400); } });

  const canonical = document.querySelector('link[rel="canonical"]')?.href || location.href;
  const crumbData = [{ '@type':'ListItem', position:1, name:'Shrink', item:'https://shrink.saharitam171.workers.dev/' }];
  if (isPdfPage && !/^\/compress-pdf\/$/.test(location.pathname)) crumbData.push({ '@type':'ListItem', position:2, name:'PDF tools', item:'https://shrink.saharitam171.workers.dev/compress-pdf/' });
  if (isImagePage && !/^\/compress-image\/$/.test(location.pathname)) crumbData.push({ '@type':'ListItem', position:2, name:'Image tools', item:'https://shrink.saharitam171.workers.dev/compress-image/' });
  const name = document.querySelector('h1')?.textContent?.replace(/\s+/g,' ').trim() || document.title;
  crumbData.push({ '@type':'ListItem', position:crumbData.length+1, name, item:canonical });
  const script = document.createElement('script'); script.type='application/ld+json'; script.textContent=JSON.stringify({ '@context':'https://schema.org', '@type':'BreadcrumbList', itemListElement:crumbData }); document.head.appendChild(script);

  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
})();

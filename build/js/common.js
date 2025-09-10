// Wspólna nawigacja (dropdown spod headera) + szkło
window.initHeader = function () {
  const header  = document.getElementById('siteHeader');
  const burger  = document.getElementById('burger');
  const panel   = document.getElementById('mobilePanel');
  const shade   = document.getElementById('mobileShade');

  // animacja burgera → X (CSS bazuje na aria-expanded)
  const open = () => {
    panel.classList.add('open');
    shade.classList.add('open');
    document.body.classList.add('overflow-hidden');
    burger?.setAttribute('aria-expanded', 'true');
  };
  const close = () => {
    panel.classList.remove('open');
    shade.classList.remove('open');
    document.body.classList.remove('overflow-hidden');
    burger?.setAttribute('aria-expanded', 'false');
  };
  const toggle = () => (panel.classList.contains('open') ? close() : open());

  burger?.addEventListener('click', toggle);
  shade?.addEventListener('click', close);
  panel?.querySelectorAll('[data-close]')?.forEach(a => a.addEventListener('click', close));
  window.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  // szkło / przeźroczystość na scroll
  const onScroll = () => {
    const y = window.scrollY || 0;
    const p = Math.min(1, Math.max(0, y / 200));
    header?.style.setProperty('--nav-alpha', p.toFixed(3));
    header?.classList.toggle('shadow-lg', p > 0.05);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ustaw zmienną wysokości headera (dla dropdownu)
  const setHdrH = () => {
    const h = header?.offsetHeight || 64;
    document.documentElement.style.setProperty('--hdrh', h + 'px');
  };
  window.addEventListener('resize', setHdrH);
  setHdrH();
};

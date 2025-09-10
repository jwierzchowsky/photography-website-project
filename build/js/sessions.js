// Drobny parallax tła + podświetlenie aktywnego linku
(() => {
  const bg = document.querySelector('.page-bg');

  const onScroll = () => {
    if (!bg) return;
    const y = window.scrollY || 0;
    bg.style.transform = `translateY(${y * -0.08}px) scale(1.06)`;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

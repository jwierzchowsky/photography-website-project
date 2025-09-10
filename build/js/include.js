// js/include.js
(() => {
  const holders = document.querySelectorAll('[data-include]');

  function waitFor(fn, timeout = 2000, step = 25) {
    return new Promise((resolve, reject) => {
      const end = Date.now() + timeout;
      (function tick() {
        if (fn()) return resolve();
        if (Date.now() > end) return reject(new Error('waitFor timeout'));
        setTimeout(tick, step);
      })();
    });
  }

  holders.forEach(async (node) => {
    const src = node.getAttribute('data-include');
    try {
      const res = await fetch(src, { cache: 'no-cache' });
      const html = await res.text();
      node.outerHTML = html;

      // Header – zawsze spróbuj uruchomić initHeader, nawet jeśli common.js jeszcze się ładuje
      if (src.includes('header')) {
        waitFor(() => typeof window.initHeader === 'function')
          .then(() => window.initHeader())
          .catch(() => { /* cicho – nie blokujemy niczego */ });
      }

      // Footer – ustaw rok
      if (src.includes('footer')) {
        const y = document.getElementById('year');
        if (y) y.textContent = new Date().getFullYear();
      }
    } catch (err) {
      console.warn('Include failed:', src, err);
    }
  });
})();

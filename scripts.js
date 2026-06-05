// ============================================
// MATH 31CH Review — Global Scripts
// 1. TOC scroll-spy: 根据 viewport 中的 section 高亮 sidebar 链接
// 2. Mobile TOC toggle: 移动端展开/收起 sidebar
// 3. Theme toggle (dark mode): inject 🌙/☀ button, persist to localStorage
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // ---- 3. Theme toggle button ----
  // Pre-paint inline script in each <head> sets data-theme on <html>.
  // Here we inject the toggle button and wire click/system-change handlers.
  const docEl = document.documentElement;
  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'theme-toggle';
  toggleBtn.setAttribute('aria-label', '切换深浅色模式');
  toggleBtn.setAttribute('title', '切换深浅色模式');
  const setBtnIcon = () => {
    toggleBtn.textContent = docEl.dataset.theme === 'dark' ? '☀' : '🌙';
  };
  setBtnIcon();
  toggleBtn.addEventListener('click', () => {
    const next = docEl.dataset.theme === 'dark' ? 'light' : 'dark';
    docEl.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
    setBtnIcon();
  });
  document.body.appendChild(toggleBtn);

  // Follow OS theme changes if user hasn't manually overridden
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      let manualOverride = null;
      try { manualOverride = localStorage.getItem('theme'); } catch (err) {}
      if (manualOverride === null) {
        docEl.dataset.theme = e.matches ? 'dark' : 'light';
        setBtnIcon();
      }
    });
  }

  // ---- 1. TOC Scroll-Spy ----
  const tocLinks = document.querySelectorAll('.sidebar-toc a');
  if (tocLinks.length > 0) {
    const linkMap = new Map();
    tocLinks.forEach(link => {
      const id = link.getAttribute('href').replace('#', '');
      const target = document.getElementById(id);
      if (target) linkMap.set(target, link);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const link = linkMap.get(entry.target);
          if (!link) return;
          if (entry.isIntersecting) {
            tocLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
          }
        });
      },
      { rootMargin: '-70px 0px -70% 0px', threshold: 0 }
    );

    linkMap.forEach((_, target) => observer.observe(target));
  }

  // ---- 2. Mobile TOC Toggle ----
  const toggleBtn = document.querySelector('.toc-toggle');
  const sidebar = document.querySelector('.sidebar-toc');
  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
    // 点击 TOC 链接后自动收起
    sidebar.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => sidebar.classList.remove('open'));
    });
  }
});

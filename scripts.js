// ============================================
// MATH 31CH Review — Global Scripts
// 1. TOC scroll-spy: 根据 viewport 中的 section 高亮 sidebar 链接
// 2. Mobile TOC toggle: 移动端展开/收起 sidebar
// ============================================

document.addEventListener('DOMContentLoaded', () => {
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

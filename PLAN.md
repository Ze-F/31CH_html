# Review Pages Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 搭建 `Review/` 目录骨架 (style.css / scripts.js / index.html) 并完成 Topic 6 (Lebesgue 准则与 a.e. 推论) 作为 14 页 review 系统的模板基准 (POC)。

**Architecture:** 纯静态 HTML + KaTeX (via CDN) + 共享 CSS/JS。每个 topic 页是独立 `.html` 文件，使用同一 `../style.css` 和 `../scripts.js`。无 build 步骤，浏览器直接打开。

**Tech Stack:** HTML5, vanilla CSS (Grid + Flexbox), vanilla JS (IntersectionObserver), KaTeX 0.16.11 via jsdelivr CDN.

**Spec reference:** `/Users/zefan/SP26/MATH 31CH/Review/SPEC.md`

**Note on git:** 此项目不是 git repo (per project root environment). 所有任务跳过 git commit 步骤。

---

## File Structure (after Phase 1)

```
MATH 31CH/Review/
├── SPEC.md            (existing — design spec)
├── PLAN.md            (this file)
├── index.html         ← Task 4 creates
├── style.css          ← Task 2 creates
├── scripts.js         ← Task 3 creates
├── assets/            ← Task 1 creates (empty placeholder)
└── topics/            ← Task 1 creates
    └── 06-lebesgue-criterion.html  ← Tasks 5a-5h create incrementally
```

**Responsibilities:**
- `style.css`: 全局视觉风格 — 字体、颜色、layout grid (TOC + main)、5 种 colored boxes、top nav 与 TOC sticky behavior、响应式断点
- `scripts.js`: TOC scroll-spy 高亮 + 移动端 TOC toggle
- `index.html`: 主页, 列出 14 个 topic 链接组织成 5 个 Part. Phase 1 只有 Topic 6 链接实际可用; 其余链接是占位 (Phase 3 补)
- `topics/06-lebesgue-criterion.html`: 完整 POC 页, 包含 9 个 components (§1-§9)

---

## Task 1: 建立目录骨架

**Files:**
- Create: `Review/topics/` (directory)
- Create: `Review/assets/` (directory, empty placeholder)

- [ ] **Step 1: 创建 topics 子目录**

Run: `mkdir -p "/Users/zefan/SP26/MATH 31CH/Review/topics"`
Expected: 无 output, 成功创建

- [ ] **Step 2: 创建 assets 子目录**

Run: `mkdir -p "/Users/zefan/SP26/MATH 31CH/Review/assets"`
Expected: 无 output

- [ ] **Step 3: 验证**

Run: `ls -la "/Users/zefan/SP26/MATH 31CH/Review"`
Expected: 看到 `SPEC.md`, `PLAN.md`, `topics/`, `assets/` 四项

---

## Task 2: 写 `style.css`

**Files:**
- Create: `/Users/zefan/SP26/MATH 31CH/Review/style.css`

整个文件按以下 section 组织, 一次性写完。

- [ ] **Step 1: 创建 style.css 完整内容**

写入文件 `/Users/zefan/SP26/MATH 31CH/Review/style.css`:

```css
/* ============================================
   MATH 31CH Review — Global Stylesheet
   ============================================ */

/* ---------- 0. Reset & Base ---------- */
*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; scroll-padding-top: 70px; }
body {
  margin: 0;
  font-family: "Source Serif Pro", Charter, "Iowan Old Style", Georgia, serif;
  font-size: 17px;
  line-height: 1.7;
  color: #1d1d1d;
  background-color: #fbfaf6;
}
code, kbd, .mono {
  font-family: "SF Mono", Menlo, Consolas, monospace;
  font-size: 0.92em;
}

/* ---------- 1. Top Nav ---------- */
.top-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  padding: 0 24px;
  background: #fffefa;
  border-bottom: 1px solid #d8d3c4;
  font-size: 15px;
}
.top-nav a { color: #0b58a6; text-decoration: none; }
.top-nav a:hover { text-decoration: underline; }
.top-nav .nav-center { font-weight: 600; color: #444; }
.top-nav .nav-prev::before { content: "← "; }
.top-nav .nav-next::after { content: " →"; }
.top-nav .nav-disabled { color: #aaa; pointer-events: none; }

/* ---------- 2. Container Layout ---------- */
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 32px 24px 80px;
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 40px;
}

/* ---------- 3. Sidebar TOC ---------- */
.sidebar-toc {
  position: sticky;
  top: 72px;
  align-self: start;
  max-height: calc(100vh - 100px);
  overflow-y: auto;
  font-size: 14.5px;
  border-right: 1px solid #ebe6d8;
  padding-right: 12px;
}
.sidebar-toc h3 {
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #888;
  margin: 0 0 12px 0;
  font-weight: 600;
}
.sidebar-toc ul { list-style: none; padding: 0; margin: 0; }
.sidebar-toc li { margin: 6px 0; }
.sidebar-toc a {
  color: #555;
  text-decoration: none;
  display: block;
  padding: 4px 8px;
  border-left: 3px solid transparent;
  border-radius: 0 4px 4px 0;
  transition: all 0.15s;
}
.sidebar-toc a:hover { color: #0b58a6; background: #f0ebda; }
.sidebar-toc a.active {
  color: #0b58a6;
  background: #f0ebda;
  border-left-color: #0b58a6;
  font-weight: 600;
}

/* ---------- 4. Main Column ---------- */
main {
  max-width: 70ch;
  min-width: 0; /* 防止 grid item 溢出 */
}
main h1 { font-size: 32px; line-height: 1.3; margin: 0 0 8px 0; }
main .subtitle { color: #777; font-size: 17px; margin-bottom: 32px; }
main h2 {
  font-size: 24px;
  line-height: 1.3;
  margin: 48px 0 16px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #ebe6d8;
  scroll-margin-top: 70px;
}
main h3 { font-size: 19px; line-height: 1.3; margin: 24px 0 8px 0; }
main p { margin: 0 0 14px 0; }
main a { color: #0b58a6; }
main strong { font-weight: 600; }

/* ---------- 5. Boxed Cards (5 component types) ---------- */
.box {
  margin: 20px 0;
  padding: 14px 18px;
  border-left: 4px solid;
  border-radius: 4px;
  font-size: 0.97em;
}
.box .box-title {
  font-weight: 700;
  margin-bottom: 6px;
  display: block;
}
.box p:last-child { margin-bottom: 0; }

.box.def      { background: #e8f0fb; border-color: #2b6cb5; }
.box.def .box-title    { color: #1c4d8a; }

.box.thm      { background: #fcf6e3; border-color: #b08412; }
.box.thm .box-title    { color: #7d5b04; }

.box.example  { background: #eaf5e9; border-color: #3a8a3a; }
.box.example .box-title { color: #1f5b1f; }

.box.pitfall  { background: #fbeaea; border-color: #b03030; }
.box.pitfall .box-title { color: #802020; }

.box.remark   { background: #f1ecf7; border-color: #6b4ba0; }
.box.remark .box-title { color: #4a3070; font-style: italic; }

/* §2 Prerequisites — smaller variant of def box */
.box.prereq {
  background: #f4f7fc;
  border-color: #6b8db5;
  font-size: 0.92em;
}
.box.prereq .box-title { color: #3a5878; font-size: 0.92em; }
.box.prereq ul { margin: 6px 0; padding-left: 22px; }

/* ---------- 6. Details (expandable proofs / answers) ---------- */
details {
  margin: 14px 0;
  border: 1px solid #d8d3c4;
  border-radius: 4px;
  background: #fdfcf6;
}
details > summary {
  cursor: pointer;
  padding: 8px 14px;
  font-weight: 600;
  color: #444;
  user-select: none;
}
details > summary:hover { background: #f5f1e3; }
details[open] > summary { border-bottom: 1px solid #d8d3c4; }
details > div.details-body { padding: 12px 18px; }

/* ---------- 7. Exercises ---------- */
.exercise {
  margin: 18px 0;
  padding-left: 16px;
  border-left: 3px solid #b8b0a0;
}
.exercise .ex-num { font-weight: 700; color: #555; margin-right: 6px; }

/* ---------- 8. Cheat Sheet (bullet list with emoji) ---------- */
.cheat-sheet { margin-top: 12px; }
.cheat-sheet ul { list-style: none; padding-left: 0; }
.cheat-sheet li {
  margin: 8px 0;
  padding: 6px 0 6px 32px;
  position: relative;
  border-bottom: 1px dotted #e0dcd0;
}
.cheat-sheet li::before {
  position: absolute;
  left: 0;
  top: 6px;
  font-size: 1.1em;
}
.cheat-sheet li.cs-def::before     { content: "🟦"; }
.cheat-sheet li.cs-thm::before     { content: "🟨"; }
.cheat-sheet li.cs-tech::before    { content: "🟢"; }
.cheat-sheet li.cs-pitfall::before { content: "🟥"; }

/* ---------- 9. KaTeX adjustments ---------- */
.katex-display {
  margin: 1em 0;
  overflow-x: auto;
  overflow-y: hidden;
}
.katex { font-size: 1.05em; }

/* ---------- 10. Mobile TOC Toggle ---------- */
.toc-toggle {
  display: none;
  background: none;
  border: 1px solid #aaa;
  border-radius: 4px;
  padding: 4px 10px;
  font-size: 14px;
  cursor: pointer;
  color: #555;
}

/* ---------- 11. Index Page Specific ---------- */
body.index .container { display: block; max-width: 900px; }
body.index main { max-width: none; }
.part-section { margin: 36px 0; }
.part-section h2 {
  font-size: 22px;
  color: #555;
  margin: 0 0 16px 0;
  padding-bottom: 6px;
  border-bottom: 1px solid #ebe6d8;
}
.topic-list { list-style: none; padding: 0; margin: 0; }
.topic-list li {
  margin: 14px 0;
  padding: 14px 18px;
  background: #fffefa;
  border: 1px solid #ebe6d8;
  border-radius: 6px;
  display: grid;
  grid-template-columns: 50px 1fr;
  gap: 14px;
  align-items: start;
}
.topic-list .topic-num {
  font-size: 22px;
  font-weight: 700;
  color: #b08412;
  text-align: center;
}
.topic-list .topic-title {
  font-size: 17px;
  font-weight: 600;
  color: #0b58a6;
  text-decoration: none;
}
.topic-list .topic-title:hover { text-decoration: underline; }
.topic-list .topic-meta {
  font-size: 13.5px;
  color: #888;
  margin-top: 2px;
}
.topic-list .topic-desc {
  font-size: 14.5px;
  color: #444;
  margin-top: 4px;
  line-height: 1.5;
}
.topic-list li.unavailable { opacity: 0.5; }
.topic-list li.unavailable .topic-title {
  color: #888;
  pointer-events: none;
  cursor: not-allowed;
}
.topic-list li.unavailable .topic-meta::after {
  content: " · (待 Phase 3 完成)";
  color: #aa6633;
  font-style: italic;
}

/* ---------- 12. Responsive: hide sidebar < 900px ---------- */
@media (max-width: 900px) {
  .container { grid-template-columns: 1fr; gap: 0; }
  .sidebar-toc {
    position: fixed;
    top: 56px;
    left: 0;
    right: 0;
    background: #fffefa;
    border-bottom: 1px solid #d8d3c4;
    border-right: none;
    padding: 16px 24px;
    max-height: calc(100vh - 56px);
    z-index: 90;
    transform: translateY(-100%);
    transition: transform 0.2s;
  }
  .sidebar-toc.open { transform: translateY(0); }
  .toc-toggle { display: inline-block; }
  main { max-width: none; }
}
```

- [ ] **Step 2: 验证 CSS 语法**

Run: `head -5 "/Users/zefan/SP26/MATH 31CH/Review/style.css"`
Expected: 看到注释 `/* MATH 31CH Review — Global Stylesheet */`

无自动语法检查 (浏览器才能渲染), 视觉验证留到 Task 4/5 完成后.

---

## Task 3: 写 `scripts.js`

**Files:**
- Create: `/Users/zefan/SP26/MATH 31CH/Review/scripts.js`

- [ ] **Step 1: 创建 scripts.js 完整内容**

写入文件 `/Users/zefan/SP26/MATH 31CH/Review/scripts.js`:

```javascript
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
```

- [ ] **Step 2: 验证 JS 文件存在**

Run: `wc -l "/Users/zefan/SP26/MATH 31CH/Review/scripts.js"`
Expected: ~40 行

---

## Task 4: 写 `index.html` (主页 + 14 topic TOC)

**Files:**
- Create: `/Users/zefan/SP26/MATH 31CH/Review/index.html`

- [ ] **Step 1: 创建 index.html 完整内容**

写入文件 `/Users/zefan/SP26/MATH 31CH/Review/index.html`:

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MATH 31CH 复习指南 | Honors Vector Calculus</title>
  <link rel="stylesheet" href="style.css">
</head>
<body class="index">

  <nav class="top-nav">
    <span class="nav-prev nav-disabled">无</span>
    <span class="nav-center">MATH 31CH 复习指南</span>
    <span class="nav-next nav-disabled">无</span>
  </nav>

  <div class="container">
    <main>
      <h1>MATH 31CH 复习指南</h1>
      <p class="subtitle">Honors Vector Calculus · UCSD · Spring 2026 · 共 14 个 topic 页</p>

      <p>本复习系统按 <strong>topic</strong> (而非 lecture) 组织，每页是一个完整的故事弧：从动机出发，串联核心定义与定理，配以 worked examples、常见陷阱、可隐藏答案的练习题、以及末尾的速查表。叙述用中文，数学符号沿用 typed notes 的英文 LaTeX 风格 — 这是一份**与 typed notes 互补**的 personal study mode 资料。</p>

      <p>建议复习顺序：按编号 01 → 14 顺读；若只想巩固某一主题，直接跳到对应 Part 即可。每页页首列有 <em>前置知识</em>，标明依赖哪些更早的 topic。</p>

      <!-- Part I -->
      <section class="part-section">
        <h2>Part I — Riemann 积分基础 (4 页)</h2>
        <ul class="topic-list">
          <li class="unavailable">
            <div class="topic-num">01</div>
            <div>
              <a class="topic-title" href="topics/01-1d-riemann.html">1D Riemann 积分</a>
              <div class="topic-meta">Lec 1.1</div>
              <div class="topic-desc">Partitions, upper/lower sums, Cauchy 准则: 在最熟悉的 1D 设置中建立可积性的概念基础。</div>
            </div>
          </li>
          <li class="unavailable">
            <div class="topic-num">02</div>
            <div>
              <a class="topic-title" href="topics/02-nd-riemann.html">n-维 Riemann 积分: dyadic paving 与可积性</a>
              <div class="topic-meta">Lec 1.2, 1.3, 2.1</div>
              <div class="topic-desc">用 dyadic cubes 把 1D 思想推广到 ℝⁿ，并完整证明 Cauchy 准则。</div>
            </div>
          </li>
          <li class="unavailable">
            <div class="topic-num">03</div>
            <div>
              <a class="topic-title" href="topics/03-algebra-properties.html">Riemann 积分的代数与序性质</a>
              <div class="topic-meta">Lec 2.1, 2.2, 3.3</div>
              <div class="topic-desc">线性、单调性、|f|、f⁺/f⁻、lattice 操作、product on ℝⁿ×ℝᵐ — 积分的"日常工具包"。</div>
            </div>
          </li>
          <li class="unavailable">
            <div class="topic-num">04</div>
            <div>
              <a class="topic-title" href="topics/04-volume-pavable.html">体积与 pavable 集</a>
              <div class="topic-meta">Lec 2.2, 3.1</div>
              <div class="topic-desc">vol via 𝟙_A、平移/缩放不变性、有限与可数可加性。</div>
            </div>
          </li>
        </ul>
      </section>

      <!-- Part II -->
      <section class="part-section">
        <h2>Part II — 测度零理论 (2 页)</h2>
        <ul class="topic-list">
          <li class="unavailable">
            <div class="topic-num">05</div>
            <div>
              <a class="topic-title" href="topics/05-measure-zero-basics.html">测度零: 定义与基本性质</a>
              <div class="topic-meta">Lec 3.1, 3.2 (前半)</div>
              <div class="topic-desc">Vol 0 vs measure 0、k-维子空间为零、countable union 仍为零。</div>
            </div>
          </li>
          <li>
            <div class="topic-num">06</div>
            <div>
              <a class="topic-title" href="topics/06-lebesgue-criterion.html">Lebesgue 准则与 a.e. 推论</a>
              <div class="topic-meta">Lec 3.2 (后半), 3.3</div>
              <div class="topic-desc">可积 ⟺ a.e. 连续；Thomae 函数；正性引理 — 全课最重要的 measure-theoretic 桥梁。</div>
            </div>
          </li>
        </ul>
      </section>

      <!-- Part III -->
      <section class="part-section">
        <h2>Part III — Fubini (1 页)</h2>
        <ul class="topic-list">
          <li class="unavailable">
            <div class="topic-num">07</div>
            <div>
              <a class="topic-title" href="topics/07-fubini.html">Fubini 定理与应用</a>
              <div class="topic-meta">Lec 4.1, 4.2</div>
              <div class="topic-desc">Iterated integrals 与 multiple integral 的等价；ball volume、Steinmetz、Fubini 反例。</div>
            </div>
          </li>
        </ul>
      </section>

      <!-- Part IV -->
      <section class="part-section">
        <h2>Part IV — 变量代换 (3 页)</h2>
        <ul class="topic-list">
          <li class="unavailable">
            <div class="topic-num">08</div>
            <div>
              <a class="topic-title" href="topics/08-linear-cov.html">行列式 scales 体积 / 线性 CoV</a>
              <div class="topic-meta">Lec 5.1, 5.2</div>
              <div class="topic-desc">Determinant scales volume 定理 + elementary matrix 分解证明 + linear CoV。</div>
            </div>
          </li>
          <li class="unavailable">
            <div class="topic-num">09</div>
            <div>
              <a class="topic-title" href="topics/09-nonlinear-cov.html">非线性 CoV 定理与标准坐标</a>
              <div class="topic-meta">Lec 5.3</div>
              <div class="topic-desc">Jacobian 出现的逻辑；polar/spherical/cylindrical 三大公式推导。</div>
            </div>
          </li>
          <li class="unavailable">
            <div class="topic-num">10</div>
            <div>
              <a class="topic-title" href="topics/10-cov-patterns.html">CoV 实战: 三种设计模式</a>
              <div class="topic-meta">Lec 6.1</div>
              <div class="topic-desc">Symmetry-/boundary-/slice-driven 三种 pattern + 三个完整 worked examples。</div>
            </div>
          </li>
        </ul>
      </section>

      <!-- Part V -->
      <section class="part-section">
        <h2>Part V — 极限与 Lebesgue 积分 (4 页)</h2>
        <ul class="topic-list">
          <li class="unavailable">
            <div class="topic-num">11</div>
            <div>
              <a class="topic-title" href="topics/11-limits-riemann.html">Riemann 框架下的极限与积分</a>
              <div class="topic-meta">Lec 6.2</div>
              <div class="topic-desc">Uniform convergence theorem; traveling box / tall spike 两个 paradigm 反例。</div>
            </div>
          </li>
          <li class="unavailable">
            <div class="topic-num">12</div>
            <div>
              <a class="topic-title" href="topics/12-lebesgue-construction.html">Lebesgue 积分的构造</a>
              <div class="topic-meta">Lec 7.1</div>
              <div class="topic-desc">Daniell-Stone 砖块分解; Beppo-Levi; 定义; 𝓘_R ⊂ 𝓘_L; Dirichlet 与 log 例子。</div>
            </div>
          </li>
          <li class="unavailable">
            <div class="topic-num">13</div>
            <div>
              <a class="topic-title" href="topics/13-well-definedness.html">良定性证明</a>
              <div class="topic-meta">Lec 7.2, 7.3 (proof part)</div>
              <div class="topic-desc">Truncation; dyadic paving; Markov-style 估计 — 全课最技术化的一个证明。</div>
            </div>
          </li>
          <li class="unavailable">
            <div class="topic-num">14</div>
            <div>
              <a class="topic-title" href="topics/14-lebesgue-properties.html">Lebesgue 积分的初等性质</a>
              <div class="topic-meta">Lec 7.3 (后半)</div>
              <div class="topic-desc">线性、与 bounded R 函数的乘积、单调性；1/√|x| 反例。</div>
            </div>
          </li>
        </ul>
      </section>

    </main>
  </div>

</body>
</html>
```

- [ ] **Step 2: 浏览器手动验证**

Run: `open "/Users/zefan/SP26/MATH 31CH/Review/index.html"`
Expected (在默认浏览器中):
- 页面以浅米色背景 (`#fbfaf6`) 显示
- 顶部 sticky nav 显示 "MATH 31CH 复习指南"
- 看到 5 个 Part section, 共 14 个 topic
- Topic 06 链接是 active 颜色 (深蓝)，其他 13 个是灰色不可点击 (因为 `unavailable` class)
- 13 个灰色 topic 后面有 "(待 Phase 3 完成)" 后缀

如果颜色 / 间距视觉上有违和感, 先记录, 留到 Task 5 完成后整体调整.

---

## Task 5: Topic 6 (Lebesgue 准则) POC

**Files:**
- Create: `/Users/zefan/SP26/MATH 31CH/Review/topics/06-lebesgue-criterion.html`

这是最长的任务, 拆成 8 个子任务 (5a-5h) 按顺序写入同一文件. 每个子任务完成后用 `open` 打开看一眼.

### Task 5a: HTML 骨架 + Head + Top Nav + Sidebar TOC 占位

- [ ] **Step 1: 写入文件初始骨架**

创建 `/Users/zefan/SP26/MATH 31CH/Review/topics/06-lebesgue-criterion.html` 内容如下:

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Topic 06: Lebesgue 准则与 a.e. 推论 | MATH 31CH 复习</title>
  <link rel="stylesheet" href="../style.css">

  <!-- KaTeX -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js"
    onload="renderMathInElement(document.body, {
      delimiters: [
        {left: '$$', right: '$$', display: true},
        {left: '$', right: '$', display: false},
        {left: '\\[', right: '\\]', display: true},
        {left: '\\(', right: '\\)', display: false}
      ],
      macros: {
        '\\R': '\\mathbb{R}',
        '\\N': '\\mathbb{N}',
        '\\Z': '\\mathbb{Z}',
        '\\Q': '\\mathbb{Q}',
        '\\eps': '\\varepsilon',
        '\\IR': '\\mathscr{I}_R',
        '\\IL': '\\mathscr{I}_L',
        '\\Disc': '\\operatorname{Disc}',
        '\\osc': '\\operatorname{osc}',
        '\\vol': '\\operatorname{vol}',
        '\\supp': '\\operatorname{supp}',
        '\\abs': '\\left|#1\\right|',
        '\\norm': '\\left\\|#1\\right\\|'
      },
      throwOnError: false,
      errorColor: '#cc0000'
    });"></script>

  <script defer src="../scripts.js"></script>
</head>
<body>

  <nav class="top-nav">
    <a class="nav-prev nav-disabled" href="#">Topic 05</a>
    <a class="nav-center" href="../index.html">MATH 31CH 复习 · 主页</a>
    <a class="nav-next nav-disabled" href="#">Topic 07</a>
  </nav>

  <div class="container">

    <!-- Sidebar TOC -->
    <aside class="sidebar-toc">
      <h3>本页目录</h3>
      <button class="toc-toggle">≡ 目录</button>
      <ul>
        <li><a href="#motivation">§1 动机</a></li>
        <li><a href="#prereq">§2 前置知识</a></li>
        <li><a href="#definitions">§3 核心定义</a></li>
        <li><a href="#theorems">§4 主要定理</a></li>
        <li><a href="#examples">§5 Worked Examples</a></li>
        <li><a href="#pitfalls">§6 常见陷阱</a></li>
        <li><a href="#exercises">§7 练习</a></li>
        <li><a href="#cheat">§8 速查表</a></li>
        <li><a href="#further">§9 进一步阅读</a></li>
      </ul>
    </aside>

    <main>
      <h1>Topic 06: Lebesgue 准则与 a.e. 推论</h1>
      <p class="subtitle">Source: Lec 3.2 (后半), 3.3 · H&amp;H §4.1 · 14 topics 中第 6 个</p>

      <!-- §1 - §9 内容将在 5b-5h 填入 -->

    </main>
  </div>

</body>
</html>
```

- [ ] **Step 2: 浏览器验证骨架**

Run: `open "/Users/zefan/SP26/MATH 31CH/Review/topics/06-lebesgue-criterion.html"`
Expected:
- 顶部 nav 显示, Topic 05 和 Topic 07 灰色不可点 (disabled)
- 左侧 sidebar TOC 显示 9 个 § 链接
- 主体目前只有 H1 和 subtitle, 大片空白 — 这是预期的, content 待 5b-5h 填入
- 数学未出现, 不需要 KaTeX 工作 (5c 之后才有)

### Task 5b: §1 动机 + §2 前置知识

- [ ] **Step 1: 在 `<main>` 内, H1+subtitle 之后插入 §1, §2**

把以下内容**追加**到 `<h1>` 后面 (具体位置: H1 + subtitle 之后, `</main>` 之前):

```html
      <!-- §1 动机 -->
      <h2 id="motivation">§1 动机</h2>
      <p>Riemann 可积的判定我们已经有了一个 <em>operational</em> 准则 — <strong>Cauchy 准则</strong> (Topic 02): 对任意 $\eps &gt; 0$，存在足够细的 paving 使得 $U_N(f) - L_N(f) &lt; \eps$。这个准则计算上可用，但 <em>概念上</em> 它问的不是"$f$ 本身有什么性质"，而是"我们能不能找到一个好的 paving"。两个视角之间隔着一层 — 我们想问的真正问题是: <strong>究竟什么样的 $f$ 是可积的？</strong></p>

      <p><strong>Lebesgue 准则</strong>给出了一个干净的答案: <em>$f$ 在闭盒上有界且 Riemann 可积，当且仅当它的不连续点集是测度零的</em>。也就是说，可积性完全由"$f$ 不连续的程度"决定 — 与 paving 无关，与 oscillation 的具体大小无关，只与"差到家的点究竟有多少"有关。这把可积性从 paving 层面的技术问题，提升到了 $f$ 自身的内在性质。</p>

      <p>这个准则是 measure theory 与 Riemann theory 的桥梁。它解释了为什么 Dirichlet 函数 (处处不连续) 不可积 — 不连续点集是整个区间，肯定不是测度零；而 Thomae 函数 (处处有理点不连续) 却可积 — 因为有理点是可数的，自然测度零。本页围绕这个准则展开，并补充一个结构性后续: <strong>正性引理</strong>，即 $f \ge 0$ 且 $\int f = 0$ $\Rightarrow$ $f = 0$ a.e. — 它把测度零的语言用回到了积分的 algebra 层面。</p>

      <!-- §2 前置知识 -->
      <h2 id="prereq">§2 前置知识</h2>
      <div class="box prereq">
        <span class="box-title">在阅读本页前，你应该已经掌握:</span>
        <ul>
          <li><a href="01-1d-riemann.html">Topic 01</a> 或 <a href="02-nd-riemann.html">Topic 02</a>: Riemann 可积性、上下和、Cauchy 准则</li>
          <li><a href="03-algebra-properties.html">Topic 03</a>: 积分的单调性、$|f|$ 可积、product 性质</li>
          <li><a href="05-measure-zero-basics.html">Topic 05</a>: <strong>测度零的定义</strong>、可数 union 性质、k-维子空间为测度零</li>
          <li>本课程的 oscillation 记号 $\osc_C(f) := M_C(f) - m_C(f)$ (Topic 02)</li>
        </ul>
      </div>
```

- [ ] **Step 2: 浏览器验证**

刷新浏览器 (或 `open` 命令再跑一次)。Expected:
- §1 三段中文叙述显示, 行宽不超过 70ch
- 数学公式 $\eps > 0$、$U_N(f) - L_N(f) < \eps$、$f \ge 0$ 等内联渲染 (KaTeX 应已工作)
- §2 浅蓝色 prereq 盒子, 内含 ul 列表, 4 个项目分别链接到 Topic 01/02/03/05

如果 KaTeX 没渲染数学 (显示原始 `$\eps$` 字符), 检查 head 里的 `<script>` 是否齐全.

### Task 5c: §3 核心定义

- [ ] **Step 1: 追加 §3**

在 §2 之后追加 (整段 §3, 含 3 个 definition box):

```html
      <!-- §3 核心定义 -->
      <h2 id="definitions">§3 核心定义</h2>
      <p>Lebesgue 准则需要三个紧密相连的概念: "点 $x$ 处的不连续性"、"不连续点集 $\Disc(f)$"、以及"测度零的不连续点集"。我们一个一个建立 (前两个在本节，第三个来自 <a href="05-measure-zero-basics.html">Topic 05</a>)。</p>

      <div class="box def">
        <span class="box-title">Definition 6.1 (点处连续与 oscillation 刻画)</span>
        <p>设 $A \subseteq \R^n$ 为 $f$ 的有界支集所在域，$x_0 \in A$。称 <strong>$f$ 在 $x_0$ 处连续</strong>，若 $\forall \eps &gt; 0,\ \exists \delta &gt; 0$ 使得 $|x - x_0| &lt; \delta$ 蕴含 $|f(x) - f(x_0)| &lt; \eps$。</p>
        <p>等价地，$f$ 在 $x_0$ 处连续 $\Longleftrightarrow$
        $$\lim_{r \to 0^+}\osc_{B_r(x_0)}(f) = 0,$$
        其中 $\osc_C(f) = \sup_C f - \inf_C f$ 是 $f$ 在 $C$ 上的振荡。</p>
      </div>

      <p><strong>直觉</strong>: 第一行是标准的 $\eps$-$\delta$ 连续。第二行是它的等价表述: "在 $x_0$ 越来越小的邻域上看 $f$，振荡幅度趋近于零"。后者是 Lebesgue 准则证明里的 working definition — 因为 Riemann 积分本来就用 oscillation 控制误差，oscillation 刻画的连续性能让两个理论无缝对话。</p>

      <div class="box def">
        <span class="box-title">Definition 6.2 (不连续点集 $\Disc(f)$)</span>
        <p>$$\Disc(f) := \{x \in A : f \text{ 在 } x \text{ 处不连续}\}.$$</p>
        <p>等价地，$\Disc(f) = \{x : \lim_{r \to 0^+}\osc_{B_r(x_0)}(f) &gt; 0\}$。</p>
      </div>

      <p>这是一个 <strong>子集</strong>，不是数值，也不是测度。Lebesgue 准则的内容就是把 $\Disc(f)$ 这个集合的<em>大小</em>用测度零的概念去衡量。</p>

      <div class="box def">
        <span class="box-title">Definition 6.3 (几乎处处, almost everywhere)</span>
        <p>称某个性质 $P(x)$ <strong>几乎处处成立</strong> (写作 "$P$ a.e." 或 "$P$ holds a.e.")，若集合 $\{x : P(x) \text{ 不成立}\}$ 是测度零的。</p>
      </div>

      <p>"a.e." 是 measure theory 最常用的语言之一: <em>除掉测度零的例外集后，性质 $P$ 处处成立</em>。本页里，"$f$ a.e. 连续"就是"$\Disc(f)$ 测度零"的同义改写。准则的核心结论就用这门语言表述。</p>
```

- [ ] **Step 2: 浏览器验证**

刷新, Expected:
- §3 三个浅蓝色 def 盒子, 标题分别是 Def 6.1, 6.2, 6.3
- 公式 $\osc_{B_r(x_0)}(f)$, $\Disc(f)$ 等渲染正确
- 盒子之间的中文叙述自然衔接

**注意**: `\osc` / `\Disc` / `\eps` / `\R` 等 macro 已在 Task 5a 的 KaTeX `macros` 配置里定义, 应该直接识别. 如果有别的 macro 报错, 加到那个 macros 对象里.

### Task 5d: §4 主要定理 (Lebesgue 准则 + Positivity)

- [ ] **Step 1: 追加 §4**

在 §3 之后追加:

```html
      <!-- §4 主要定理 -->
      <h2 id="theorems">§4 主要定理</h2>

      <p>本节有两个主要结果。第一个是本页的中心 — <strong>Lebesgue 准则</strong>，把 Riemann 可积性翻译成 "$f$ a.e. 连续"。第二个是它的一个 algebra 层面应用 — <strong>正性引理</strong>，让我们能从 "$\int f = 0$" 直接得到 "$f = 0$ a.e."。</p>

      <div class="box thm">
        <span class="box-title">Theorem 6.1 (Lebesgue 准则, H&amp;H Thm 4.1.13)</span>
        <p>设 $f \colon A \to \R$ 在 $A \subset \R^n$ 上有界支集且有界。则
        $$f \in \IR(\R^n) \quad \Longleftrightarrow \quad \Disc(f) \text{ 是测度零的}.$$
        即: <em>有界函数 Riemann 可积当且仅当它几乎处处连续</em>。</p>
      </div>

      <p><strong>Proof sketch.</strong> 两个方向都依赖把 $\Disc(f)$ 用 <em>$\eps$-bad cube</em> 的语言重写: 对 $\eps &gt; 0$, 定义 $B_\eps := \{x : \limsup_{r \to 0^+}\osc_{B_r(x)}(f) \ge \eps\}$ — 即 $x$ 处的局部振荡至少 $\eps$ 的点集。注意 $\Disc(f) = \bigcup_{k=1}^\infty B_{1/k}$。</p>

      <p>"$\Rightarrow$" 方向: 设 $f$ Riemann 可积。要证每个 $B_{1/k}$ 测度零 (则可数 union 仍测度零, 即 $\Disc(f)$ 测度零)。固定 $k$, 用 Cauchy 准则: 存在 paving $\mathcal{P}$ 使 $U_{\mathcal{P}}(f) - L_{\mathcal{P}}(f) &lt; \eps / k$. 那些"含 $B_{1/k}$ 点"的 cube 必须有 $\osc \ge 1/k$, 否则与 $B_{1/k}$ 的定义矛盾. 总 oscillation contribution $\ge (1/k) \cdot \text{vol(这些 cube)}$, 故这些 cube 的总体积 $&lt; \eps$. $\eps$ 任意, $B_{1/k}$ 测度零.</p>

      <p>"$\Leftarrow$" 方向: 设 $\Disc(f)$ 测度零，要证 $f$ 可积. 固定 $\eps$. 用 oscillation 把 $A$ 划分为 "good points" (邻域上 $\osc &lt; \eps$) 和 "bad points" (即 $B_\eps$). 后者测度零 (因为 $B_\eps \subset \Disc(f)$), 可被有限多个开 box 覆盖且总 vol $&lt; \eps$. Good points 的局部 $\eps$-邻域形成开覆盖, 用 compactness 取有限子覆盖. 合起来构造 paving 让 $U - L &lt; \eps \cdot \text{vol}(A) + 2M \cdot \eps$ ($M = \sup|f|$). 这是 Cauchy 准则要求的形式。</p>

      <details>
        <summary>展开完整证明 (技术细节)</summary>
        <div class="details-body">
          <p>完整证明见 H&amp;H §4.1 (Thm 4.1.13) 或 typed notes <code>Lec 3.2_notes.tex</code> 的 §4. 关键技术点:</p>
          <ul>
            <li><strong>Bad set 闭性</strong>: $B_\eps$ 是闭集 (因为 $x \mapsto \limsup \osc_{B_r(x)}$ 是上半连续). 闭 + 有界 + 测度零 $\Rightarrow$ 可用有限多 box 覆盖 (compactness).</li>
            <li><strong>Good set 局部 oscillation 控制</strong>: 对 $x \notin B_\eps$, $\exists r_x &gt; 0$ 使 $\osc_{B_{r_x}(x)}(f) &lt; \eps$. 这族 $B_{r_x}(x)$ 覆盖 $A \setminus B_\eps$.</li>
            <li><strong>Paving 拼装</strong>: 取一个充分细的 dyadic paving, 让每个 cube 要么完全在某个 good $B_{r_x}$ 里 ($\Rightarrow$ $\osc &lt; \eps$), 要么落入 bad box 覆盖里 (总 vol $&lt; \eps$, 各 cube $\osc \le 2M$).</li>
            <li><strong>组装 $U - L$</strong>: $\sum_C \osc_C \cdot \text{vol}(C) \le \eps \cdot \text{vol}(A) + 2M\eps$. 取 $\eps$ 充分小即得 Cauchy 准则。</li>
          </ul>
          <p>这是 measure theory 课程中 "open cover + compactness + measure zero" 三件套的典型应用.</p>
        </div>
      </details>

      <p>本准则的意义: <strong>可积性是一个 measure-theoretic 性质</strong>. 你可以一边手做 Riemann 积分一边脑里默念 "可积 = 几乎处处连续", 这比 Cauchy 准则更接近"事物的本质"。</p>

      <div class="box thm">
        <span class="box-title">Theorem 6.2 (正性引理 / 积分严格正)</span>
        <p>设 $f \in \IR(\R^n)$ 且 $f \ge 0$ a.e.. 则
        $$\int_{\R^n} f \, dV = 0 \quad \Longleftrightarrow \quad f = 0 \text{ a.e.}$$
        换言之: <em>非负可积函数的积分为零 $\Longleftrightarrow$ 函数几乎处处为零</em>。</p>
      </div>

      <p><strong>Proof sketch.</strong> "$\Leftarrow$" 显然: 若 $f = 0$ a.e., 把 $f$ 改成处处 $= 0$ 不改变积分 (因为差异在测度零集上), 而 $\int 0 = 0$.</p>

      <p>"$\Rightarrow$" 反证: 假设 $\int f = 0$ 但 $f$ 不是 a.e. 为零. 则 $\{x : f(x) &gt; 0\}$ 不是测度零, 故存在某个 $f(x_0) &gt; 0$ 且 $x_0$ 是 $f$ 的连续点 (用 Thm 6.1: $\Disc(f)$ 测度零, 所以"严格正点 + 连续点"非空). 由 $x_0$ 处的连续性, $\exists$ 小球 $B_r(x_0)$ 使 $f(x) &gt; f(x_0)/2$. 那么 $\int f \ge (f(x_0)/2) \cdot \text{vol}(B_r(x_0)) &gt; 0$, 矛盾.</p>

      <p>这个引理把 measure zero 的语言搭桥到 algebra 层面: 积分等式 $\int f = \int g$ 在 $f, g$ 都可积时， 等价于 $f = g$ a.e. (推论, 取 $h := |f - g|$ 套用). 这是 Lec 3.3 的核心 takeaway.</p>
```

- [ ] **Step 2: 浏览器验证**

刷新, Expected:
- §4 有两个浅黄色 thm 盒子 (Thm 6.1, Thm 6.2)
- 每个定理后跟 proof sketch (中文叙述, 几段)
- Thm 6.1 有一个 `<details>` 可展开看完整证明的技术点
- 整段读下来 narrative 连贯, 不是 bullet 堆砌

**注意**: `\IR` 已在 Task 5a KaTeX macros 配置, 直接可用.

### Task 5e: §5 Worked Examples (含 Thomae 函数)

- [ ] **Step 1: 追加 §5 (3 个 worked examples)**

```html
      <!-- §5 Worked Examples -->
      <h2 id="examples">§5 Worked Examples</h2>

      <div class="box example">
        <span class="box-title">Example 6.1 (Dirichlet 函数, 经典反例)</span>
        <p>令 $f(x) = \mathbf{1}_{\mathbb{Q}}(x)$ on $[0,1]$ — 有理点取 $1$, 无理点取 $0$. 我们用 Thm 6.1 论证 $f \notin \IR$.</p>
        <p>$\Disc(f) = [0,1]$ — 任何一点的任何小邻域里都既有有理也有无理点, $\osc = 1 \ne 0$. 整个 $[0,1]$ 不是测度零集 (它的体积是 $1$, vol $0$ $\Rightarrow$ measure $0$ 但反之需要更多 — 这里 $[0,1]$ 体积 $1 \ne 0$, 不可能测度零). 故 $\Disc(f)$ <em>不是</em>测度零, 由 Lebesgue 准则 $f \notin \IR$.</p>
      </div>

      <p>Dirichlet 是 Lebesgue 准则不可积一侧的 textbook 例子. 它"坏到极致" — 处处不连续. 但 Thomae 函数告诉我们: <strong>处处不连续的 dense 子集</strong>不足以让函数不可积, 关键是不连续点集的<em>测度</em>.</p>

      <div class="box example">
        <span class="box-title">Example 6.2 (Thomae 函数, $\IR$ 不可少的明星例子)</span>
        <p>定义 $f \colon [0,1] \to \R$ 为:
        $$f(x) = \begin{cases} 1/q, &amp; x = p/q \in \mathbb{Q} \text{ (最简分数)}, \\ 0, &amp; x \notin \mathbb{Q}. \end{cases}$$</p>
        <p><strong>断言</strong>: $\Disc(f) = \mathbb{Q} \cap [0,1]$, 因此 $\Disc(f)$ 可数, 测度零, 由 Lebesgue 准则 $f \in \IR$.</p>
        <p><strong>证明 $\Disc(f) = \mathbb{Q}$</strong>:</p>
        <ul>
          <li><em>$\mathbb{Q} \subset \Disc(f)$</em>: 对 $x_0 = p/q$ 有理, $f(x_0) = 1/q &gt; 0$. 但 $x_0$ 任意邻域包含无理点 $x$ 让 $f(x) = 0$. 故 $\osc \ge 1/q &gt; 0$, $x_0 \in \Disc(f)$.</li>
          <li><em>$\R \setminus \mathbb{Q} \subset (\Disc(f))^c$</em>: 对 $x_0$ 无理, $f(x_0) = 0$. 给 $\eps &gt; 0$, 取 $N$ 使 $1/N &lt; \eps$. 在 $[0,1]$ 中, 最简分母 $\le N$ 的有理数<strong>有限多</strong>个 (具体: 每个分母 $q \le N$ 最多 $q$ 个 numerator $\le q$). 取 $\delta$ 使 $B_\delta(x_0)$ 避开这些有限点. 则 $B_\delta(x_0) \cap \mathbb{Q}$ 的分子都 $&gt; N$, 故 $f$ 在 $B_\delta(x_0)$ 内取值 $\le 1/N &lt; \eps$. 即 $x_0$ 处连续.</li>
        </ul>
        <p>有趣的是 $f$ 在每个有理点不连续而在每个无理点连续 — 一个"间断点处处稠密但测度为零"的函数. 这恰好告诉我们: <strong>Riemann 可积不需要函数处处接近连续</strong>, 只需 dense 的不连续点集仍然"够稀疏" (在测度意义下).</p>
      </div>

      <div class="box example">
        <span class="box-title">Example 6.3 (正性引理直接应用)</span>
        <p>设 $f, g \in \IR(\R^n)$ 满足 $f \le g$ 处处, 且 $\int f = \int g$. 则 $f = g$ a.e.</p>
        <p><strong>证</strong>: 令 $h := g - f \ge 0$ 处处. 由 Riemann 积分的线性, $h \in \IR$, $\int h = \int g - \int f = 0$. 由 Thm 6.2, $h = 0$ a.e., 即 $f = g$ a.e..</p>
        <p>这个结论看似平凡, 但在 measure theory 教学里非常重要: 它意味着 Riemann 积分作为线性泛函在 "$=$ a.e." 这个等价关系下是<strong>单射</strong>的. 没有"两个本质不同的函数有相同积分"这种 pathology.</p>
      </div>
```

- [ ] **Step 2: 浏览器验证**

刷新. Expected:
- 3 个浅绿色 example 盒子 (Example 6.1, 6.2, 6.3)
- Example 6.2 (Thomae) 有 ul 内嵌细节
- Example 6.3 是个一段证明的简短应用
- 数学符号渲染正常

### Task 5f: §6 常见陷阱

- [ ] **Step 1: 追加 §6 (3 个 pitfall)**

```html
      <!-- §6 常见陷阱 -->
      <h2 id="pitfalls">§6 常见陷阱</h2>

      <div class="box pitfall">
        <span class="box-title">Pitfall 6.1 — "可数 = 测度零 = 可积" 的过度概括</span>
        <p>Lebesgue 准则告诉你 <em>$\Disc(f)$ 测度零 $\Rightarrow$ $f \in \IR$</em>, 但<strong>前提是 $f$ 有界</strong>. 没有有界性 hypothesis, Riemann 积分定义本身就不工作 (上和会无界). $f(x) = 1/x$ on $(0, 1]$ 处处连续 ($\Disc(f) = \emptyset$ 显然测度零), 但 $f$ 不可积 — 因为无界. </p>
        <p><strong>记忆要点</strong>: 准则有<em>两个</em> hypothesis (有界 + 有界支集), 不能只查测度零就下结论.</p>
      </div>

      <div class="box pitfall">
        <span class="box-title">Pitfall 6.2 — 把 "$\Disc(f)$ 测度零" 误读为 "$f$ 在 a.e. 点连续可微"</span>
        <p>$f$ a.e. 连续<strong>不蕴含</strong> $f$ a.e. 可微. Thomae 函数在所有无理点连续 (测度 $1$ 的集合), 但它在<strong>每一个</strong>无理点都不可微 — 因为周围太稠密的有理点搅扰. 可积性 (Lebesgue 准则的输出) 是个比可微弱得多的条件.</p>
        <p>反过来看也是: $f = |x|$ 在 $0$ 处连续不可微, 但 $f$ 显然在 $0$ 这一点是 isolated 不连续 — 哦不对, 它<em>在</em> $0$ 处<em>连续</em>. 所以 "$\Disc$ 测度零" 是关于连续, 与可微无关.</p>
      </div>

      <div class="box pitfall">
        <span class="box-title">Pitfall 6.3 — 用 Lebesgue 准则推 Lebesgue 可积性</span>
        <p>Lebesgue 准则是 <strong>Riemann 可积性</strong>的准则, <strong>不是</strong> Lebesgue 可积性的准则. $\mathbf{1}_{\mathbb{Q} \cap [0,1]}$ (Dirichlet) 不满足 Lebesgue 准则 — 它不 Riemann 可积. 但它<em>是</em> Lebesgue 可积的 (Topic 12), 因为 Lebesgue 框架根本不要 $\Disc(f)$ 测度零这种 hypothesis.</p>
        <p>初学者经常混淆 "Lebesgue 准则" (Riemann 可积性的判据) 和 "Lebesgue 积分" (一个新的 integral). <strong>同一个名字, 两个概念</strong>. 本页讨论的是前者.</p>
      </div>
```

- [ ] **Step 2: 浏览器验证**

刷新. Expected:
- 3 个浅红色 pitfall 盒子
- 每个都有简明的 misconception 标题 + 解释
- Pitfall 6.3 关于命名相似的辨析

### Task 5g: §7 练习

- [ ] **Step 1: 追加 §7 (6 道练习)**

```html
      <!-- §7 练习 -->
      <h2 id="exercises">§7 练习</h2>
      <p>展开 <code>&lt;details&gt;</code> 查看答案 (建议先自己想 10 分钟再看).</p>

      <div class="exercise">
        <p><span class="ex-num">1.</span> 设 $f \colon [0,1] \to \R$ 由 $f(x) = \sin(1/x)$ for $x \ne 0$, $f(0) = 0$ 定义. 问 $f \in \IR([0,1])$ 吗? 用 Lebesgue 准则论证.</p>
        <details>
          <summary>答案</summary>
          <div class="details-body">
            <p><strong>是</strong>, $f \in \IR([0,1])$. $f$ 在 $(0, 1]$ 上是连续的初等函数复合, 在 $x = 0$ 处虽然 $f$ 的极限不存在 (强烈振荡), 但 $\Disc(f) = \{0\}$, 一个单点, 测度零. 又 $|f| \le 1$ 有界. 由 Lebesgue 准则 $f \in \IR$.</p>
            <p>注意: 这里有意思的地方是, <em>oscillation 在 $0$ 处可以是 $2$ (从 $-1$ 到 $1$ 全跨</em>), 但 oscillation 大小不影响 Riemann 可积性 — 只有不连续点集的<strong>测度</strong>重要.</p>
          </div>
        </details>
      </div>

      <div class="exercise">
        <p><span class="ex-num">2.</span> 给出 $f \colon [0,1] \to \R$ 的例子，满足 $f \in \IR$ 但 $\Disc(f)$ 是不可数的.</p>
        <details>
          <summary>答案</summary>
          <div class="details-body">
            <p>令 $C \subset [0,1]$ 为 Cantor 集 (经典的 "去掉中间三分" 构造). $C$ 是不可数的, 但测度零 (它的标准构造在每一步去掉总长 $1/3 + 2/9 + \cdots = 1$ 的内部).</p>
            <p>取 $f := \mathbf{1}_C$. 则 $\Disc(f) = C$ — 不可数, 但测度零. $f$ 有界 ($\le 1$), 由 Lebesgue 准则 $f \in \IR$. 实际上 $\int_0^1 f = \mu(C) = 0$.</p>
            <p>这告诉我们: "不可数" 远远不等价于 "正测度". Cantor 集是这个差别的具象化.</p>
          </div>
        </details>
      </div>

      <div class="exercise">
        <p><span class="ex-num">3.</span> 设 $f, g \in \IR(\R^n)$ 且 $f = g$ a.e. 证 $\int_{\R^n} f = \int_{\R^n} g$.</p>
        <details>
          <summary>答案</summary>
          <div class="details-body">
            <p>令 $h := f - g$. 由线性 $h \in \IR$. 由 hypothesis $h = 0$ a.e., 即 $\{x : h(x) \ne 0\}$ 测度零, 所以 $\Disc(h)$ $\cup$ $\{x : h(x) \ne 0\}$ 仍测度零 (有限 union of measure zero).</p>
            <p>更直接地: 用 $|h|$ 替代 $h$. $|h| \ge 0$ a.e., $\int |h| \ge 0$. 但 $|h| = 0$ a.e. (因为 $|h| \ne 0$ 当且仅当 $h \ne 0$), 而非负 + $|h| = 0$ a.e. 加上 Riemann 可积, 不直接给 $\int |h| = 0$ — 我们需要正性引理 (Thm 6.2) 反向使用: $|h| \ge 0$ 且 $|h| = 0$ a.e. $\Rightarrow$ $\int |h| = 0$ (因为 Thm 6.2 是 "$\Leftrightarrow$"). 由 $|\int h| \le \int |h| = 0$, $\int h = 0$. 故 $\int f = \int g$.</p>
          </div>
        </details>
      </div>

      <div class="exercise">
        <p><span class="ex-num">4.</span> ("证明或反例") 若 $f, g \in \IR(\R^n)$ 且 $f \ge g$ a.e., 但<strong>不</strong>处处, 是否 $\int f \ge \int g$?</p>
        <details>
          <summary>答案</summary>
          <div class="details-body">
            <p><strong>真</strong>, $\int f \ge \int g$. 关键: a.e. 不等式在积分下保持.</p>
            <p>证: 令 $h := f - g$. 设 $E := \{x : h(x) &lt; 0\}$ 测度零. 修改 $h$ 在 $E$ 上 (令它 $= 0$), 得到 $\tilde{h}$. 则 $\tilde{h} \ge 0$ 处处, 且 $\tilde{h} = h$ a.e.. 由 Exercise 3, $\int \tilde{h} = \int h$. 由非负函数的单调性, $\int \tilde{h} \ge 0$. 故 $\int h \ge 0$, i.e. $\int f \ge \int g$.</p>
          </div>
        </details>
      </div>

      <div class="exercise">
        <p><span class="ex-num">5.</span> 找一个 $f \colon [0,1] \to \R$ 处处可定义、$|f| &lt; 1$、但 $f \notin \IR([0,1])$. (即: 处处有界还不够保证可积.)</p>
        <details>
          <summary>答案</summary>
          <div class="details-body">
            <p>Dirichlet 函数 $f = \mathbf{1}_{\mathbb{Q}}$ 在 $[0,1]$ 上. 显然 $0 \le f \le 1$, 处处有界. 但 $\Disc(f) = [0,1]$ 不是测度零, 不可积.</p>
            <p>这例子提醒我们: Lebesgue 准则的<strong>两个</strong> hypothesis (有界 + 有界支集) 都满足时, 还要看 <strong>$\Disc(f)$ 的测度</strong> — 这是真正的判据.</p>
          </div>
        </details>
      </div>

      <div class="exercise">
        <p><span class="ex-num">6.</span> 设 $f \colon \R^n \to \R$ 有有界支集. 若 $f$ <em>仅在测度零集上</em>取非零值, 它一定可积吗?</p>
        <details>
          <summary>答案</summary>
          <div class="details-body">
            <p><strong>不一定</strong>. 举反例: 在 $E = \mathbb{Q} \cap [0,1]$ (测度零, $\Disc(\mathbf{1}_E) = [0,1]$ 处定义) 上取 $f$ 为某种<em>无界</em>函数. 比如 $f(p/q) = q$ for $p/q \in [0,1]$ 最简分数, $f$ 在无理点为 $0$. 这个 $f$ 仅在测度零集 $\mathbb{Q}$ 上非零, 但它<strong>无界</strong> ($f$ 任意大), 不满足 Lebesgue 准则的有界 hypothesis. 故 $f \notin \IR$.</p>
            <p>这道题的 takeaway: 测度零集本身是无害的, 但函数在那里能取多大才是关键. <em>有界</em> hypothesis 不可少.</p>
          </div>
        </details>
      </div>
```

- [ ] **Step 2: 浏览器验证**

刷新. Expected:
- 6 道题各占一段 (左侧灰色 border)
- 每题下面有 "答案" 折叠 (默认收起)
- 点击 "答案" 展开看到完整解答

### Task 5h: §8 速查表 + §9 进一步阅读

- [ ] **Step 1: 追加 §8 和 §9**

```html
      <!-- §8 速查表 -->
      <h2 id="cheat">§8 速查表</h2>
      <div class="cheat-sheet">
        <ul>
          <li class="cs-def"><strong>$\Disc(f)$</strong>: $\{x : f \text{ 在 } x \text{ 处不连续}\} = \{x : \limsup_{r \to 0^+}\osc_{B_r(x)}(f) &gt; 0\}$.</li>
          <li class="cs-def"><strong>$P$ a.e.</strong>: $\{x : P(x) \text{ 不成立}\}$ 测度零.</li>
          <li class="cs-thm"><strong>Lebesgue 准则 (Thm 6.1)</strong>: 有界 $f$ 有界支集 $\Rightarrow$ $f \in \IR$ $\Longleftrightarrow$ $\Disc(f)$ 测度零.</li>
          <li class="cs-thm"><strong>正性引理 (Thm 6.2)</strong>: $f \ge 0$ a.e. $\Rightarrow$ ($\int f = 0$ $\Longleftrightarrow$ $f = 0$ a.e.).</li>
          <li class="cs-thm"><strong>积分相等推 a.e. 相等</strong>: $f \le g$, $\int f = \int g$ $\Rightarrow$ $f = g$ a.e. (Thm 6.2 推论).</li>
          <li class="cs-tech"><strong>判可积流程</strong>: (1) $f$ 是否有界且有界支集? (2) $\Disc(f)$ 测度零吗? 若两者都"是", $f \in \IR$.</li>
          <li class="cs-tech"><strong>典型测度零集</strong>: 可数集、$k$-维子空间 ($k &lt; n$)、Cantor 集、单点 — 都不阻碍可积.</li>
          <li class="cs-pitfall"><strong>陷阱</strong>: 准则的 "$\Disc(f)$ 测度零" 必须配合 "$f$ 有界". 没有有界, $1/x$ 处处连续仍不可积.</li>
          <li class="cs-pitfall"><strong>命名陷阱</strong>: "Lebesgue 准则" $\ne$ "Lebesgue 积分". 前者是 Riemann 可积的判据 (本页), 后者是另一种积分 (Topic 12).</li>
        </ul>
      </div>

      <!-- §9 进一步阅读 -->
      <h2 id="further">§9 进一步阅读</h2>
      <ul>
        <li><strong>H&amp;H 教材</strong>: §4.1, 特别是 Thm 4.1.13 (Lebesgue 准则). Section 4.4 有正性引理相关讨论.</li>
        <li><strong>Typed lecture notes</strong>:
          <ul>
            <li><code>Notes/Typed/3.2_notes/3.2_notes.pdf</code> — Lebesgue 准则证明全细节</li>
            <li><code>Notes/Typed/3.3_notes/3.3_notes.pdf</code> — 正性引理 + 应用</li>
          </ul>
        </li>
        <li><strong>关联 review topics</strong>:
          <ul>
            <li><a href="05-measure-zero-basics.html">Topic 05</a>: 测度零的<em>定义</em>和基本性质 (本页的前置)</li>
            <li><a href="03-algebra-properties.html">Topic 03</a>: $f^+$, $f^-$, $|f|$ 与单调性 — 本页 Thm 6.2 用到</li>
            <li><a href="12-lebesgue-construction.html">Topic 12</a>: Lebesgue <em>积分</em> 构造 — 它用 "a.e." 语言更彻底</li>
            <li><a href="13-well-definedness.html">Topic 13</a>: Lebesgue 良定性证明 — 也用 measure zero + dyadic 论证</li>
          </ul>
        </li>
        <li><strong>同主题外读</strong>: Royden &amp; Fitzpatrick, <em>Real Analysis</em>, Ch 5 — 标准 measure theory 处理 a.e. 概念</li>
      </ul>

      <hr style="margin: 60px 0 20px; border: 0; border-top: 1px solid #d8d3c4;">
      <p style="font-size: 13px; color: #888; text-align: center;">MATH 31CH 复习指南 · Topic 06 · Phase 1 POC</p>
```

- [ ] **Step 2: 浏览器最终验证 — 完整 POC 检查清单**

Run: `open "/Users/zefan/SP26/MATH 31CH/Review/topics/06-lebesgue-criterion.html"`

逐项检查:
- [ ] 顶部 sticky nav 显示, 滚动时保持在顶
- [ ] 左侧 sticky sidebar TOC 显示 9 个 § 链接
- [ ] 滚动到 §3 时 sidebar 中 "§3 核心定义" 链接高亮 (scroll-spy 工作)
- [ ] 点击 sidebar 中某 § 滑动到该 section
- [ ] 主体行宽看起来舒适 (~70 字符), 不过宽
- [ ] §1-§9 五种 box 颜色分别是: 浅蓝 (def/prereq), 浅黄 (thm), 浅绿 (example), 浅红 (pitfall) — 注意本页没有 remark 盒
- [ ] 所有 KaTeX 公式渲染正确, 没有看到原始 `$\eps$` 之类
- [ ] §4 Thm 6.1 的 `<details>` 展开看到完整证明细节
- [ ] §7 每题答案 `<details>` 默认收起, 点击展开
- [ ] §8 速查表 9 个项目, emoji 显示在每行左边
- [ ] §9 链接到 typed_notes 路径 (本地链接)
- [ ] 缩窄浏览器窗口 < 900px, sidebar 应隐藏, 顶部出现 "≡ 目录" 按钮; 点击展开浮层式 TOC

如果任何一项不通过, 这就是 POC 反馈周期 (Phase 2 起点) — 让用户决定先修这里还是先走 Phase 3.

---

## Self-Review

走完计划后回头看 spec, 检查覆盖率:

- ✅ 14 page topic 切分 — Task 4 的 index.html 全列出
- ✅ 9 component 顺序 — Topic 6 (Task 5a-5h) 按 §1-§9 顺序
- ✅ 中文叙述 + 英文数学 + 关键术语中英并列 — Task 5b-5h 内容遵守
- ✅ 5 种 colored boxes — Task 2 CSS 全部定义 (def, thm, example, pitfall, remark, prereq variant)
- ✅ 编号方案 (N.M 格式) — Task 5c-5h 用了 Def 6.1/6.2/6.3, Thm 6.1/6.2, Example 6.1/6.2/6.3, Pitfall 6.1/6.2/6.3
- ✅ 2-4 worked examples, 2-3 pitfalls, 4-8 exercises — Topic 6 是 3 + 3 + 6
- ✅ 速查表 bullet list + emoji — Task 5h
- ✅ KaTeX 0.16.11 CDN + 4 种 delimiter — Task 5a head
- ✅ Sticky TOC 240px + 主体 70ch + 容器 1100px — Task 2 CSS
- ✅ 字号 17px / line-height 1.7 / H1 32 / H2 24 — Task 2 CSS
- ✅ 5 个 Part 组织 — Task 4 index.html
- ✅ 链接到 typed notes 用相对路径 — Task 5h §9
- ✅ 响应式 < 900px 隐藏 sidebar + toggle 按钮 — Task 2 @media + Task 3 JS

**Placeholder scan**: 无 TBD / TODO. 所有 prose 内容完整, 所有 CSS / JS / HTML 代码块完整.

**Type consistency**: CSS class 名 (.box .def / .thm / .example / .pitfall / .remark / .prereq) 和 HTML 用法一致. JS 选 `.sidebar-toc a`, `.toc-toggle`, `.sidebar-toc` 都在 HTML 里存在.

**Spec gap**: 无 — 所有 spec 节点都映射到某个 task.

---

## Execution Notes

POC 完成后, 用户给反馈 (Phase 2). 调整模板后再进入 Phase 3 (剩余 13 个 topic 页), 那是<strong>另一份 plan</strong>, 不在本 plan 范围.

每个 task 完成后**立即开浏览器目视检查**, 这比"全做完再测"更早暴露问题.

不需要 git commit. 文件直接保存即可.

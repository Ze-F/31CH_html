# HW4 HTML 讲解页 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `Review/homework/HW4.html` — a 9-section Chinese-narrative HTML explanation of H&H §4.11 Exercises 5/6/7/8/11/19 (this week's HW), wire it into `Review/index.html` under a new "Homework 详解专区" section, document the routine in `CLAUDE.md`.

**Architecture:** Single self-contained HTML page following the existing topic/midterm2 design conventions (KaTeX 0.16.11 CDN, color-coded box classes, `<details>` folding, sidebar TOC). Math content is faithful translation from the already-finalized `HW/Response/HW4_response.tex` (458 lines); HTML adds 策略 (strategy) and 反思 (reflection) layers that LaTeX doesn't have. Page structure: §1 总览 → §1.5 联合策略 (Problems 5/6/7 shared template) → §2-§7 per-problem 4-段 (题面/策略/证明/反思) → §8 cheat sheet → §9 refs.

**Tech Stack:** Pure static HTML + KaTeX 0.16.11 (jsdelivr CDN) + vanilla CSS/JS. No build step. Verification = open in browser, visual inspection.

**Spec:** `Review/homework/SPEC.md` (date 2026-05-26, approved).

**Reference templates:**
- `Review/midterm2/MT2-practice.html` (540 lines) — closest structural template
- `Review/topics/06-lebesgue-criterion.html` (335 lines) — topic-page skeleton
- `HW/Response/HW4_response.tex` (458 lines) — math source-of-truth

---

## File Structure

| File | Action | Purpose |
|---|---|---|
| `Review/homework/HW4.html` | Create | Main HW4 HTML page, ~1700-2000 lines |
| `Review/index.html` | Modify | Add new "Homework 详解专区" section between MT2 专区 and Part I (insert at lines 71-73, before line 73) |
| `Review/style.css` | Modify (1-line removal) | Remove hardcoded `.topic-list li.unavailable .topic-meta::after` content suffix (lines 268-272) so `.unavailable` becomes reusable |
| `CLAUDE.md` | Modify | Add "Routine: HW HTML 讲解" section after existing "Routine: Review HTML Pages" |

**No tests, no commits (this project is not a git repo).** Verification is per-phase visual inspection in browser + line-count sanity checks.

---

## Phase 1: Scaffold HW4.html (skeleton + KaTeX + nav + sidebar TOC + 9 empty `<h2>` anchors)

**Files:**
- Create: `Review/homework/HW4.html`

- [ ] **Step 1.1: Copy KaTeX/nav/container scaffold from MT2-practice.html.** Read `Review/midterm2/MT2-practice.html` lines 1-50. Replicate exactly, changing only:
  - `<title>`: `HW4 详解 — §4.11 Lebesgue 积分 MCT/DCT 6 题 | MATH 31CH 复习`
  - `<link rel="stylesheet" href="../style.css">` (same — `homework/` is one level deep like `midterm2/`)
  - KaTeX macros block: same as MT2-practice; `\sgn` is needed for 4.11.8(a) and is already in macro list.
  - Top nav: `<span class="nav-prev nav-disabled">无</span>` · `<a class="nav-center" href="../index.html">MATH 31CH 复习 · 主页</a>` · `<span class="nav-next nav-disabled">无</span>` (HW4 is currently the only HW page).

- [ ] **Step 1.2: Add sidebar TOC with 9 anchors.** Replace the MT2-style sidebar `<ul>` with:

```html
<aside class="sidebar-toc">
  <h3>本页目录</h3>
  <button class="toc-toggle">≡ 目录</button>
  <ul>
    <li><a href="#sec1">§1 总览</a></li>
    <li><a href="#sec15">§1.5 Problems 5-7 联合策略</a></li>
    <li><a href="#sec2">§2 Problem 4.11.5</a></li>
    <li><a href="#sec3">§3 Problem 4.11.6</a></li>
    <li><a href="#sec4">§4 Problem 4.11.7</a></li>
    <li><a href="#sec5">§5 Problem 4.11.8 (IBP 链条)</a></li>
    <li><a href="#sec6">§6 Problem 4.11.11</a></li>
    <li><a href="#sec7">§7 Problem 4.11.19</a></li>
    <li><a href="#sec8">§8 方法论速查</a></li>
    <li><a href="#sec9">§9 进一步阅读</a></li>
  </ul>
</aside>
```

- [ ] **Step 1.3: Add main h1/subtitle + 9 empty `<h2 id="secN">` placeholders.**

```html
<main>
  <h1>HW4 详解 — §4.11 Lebesgue 积分 MCT/DCT 6 题</h1>
  <p class="subtitle">本周 HW 的 HTML 讲解 · 6 道题全部来自 H&amp;H §4.11 (Exercises 5, 6, 7, 8, 11, 19) · 与 LaTeX 解答 <code>../../HW/Response/HW4_response.pdf</code> 互补 · 策略段默认展开, 证明段折叠在 <code>&lt;details&gt;</code> 中</p>

  <h2 id="sec1">§1 总览</h2>
  <p><em>待填 (Phase 2)</em></p>

  <h2 id="sec15">§1.5 Problems 5-7 联合策略 — p-参数 truncation 模板</h2>
  <p><em>待填 (Phase 3)</em></p>

  <!-- ...重复至 §9... -->
</main>
```

- [ ] **Step 1.4: Verification.** Open `Review/homework/HW4.html` in browser. Check:
  - Page loads, no console errors
  - Top nav renders (prev/center/next 三槽)
  - Sidebar TOC visible on left ≥ 900px, hidden behind toggle button < 900px
  - All 9 `<h2>` anchors render with horizontal underline
  - Clicking sidebar TOC links scrolls smoothly to anchor

---

## Phase 2: §1 总览 (引入段 + 题型分布表 + 通用工具箱 prereq box)

**Files:** Modify `Review/homework/HW4.html` §1 section.

- [ ] **Step 2.1: Write intro paragraph.** Replace `<p><em>待填 (Phase 2)</em></p>` under `<h2 id="sec1">` with one intro paragraph:

```html
<p>本次 HW (2026 SP 第 4 周, 截止 2026-05-24) 全部 6 题来自 H&amp;H <strong>§4.11 — Lebesgue 积分</strong>, 是整个学期 <strong>MCT/DCT 应用密度最高</strong>的一份作业. 每道题都遵循同一个心智模型: <em>选合适的 truncation 序列 → 验证每个 truncation 在 $\IR$ → 应用 MCT (非负) 或 DCT (有 dominator)</em>. 因此本页在 §1.5 单开一节集中讲透"p-参数 truncation 模板", 之后 §2/§3/§4 (Problems 5/6/7) 只讲各自的特殊差异, 避免重复.</p>
```

- [ ] **Step 2.2: Add 题型分布表 (HTML table using `.textbook-index` class which already exists in style.css line 296+).**

```html
<table class="textbook-index">
  <thead>
    <tr><th>题号</th><th>核心方法</th><th>truncation 类型</th><th>主要看点</th></tr>
  </thead>
  <tbody>
    <tr><td>4.11.5</td><td>MCT + 球坐标</td><td>径向 ball $\{|x| \le R\}$</td><td>p &lt; -n 的几何意义 (球壳 $r^{n-1}$ 抵消)</td></tr>
    <tr><td>4.11.6</td><td>MCT + Fubini + 渐近分析</td><td>δ-shell $\{x \ge \delta\}$ 避开原点</td><td>cusp/wedge 几何与阈值 $\max\{1, (m+1)/2\}$</td></tr>
    <tr><td>4.11.7</td><td>同 4.11.6 (对偶)</td><td>$\{x \le R\}$ 切无界尾</td><td>阈值 $\min\{1, (m+1)/2\}$, 与 4.11.6 镜像</td></tr>
    <tr><td>4.11.8(a-d)</td><td>DCT + Lebesgue Fubini + 反证</td><td>$\{|x| \le n\}$ 双侧 + 三角域</td><td>Lebesgue 版 IBP 完整链条 (4 part 串成定理)</td></tr>
    <tr><td>4.11.11</td><td>MCT + DCT (二段法)</td><td>径向 ball, 再 DCT 处理变号</td><td>多项式 × Gaussian 的 Γ-函数估计</td></tr>
    <tr><td>4.11.19</td><td>MCT 主链 + DCT 收尾</td><td>half-open $[a, c_k]$</td><td>improper Riemann → Lebesgue 桥梁定理</td></tr>
  </tbody>
</table>
```

- [ ] **Step 2.3: Add 通用工具箱 `box prereq`.**

```html
<div class="box prereq">
  <span class="box-title">📦 本次 HW 通用工具箱 (反复使用, 不再每题重列)</span>
  <ul>
    <li><strong>MCT (Thm 4.11.18)</strong>: $0 \le f_k \uparrow f$ a.e., $f_k \in \IL$ ⟹ $f \in \IL$ ⟺ $\sup_k \int f_k &lt; \infty$, 此时 $\int f = \lim_k \int f_k$.</li>
    <li><strong>DCT (Thm 4.11.19)</strong>: $f_k \to f$ a.e., $|f_k| \le g \in \IL$ ⟹ $f \in \IL$ 且 $\int f_k \to \int f$.</li>
    <li><strong>Lebesgue Fubini (Thm 4.11.10)</strong>: $h \in \IL(\R^n \times \R^m)$ ⟹ 迭代积分 a.e. 存在并等于 $\int h\,dV$.</li>
    <li><strong>Product rule (Lec 7.3)</strong>: $f \in \IL$, $g \in \IR$ bounded ⟹ $fg \in \IL$.</li>
    <li><strong>Absolute value closure (Prop 4.11.13)</strong>: $f \in \IL$ ⟹ $|f| \in \IL$ 且 $\left|\int f\right| \le \int |f|$.</li>
    <li><strong>等价表述 (重要)</strong>: 对<em>非负</em>函数, $f \in \IL$ ⟺ 改进 Riemann 积分绝对收敛 (由 MCT 应用于 truncation 推出). §2-§7 反复使用此等价.</li>
  </ul>
</div>
```

- [ ] **Step 2.4: Verification.** Refresh browser. Check: 题型分布表 6 行清晰, math symbols ($\IL$, $\IR$, 等) 在表格 cell 内正常渲染; `box prereq` 灰蓝色背景, 6 条 bullet 不溢出. 此节总行数约 50-70 lines HTML.

---

## Phase 3: §1.5 Problems 5-7 联合策略 (p-参数 truncation 模板)

**Files:** Modify `Review/homework/HW4.html` §1.5 section.

- [ ] **Step 3.1: 写引入段 + 模板 4 步.** §1.5 是本页的"概念中心"——Problems 5/6/7 都是它的 instance.

```html
<p>Problems 5, 6, 7 在表面上是三个不同积分的可积性问题, 但本质上是<strong>同一个模板的三次应用</strong>. 把这个模板提到这里集中讲, 后面三节就可以聚焦"各自的几何"而不是重复机械步骤.</p>

<p><strong>共同设置</strong>: 给定区域 $\Omega \subset \R^n$ 与非负函数 $f \ge 0$, 问 $\int_\Omega f\,dV$ 是否作为 Lebesgue 积分存在. 由 absolute value closure 与 MCT 等价 (见 §1 工具箱), 只需检查改进 Riemann 积分是否有限.</p>

<div class="box thm">
  <span class="box-title">🔧 p-参数 truncation 4 步模板</span>
  <p><strong>Step ❶ 选 truncation.</strong> 找一个递增序列 $\Omega_k \uparrow \Omega$ 使得 $f \cdot \mathbf{1}_{\Omega_k}$ 是 $\R^n$ 上的<em>有界连续支撑紧集函数</em>—— 即 $f \cdot \mathbf{1}_{\Omega_k} \in \IR(\R^n)$ (由 Lebesgue 准则 Thm 4.1.13, 不连续点测度零).</p>
  <p><strong>Step ❷ 化为 1-D 积分.</strong> 在 truncation 上, $f$ 通常是径向或与某一坐标对称的函数. 用 (a) 球坐标 (Problem 5, 11) 或 (b) Riemann Fubini + 内积分换元 $y = xu$ (Problem 6, 7) 把 $n$-维积分化为单变量积分 $\int_? r^? \cdot I(\cdot)\,dr$, 其中 $I$ 是某辅助函数.</p>
  <p><strong>Step ❸ 渐近分析.</strong> 看 1-D 积分的被积函数在边界 (奇异点附近 / 无穷远处) 的<em>渐近形态</em>. 用比较准则 $\int_0^1 x^a\,dx &lt; \infty \iff a &gt; -1$ 和 $\int_1^\infty x^a\,dx &lt; \infty \iff a &lt; -1$ 推出 p 的阈值.</p>
  <p><strong>Step ❹ MCT 收尾.</strong> 若 1-D 积分的 $\sup_k$ 有限 ⟹ 原积分 ∈ $\IL$; 若发散 ⟹ ∉ $\IL$ (因为 truncation 单调上升).</p>
</div>

<p>三道题对应模板的具体选项:</p>
<ul>
  <li>Problem 5: $\Omega_R = \{1 \le |\mathbf{x}| \le R\}$ (径向 annulus), Step ❷ 用球坐标, Step ❸ 关心 $r \to \infty$.</li>
  <li>Problem 6: $\Omega_\delta = A_m \cap \{x \ge \delta\}$ (δ-shell 远离原点), Step ❷ 用 Fubini + 换元 $y = xu$, Step ❸ 关心 $x \to 0^+$.</li>
  <li>Problem 7: $\Omega_R = A_m \cap \{x \le R\}$ (R-bounded 远离 ∞), Step ❷ 同 6, Step ❸ 关心 $x \to \infty$.</li>
</ul>
```

- [ ] **Step 3.2: Verification.** 检查 4 步模板在 `box thm` (黄色) 内排版整齐, math 渲染无误. 此节总行数约 40-50 lines.

---

## Phase 4: §2 Problem 4.11.5 (the template instance — write this MOST carefully as it sets the visual pattern)

**Files:** Modify `Review/homework/HW4.html` §2 section.

**Math source:** `HW/Response/HW4_response.tex` lines 69-112.

- [ ] **Step 4.1: 题面 (`box def` 蓝色).**

```html
<div class="box def">
  <span class="box-title">📋 Problem 4.11.5</span>
  <p>For what values of $p \in \R$ does $\displaystyle\int_{\R^n \setminus B_1(0)} |\mathbf{x}|^p\,|d^n\mathbf{x}|$ exist as a Lebesgue integral? (The answer depends on $n$.)</p>
  <p><strong>Claim.</strong> $p &lt; -n$.</p>
</div>
```

- [ ] **Step 4.2: 策略段 (普通段落, 默认展开, 关键句加粗).**

```html
<h3>策略</h3>
<p>这是模板 (§1.5) 的<strong>最直接 instance</strong>. 区域 $\Omega = \R^n \setminus B_1(0)$ 在 $\infty$ 处无界, 没有原点奇异性 (积分下界离开原点 1 个单位). truncation 自然选径向 $\Omega_R = \{1 \le |\mathbf{x}| \le R\}$. 球坐标把 $n$-维积分化为 $\sigma_n \int_1^R r^{p+n-1}\,dr$ —— 关键洞察是<strong>球壳 $r^{n-1}$ 把指数从 $p$ 抬到 $p + n - 1$</strong>. 因此可积阈值不是 $p &lt; -1$ (1-D 直觉), 而是 $p + n - 1 &lt; -1 \iff p &lt; -n$.</p>
<p>这一题<strong>不需要 DCT</strong>, 因为被积函数本来就 $\ge 0$, MCT 单边即可. (一旦出现变号函数, 比如 Problem 11 的 $\mathbf{x}^\alpha e^{-|\mathbf{x}|^2}$ 含奇次幂, 就要 MCT-DCT 二段法.)</p>
```

- [ ] **Step 4.3: 证明段 (`<details>` 内嵌 `box thm`, 默认折叠).**

```html
<details>
  <summary><strong>展开严格证明</strong></summary>
  <div class="details-body">
    <div class="box thm">
      <span class="box-title">证明 (按 §1.5 模板 4 步)</span>
      <p><strong>Step ❶ Truncation.</strong> 令 $f(\mathbf{x}) := |\mathbf{x}|^p \mathbf{1}_{|\mathbf{x}| &gt; 1}$, 对 $R &gt; 1$ 定义
      $$f_R(\mathbf{x}) := |\mathbf{x}|^p \mathbf{1}_{1 \le |\mathbf{x}| \le R}.$$
      $\{1 \le |\mathbf{x}| \le R\}$ 是紧致集 (两球面边界测度零), $|\mathbf{x}|^p$ 在其上连续有界, 由 Lebesgue 准则 (Thm 4.1.13), $f_R \in \IR$. 显然 $f_R \uparrow f$.</p>

      <p><strong>Step ❷ 球坐标.</strong> 当 $n = 1$, $\int_\R f_R = 2\int_1^R r^p\,dr$. 当 $n \ge 2$, 球坐标 (Thm 4.10.12, Jacobian $r^{n-1}$ 配合单位球 $S^{n-1}$ 上的测度 $d\sigma$):
      $$\int_{\R^n} f_R\,dV = \sigma_n \int_1^R r^{p+n-1}\,dr, \qquad \sigma_n := \sigma(S^{n-1}).$$
      ($n = 1$ 情形可统一记 $\sigma_1 := 2$.)</p>

      <p><strong>Step ❸ 渐近分析.</strong> $\int_1^R r^{p+n-1}\,dr$ 在 $R \to \infty$ 有有限极限 ⟺ $p + n - 1 &lt; -1 \iff p &lt; -n$, 此时极限为 $\frac{1}{-(p+n)}$; 否则发散到 $+\infty$.</p>

      <p><strong>Step ❹ MCT 收尾.</strong>
      <ul>
        <li>若 $p &lt; -n$: $\sup_R \int f_R = \frac{\sigma_n}{-(p+n)} &lt; \infty$, 由 MCT, $f \in \IL$ 且 $\int_{\R^n \setminus B_1(0)} |\mathbf{x}|^p\,dV = \frac{\sigma_n}{|p| - n}$.</li>
        <li>若 $p \ge -n$: $\int f_R \to \infty$, 故 $f \notin \IL$.</li>
      </ul>
      故积分存在 ⟺ $p &lt; -n$. $\blacksquare$</p>
    </div>
  </div>
</details>
```

- [ ] **Step 4.4: 反思段 (`box remark` 紫色).**

```html
<div class="box remark">
  <span class="box-title">💡 反思 — 维度对阈值的影响</span>
  <p>特例: $n = 1$ 时 $p &lt; -1$; $n = 2$ 时 $p &lt; -2$; $n = 3$ 时 $p &lt; -3$. <strong>环境维度越高, 衰减要求越严</strong> —— 这是 $r^{n-1}$ 球壳因子的体现, 几何意义是"半径 $r$ 处的体积元随 $r^{n-1}$ 增长". 在物理学里这对应 inverse-square 力场 ($p = -2$) 在 $n = 3$ 时<em>边界</em>地不可积, 解释了为什么万有引力势能 (而非力本身) 才是 well-defined 的 conserved quantity.</p>
  <p>同样的"$r^{n-1}$ 加成"会再次出现在 Problem 11 (Gaussian 矩阵元) 的 Step 1, 但那里 Gaussian 衰减压倒一切, 所以任意 $p$ 都可积.</p>
</div>
```

- [ ] **Step 4.5: Verification.** Browser 检查 §2 整节: 4 个 sub-block (题面 蓝 / 策略 普通 / 证明 黄 折叠 / 反思 紫) 视觉对比清晰, 折叠后点击 `<summary>` 能展开. 此节总行数 ~80-100 lines.

**§2 是本页的 visual template. §3-§7 应模仿其颜色/结构/折叠/`<h3>` 编排.**

---

## Phase 5: §3 Problem 4.11.6 (case-heavy proof — `<details>` per case)

**Files:** Modify `Review/homework/HW4.html` §3 section.

**Math source:** `HW/Response/HW4_response.tex` lines 115-192.

- [ ] **Step 5.1: 题面 `box def`** — 复述题目: $A_m = \{0 \le y \le x^m, 0 \le x \le 1\}$, 问 $\int_{A_m}(x^2+y^2)^{-p}\,dV$ 为何值 $p$ 存在. Claim: $p &lt; \max\{1, (m+1)/2\}$ (两段 piecewise: $0 \le m \le 1$ 时 $p &lt; 1$; $m \ge 1$ 时 $p &lt; (m+1)/2$).

- [ ] **Step 5.2: 策略段** — 强调:
  - $p \le 0$ 平凡 (连续有界紧支撑函数).
  - $p &gt; 0$ 时唯一奇异点是原点, 故 truncation 选 δ-shell $\{x \ge \delta\}$.
  - 关键技巧: 内积分换元 $y = xu$ 把 $\int_0^{x^m}(x^2+y^2)^{-p}\,dy$ 化为 $x^{1-2p} \cdot I(x^{m-1})$, 其中 $I(L) := \int_0^L (1+u^2)^{-p}\,du$.
  - 阈值的两段表达背后是 cusp ($m &gt; 1$, 区域捏成尖角, 容许更强奇异性) vs wedge ($m &lt; 1$, 区域填满整个楔形, 阈值退化到 $[0,1]^2$ 的 $p &lt; 1$) 的几何对比.

- [ ] **Step 5.3: 证明段 — 三层嵌套.** 外层 `<details>` 包整个证明; 内部分四个不折叠子段 (Reduction / I(L) 渐近) 加三个折叠子段 (Case 1 / Case 2 / Case 3):

```html
<details>
  <summary><strong>展开严格证明 (含 3 个 case 子折叠)</strong></summary>
  <div class="details-body">
    <div class="box thm">
      <span class="box-title">证明</span>

      <p><strong>Reduction.</strong> ...复述 LaTeX response 第 134-157 行的内容: 平凡情形 $p \le 0$, 否则 truncate 到 $A_m^\delta := A_m \cap \{x \ge \delta\}$, 由 MCT 转化为研究 $J := \int_0^1 x^{1-2p}\,I(x^{m-1})\,dx$.</p>

      <p><strong>$I(L)$ 的渐近.</strong> ...复述 LaTeX response 第 160-169 行的 4 种渐近 (公式 eq:I-asymp):
      $I(L) \sim L$ as $L \to 0^+$; $I(L) \to C(p)$ as $L \to \infty$ 若 $p &gt; 1/2$; $I(L) \sim \ln L$ 若 $p = 1/2$; $I(L) \sim L^{1-2p}/(1-2p)$ 若 $p &lt; 1/2$.</p>

      <details>
        <summary>Case 1: $m = 1$</summary>
        <div class="details-body">
          <p>...复述 LaTeX 第 174 行: $I(x^{m-1}) = I(1)$ 常数, 被积函数 $\sim x^{1-2p}$, 可积 ⟺ $p &lt; 1$.</p>
        </div>
      </details>

      <details>
        <summary>Case 2: $m &gt; 1$</summary>
        <div class="details-body">
          <p>...复述 LaTeX 第 176 行: $x^{m-1} \to 0$, $I \sim x^{m-1}$, 被积函数 $\sim x^{m-2p}$, 可积 ⟺ $p &lt; (m+1)/2$.</p>
        </div>
      </details>

      <details>
        <summary>Case 3: $0 \le m &lt; 1$ (3 个 sub-case)</summary>
        <div class="details-body">
          <p>...复述 LaTeX 第 178-184 行的 3 个 sub-case ($p &gt; 1/2$, $p = 1/2$, $0 &lt; p &lt; 1/2$), 全部归约到 $p &lt; 1$.</p>
        </div>
      </details>

      <p><strong>Synthesis.</strong> 三 case 合并: $p &lt; \max\{1, (m+1)/2\}$. $\blacksquare$</p>
    </div>
  </div>
</details>
```

**重要**: "...复述 LaTeX response 第 X-Y 行" 是 implementer 的占位符指令, 实际写时**必须把那几行的全部数学步骤忠实翻译成中文叙述 + KaTeX**, 不能保留省略号. 不要跳步骤, 不要"省略显然部分".

- [ ] **Step 5.4: 反思段 `box remark`** — geometric explanation: cusp vs wedge transition at $m = 1$. 强调 (a) 这是 LaTeX response 第 190-192 行 `\begin{remark*}` 的内容直接翻译过来, (b) 加一句"为什么 1/2 在 sub-case 3 没出现在最终阈值里? 因为它对 $L \to \infty$ 才相关, 而 Case 3 的 sub-case bottleneck 是 $p &gt; 1/2$ 而非 $p \le 1/2$".

- [ ] **Step 5.5: Verification.** §3 总行数 ~150-200 lines (case-heavy). 浏览器检查嵌套 `<details>` 能正常工作 (外层展开后, 3 个内层独立展开); KaTeX 在嵌套折叠内仍然渲染 (常见坑: KaTeX auto-render 在 `<details>` 首次展开时不渲染 —— 检查是否需要在 onload 时显式 `renderMathInElement`, 但既有 MT2 页用 `<details>` 没问题, 所以这里也应没问题).

---

## Phase 6: §4 Problem 4.11.7 (镜像 §3)

**Files:** Modify `Review/homework/HW4.html` §4 section.

**Math source:** `HW/Response/HW4_response.tex` lines 195-239.

- [ ] **Step 6.1: 题面** — $A_m = \{0 \le y \le x^m, 1 \le x \le \infty\}$ (无界版本). Claim: $p &gt; \min\{1, (m+1)/2\}$ (注意符号反转, 与 4.11.6 对偶).

- [ ] **Step 6.2: 策略段** — 强调对偶性: 4.11.6 是"控制原点附近奇异性, 需小 $p$"; 4.11.7 是"控制 ∞ 处衰减, 需大 $p$". $m$-effect 也反过来: cusp ($m &gt; 1$) 在 ∞ 处恶化衰减但在原点助益奇异性.

- [ ] **Step 6.3: 证明段** — 复用 4.11.6 的 truncation + 内积分 $y = xu$ + $I(L)$ 渐近, 不重述模板, 只展开 case analysis. 三层嵌套结构同 §3: 外 `<details>` + Reduction + 3 case 子折叠 (Case 1: $m = 1$ → $p &gt; 1$; Case 2: $m &gt; 1$ → $p &gt; 1$ via $C(p) &lt; \infty$ 需 $p &gt; 1/2$; Case 3: $0 \le m &lt; 1$ → $p &gt; (m+1)/2$).

**实现指令: 不要从零再写一遍渐近 lemma; 在证明开头一句话引用 §3 的 $I(L)$ 渐近表, 然后专注 case analysis.**

- [ ] **Step 6.4: 反思段** — 直接翻译 LaTeX 第 237-239 行的 remark (4.11.6 与 4.11.7 的对比表), 加一段"为什么 cusp 在 4.11.6 助益、在 4.11.7 损害": 因为奇异性补偿与衰减补偿的 $m$-依赖恰好相反.

- [ ] **Step 6.5: Verification.** §4 总行数 ~150-180. 检查 4.11.6 与 4.11.7 视觉对仗 (subsection 标题、box 颜色顺序、case 折叠风格).

---

## Phase 7: §5 Problem 4.11.8 (special envelope — 4 parts as IBP chain)

**Files:** Modify `Review/homework/HW4.html` §5 section.

**Math source:** `HW/Response/HW4_response.tex` lines 242-372.

§5 不用 4-段标准结构, 而是 §5.0 串联引入 + §5.a/b/c/d 各题面+证明 + §5.e 整体反思. 见 SPEC.md §4 末尾.

- [ ] **Step 7.1: §5.0 串联引入 (`<h3>串联: Lebesgue 版 IBP 的完整链条</h3>` + 普通段落).**

```html
<h3>串联: Lebesgue 版 IBP 的完整链条</h3>
<p>这 4 个 part 不是 4 道独立小题, 而是构造 Lebesgue 版 IBP 定理的<strong>4 块拼图</strong>:</p>
<ul>
  <li>(a) $F(x) := \int_0^x f$ 在 $\R$ 上连续 (基础正则性).</li>
  <li>(b) IBP 公式在<strong>有限区间</strong> $[a, b]$ 上对 Lebesgue 积分成立.</li>
  <li>(c) 若 $F$ 本身 $\in \IL(\R)$, 则 $F(\pm \infty) = 0$ (边界项消失的前提).</li>
  <li>(d) 综合 (a)(b)(c), IBP 在<strong>整个实直线</strong>上成立 (边界项消失, 公式简化).</li>
</ul>
<p>主要工具: 每个 part 都用 DCT (a 用变量平移, b 用 Fubini 把二维 IBP 写成三角域积分, c 用反证, d 用 $[-n, n]$ truncation + DCT). 这是 §4.11 抽象框架的<strong>第一个"应用定理"</strong>—— 之前的题目都是单点验证, 这里第一次构造一个跨设置的工具.</p>
```

- [ ] **Step 7.2: §5.a (Part a — F 连续, DCT 应用).** 子标题 `<h3 id="sec5a">Part (a) — $F(x) = \int_0^x f$ 连续</h3>`. 题面 `box def` + 折叠证明 `<details>` (直接翻译 LaTeX 第 251-267 行: 取 $\chi_h$ 指示函数, $|f|\chi_{h_k} \le |f| \in \IL$, DCT 推出 $\int |f|\chi_{h_k} \to 0$).

- [ ] **Step 7.3: §5.b (Part b — IBP on $[a, b]$).** 子标题 + 题面 + 折叠证明 (LaTeX 第 271-318 行). 关键技术: Lebesgue Fubini on triangle $T = \{a \le s \le t \le b\}$, identity $\int_T f(s)g(t)\,dV$ 用两种 slicing 写出, 然后代数重排. **务必把 baby Fubini 的张量积分解步骤写清楚** (LaTeX 第 293-298 行的 bullet list).

- [ ] **Step 7.4: §5.c (Part c — $F(\pm\infty) = 0$, 反证).** 子标题 + 题面 + 折叠证明 (LaTeX 第 322-343 行). 两步: (1) Cauchy 性证明 $\lim F$ 存在 — 用 $\int_N^\infty |f| \to 0$ via DCT; (2) 反证 $L_+ = 0$ — 用线性增长 $L_+ k / 2$ 与 $\int |F| &lt; \infty$ 矛盾.

- [ ] **Step 7.5: §5.d (Part d — IBP on $\R$).** 子标题 + 题面 + 折叠证明 (LaTeX 第 347-372 行). 关键步骤: 用 $h_n := fG \mathbf{1}_{[-n,n]}$ DCT 推出 $fG \in \IL$, 同理 $Fg \in \IL$; 然后 (b) with $a = -n, b = n$ + (c) 让 $n \to \infty$, 边界项消失.

- [ ] **Step 7.6: §5.e 整体反思 (`box remark`).** 用一段话总结这 4 part 一起证了什么大定理 ("Lebesgue IBP 在 $\R$ 上, $F \in \IL$ 且 $G$ bounded 条件下"). 加一句指出"经典 Riemann 版 IBP 要求 $f, g$ 连续可导; Lebesgue 版只要求 $f, g \in \IL$, 显著弱化".

- [ ] **Step 7.7: Verification.** §5 是单题中最长的一节, 总行数 ~300-400. 检查 4 个 subsection 标题视觉一致, 折叠证明独立工作, §5.e 反思不与其它紫色 box 视觉冲突.

---

## Phase 8: §6 Problem 4.11.11 (Gaussian × polynomial — MCT-DCT 二段法)

**Files:** Modify `Review/homework/HW4.html` §6 section.

**Math source:** `HW/Response/HW4_response.tex` lines 375-419.

- [ ] **Step 8.1: 题面 `box def`** — 复述题目 + Claim ($\int_{\R^n} p(\mathbf{x}) e^{-|\mathbf{x}|^2}$ 对任意多项式 $p$ 存在).

- [ ] **Step 8.2: 策略段** — 强调:
  - 多项式 $p(\mathbf{x}) = \sum_\alpha c_\alpha \mathbf{x}^\alpha$ 可能<strong>变号</strong> (奇次幂), 所以纯 MCT 不能直接用.
  - **MCT-DCT 二段法**: (Step 1) 先证非负 dominator $|\mathbf{x}|^{|\alpha|} e^{-|\mathbf{x}|^2} \in \IL$ via MCT (球坐标 + Γ 函数估计); (Step 2) 再用此 dominator 把变号的 $\mathbf{x}^\alpha e^{-|\mathbf{x}|^2}$ 通过 DCT 拿到 $\IL$; (Step 3) 用 $\IL$ 线性 sum 多项式.
  - 这是本次 HW 唯一<strong>必须</strong> MCT-DCT 二段的题 —— 因为 Problem 5/6/7 都是非负被积函数, Problem 19 通过取 $|f|$ 也是非负, Problem 8 是 abstract 设置不涉及具体计算.

- [ ] **Step 8.3: 证明段 (折叠)** — 3 Step 结构:
  - Step 1: 非负 dominator 在 $\IL$ via MCT. 球坐标 → $\int_0^R r^{|\alpha|+n-1} e^{-r^2}\,dr$, $s = r^2$ 换元 → $\Gamma((|\alpha|+n)/2) / 2$, sup 有限 ⟹ MCT 给 dominator.
  - Step 2: 单项式 $\mathbf{x}^\alpha e^{-|\mathbf{x}|^2} \in \IL$ via DCT (with the Step 1 dominator).
  - Step 3: 线性求和.

- [ ] **Step 8.4: 反思段 `box remark`** — 提一句 Schwartz 函数 / Gaussian 矩, 跟物理学 (量子谐振子矩元) 与概率论 (正态分布矩) 的关系.

- [ ] **Step 8.5: Verification.** §6 总行数 ~100-130.

---

## Phase 9: §7 Problem 4.11.19 (improper Riemann → Lebesgue 桥定理)

**Files:** Modify `Review/homework/HW4.html` §7 section.

**Math source:** `HW/Response/HW4_response.tex` lines 422-466.

- [ ] **Step 9.1: 题面 `box def`** — 复述题目 ($f$ supp 在 $[a, b)$, $\lim_c \int_a^c |f| &lt; \infty$ ⟹ $f \in \IL$).

- [ ] **Step 9.2: 策略段** — 强调:
  - 这是<strong>本次 HW 的"工具题"</strong>: 它证明了 §1 工具箱里那句"对非负函数, $f \in \IL$ ⟺ 改进 Riemann 积分绝对收敛". 之前的 §2-§4 都默认调用过这个等价.
  - MCT 主链 + DCT 收尾: (Step 1) 取 $c_k \uparrow b$, 定义 $\phi_k := |f|\mathbf{1}_{[a,c_k]}$; (Step 2) MCT 推 $|f| \in \IL$; (Step 3) DCT 推 $f \in \IL$ + 极限交换.
  - 关键陷阱: "$\lim \int |f| &lt; \infty$" 比"$\lim \int f$ 存在"<strong>强</strong>. 反例: $\sin(x)/x$ 在 $[1, \infty)$ 上改进 Riemann 收敛 (Dirichlet's test) 但 $|f|$ 不可积.

- [ ] **Step 9.3: 证明段 (折叠) — 4 Step.** 直接翻译 LaTeX 第 432-460 行的 4 Step.

- [ ] **Step 9.4: 反思段 `box remark`** — 翻译 LaTeX 第 463-465 行 remark, 加一句"为什么 §1.5 模板里默认调用了这个定理: 因为 truncation 收敛性 = 这个定理的 hypothesis".

- [ ] **Step 9.5: Verification.** §7 总行数 ~100-130.

---

## Phase 10: §8 方法论速查 cheat sheet (5 def + 6 thm + 4 tech + 3 pitfall)

**Files:** Modify `Review/homework/HW4.html` §8 section.

- [ ] **Step 10.1: 写 cheat sheet (使用既有 `.cheat-sheet` class with `cs-def/cs-thm/cs-tech/cs-pitfall`).**

```html
<div class="cheat-sheet">
  <ul>
    <!-- 🟦 def: 5 种 truncation 类型 -->
    <li class="cs-def"><strong>径向 truncation</strong> $f \cdot \mathbf{1}_{|\mathbf{x}| \le R}$: 用于无界域 + 径向被积函数 (Problem 5, 11). 配球坐标转 1-D.</li>
    <li class="cs-def"><strong>δ-shell truncation</strong> $f \cdot \mathbf{1}_{|\mathbf{x}| \ge \delta}$: 用于原点 (或其它点) 处奇异性 (Problem 6). δ → 0 时 MCT.</li>
    <li class="cs-def"><strong>R-bounded truncation</strong> $f \cdot \mathbf{1}_{|\mathbf{x}| \le R}$ 切 ∞ 尾: 用于无界域非径向 (Problem 7).</li>
    <li class="cs-def"><strong>Half-open $[a, c_k]$ truncation</strong>: 用于改进 Riemann 端点 (Problem 19).</li>
    <li class="cs-def"><strong>双侧 $[-n, n]$ truncation</strong>: 用于 $\pm \infty$ 同时取极限 (Problem 8d).</li>

    <!-- 🟨 thm: 6 个核心定理 -->
    <li class="cs-thm"><strong>MCT (Thm 4.11.18)</strong>: $0 \le f_k \uparrow f$ a.e. ⟹ $f \in \IL$ ⟺ $\sup \int f_k &lt; \infty$.</li>
    <li class="cs-thm"><strong>DCT (Thm 4.11.19)</strong>: $f_k \to f$ a.e., $|f_k| \le g \in \IL$ ⟹ $f \in \IL$ 且 $\int f_k \to \int f$.</li>
    <li class="cs-thm"><strong>Lebesgue Fubini (Thm 4.11.10)</strong>: $h \in \IL(\R^n \times \R^m)$ ⟹ 迭代积分.</li>
    <li class="cs-thm"><strong>Product rule (Lec 7.3)</strong>: $f \in \IL$, $g \in \IR$ bounded ⟹ $fg \in \IL$.</li>
    <li class="cs-thm"><strong>Absolute value closure (Prop 4.11.13)</strong>: $f \in \IL$ ⟹ $|f| \in \IL$, $\left|\int f\right| \le \int |f|$.</li>
    <li class="cs-thm"><strong>Linearity of $\IL$ (Lec 7.3)</strong>: $a f + b g \in \IL$ 且 $\int = a \int f + b \int g$.</li>

    <!-- 🟢 tech: 4 个反复用的技巧 -->
    <li class="cs-tech"><strong>球坐标降维</strong>: $\int_{\R^n} f(|\mathbf{x}|)\,dV = \sigma_n \int_0^\infty f(r) r^{n-1}\,dr$. 把 $n$-维径向积分变 1-D.</li>
    <li class="cs-tech"><strong>内积分尺度换元</strong> $y = xu$: 在 $\int_0^{x^m}(x^2 + y^2)^{-p}\,dy$ 上提出 $x^{1-2p}$ 因子, 剩余积分 $I(x^{m-1})$ 只依赖端点.</li>
    <li class="cs-tech"><strong>渐近比较准则</strong>: $\int_0^1 x^a &lt; \infty \iff a &gt; -1$; $\int_1^\infty x^a &lt; \infty \iff a &lt; -1$. 加上 $\sim$ 关系即可判定 1-D 收敛.</li>
    <li class="cs-tech"><strong>MCT-DCT 二段法</strong>: 对变号 $f$, 先 MCT 用 $|f|$ 拿可积性, 再 DCT 用 $|f|$ 当 dominator 拿 $f \in \IL$ + 极限交换.</li>

    <!-- 🟥 pitfall: 3 个常见错误 -->
    <li class="cs-pitfall"><strong>忘了非负</strong>: MCT 要求 $f_k \ge 0$ 单调上升, 对变号 $f_k$ 不能直接套. 想用 MCT 先取 $|f_k|$ (但极限交换需要 DCT).</li>
    <li class="cs-pitfall"><strong>"bounded" ≠ "dominator"</strong>: DCT 要求 dominator $g \in \IL$, 不是常数 $M$. 在无界域上常数 $M$ 不可积 ⟹ $M$ 不是合法 dominator.</li>
    <li class="cs-pitfall"><strong>improper Riemann ≠ Lebesgue</strong>: $\int_1^\infty \sin(x)/x\,dx$ 改进 Riemann 收敛 (Dirichlet's test), 但 $\sin(x)/x \notin \IL(\R)$ 因为 $|\sin(x)/x|$ 不可积. 检验 $\IL$ 必须取绝对值.</li>
  </ul>
</div>
```

- [ ] **Step 10.2: Verification.** §8 总行数 ~50. 检查 emoji 渲染正常 (🟦🟨🟢🟥), li 间虚线分隔可见.

---

## Phase 11: §9 进一步阅读

**Files:** Modify `Review/homework/HW4.html` §9 section.

- [ ] **Step 11.1: 写 refs 列表.**

```html
<h2 id="sec9">§9 进一步阅读</h2>
<ul>
  <li><strong>原题与解答</strong>: 题目 <code>../../HW/Pset/HW4.pdf</code>; LaTeX 完整证明 <code>../../HW/Response/HW4_response.pdf</code>.</li>
  <li><strong>H&amp;H §4.11</strong> — Lebesgue 积分构造与性质. 本次 HW 全 6 题来自此节. 配套定理: Thm 4.11.10 (Fubini), Thm 4.11.13 (abs value), Thm 4.11.18 (MCT), Thm 4.11.19 (DCT).</li>
  <li><strong>对应 typed notes</strong>: <code>Notes/Typed/7.1_notes/7.1_notes.tex</code> (Daniell-Stone 构造), <code>Notes/Typed/7.2_notes/7.2_notes.tex</code> + <code>7.3_notes/7.3_notes.tex</code> (良定性 + 初等性质).</li>
  <li><strong>相关 topic 页</strong>:
    <ul>
      <li><a href="../topics/12-lebesgue-construction.html">Topic 12 — Lebesgue 积分的构造</a>: 砖块分解.</li>
      <li><a href="../topics/13-well-definedness.html">Topic 13 — 良定性证明</a>: truncation 与 Markov-style 估计.</li>
      <li><a href="../topics/14-lebesgue-properties.html">Topic 14 — Lebesgue 积分的初等性质</a>: 本次 HW §1 工具箱中除 MCT/DCT 外的所有定理.</li>
    </ul>
  </li>
  <li><strong>MT2 复习</strong>: <a href="../midterm2/MT2-C_lebesgue.html">MT2-C — Lebesgue 积分构造与性质</a> 是同一内容的主题式整理; <a href="../midterm2/MT2-practice.html">MT2 Practice</a> 第 4-5, 8-9 题与本次 HW Problem 8/19/11 同类.</li>
</ul>
```

- [ ] **Step 11.2: Verification.** §9 总行数 ~20. 所有内部链接 (`../topics/...`, `../midterm2/...`, `../../HW/...`) 实测可点开. 总页行数累计估算: scaffold 50 + §1 70 + §1.5 50 + §2 100 + §3 200 + §4 180 + §5 400 + §6 130 + §7 130 + §8 50 + §9 20 = **~1380**. 若实测 &gt; 2500 行触发 SPEC R1 拆页流程.

---

## Phase 12: index.html update + CSS .unavailable 修正

**Files:**
- Modify `Review/index.html` (lines 71-73 之间插入新 section)
- Modify `Review/style.css` (lines 268-272 移除硬编码 ::after 文本)

- [ ] **Step 12.1: 修正 style.css `.unavailable` 让它可重复使用.** 当前 lines 268-272 是:

```css
.topic-list li.unavailable .topic-meta::after {
  content: " · (待 Phase 3 完成)";
  color: #aa6633;
  font-style: italic;
}
```

把整个 `.topic-list li.unavailable .topic-meta::after` 规则**删掉** (这条规则是 Ch 4 Phase 3 期间临时用的, Ch 4 已完成, 此规则已无活跃 selector). 删除后 `.unavailable` 仅保留 lines 262-267 的 opacity 与 pointer-events 行为, 完全可复用. 删除后从原 268 行直接续 273 行 (空行).

- [ ] **Step 12.2: 修改 index.html 在 line 72 (`</section>` of MT2 section) 后, line 73 (`<!-- Part I -->`) 前, 插入新 section.**

Read `Review/index.html` 当前 lines 70-74:

```html
        </ul>
      </section>

      <!-- Part I -->
      <section class="part-section">
```

要在两个 section 之间插入. 用 Edit 工具替换:

```html
        </ul>
      </section>

      <!-- Homework 详解专区 -->
      <section class="part-section">
        <h2>Homework 详解专区 (每周 HW 的 HTML 讲解, 与 LaTeX response 互补)</h2>
        <ul class="topic-list">
          <li class="unavailable">
            <div class="topic-num">HW1</div>
            <div>
              <a class="topic-title">HW1 详解 (未实现)</a>
              <div class="topic-meta">§4.1 Riemann 积分基础 · 当前请参阅 <code>HW/Response/HW1_response.pdf</code></div>
            </div>
          </li>
          <li class="unavailable">
            <div class="topic-num">HW2</div>
            <div>
              <a class="topic-title">HW2 详解 (未实现)</a>
              <div class="topic-meta">§4.5 Fubini 与 §4.9 体积 · 当前请参阅 <code>HW/Response/HW2_response.pdf</code></div>
            </div>
          </li>
          <li class="unavailable">
            <div class="topic-num">HW3</div>
            <div>
              <a class="topic-title">HW3 详解 (未实现)</a>
              <div class="topic-meta">§4.10 CoV · 与 MT2-A/B 内容重合, 未来再决定如何处理 · 当前请参阅 <code>HW/Response/HW3_response.pdf</code></div>
            </div>
          </li>
          <li>
            <div class="topic-num">HW4</div>
            <div>
              <a class="topic-title" href="homework/HW4.html">HW4 详解 — §4.11 Lebesgue 积分 MCT/DCT 6 题</a>
              <div class="topic-meta">§4.11 Ex 5, 6, 7, 8, 11, 19</div>
              <div class="topic-desc">本次 HW 是 MCT/DCT 应用集. 含 p-参数 truncation 联合策略 + Lebesgue 版 IBP 完整链条 + 跨题方法论速查.</div>
            </div>
          </li>
        </ul>
      </section>

      <!-- Part I -->
      <section class="part-section">
```

- [ ] **Step 12.3: Verification.** Refresh `Review/index.html` in browser. Check: 新的 Homework 专区在 MT2 与 Part I 之间, HW1/2/3 灰色 (opacity 0.5) 不可点击, HW4 是普通蓝色链接. 点 HW4 链接进入 HW4.html. 整个 index 视觉无破坏.

---

## Phase 13: CLAUDE.md routine 更新

**Files:** Modify `/Users/zefan/SP26/MATH 31CH/CLAUDE.md`.

- [ ] **Step 13.1: 找到 "Routine: Review HTML Pages (Self-Study Guide)" 节末尾 (在 "Folder Structure" 之前), 插入新 routine.**

```markdown
## Routine: HW HTML 讲解 (Self-Study Companion)

**触发**: HW LaTeX response 完成提交后, 可选地转为 HTML 详解页. 与 Review/topics/ 与 Review/midterm2/ 平行的第三层复习资料.

### Content requirements

- **Source of truth: LaTeX response (`HW/Response/HWN_response.tex`)**. 数学不重证, 只重新包装. 若发现 LaTeX 可疑可标记, 不主动修证明逻辑.
- **HTML 相对 LaTeX 的增量**: 策略段 (为什么选这条路) + 反思段 (几何/物理直觉, 跨题对比) + 方法论 cheat sheet. 这是 self-study companion 的核心价值.
- **页面结构**: 9 section 题型驱动 (§1 总览 + 题型分布表 + 通用工具箱 → 可选 §1.5 跨题联合策略 → §2-§K 每题 4 段 题面/策略/证明/反思 → §K+1 cheat sheet → §K+2 进一步阅读).
- **默认折叠**: 策略段展开 (帮回忆), 证明段 `<details>` 折叠 (鼓励先尝试).
- **case-heavy 证明**: `<details>` 套 `<details>`, 每个 case 单独折叠.
- **multi-part 题** (如 4.11.8 的 a/b/c/d): special envelope — 串联引入 + 各 part 题面+证明 + 整体反思.

### Format requirements

- **位置**: `Review/homework/HWN.html` (subdirectory `Review/homework/`).
- **样式继承**: 完全复用 `Review/style.css` 与 `Review/scripts.js`; KaTeX setup 从 `Review/midterm2/MT2-practice.html` 头部复制.
- **Box classes**: `box def` 题面 / `box thm` 证明 (在 `<details>` 内) / `box remark` 反思 / `box pitfall` 警示 / `box prereq` 工具箱 / `cheat-sheet` cs-def/cs-thm/cs-tech/cs-pitfall.
- **占位项**: 未实现的 HW 在 `index.html` 用 `<li class="unavailable">` 包裹 (CSS 已修复为可复用).
- **完成后更新**: `Review/index.html` 把对应 HWN 的 `<li class="unavailable">` 换成实链接.
- **风格**: 中文叙述 + 英文 LaTeX 数学 (与 topic/MT2 一致).
- **设计规约**: 完整规约见 `Review/homework/SPEC.md`.

### Numbering & cross-linking

- HW 页**不引入** Def/Thm 全局计数器 (与 topic 页不同). 用 Problem 4.11.X (textbook 编号) 作问题锚点, 证明内部 Step 1/2/3.
- 链接方向: HW 页 → topic 页 / MT2 页 (单向). topic/MT2 页不反向链 HW 页 (避免反复变更).
```

- [ ] **Step 13.2: Verification.** Read CLAUDE.md, 确认新 routine 在 "Routine: Review HTML Pages" 之后、"Folder Structure" 之前.

---

## Phase 14: Final visual & integrity verification

**Files:** All affected files (read-only at this stage).

- [ ] **Step 14.1: Open `Review/index.html` and click HW4 link → arrive at HW4.html.**

- [ ] **Step 14.2: HW4.html visual audit (顶到底).**
  - Top nav: prev/next 灰 (无), center 链回主页能跳转.
  - Sidebar TOC: 10 项 (含 §1.5) 全部对应右侧 `<h2>`, 点击平滑滚动.
  - §1 题型分布表: 6 行整齐, math 在 cell 内不溢出.
  - §1 通用工具箱 prereq box: 灰蓝, 6 条 bullet.
  - §1.5 模板 box thm: 黄色, 4 步清晰.
  - §2-§4: 每题 4 段 (蓝/普通/黄折叠/紫) 颜色顺序一致.
  - §3, §4 内嵌 `<details>` per case: 外层与内层可独立展开/折叠.
  - §5: 4 个 subsection 标题, §5.0 串联段, §5.e 整体反思.
  - §6, §7: 4 段标准结构.
  - §8: cheat sheet, emoji 🟦🟨🟢🟥 各自出现.
  - §9: refs 全部可点击.

- [ ] **Step 14.3: KaTeX 渲染抽查.** 在每节随机点开一个 `<details>`, 确认 inline math 与 display math ($$...$$, \[...\], $...$, \(...\)) 都渲染成正常公式而非红字或 raw LaTeX.

- [ ] **Step 14.4: 浏览器 console 检查.** 打开 devtools, 刷新页面. 期望: 0 errors, 0 warnings (KaTeX 设置 `throwOnError: false`, 即使有公式问题也只是红字渲染不会抛错).

- [ ] **Step 14.5: 行数 sanity check.** `wc -l Review/homework/HW4.html`. 期望 ~1400-2200. 若 &gt; 2500 触发 SPEC R1 拆页 (典型切线: §5 拆为 HW4-8.html).

- [ ] **Step 14.6: 跨页 round-trip.** 从主 index 点入 HW4 → §9 refs 跳 Topic 12 → 浏览器后退回 HW4 → 跳 MT2-C → 后退. 全程无 404, 无 JS 错误.

- [ ] **Step 14.7: Mobile responsiveness.** Devtools 切换到 mobile size (&lt; 900px), sidebar TOC 收起到 toggle button, 点击 ≡ 目录展开 overlay, 锚点跳转后自动关闭 overlay.

---

## Out-of-Scope Reminders (per SPEC §8)

- **R1 (页面尺寸)**: 若 Phase 14.5 超 2500 行, 把 §5 (Problem 4.11.8 含 4 part) 拆到独立 `HW4-8.html`, 并在主 HW4.html §5 留 stub 链接到 HW4-8.html. 不重做设计.
- **R2 (HW3 / MT2 重叠)**: 出 scope. 未来补 HW3.html 时再处理.
- **R3 (LaTeX 数学忠实度)**: 不主动 re-prove. 翻译时若发现可疑步骤可在 implementation 笔记里标记, 不阻塞当前 phase.

---

## Total estimated effort

- HW4.html scaffold + content: 11 phases × 10-30 min each = ~3-4 hours of focused work
- index.html + CSS + CLAUDE.md updates: ~20 min
- Verification (Phase 14): ~15 min

Total: ~4 hours, single session feasible with subagent-driven parallelization for §2-§7 (each problem section can be written by an independent subagent against the LaTeX source, then concatenated).

# MT2 Review Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 4-page parallel HTML review section in `Review/midterm2/` (MT2-overview + MT2-A linear CoV + MT2-B nonlinear CoV + MT2-C Lebesgue) that covers H&H §4.9–4.11 in exam-prep mode, integrate it into the main `Review/index.html`, and verify math correctness end-to-end.

**Architecture:** 4 static HTML pages following the 7-section exam-oriented structure spec'd in `Review/midterm2/SPEC.md`. They share the existing `Review/style.css` and `Review/scripts.js` (subfolder-adjusted paths). One small CSS addition (`.textbook-index` table styling). One markup addition to `Review/index.html` (new `<section class="part-section">`).

**Tech Stack:** Pure static HTML + KaTeX 0.16.11 via jsdelivr CDN + vanilla CSS/JS. No build step. Browser-tested via `open <path>.html`.

**Reference docs:**
- Spec contract: `Review/midterm2/SPEC.md` — every task must conform
- Existing template exemplar: `Review/topics/08-linear-cov.html` (Topic 08, the cleanest existing structural model)
- KaTeX safety rules: see SPEC §7
- Project conventions: `CLAUDE.md` (root) — especially the "Review HTML Pages" routine

**Not a git repo** — the project directory is not under version control (verified at plan-writing time). Wherever a typical plan would say "commit", we instead say "save and visually verify in browser". No `git commit` commands appear in this plan.

---

## File Structure (Locked In)

**Create:**
- `Review/midterm2/MT2-A_linear_cov.html` — §4.9 page (~6-8k Chinese chars; ~30-40kb HTML)
- `Review/midterm2/MT2-B_nonlinear_cov.html` — §4.10 page (~6-8k chars; ~40-50kb HTML)
- `Review/midterm2/MT2-C_lebesgue.html` — §4.11 page (~8-10k chars; ~45-55kb HTML)
- `Review/midterm2/MT2-overview.html` — entry + cross-chapter cheat + mock mini-final (~4-5k chars; ~20-30kb HTML)

**Modify:**
- `Review/style.css` — append ~5-8 lines for `.textbook-index` table styling (after existing rules, no other changes)
- `Review/index.html` — insert a new `<section class="part-section">` above the existing 14-topic TOC

**Untouched but referenced:**
- `Review/scripts.js` — no changes needed (scroll-spy works on any anchor-IDed sections)
- `Review/topics/08-14.html` — read-only sources for math baseline; cross-linked from MT2 pages but not modified
- `Notes/Typed/5.{1,2,3}_notes/`, `Notes/Typed/6.{1,2}_notes/`, `Notes/Typed/7.{1,2,3}_notes/` — read-only sources
- `HW/Pset/HW3.pdf`, `HW/Response/HW3_response.tex` — read-only sources (gold mine for MT2-A/B exercises)
- `Vector Calculus, Linear Algebra, and Differential Forms A Unified Approach.pdf` — H&H textbook (read §4.9, §4.10, §4.11)

---

## Task 1: Add `.textbook-index` Table CSS

**Files:**
- Modify: `Review/style.css` (append at end of file)

**Purpose:** Add minimal styling for the §5 textbook example index tables. Spec §5 requires bordered cells, compact rows, slightly darker header strip.

- [ ] **Step 1: Open `Review/style.css` and inspect last existing rule**

Run: `tail -20 "/Users/zefan/SP26/MATH 31CH/Review/style.css"`
Expected: see the last existing CSS rule (likely media query or footer style). Note the indentation and comment-style convention used.

- [ ] **Step 2: Append the `.textbook-index` rules**

Add these lines to the end of `Review/style.css`:

```css

/* ---- Textbook example index table (MT2 review §5) ---- */
.textbook-index {
  border-collapse: collapse;
  width: 100%;
  margin: 16px 0;
  font-size: 0.92em;
}
.textbook-index th,
.textbook-index td {
  border: 1px solid #d8d3c4;
  padding: 6px 10px;
  text-align: left;
  vertical-align: top;
}
.textbook-index thead th {
  background: #f5efde;
  font-weight: 600;
  color: #4a4030;
}
.textbook-index tbody tr:hover {
  background: #faf7ec;
}
```

- [ ] **Step 3: Save and verify rendering**

The CSS won't be visible yet (no page uses `.textbook-index` until Task 3). But we verify CSS is syntactically valid by:

Run: `cat "/Users/zefan/SP26/MATH 31CH/Review/style.css" | grep -c "textbook-index"`
Expected: `5` (5 rule selectors mentioning the class)

---

## Task 2: Build Shared MT2-Page HTML Template Skeleton

**Files:**
- Create: `Review/midterm2/_template.html` (working file — will be deleted at end of project; serves as the reference skeleton)

**Purpose:** Establish a single canonical skeleton that all MT2-A/B/C pages will start from. Saves time and ensures cross-page consistency. The template includes: KaTeX setup with all macros, `<link>` / `<script>` paths adjusted for subfolder, top nav placeholders, sidebar TOC with §1-§7 entries, empty section scaffolds with anchor IDs.

- [ ] **Step 1: Read the cleanest existing topic page as model**

Run: `wc -l "/Users/zefan/SP26/MATH 31CH/Review/topics/08-linear-cov.html"` to gauge size.

Then read `Review/topics/08-linear-cov.html` lines 1-50 to copy the `<head>` block.

- [ ] **Step 2: Create the template file**

Write the following to `Review/midterm2/_template.html`:

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MT2-X: PAGE TITLE | MATH 31CH 复习</title>
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
    <a class="nav-prev" href="PREV_PAGE.html">PREV_LABEL</a>
    <a class="nav-center" href="../index.html">MATH 31CH 复习 · 主页</a>
    <a class="nav-next" href="NEXT_PAGE.html">NEXT_LABEL</a>
  </nav>

  <div class="container">

    <!-- Sidebar TOC -->
    <aside class="sidebar-toc">
      <h3>本页目录</h3>
      <button class="toc-toggle">≡ 目录</button>
      <ul>
        <li><a href="#cheatsheet">§1 速查表</a></li>
        <li><a href="#theorems">§2 关键定理 + 重证</a></li>
        <li><a href="#problem-types">§3 题型聚簇</a></li>
        <li><a href="#pitfalls">§4 常考陷阱</a></li>
        <li><a href="#textbook-index">§5 课本例题速查</a></li>
        <li><a href="#exercises">§6 模拟练习</a></li>
        <li><a href="#crossref">§7 Topics cross-reference</a></li>
      </ul>
    </aside>

    <main>
      <h1>MT2-X: PAGE TITLE</h1>
      <p class="subtitle">SUBTITLE — H&amp;H §4.X · Lec X.Y · MT2 复习</p>

      <!-- §1 -->
      <h2 id="cheatsheet">§1 速查表</h2>
      <div class="cheat-sheet">
        <ul>
          <!-- CONTENT: emoji-tagged bullets -->
        </ul>
      </div>

      <!-- §2 -->
      <h2 id="theorems">§2 关键定理 + 极简重证</h2>
      <!-- CONTENT: 1-5 box thm + numbered mnemonic sketches -->

      <!-- §3 -->
      <h2 id="problem-types">§3 题型聚簇</h2>
      <!-- CONTENT: 2-6 cluster subsections, each with own h3+id -->

      <!-- §4 -->
      <h2 id="pitfalls">§4 常考陷阱清单</h2>
      <!-- CONTENT: ul of links + detailed box pitfall boxes -->

      <!-- §5 -->
      <h2 id="textbook-index">§5 课本例题速查</h2>
      <table class="textbook-index">
        <thead><tr><th>H&amp;H 编号</th><th>主题</th><th>Takeaway</th></tr></thead>
        <tbody>
          <!-- CONTENT: 10-20 rows -->
        </tbody>
      </table>

      <!-- §6 -->
      <h2 id="exercises">§6 模拟练习</h2>
      <p>展开 <code>&lt;details&gt;</code> 查看答案。难度递增: 3 routine → 3 mid → 2 stretch。</p>
      <!-- CONTENT: 6-8 div.exercise blocks with hidden answers -->

      <!-- §7 -->
      <h2 id="crossref">§7 与 Topics 的 Cross-Reference</h2>
      <ul>
        <!-- CONTENT: links back to Topics 08-14 + lecture notes -->
      </ul>

      <hr style="margin: 60px 0 20px; border: 0; border-top: 1px solid #d8d3c4;">
      <p style="font-size: 13px; color: #888; text-align: center;">MATH 31CH 复习指南 · MT2-X · H&amp;H §4.X</p>

    </main>
  </div>

</body>
</html>
```

- [ ] **Step 3: Verify the template opens in browser without errors**

Run: `open "/Users/zefan/SP26/MATH 31CH/Review/midterm2/_template.html"`

Visual check (10 sec):
- Page loads, no KaTeX render errors (page contains no math so should be clean)
- Top nav, sidebar TOC, main column all visible
- Empty section headings §1-§7 rendered
- Inspect: `../style.css` actually resolves (no broken link error in dev console)

If any of these fail, fix the template paths or HTML structure before proceeding.

---

## Task 3: Write `MT2-A_linear_cov.html` (§4.9 — Linear CoV)

**Files:**
- Create: `Review/midterm2/MT2-A_linear_cov.html` (copy from `_template.html`, then fill content)

**Purpose:** First real MT2 page. Validates the 7-section structure with concrete content. Used as the *exemplar* for subagents writing MT2-B and MT2-C in later tasks.

**Source materials to read before writing:**
- H&H §4.9 (Vector Calculus PDF) — main theorems 4.9.1 (DSV) and proof structure, Example 4.9.3 etc.
- `Review/topics/08-linear-cov.html` — existing typed treatment, math correctness baseline
- `Notes/Typed/5.1_notes/5.1_notes.pdf` and `Notes/Typed/5.2_notes/5.2_notes.pdf` — lecture flow
- `HW/Pset/HW3.pdf` problems 4.9.1, 4.9.3, 4.9.5 — exercise mining
- `HW/Response/HW3_response.tex` problems 4.9.1, 4.9.3, 4.9.5 — student solution style

- [ ] **Step 1: Read all source materials**

Run (use Read tool, not Bash):
- Read `Review/topics/08-linear-cov.html` fully (in chunks if needed)
- Read `Notes/Typed/5.1_notes/5.1_notes.pdf` and `5.2_notes/5.2_notes.pdf`
- Read `Vector Calculus, Linear Algebra, and Differential Forms A Unified Approach.pdf` pages around §4.9 (search index or skim TOC; the section is typically ~10-15 pages)
- Read `HW/Pset/HW3.pdf` problems 4.9.1, 4.9.3, 4.9.5 (these are in the LaTeX response, easier to read)
- Read `HW/Response/HW3_response.tex` to see the problem statements + student approach

Take notes (mental or scratch) on:
- 2 theorems for §2 (DSV + Linear CoV) with proof outlines
- 2-4 problem-type clusters for §3
- 6-12 pitfalls for §4
- 10-20 H&H examples/exercises for §5
- 6-8 exercises for §6 (3 routine + 3 mid + 2 stretch)

- [ ] **Step 2: Read the template and create MT2-A via Write tool**

First Read `Review/midterm2/_template.html` (so the Edit tool has Read state for the source content). Then use the **Write tool** (not `cp`) to create `Review/midterm2/MT2-A_linear_cov.html` with the template content as a starting body, with the header/nav fields filled in:

- `<title>`: `MT2-A: §4.9 线性 CoV | MATH 31CH 复习`
- `<h1>`: `MT2-A: 行列式 scales 体积 + 线性 CoV`
- `<p class="subtitle">`: `H&amp;H §4.9 · Lec 5.1, 5.2 · MT2 复习 · 配套 Topic 08`
- nav-prev: `href="MT2-overview.html"` label `MT2 总览`
- nav-next: `href="MT2-B_nonlinear_cov.html"` label `MT2-B`
- Footer line: `MATH 31CH 复习指南 · MT2-A · H&amp;H §4.9`

(Rationale: `cp` via Bash creates a new file path that Edit tool has not Read; subsequent Edit calls would fail with "must Read first". Using Write directly avoids this.)

- [ ] **Step 3: Fill §1 速查表 (cheat sheet)**

Replace `<!-- CONTENT: emoji-tagged bullets -->` with ~10-15 `<li>` entries covering:
- 🟦 DSV statement: `vol_n(T(A)) = |det T| · vol_n(A)` for invertible T linear, A pavable
- 🟦 Linear CoV statement: `∫f dV = |det T| ∫f(T(x)) dV`
- 🟨 Proof scaffold: non-invertible (trivial) → invertible via elementary matrices
- 🟨 vol(T(Q_n)) = |det T| (cube image volume = det)
- 🟢 Translation invariance + scaling: `vol(tA) = |t|^n vol(A)`, `vol(A+v) = vol(A)`
- 🟢 Multiplicativity: `vol(ST(Q_n)) = vol(S(Q_n)) · vol(T(Q_n))`
- 🟢 Elementary matrix 3 types (scaling / shear / swap) — each maps Q to volume |m| / 1 / 1
- 🟥 Orthogonal map `det = ±1` → 保 volume
- 🟥 必须 T 可逆才能 apply Linear CoV (non-invertible 让 image 测度零, RHS 没意义)
- 🟥 注意 `|det T|` 是绝对值，不是 det 本身

Use the existing emoji-tagged `<li>` style verified in topic pages (e.g. `<li class="cs-thm">🟨 …</li>`).

- [ ] **Step 4: Fill §2 关键定理 + 重证 (theorems)**

Two `<div class="box thm">` blocks, each followed by a numbered mnemonic sketch.

**Theorem A.1 (DSV, Determinant Scales Volume, ≡ Topic 08 Thm 8.2 / H&amp;H Thm 4.9.1)**

State precisely (refer to Topic 08 for exact phrasing). Then mnemonic sketch as numbered list:

1. **Non-invertible case** (trivial): T(R^n) ⊆ proper subspace ⟹ T(A) measure zero ⟹ vol = 0; RHS also 0 since det T = 0.
2. **Invertible case Step II**: T(D_N) is nested paving (each refinement of D_N maps to refinement of T(D_N)) — uses operator norm bound `diam T(C) ≤ |T| · √n / 2^N → 0`.
3. **Invertible case Step III**: For any dyadic cube C, `vol_n(T(C)) = vol_n(T(Q_n)) · vol_n(C)` via translation invariance + `vol(tA) = |t|^n vol(A)` scaling.
4. **Invertible case Step IV**: Extend to arbitrary pavable A via upper/lower sums `U_N(1_{T(A)}) = vol_n(T(Q_n)) · U_N(1_A)`.
5. **Invertible case Step V**: `vol_n(T(Q_n)) = |det T|` via T = E_k...E_1 elementary matrix decomposition, check 3 types case by case (diagonal scale m → vol |m|; shear → vol 1 via direct calc + block decomp for higher dim; swap → vol 1 via vertex relabel), combined via multiplicativity lemma.

Cross-ref: `<p>详证: 见 <a href="../topics/08-linear-cov.html">Topic 08 §4 Thm 8.1-8.5</a>; H&amp;H Thm 4.9.1.</p>`

**Theorem A.2 (Linear Change of Variables, ≡ Topic 08 Thm 8.6 / H&amp;H Thm 4.10.x linear case)**

State: For invertible linear T and f ∈ 𝓘_R(R^n), `∫f dV = |det T| ∫f(T(x)) dV`.

Mnemonic sketch:
1. Transport both U_N and L_N from dyadic paving D_N to nested paving T(D_N).
2. Key identity: `U_N(|det T|·(f∘T)) = Σ M_C(f∘T)·|det T|·vol(C) = Σ M_{T(C)}(f)·vol(T(C)) = U_N^T(f)` — uses bijectivity for sup-shift and DSV for vol-shift.
3. Convergence on T(D_N) (Thm 2.1 monotonicity transfers since T is bijective) gives integrability + identity simultaneously.

Cross-ref: `<p>详证: <a href="../topics/08-linear-cov.html">Topic 08 §4</a>; H&amp;H §4.10 (线性情形).</p>`

- [ ] **Step 5: Fill §3 题型聚簇 (problem clusters)**

2-4 cluster subsections. Recommended for MT2-A:

**§3.1 计算 |det T| 然后变量代换**: Identify a linear map T from problem context, compute |det T|, transform integral. Worked examples drawn from HW3 P4.9.x. Anchor: `id="cluster-compute-det"`. 1-2 worked `<div class="box example">`.

**§3.2 用对称性/translation 化简 vol** (e.g., vol(parallelepiped) = |det[a,b,c]| via DSV applied to T mapping unit cube). Anchor `id="cluster-symmetry-vol"`. 1-2 worked examples.

**§3.3 把 ellipsoid / 平行四边形 转回 unit ball / unit square** (the classical setup: ellipsoid {(x/a)² + (y/b)² + (z/c)² ≤ 1} = T(unit ball) with T = diag(a,b,c), vol = abc · (4π/3)). Anchor `id="cluster-stretch-affine"`. Examples from H&H §4.9 + HW3 P4.9.5.

Each cluster's structure (see SPEC §3): 识别信号 → 标准做法 → worked example(s) in `box example` with own `id="example-A-X"` → 常见变体.

- [ ] **Step 6: Fill §4 常考陷阱清单 (pitfalls)**

Master `<ul>` of 6-12 one-liner links + 2-4 detailed `<div class="box pitfall">` boxes. Suggested pitfalls:

1. 忘记 `|det T|` 的绝对值
2. T 非可逆时仍尝试 apply Linear CoV (RHS undefined; LHS = 0 directly because image measure zero)
3. 把 `T(A)` 的 pavability 当作显然 — 实际需要 image paving 验证 4 个 axioms
4. 把"orthogonal map preserves volume"错记成"preserves Lebesgue integral" (前者 vol, 后者要 |det| = 1 才相同效果)
5. Translation 不改变 volume 但改变积分变量 — substitution 时仍要做 change of variable
6. Elementary matrix decomposition 不唯一 — 但 |det| 永远 = |det T|

Hyperlink each to either `#cluster-...` or `#example-A-X` for detail.

Detailed `<div class="box pitfall">` boxes for pitfalls #1 and #4 (most-frequent mistakes) at end of §4.

- [ ] **Step 7: Fill §5 课本例题速查表**

A `<table class="textbook-index">` with 10-15 rows. Each row: H&H reference + 主题 + takeaway. Mine H&H §4.9 + neighboring sections for examples relevant to linear CoV.

Suggested rows:
- Example 4.9.1 — vol of parallelogram — `vol(P(v_1,...,v_n)) = |det[v_1...v_n]|`
- Example 4.9.3 — translation invariance — `vol(A+v) = vol(A)`
- Example 4.9.5 — orthogonal map — `det S = ±1, S 保 volume`
- Exercise 4.9.1 — compute vol of specific parallelepiped via DSV
- Exercise 4.9.5 — vol of ellipsoid
- ...continue for 10-15 entries

- [ ] **Step 8: Fill §6 模拟练习 (6-8 exercises)**

Sources per SPEC §6:
- Routine (3 questions): adapt HW3 P4.9.1 (routine — direct DSV application), plus 2 H&H §4.9 simple exercises
- Mid (3 questions): adapt HW3 P4.9.3 + P4.9.5 (mid — multistep), plus 1 synthesized "compute vol of given polygon via DSV"
- Stretch (2 questions): synthesize 2 exam-style problems combining DSV + Linear CoV + integral computation

Use existing `<div class="exercise">` markup with `<span class="ex-num">1.</span>` numbering and `<details><summary>答案</summary><div class="details-body">...</div></details>` for hidden answers.

- [ ] **Step 9: Fill §7 cross-reference**

A `<ul>` with 3-5 items pointing to:
- `<a href="../topics/08-linear-cov.html">Topic 08</a>` — 完整证明 + 更多 detail
- Typed lecture notes: `<code>../../Notes/Typed/5.1_notes/5.1_notes.pdf</code>` and `5.2_notes`
- H&H §4.9 直接引用

- [ ] **Step 10: Save file and visually verify in browser**

Run: `open "/Users/zefan/SP26/MATH 31CH/Review/midterm2/MT2-A_linear_cov.html"`

Manual checklist (~5 min):
- [ ] Page loads, no KaTeX errors (red rendering = error)
- [ ] All section headers §1-§7 visible
- [ ] Sidebar TOC shows §1-§7, scroll-spy active state cycles as you scroll
- [ ] Top nav prev/next links work (prev → MT2-overview.html will 404 until Task 7 — that's expected; next → MT2-B_nonlinear_cov.html will 404 until Task 5 — expected)
- [ ] nav-center `../index.html` works (loads main review index)
- [ ] All §1 cheat-sheet emoji bullets render with color tags
- [ ] §2 box thm blocks render with title + math + cross-link
- [ ] §3 clusters render, each cluster has its own subheading
- [ ] §4 pitfall list hyperlinks navigate to correct anchors within page (smoke test 2-3 of them)
- [ ] §5 textbook index table renders with `.textbook-index` styling (bordered, compact, header strip darker)
- [ ] §6 exercises render with hidden answers; click 1-2 `<details>` to verify they expand
- [ ] §7 cross-ref links work (Topic 08 link goes to `../topics/08-linear-cov.html`)

If any check fails, fix and re-verify before moving on.

---

## Task 4: ⏸️ USER CHECKPOINT — Review MT2-A

**This is a hard pause. Do NOT proceed to Task 5 without explicit user approval.**

- [ ] **Step 1: Present MT2-A to user**

Tell user: "MT2-A is complete and saved at `Review/midterm2/MT2-A_linear_cov.html`. Please open it in your browser and review:
- Section structure (7-section as spec'd)
- Math correctness — especially §2 theorem mnemonics and §6 exercises  
- Tone (is the 'exam-cram' personality right?)
- Cluster organization in §3
- Whether the 课本例题 mapping in §5 is what you want

Any feedback before I write MT2-B and MT2-C using this template?"

- [ ] **Step 2: Apply any user feedback**

If user requests changes to MT2-A's structure / tone / content: apply them to MT2-A *first*, get re-approval, THEN proceed. If structural changes (e.g., "let's make §5 a card grid not a table"), this is critical because MT2-B/C will replicate the pattern.

- [ ] **Step 3: Get explicit OK to proceed**

Only proceed to Task 5 after user says "OK proceed" or equivalent.

---

## Task 5: Write `MT2-B_nonlinear_cov.html` (§4.10 — Nonlinear CoV)

**Files:**
- Create: `Review/midterm2/MT2-B_nonlinear_cov.html`

**Dispatch model:** Subagent. The subagent receives a focused briefing (see Step 1) and produces the full file.

**🔀 Parallel execution with Task 6 (MT2-C)**: Tasks 5 and 6 SHOULD be dispatched concurrently. Concretely, in **one** assistant message, make **two** `Agent` tool calls in parallel — one for MT2-B (this task) and one for MT2-C (Task 6). Each subagent runs independently with its own briefing prompt. Then process both results in the next message turn. (See "Notes on Execution" at end of plan for rationale.)

**Source materials (subagent will need to read):**
- H&H §4.10 (Vector Calculus PDF) — main theorem 4.10.12 (Nonlinear CoV) + polar/spherical/cylindrical
- `Review/topics/09-nonlinear-cov.html` and `Review/topics/10-cov-patterns.html`
- `Notes/Typed/5.3_notes/5.3_notes.pdf` and `Notes/Typed/6.1_notes/6.1_notes.pdf`
- `HW/Pset/HW3.pdf` problems 4.10.4, 4.10.9, 4.10.12, 4.10.17, 4.10.18, 4.10.19
- `HW/Response/HW3_response.tex` corresponding problems

- [ ] **Step 1: Dispatch subagent with full briefing**

Use the Agent tool with `subagent_type: general-purpose`. Brief prompt:

```
Task: Write MT2-B_nonlinear_cov.html — the §4.10 Nonlinear CoV page of the MT2 review section for MATH 31CH.

Contract (must follow exactly): /Users/zefan/SP26/MATH 31CH/Review/midterm2/SPEC.md — read this FIRST. Pay especially close attention to:
- §4 (7-section structure per page)
- §6 (numbering convention: use B.1, B.2, ... locally; cross-link to Topic 09/10/H&H Thm 4.10.x)
- §7 (KaTeX-safe math, box class names)
- §9 (HW3 problems 4.10.* are gold mine for §6 exercises)

Template exemplar: /Users/zefan/SP26/MATH 31CH/Review/midterm2/MT2-A_linear_cov.html — copy its structure verbatim (nav, sidebar TOC, section headings, anchor IDs), then fill content for §4.10.

Output: /Users/zefan/SP26/MATH 31CH/Review/midterm2/MT2-B_nonlinear_cov.html

Specific content requirements for MT2-B:
- §2 needs 2-3 theorems: Nonlinear CoV main theorem (Thm 4.10.12), Lipschitz/C^1 relationship lemma, classical Jacobians table (polar, spherical, cylindrical)
- §3 needs 4-6 clusters. Suggested: (a) 极坐标 setup; (b) 球坐标 setup with z = r sin φ convention; (c) 柱坐标 setup; (d) Symmetry-driven design pattern; (e) Boundary-driven design pattern (with IFT shortcut); (f) Slice-driven design pattern
- §6 needs 6-8 exercises: routine + mid from HW3 P4.10.4, 4.10.9, 4.10.12, 4.10.17-19 (adapt); stretch synthesized

Source files to read (use Read tool):
- /Users/zefan/SP26/MATH 31CH/Review/midterm2/SPEC.md
- /Users/zefan/SP26/MATH 31CH/Review/midterm2/MT2-A_linear_cov.html (template + style exemplar)
- /Users/zefan/SP26/MATH 31CH/Review/topics/09-nonlinear-cov.html
- /Users/zefan/SP26/MATH 31CH/Review/topics/10-cov-patterns.html
- /Users/zefan/SP26/MATH 31CH/Notes/Typed/5.3_notes/5.3_notes.pdf
- /Users/zefan/SP26/MATH 31CH/Notes/Typed/6.1_notes/6.1_notes.pdf
- /Users/zefan/SP26/MATH 31CH/Vector Calculus, Linear Algebra, and Differential Forms A Unified Approach.pdf (search for §4.10, skim pages)
- /Users/zefan/SP26/MATH 31CH/HW/Response/HW3_response.tex (problems 4.10.4 onwards)

Hard rules:
- Do NOT invent math. Every theorem / example must trace to one of the cited sources.
- Do NOT use LaTeX-only commands (\label, \ref, \begin{equation}, \begin{align}) — KaTeX will break.
- Use the **Write tool** to create the output HTML file (not Bash heredoc / cat <<EOF).
- Use macros from the existing per-page KaTeX setup; if you need a new macro (e.g., \Jac), add it to the page's KaTeX block at top.
- Numbering: Def B.1, Thm B.1, Example B.1, Pitfall B.1 (counters per type; Lemma/Cor/Prop share Thm counter).
- All inline math must use KaTeX-safe form: `$\R^n$` not `R^n`, `$\det T$` not `det T`, etc. The macros `\R, \N, \Z, \Q, \eps, \IR, \IL, \osc, \vol, \supp, \abs{}, \norm{}` are pre-defined and should be used wherever applicable.
- Do NOT attempt to open the file in a browser yourself — you don't have a display. Instead, after writing, do a static lint: read your output back, grep for any of the forbidden LaTeX-only commands (must be 0 matches), confirm all 7 anchor IDs are present (`cheatsheet`, `theorems`, `problem-types`, `pitfalls`, `textbook-index`, `exercises`, `crossref`), confirm `<link rel="stylesheet" href="../style.css">` and `<script defer src="../scripts.js">` paths.

Length target: ~6-8k Chinese chars (similar to MT2-A in scale, possibly slightly larger due to 3 coordinate systems).

Report back: "MT2-B written to <path>. Length: X lines / Y bytes. Static lint: pass/fail (which checks). Anything I had to invent: …"
```

- [ ] **Step 2: Receive subagent output**

When subagent reports completion, do NOT trust the report — verify directly.

- [ ] **Step 3: Read subagent's output file end-to-end**

Run: `wc -l "/Users/zefan/SP26/MATH 31CH/Review/midterm2/MT2-B_nonlinear_cov.html"` to check size sanity (~600-1000 lines expected).

Read the file fully via Read tool. Check:
- All 7 sections present with correct anchor IDs (`#cheatsheet`, `#theorems`, `#problem-types`, `#pitfalls`, `#textbook-index`, `#exercises`, `#crossref`)
- KaTeX setup block matches template (with any added page-specific macros)
- No `\label`, `\ref`, `\begin{equation}`, `\begin{align}`
- All cross-links use `../topics/09-...` or `../topics/10-...` paths (subfolder-correct)
- Numbering uses `B.x` locally + `≡ Topic 09 Thm 9.x` style cross-link

- [ ] **Step 4: Browser smoke test MT2-B**

Run: `open "/Users/zefan/SP26/MATH 31CH/Review/midterm2/MT2-B_nonlinear_cov.html"`

Same checklist as Task 3 Step 10, applied to MT2-B.

If issues: fix inline (don't re-dispatch — the subagent's done its job; you adjust details).

---

## Task 6: Write `MT2-C_lebesgue.html` (§4.11 — Lebesgue Integral)

**Files:**
- Create: `Review/midterm2/MT2-C_lebesgue.html`

**Dispatch model:** Subagent, **dispatched in the same assistant message as Task 5** for parallel execution (see Task 5's dispatch note). This page is the heaviest — 4 source topics, no HW source for exercises (must synthesize from H&H §4.11 only).

**Source materials:**
- H&H §4.11 (Vector Calculus PDF)
- `Review/topics/11-limits-riemann.html`
- `Review/topics/12-lebesgue-construction.html`
- `Review/topics/13-well-definedness.html`
- `Review/topics/14-lebesgue-properties.html`
- `Notes/Typed/6.2_notes/6.2_notes.pdf`
- `Notes/Typed/7.1_notes/7.1_notes.pdf`
- `Notes/Typed/7.2_notes/7.2_notes.pdf`
- `Notes/Typed/7.3_notes/7.3_notes.pdf`

- [ ] **Step 1: Dispatch subagent**

Use the Agent tool with `subagent_type: general-purpose`. Brief prompt:

```
Task: Write MT2-C_lebesgue.html — the §4.11 Lebesgue Integral page of the MT2 review section for MATH 31CH.

Contract: /Users/zefan/SP26/MATH 31CH/Review/midterm2/SPEC.md — read FIRST.

Template exemplar: /Users/zefan/SP26/MATH 31CH/Review/midterm2/MT2-A_linear_cov.html — copy structure, fill for §4.11.

Output: /Users/zefan/SP26/MATH 31CH/Review/midterm2/MT2-C_lebesgue.html

This is the HEAVIEST page (4 source topics, ~8-10k Chinese chars).

Specific content for MT2-C:
- §2 needs 4-5 theorems:
  (a) Uniform convergence + common bounded support → integral swap (Riemann setting)
  (b) DCT for Riemann (statement; requires f ∈ R_R upfront)
  (c) Beppo-Levi-type proposition (∑∫|f_k| < ∞ ⟹ ∑f_k converges a.e.)
  (d) Well-definedness of Lebesgue integral (the hardest; just statement + truncation mnemonic)
  (e) Elementary properties grouped (linearity + product with bounded R-integrable + monotonicity)

- §3 needs 4-6 clusters:
  (a) Decide R vs L integrable for a given function
  (b) Construct brick decomposition (f_k Riemann series with ∑∫|f_k| < ∞)
  (c) Apply DCT for Riemann to swap lim and integral
  (d) Counterexample construction (mass concentration, mass escape, ...)
  (e) Verify Lebesgue properties from definition

- §6 needs 6-8 exercises. No HW source — fully synthesized from H&H §4.11 exercises + your own design.

Source files (use Read tool):
- /Users/zefan/SP26/MATH 31CH/Review/midterm2/SPEC.md
- /Users/zefan/SP26/MATH 31CH/Review/midterm2/MT2-A_linear_cov.html
- /Users/zefan/SP26/MATH 31CH/Review/topics/11-limits-riemann.html
- /Users/zefan/SP26/MATH 31CH/Review/topics/12-lebesgue-construction.html
- /Users/zefan/SP26/MATH 31CH/Review/topics/13-well-definedness.html
- /Users/zefan/SP26/MATH 31CH/Review/topics/14-lebesgue-properties.html
- /Users/zefan/SP26/MATH 31CH/Notes/Typed/6.2_notes/6.2_notes.pdf
- /Users/zefan/SP26/MATH 31CH/Notes/Typed/7.1_notes/7.1_notes.pdf
- /Users/zefan/SP26/MATH 31CH/Notes/Typed/7.2_notes/7.2_notes.pdf
- /Users/zefan/SP26/MATH 31CH/Notes/Typed/7.3_notes/7.3_notes.pdf
- /Users/zefan/SP26/MATH 31CH/Vector Calculus, Linear Algebra, and Differential Forms A Unified Approach.pdf (skim §4.11)

Hard rules (same as MT2-B subagent):
- No invented math; every claim traces to one cited source
- No LaTeX-only commands (`\label`, `\ref`, `\begin{equation}`, `\begin{align}`)
- Use the **Write tool** (not Bash heredoc) to create the output file
- All math in KaTeX-safe form; use pre-defined macros wherever applicable
- Numbering: Def C.1, Thm C.1, Example C.1, Pitfall C.1 (separate counters per type; Lemma/Cor/Prop share Thm counter)
- Macros: defaults + may add `\trunc` (for truncation `[H_l]_R` notation from Lec 7.2) if useful — add to the page's KaTeX block
- Cross-link format: `(≡ Topic 12 Thm 12.x / H&H Thm 4.11.y)` after each numbered item title
- Static lint after writing: 0 matches for forbidden LaTeX commands; all 7 anchor IDs present; subfolder-correct `../style.css` / `../scripts.js` paths

For §6 stretch problems, synthesize 2 problems that test understanding of the well-definedness truncation argument or the counterexample construction (these are MT-likely topics).

Report back: "MT2-C written to <path>. Length: X lines / Y bytes. Static lint: pass/fail (which checks). Anything I had to invent: …"
```

- [ ] **Step 2: Receive output + read end-to-end (same as Task 5)**

- [ ] **Step 3: Browser smoke test MT2-C**

Same checklist as Task 5 Step 4.

---

## Task 7: Write `MT2-overview.html` (Entry + Mega Cheat + Mock Mini-Final)

**Files:**
- Create: `Review/midterm2/MT2-overview.html`

**Dispatch model:** Inline (not subagent) — this page synthesizes content already produced in MT2-A/B/C, so it needs full visibility into those files. Doing it inline keeps coherence tight.

**Sources:**
- MT2-A, MT2-B, MT2-C (now complete) — extract the most critical formulas/theorems/pitfalls
- `Review/midterm2/SPEC.md` §5 — the overview page spec

- [ ] **Step 1: Re-read SPEC.md §5 to confirm overview structure**

Confirms 4 blocks: Header intro, Navigation tiles, Mega cheat sheet (~50-80 lines), Mock mini-final (5 problems).

- [ ] **Step 2: Create overview via Write tool (not cp)**

Same pattern as Task 3 Step 2: Read `_template.html` first (if not already in Read state from earlier this session), then use **Write tool** to create `Review/midterm2/MT2-overview.html` with template content as body, with these adjustments:

- `<title>`: `MT2 总览 + 综合速查 | MATH 31CH 复习`
- `<h1>`: `MT2 总览 + 综合速查`
- `<p class="subtitle">`: `H&amp;H §4.9-4.11 综合 · MT2 复习专区入口 · 综合 cheat + mock mini-final`
- nav-prev: `<a class="nav-prev nav-disabled" href="#">无</a>` (overview is start of chain)
- nav-next: `href="MT2-A_linear_cov.html"` label `MT2-A`
- Footer: `MATH 31CH 复习指南 · MT2 总览 · H&amp;H §4.9-4.11`

- [ ] **Step 3: Replace the 7-section scaffold with overview-specific blocks**

The overview page has a DIFFERENT structure than MT2-A/B/C. Remove §1-§7 scaffold from template; replace with:

```html
<!-- Block 1: Header intro (3 paragraphs) -->
<h2 id="intro">导览</h2>
<p>这是 MT2 复习专区的总入口... [3 paragraphs covering: what's on MT2, how the 3 pages cover §4.9-4.11, recommended study order]</p>

<!-- Block 2: Navigation tiles (3 cards — A/B/C; overview is self so no self-link) -->
<h2 id="nav">三大主题页</h2>
<ul class="topic-list">
  <li>
    <div class="topic-num">MT2-A</div>
    <div>
      <a class="topic-title" href="MT2-A_linear_cov.html">行列式 scales 体积 + 线性 CoV</a>
      <div class="topic-meta">H&amp;H §4.9 (Lec 5.1, 5.2)</div>
      <div class="topic-desc">DSV 定理 + elementary matrix 分解 + 线性 CoV. 含 HW3 §4.9 改编题。</div>
    </div>
  </li>
  <li>
    <div class="topic-num">MT2-B</div>
    <div>
      <a class="topic-title" href="MT2-B_nonlinear_cov.html">非线性 CoV + 三种 design pattern</a>
      <div class="topic-meta">H&amp;H §4.10 (Lec 5.3, 6.1)</div>
      <div class="topic-desc">极坐标 / 球 / 柱坐标 + symmetry / boundary / slice-driven 模式 + IFT shortcut。含 HW3 §4.10 改编题。</div>
    </div>
  </li>
  <li>
    <div class="topic-num">MT2-C</div>
    <div>
      <a class="topic-title" href="MT2-C_lebesgue.html">Lebesgue 积分构造与性质</a>
      <div class="topic-meta">H&amp;H §4.11 (Lec 6.2, 7.1-7.3)</div>
      <div class="topic-desc">Uniform conv 极限交换 → DCT for Riemann → brick decomp 构造 → 良定性 → 线性 / 乘积 / 单调性 + 反例。</div>
    </div>
  </li>
</ul>

<!-- Block 3: Mega cheat sheet (cross-chapter) -->
<h2 id="mega-cheat">跨章节速查表 (10-min 扫读用)</h2>
<div class="cheat-sheet">
  <ul>
    <!-- ~50-80 emoji-tagged li covering all 3 chapters' most critical items -->
  </ul>
</div>

<!-- Block 4: Mock mini-final (5 problems) -->
<h2 id="mock-final">Mock Mini-Final (5 题 · ~30% of a real MT2)</h2>
<p>跨 §4.9-4.11 综合题. 展开 <code>&lt;details&gt;</code> 查看答案. 建议先自己做 45 min 再看.</p>
<!-- 5 div.exercise with hidden answers -->
```

Update sidebar TOC accordingly:
```html
<ul>
  <li><a href="#intro">导览</a></li>
  <li><a href="#nav">三大主题页</a></li>
  <li><a href="#mega-cheat">跨章节速查表</a></li>
  <li><a href="#mock-final">Mock Mini-Final</a></li>
</ul>
```

- [ ] **Step 4: Fill the Mega cheat sheet block**

~50-80 `<li class="cs-...">` entries. Pull from MT2-A §1, MT2-B §1, MT2-C §1 cheat sheets. Distill to the absolute essentials — if you had only 10 minutes to scan, what would you read?

Suggested structure (4 groups by emoji + theme):
- ~12-15 lines for §4.9 (DSV, Linear CoV, elementary matrices, vol scaling)
- ~15-20 lines for §4.10 (Nonlinear CoV statement, polar/sph/cyl Jacobians, IFT shortcut, 3 design patterns)
- ~15-20 lines for §4.11 (Uniform conv swap, DCT, Lebesgue construction, well-definedness mnemonic, properties)
- ~5-10 lines of cross-cutting pitfalls (e.g., 忘记 |det|, 忘记验证 injectivity, mistake R vs L)

- [ ] **Step 5: Synthesize 5 mock mini-final problems**

Per SPEC §10: 1 from each major theme + 2 cross-theme. Examples of cross-theme:
- "Use Linear CoV (§4.9) to transform an integral, then evaluate via polar coords (§4.10), then compare with the Lebesgue-integral value (§4.11)"
- "Construct a function unbounded but Lebesgue integrable; verify via brick decomposition; transform via polar coords"

5 `<div class="exercise">` blocks with full hidden answers via `<details>`.

- [ ] **Step 6: Save and browser smoke test**

Run: `open "/Users/zefan/SP26/MATH 31CH/Review/midterm2/MT2-overview.html"`

Checklist:
- [ ] Page loads, no KaTeX errors
- [ ] All 4 blocks visible, in correct order
- [ ] Sidebar TOC has 4 items (not 7) — and scroll-spy works on them
- [ ] 4 nav tiles click through to MT2-A/B/C correctly
- [ ] Mega cheat sheet renders with emoji bullets
- [ ] All 5 mock final exercises have working hidden answers
- [ ] nav-next → MT2-A works

---

## Task 8: Update `Review/index.html` — Add MT2 Part-Section

**Files:**
- Modify: `Review/index.html` (insert above existing 14-topic Part I section)

- [ ] **Step 1: Read existing index.html structure**

Run: Read `Review/index.html` fully (likely ~150-250 lines)

Locate: the first `<section class="part-section">` (Part I — Riemann 积分基础). The new MT2 section goes IMMEDIATELY before it.

- [ ] **Step 2: Insert new MT2 part-section**

Insert the markup specified in SPEC.md §8 (already-verified markup) right before the first `<section class="part-section">`:

```html
<section class="part-section">
  <h2>🎯 MT2 复习专区 (H&amp;H §4.9-4.11, exam-prep parallel)</h2>
  <ul class="topic-list">
    <li>
      <div class="topic-num">MT2-O</div>
      <div>
        <a class="topic-title" href="midterm2/MT2-overview.html">MT2 总览 + 综合速查</a>
        <div class="topic-meta">跨 §4.9-4.11</div>
        <div class="topic-desc">入口页 + 全局 cheat sheet + 5 题 mock mini-final。考前 10 分钟扫这里。</div>
      </div>
    </li>
    <li>
      <div class="topic-num">MT2-A</div>
      <div>
        <a class="topic-title" href="midterm2/MT2-A_linear_cov.html">行列式 scales 体积 + 线性 CoV</a>
        <div class="topic-meta">§4.9 (Lec 5.1, 5.2)</div>
        <div class="topic-desc">DSV 定理 + elementary matrix 分解 + 线性变量代换. 含 HW3 §4.9 改编题。</div>
      </div>
    </li>
    <li>
      <div class="topic-num">MT2-B</div>
      <div>
        <a class="topic-title" href="midterm2/MT2-B_nonlinear_cov.html">非线性 CoV + 三种 design pattern</a>
        <div class="topic-meta">§4.10 (Lec 5.3, 6.1)</div>
        <div class="topic-desc">极坐标 / 球 / 柱坐标 + symmetry / boundary / slice-driven 模式 + IFT shortcut。含 HW3 §4.10 改编题。</div>
      </div>
    </li>
    <li>
      <div class="topic-num">MT2-C</div>
      <div>
        <a class="topic-title" href="midterm2/MT2-C_lebesgue.html">Lebesgue 积分构造与性质</a>
        <div class="topic-meta">§4.11 (Lec 6.2, 7.1-7.3)</div>
        <div class="topic-desc">Uniform conv 极限交换 → DCT for Riemann → brick decomp 构造 → 良定性 → 线性 / 乘积 / 单调性 + 反例。</div>
      </div>
    </li>
  </ul>
</section>
```

- [ ] **Step 3: Save and verify**

Run: `open "/Users/zefan/SP26/MATH 31CH/Review/index.html"`

Checklist:
- [ ] MT2 part-section appears at TOP of TOC, above Part I
- [ ] Visual style matches existing parts (topic-num, topic-title, topic-meta, topic-desc all styled correctly)
- [ ] 🎯 emoji renders in the section header
- [ ] All 4 links (MT2-O / A / B / C) work — click each, lands on correct MT2 page
- [ ] Existing 14-topic TOC below is untouched and still works

---

## Task 9: Full Integrated Smoke Test

- [ ] **Step 1: Linear nav chain test**

From `Review/index.html`:
1. Click "MT2 总览" → lands on MT2-overview.html
2. Click nav-next "MT2-A" → lands on MT2-A
3. Click nav-next "MT2-B" → lands on MT2-B
4. Click nav-next "MT2-C" → lands on MT2-C
5. Click nav-center "MATH 31CH 复习 · 主页" → returns to index.html

If any step 404s or wrong page: investigate and fix path/file name.

- [ ] **Step 2: Cross-link to Topics test**

From MT2-A: click any "Topic 08" cross-link → lands on `Review/topics/08-linear-cov.html` (top of page, not specific anchor — that's expected per SPEC §6 limitation).

From MT2-B: cross-links to Topic 09 / 10.
From MT2-C: cross-links to Topic 11 / 12 / 13 / 14.

- [ ] **Step 3: Anchor link within-page test (smoke)**

On MT2-A: click a §4 pitfall hyperlink → scrolls to its §3 cluster or example anchor.
On MT2-B: same test on 1-2 pitfalls.
On MT2-C: same test on 1-2 pitfalls.

- [ ] **Step 4: KaTeX render audit (visual)**

Open each of MT2-overview, MT2-A, MT2-B, MT2-C in browser. Scroll through each entire page. Visually scan for any red text (KaTeX render error) or visibly broken formulas. If found, identify the LaTeX command causing the issue and fix.

- [ ] **Step 5: Mobile / responsive smoke (optional)**

Resize browser window to mobile width (~375px). Verify:
- Sidebar TOC collapses to button
- Toggle button (`≡ 目录`) works
- Main content still readable

---

## Task 10: Math Correctness Pass — MT2-A

**Purpose:** Verify every numbered theorem / definition / example in MT2-A is mathematically correct by cross-checking against H&H or Topic 08. This is the same kind of pass we did on the 14 topic pages on 2026-05-15 (logged in CLAUDE.md).

- [ ] **Step 1: Open MT2-A side-by-side with Topic 08 + H&H §4.9**

Use Read tool to load MT2-A; open Topic 08 in browser; have H&H §4.9 ready (textbook PDF).

- [ ] **Step 2: Check §2 theorems**

For each numbered theorem in §2:
- Statement matches Topic 08 / H&H? (sign, hypotheses, conclusion)
- Mnemonic sketch steps are logically valid (no skipped step, no wrong direction)?
- Cross-link annotation correctly points to Topic 08 Thm X.Y?

Record issues in a scratch list. Fix them inline.

- [ ] **Step 3: Check §3 worked examples**

For each `box example` in §3:
- Setup correct?
- Computation correct (Jacobian, integral, answer)?
- If borrowed from HW3, matches the HW response's correct answer?

Fix issues inline.

- [ ] **Step 4: Check §6 mock exercises' hidden answers**

For each of 6-8 exercises:
- Problem statement well-posed?
- Hidden answer mathematically correct?
- Final numerical answer (if any) verified independently?

Fix issues inline.

- [ ] **Step 5: Record pass status**

Append a single line to `Review/midterm2/PLAN.md` (at end of file, or in a dedicated section), e.g.:
> "MT2-A math review: PASS (date: YYYY-MM-DD; X minor fixes applied)"

---

## Task 11: Math Correctness Pass — MT2-B

**Same template as Task 10**, applied to MT2-B. Sources: Topics 09, 10; H&H §4.10; HW3 P4.10.*; lecture notes 5.3 + 6.1.

- [ ] **Step 1: Open MT2-B side-by-side with Topics 09 + 10 + H&H §4.10**

- [ ] **Step 2: Check §2 theorems** (Nonlinear CoV statement; classical Jacobian formulas — polar r, spherical r²cos φ, cylindrical r)

- [ ] **Step 3: Check §3 worked examples** (especially the three design patterns; verify Jacobians and answers)

- [ ] **Step 4: Check §6 mock exercises** (especially HW3-adapted problems — verify answers match HW3_response.tex)

- [ ] **Step 5: Record pass status** in PLAN.md

---

## Task 12: Math Correctness Pass — MT2-C

**Same template**, applied to MT2-C. Sources: Topics 11-14; H&H §4.11; lecture notes 6.2 + 7.1-7.3.

- [ ] **Step 1: Open MT2-C side-by-side with Topics 11-14 + H&H §4.11**

- [ ] **Step 2: Check §2 theorems** (5 theorems: uniform conv swap, DCT for Riemann, Beppo-Levi, well-definedness, elementary properties)

- [ ] **Step 3: Check §3 worked examples** (counterexample construction; brick decomposition)

- [ ] **Step 4: Check §6 mock exercises** (all synthesized — verify carefully)

- [ ] **Step 5: Record pass status** in PLAN.md

---

## Task 13: Math Correctness Pass — MT2-overview

**Same template**, lighter scope (no detailed proofs, only mega cheat + 5 mock final problems).

- [ ] **Step 1: Check mega cheat sheet entries against MT2-A/B/C §1 cheat sheets**

Each entry should be a faithful (possibly compressed) restatement.

- [ ] **Step 2: Check 5 mock mini-final problems**

Same rigor as Task 10 Step 4.

- [ ] **Step 3: Record pass status**

---

## Task 14: Cleanup + Final Verification

- [ ] **Step 1: Delete the template scratch file**

Run: `rm "/Users/zefan/SP26/MATH 31CH/Review/midterm2/_template.html"`

Verify: `ls "/Users/zefan/SP26/MATH 31CH/Review/midterm2/"`
Expected files: `SPEC.md`, `PLAN.md`, `MT2-overview.html`, `MT2-A_linear_cov.html`, `MT2-B_nonlinear_cov.html`, `MT2-C_lebesgue.html`. (6 total, no template.)

- [ ] **Step 2: Final cross-link audit**

`grep -rln "MT2-overview\|MT2-A\|MT2-B\|MT2-C\|midterm2" "/Users/zefan/SP26/MATH 31CH/Review/"` — verify every link from each page resolves to an existing file.

`grep -rln "_template" "/Users/zefan/SP26/MATH 31CH/Review/"` — should return empty (no leftover refs to the deleted scratch file).

- [ ] **Step 3: Re-open `Review/index.html` and click through every MT2 link**

Confirm zero 404s.

- [ ] **Step 4: Final user handoff**

Tell user: "MT2 review section complete. 4 pages + index integration + math correctness 4-pass review all done. Files in `Review/midterm2/`. Open `Review/index.html` to enter. Any issues you spot, point me to the file/section and I'll fix."

---

## Spec Coverage Audit (Internal Self-Check)

| Spec section | Implementation task |
|---|---|
| §1 Purpose & Audience | All tasks (orientation only) |
| §2 File Structure | Tasks 1-8 (creates the 4 HTMLs + CSS + index update) |
| §3 Scope Mapping | Tasks 3, 5, 6 (per-page scope for MT2-A/B/C); Task 7 covers cross-chapter synthesis (overview) |
| §4 Per-Page 7-Section Structure | Tasks 3 (concrete), 5/6 (via subagent briefing referencing SPEC) |
| §5 MT2-overview Structure | Task 7 |
| §6 Numbering Convention (double-track) | Tasks 3 / 5 / 6 (subagent briefings include numbering rule) |
| §7 Tech Stack & Styling | Tasks 1 (CSS) + 2 (template setup) |
| §8 index.html Integration | Task 8 |
| §9 Content Sourcing Strategy | Tasks 3, 5, 6 (source materials listed per-task) |
| §10 Mock Exercise Calibration | Tasks 3 step 8 + 5 / 6 briefings + 7 step 5 |
| §11 Out of Scope | Acknowledged (no tasks needed) |
| §12 Open Questions Resolved | Resolved in spec; no plan tasks needed |
| §13 Implementation Order | This whole PLAN.md is the detail |
| §14 Success Criteria | Tasks 9 (smoke) + 10-13 (math review) + 14 (cleanup) collectively verify all criteria |

All spec sections covered. ✓

---

## Notes on Execution

- **Not a git repo**: no `git commit` steps. The implicit "save and verify in browser" replaces that checkpoint.
- **Subagent dispatch**: Tasks 5 and 6 use general-purpose subagents (not specialized like Explore — these are write tasks). Brief them thoroughly using the prompts above; verify their output by reading the file and browser-testing.
- **Parallelization**: Tasks 5 and 6 can run concurrently if both subagents are dispatched in the same message. Tasks 10-13 (math reviews) are independent and can also be parallelized via subagents, though they require careful math review and may benefit from being done by the orchestrating agent for highest reliability.
- **Hard pause**: Task 4 is a true checkpoint — wait for user OK before Task 5.

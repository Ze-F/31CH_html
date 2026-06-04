# MT2 Review Section — Design Spec

**Date**: 2026-05-17
**Status**: Draft v2 — passed self-stress-test; pending user review
**Author**: Brainstormed with Claude (Opus 4.7) in /Users/zefan/SP26/MATH 31CH
**MT2 exam date**: TBD (user to confirm; spec uses "exam-week study" as design context but doesn't depend on a fixed date)

---

## 1. Purpose & Audience

A **parallel HTML section** to the existing topic-organized review (`Review/topics/`), exclusively scoped to **Midterm 2** material — H&H §4.9, §4.10, §4.11 (corresponding to existing Topics 08-14 and Lectures 5.1-7.3).

**Mode**: *Synthesized recap* (option B from brainstorming) — content cross-cuts existing topic pages by **problem-type cluster** and **textbook narrative**, not lecture-by-lecture. Redundancy with existing topic pages is allowed and expected; the goal is exam-prep ergonomics, not de-duplication.

**Primary use case**: Exam-week study (review days 1-7 before MT2). Each page is designed to be:
- **Skimmable** in 10-15 min (read §1 速查表 + §4 陷阱 only)
- **Deep-readable** in 60-90 min (full page including §3 题型聚簇 + §6 模拟练习)
- **Self-contained** — reader does not need to alt-tab to Topics 08-14, though cross-links are provided

**Non-goals**:
- Replace existing Topics 08-14 (these remain the canonical reference)
- Cover anything outside §4.9-4.11 (MT1 material in Topics 01-07 is out of scope)
- Provide live homework solutions (HW responses live in `HW/Response/`)

---

## 2. File Structure

All MT2 files live in a **new subdirectory** `Review/midterm2/`:

```
Review/midterm2/
├── SPEC.md                       # this file
├── PLAN.md                       # implementation plan (to be written next)
├── MT2-overview.html             # entry page + cross-chapter cheat sheet + mock final
├── MT2-A_linear_cov.html         # §4.9 — Determinant scales volume + linear CoV
├── MT2-B_nonlinear_cov.html      # §4.10 — Nonlinear CoV + classical coordinates + design patterns
└── MT2-C_lebesgue.html           # §4.11 — Lebesgue integral construction + properties
```

**Rationale for subfolder**: physical separation makes the "parallel section" identity clear and leaves room for future `Review/midterm1/`, `Review/final/` etc.

**Path adjustments**: HTML files reference `../style.css`, `../scripts.js`. KaTeX CDN URLs unchanged.

---

## 3. Scope Mapping (Lecture/Topic → MT2 page)

| MT2 page | H&H section | Lectures covered | Source topic(s) (for math correctness baseline) |
|---|---|---|---|
| **MT2-A** | §4.9 | Lec 5.1, 5.2 | Topic 08 (`08-linear-cov.html`) |
| **MT2-B** | §4.10 | Lec 5.3, 6.1 | Topics 09 (`09-nonlinear-cov.html`), 10 (`10-cov-patterns.html`) |
| **MT2-C** | §4.11 | Lec 6.2, 7.1, 7.2, 7.3 | Topics 11 (`11-limits-riemann.html`), 12 (`12-lebesgue-construction.html`), 13 (`13-well-definedness.html`), 14 (`14-lebesgue-properties.html`) |

**MT2-C is the heaviest** (4 source topics, ~10k-word target). MT2-A and MT2-B are lighter (~6-8k words each). MT2-overview is short (~4k words).

---

## 4. Per-Page Structure (7-Section, Exam-Oriented)

Every MT2 page (except `MT2-overview.html`, which has a different shape — see §5) uses this section structure:

### §1 速查表 (Cheat Sheet, **TOP** of page)
- All theorems, key formulas, Jacobian table, high-frequency pitfalls
- **Placed at top**, not bottom — this is the most important exam-prep affordance
- 1-2 screen height (~50 lines), scannable in 5 min
- Uses the existing `cheat-sheet` CSS class with emoji tags 🟦 def / 🟨 thm / 🟢 tech / 🟥 pitfall

### §2 关键定理 + 极简重证 (Key Theorems + 30-sec Proof Sketches)
- One `box thm` per theorem
- Each followed by a "30-second proof sketch" — **mnemonic-form, not exposition-form**: a numbered list of the 3-5 key moves (e.g., "1. Reduce to non-invertible case (trivial); 2. Reduce to unit cube via translation+scaling; 3. Decompose T into 3 types of elementary matrices; 4. Check each type maps Q to unit-volume image"), not a flowing-prose paragraph
- **Not** a full rigorous proof — that lives in Topics 08-14. Always include "(full proof: Topic 0X Thm X.Y / H&H Thm 4.X.Y)" cross-link
- Target counts per page (approximate, not strict):
  - **MT2-A**: 1-2 theorems (Determinant scales volume + Linear CoV)
  - **MT2-B**: 2-3 theorems (Nonlinear CoV main thm + Lipschitz/C¹ relationship + classical Jacobian table)
  - **MT2-C**: 4-5 theorems (Uniform conv → integral swap; DCT for Riemann; Beppo-Levi-type; Well-definedness of Lebesgue integral; Elementary properties grouped)

### §3 题型聚簇 (Problem-Type Clusters, page main body)
- 3-6 subsections per page (MT2-A: 2-4; MT2-B: 4-6; MT2-C: 4-6)
- Each subsection has its own anchor ID (e.g., `id="cluster-symmetry-driven"`) so §4 pitfalls can hyperlink to specific subsections
- Per cluster structure:
  - **识别信号** (recognition signals — "when you see X, reach for Y") — usually a short prose paragraph or 2-3 bullets
  - **标准做法** (standard procedure — steps to execute) — numbered list
  - **Worked examples** — 1-2 per cluster, each as a `<div class="box example">` block (matching existing convention from topic pages), each with its own anchor ID (e.g., `id="example-B-3"`) so pitfalls / cross-clusters can hyperlink
  - **常见变体** (common variants — minor twists you might see on exam) — short paragraph or 2-3 bullets
- This is the page's largest section, ~40-50% of total word count

### §4 常考陷阱清单 (Common Pitfalls)
- Bullet list of high-frequency pitfalls, each one line + hyperlink (anchor) to either a §3 cluster (`#cluster-...`) or a specific worked example (`#example-X-Y`) for fuller explanation
- 6-12 pitfalls per page
- Uses `box pitfall` class for each numbered pitfall; the §4 master list is just a `<ul>` of links — the detailed `box pitfall` boxes can live inline in §3 (cluster-local pitfalls) or in a dedicated subsection at end of §4 (cross-cluster pitfalls)

### §5 课本例题速查 (Textbook Example Index)
- HTML `<table>` with 3 columns: H&H reference (e.g., "Example 4.9.3"), 主题 (1-3 word topic tag), 一句话 takeaway (target ~20-35 字; 不硬限制, 必要时可放宽)
- Concrete markup template:
  ```html
  <table class="textbook-index">
    <thead><tr><th>H&amp;H 编号</th><th>主题</th><th>Takeaway</th></tr></thead>
    <tbody>
      <tr><td>Example 4.9.3</td><td>Linear CoV</td><td>...</td></tr>
      ...
    </tbody>
  </table>
  ```
- `.textbook-index` is a NEW CSS class; we'll add ~5-8 lines to `style.css` covering: `border-collapse: collapse`, `td/th padding`, `border: 1px solid #d8d3c4`, `thead background: #f5efde`, `font-size: 0.92em` for compactness, optional row hover. Visual goal: bordered cells, compact rows, header strip slightly darker.
- 10-20 entries per page; covers both `Example` and `Exercise` from H&H if exercises are also instructive

### §6 模拟练习 (Mock Exercises)
- 6-8 exercises with difficulty gradient:
  - 3 routine (warm-up, single-technique)
  - 3 mid (multi-step, combine 2 techniques)
  - 2 stretch (exam-stretch difficulty, combine 3+ ideas or require subtle observation)
- Cross-subsection comprehensives placed last
- Hidden answers via `<details><summary>答案</summary><div class="details-body">...</div></details>` (matching existing topic-page convention)
- Use existing `.exercise` CSS class wrapper with `.ex-num` for numbering, identical to topic pages
- **Sources per difficulty level** (post-stress-test):
  - **Routine + mid (MT2-A, MT2-B)**: drawn from HW3 problems (9 problems on §4.9-4.10: 4.9.1, 4.9.3, 4.9.5, 4.10.4, 4.10.9, 4.10.12, 4.10.17, 4.10.18, 4.10.19) — adapt and re-state, optionally simplify for "routine" level
  - **Routine + mid (MT2-C)**: drawn from H&H §4.11 exercises (since no HW source); a typical H&H exercise is roughly "mid" difficulty
  - **Stretch (all pages)**: 1-2 synthesized exam-style problems per page; for MT2-A/B can also lift the hardest HW3 problems verbatim if they qualify as "exam-stretch"
- Avoid verbatim duplication of HW response solutions — write the exercise statement clean, then craft an exposition-style solution for the hidden answer (sometimes giving alternative approach)

### §7 与 Topics 的 Cross-Reference (Bridge Back to Topic Pages)
- Short section listing which existing Topics 08-14 correspond, with one-line description of what's deeper there
- Also links to typed lecture notes (`Notes/Typed/X.Y_notes/X.Y_notes.pdf`)

---

## 5. `MT2-overview.html` Structure (Special)

Different from MT2-A/B/C — this is an entry + aggregate page, not a content page:

- **Header section**: 3-paragraph intro summarizing what's on MT2 (§4.9, §4.10, §4.11 themes in one sentence each), how to use this section
- **Navigation tiles**: 4 large clickable cards linking to MT2-A, MT2-B, MT2-C — each with title + 1-sentence preview
- **Mega cheat sheet (cross-chapter)**: ~50-80 lines covering all 3 chapters' most critical formulas/theorems — for the final 10-min scan
- **Mock mini-final**: 5 problems mixing across §4.9, §4.10, §4.11 (e.g., a problem that uses linear CoV to set up a Lebesgue-integrable function via brick decomposition); hidden answers; designed to feel like ~30% of a real MT2 in difficulty

---

## 6. Numbering Convention (Double-Track)

Each MT2 page uses **fresh local numbering** within the page, plus a **cross-link annotation** to the canonical Topic.

**Within MT2-A**:
- `Def A.1, A.2, …`
- `Thm A.1, A.2, …` (shared counter with `Lemma A.x / Corollary A.x / Proposition A.x`, following existing topic-page convention)
- `Example A.1, A.2, …`
- `Pitfall A.1, A.2, …`

**Within MT2-B**: `Def B.1, …`, `Thm B.1, …`, etc.
**Within MT2-C**: `Def C.1, …`, `Thm C.1, …`, etc.
**Within MT2-overview**: No numbered theorems (just refs to MT2-A/B/C).

**Cross-link annotation format** (after the title of each numbered item, in parentheses):

> **Theorem A.2 (Determinant scales volume, ≡ Topic 08 Thm 8.2 / H&H Thm 4.9.1)**

This satisfies "self-contained but linked": reader can read MT2-A without ever opening Topic 08, but knows exactly where to dig for the full proof.

**Cross-link anchor limitation**: existing topic pages have section-level anchor IDs (e.g., `#theorems`) but NOT per-theorem IDs. So a hyperlink like `../topics/08-linear-cov.html#thm-8-2` won't land on Thm 8.2 specifically — it falls back to top-of-page. Acceptable for now; future enhancement could add `id="thm-X-Y"` to each `<div class="box thm">` in topic pages, but that's out of scope for this MT2 work. Implementation: cross-link in MT2 just goes to the topic page top, and the textual "(≡ Topic 08 Thm 8.2)" tells the reader what to look for.

---

## 7. Tech Stack & Styling Conventions

**Identical to existing topic pages** (lockstep with `Review/SPEC.md`):

- Pure static HTML + KaTeX 0.16.11 via jsdelivr CDN + vanilla CSS/JS
- KaTeX setup block at top of each page (same macros: `\R \N \Z \Q \eps \IR \IL \Disc \osc \vol \supp \abs{} \norm{}`)
- `throwOnError: false` so any LaTeX error renders red without breaking page
- KaTeX-safe math: `$...$` inline, `$$...$$` display, `\[...\]` display, `\(...\)` inline
- KaTeX-supported environments (`aligned`, `cases`, `pmatrix`, `array`, etc.) **must be inside math mode** — i.e., wrapped in `$$...$$` (or `\[...\]`). Canonical pattern: `$$\begin{aligned} ... \end{aligned}$$`. ⚠️ Do NOT use bare `\begin{align*}...\end{align*}` (no surrounding `$$`) — KaTeX auto-render's delimiter list does NOT include environment-start tokens, so a bare `\begin{align*}` is rendered as raw LaTeX text. (We discovered 19 such bugs across the codebase on 2026-05-20 and swept them out.)
- **Never** use `\label`, `\ref`, `\begin{equation}`, `\begin{align}` (LaTeX-only — even inside `$$...$$`, KaTeX rejects these because `align` is incompatible with display math wrappers, and `\label/\ref` have no cross-reference resolver in KaTeX)
- **Page-specific macros** allowed (add to per-page KaTeX setup):
  - MT2-A: probably none beyond defaults
  - MT2-B: may add `\diam`, `\Jac` (`\operatorname{Jac}`) if useful
  - MT2-C: may re-use `\trunc` (truncation) from Topic 13

**Path adjustments due to subfolder depth**:
- `<link rel="stylesheet" href="../style.css">`
- `<script defer src="../scripts.js">`
- Image references (none expected, but if needed) → `../assets/`
- Cross-links to topic pages → `../topics/08-linear-cov.html` etc.

**Box classes** (existing CSS in `style.css`, do not modify):
- `box def` (blue), `box thm` (yellow), `box example` (green), `box pitfall` (red), `box remark` (purple), `box prereq` (light blue, smaller; likely unused in MT2 pages but available)
- **Do NOT** use `box note` — doesn't exist; use `box remark` instead

**Top nav linear chain** — to keep nav-center consistent with existing topic pages (which all point nav-center to `../index.html`), the four MT2 pages are sequenced as:

```
MT2-overview → MT2-A → MT2-B → MT2-C
```

with prev/next as:
- `MT2-overview`: prev = `nav-disabled` ("无"), next = MT2-A
- `MT2-A`: prev = MT2-overview, next = MT2-B
- `MT2-B`: prev = MT2-A, next = MT2-C
- `MT2-C`: prev = MT2-B, next = `nav-disabled` ("无")

All four pages have `nav-center` → `../index.html` (consistent with existing topic-page convention).

**Sidebar TOC**: each page has its own sidebar listing **top-level sections only** (§1-§7 for MT2-A/B/C; overview's 4 top-level blocks for `MT2-overview.html`). §3 subsections (题型聚簇) are NOT in the sidebar — they're accessed via in-page scroll. This keeps the TOC flat, matching existing topic-page convention, and avoids modifying `scripts.js` scroll-spy logic (which only spies on flat anchors).

Each top-level section needs a unique anchor ID (e.g., `id="cheatsheet"`, `id="theorems"`, `id="problem-types"`, `id="pitfalls"`, `id="textbook-index"`, `id="exercises"`, `id="crossref"`). §3 subsections may still have their own IDs for §4 pitfall hyperlinks to target — those just won't appear in the sidebar.

---

## 8. `index.html` Integration

Add a **new `<section class="part-section">`** placed **above** the existing 14-topic TOC (since MT2 review is the most active need right now). Visual style follows existing part sections exactly (no emoji markers, no other differentiation) — the section title text and parenthetical "exam-prep parallel" suffix already signal the parallel-section identity. (Earlier draft used a 🎯 emoji prefix; removed 2026-05-20 for visual consistency with existing Part I-V sections.)

**Verified by reading existing index.html**: the established convention for each topic list entry is:
```html
<li>
  <div class="topic-num">NN</div>
  <div>
    <a class="topic-title" href="topics/XX.html">Title here</a>
    <div class="topic-meta">Lec X.Y</div>
    <div class="topic-desc">One-sentence description.</div>
  </div>
</li>
```

Spec markup (matches existing pattern; uses MT2-O/A/B/C as `topic-num` to look uniform):

```html
<section class="part-section">
  <h2>MT2 复习专区 (H&amp;H §4.9-4.11, exam-prep parallel)</h2>
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

Existing 14-topic TOC and scroll-spy JS untouched. **No new CSS class needed for the MT2 part-section** (we re-use `topic-list` markup).

---

## 9. Content Sourcing Strategy

**Actual HW availability** (verified by inspection 2026-05-17):
- `HW1.pdf` — MT1 scope (Riemann basics, Cauchy criterion). Not MT2-relevant.
- `HW2.pdf` — MT1 scope (measure zero, Fubini, characteristic functions). Not MT2-relevant.
- `HW3.pdf` + `HW3_response.tex` — **9 problems directly on §4.9-4.10**: Problem 4.9.1, 4.9.3, 4.9.5 (Linear CoV), Problem 4.10.4, 4.10.9, 4.10.12, 4.10.17, 4.10.18, 4.10.19 (Nonlinear CoV). **Gold mine for MT2-A and MT2-B exercises.**
- `Practice MT1.pdf` — MT1 review. Not MT2-relevant.
- **No HW4 yet** — Lebesgue HW for §4.11 hasn't been posted; MT2-C exercises must come from H&H + synthesized.

When implementing each MT2 page, content is drawn from (in priority order):

1. **H&H textbook** (`Vector Calculus, ... .pdf`) §4.9, §4.10, §4.11 — read for: theorem statements (use H&H numbering as canonical), worked examples (mine for §3 题型聚簇 and §5 课本例题速查), narrative phrasing
2. **Existing typed topic pages** (`Review/topics/08-14.html`) — read for: math correctness baseline, our existing Chinese phrasing, what's already covered
3. **Typed lecture notes** (`Notes/Typed/5.1_notes/`, …, `Notes/Typed/7.3_notes/`) — read for: lecture flow, our existing derivations
4. **HW3 problem set + response** (`HW/Pset/HW3.pdf`, `HW/Response/HW3_response.tex`) — for MT2-A and MT2-B, this is the **primary** source of authentic problem types and difficulty calibration. For MT2-C, no HW source — fall back to H&H + synthesis.
5. **Synthesized exam-style problems** — for §6 stretch problems and especially MT2-C exercises (where HW source is absent), synthesize new problems mixing techniques

**Math correctness rule**: every theorem / proof sketch / example must be verified against at least one of (a) H&H statement + proof, (b) existing topic page, (c) typed lecture notes. Do not invent mathematical content.

---

## 10. Mock Exercise Calibration (§6 per page + MT2-overview §mock)

**Difficulty levels** (per MT2 page §6, 6-8 exercises total):
- **Routine** (3 questions): single technique, follows worked example closely; expected solve time 5-10 min
- **Mid** (3 questions): combines 2 ideas, mild creativity; expected 15-25 min
- **Stretch** (2 questions): combines 3+ ideas, requires noticing a non-obvious observation, similar to hardest HW problems; expected 30-45 min

**MT2-overview mock mini-final** (5 questions):
- Designed to feel like ~30% of a real 90-min MT2
- 1 question from each major theme (linear CoV / nonlinear CoV / Lebesgue), plus 2 cross-theme questions
- All hidden-answer via `<details>`

---

## 11. Out of Scope (Explicit Non-Goals)

- New theorems beyond H&H §4.9-4.11 content
- Modifications to existing Topics 08-14 (they remain the canonical math reference)
- A separate mobile-friendly view (existing scripts.js / style.css already responsive enough)
- Anki cards / spaced-repetition export (could be future work)
- Translating any HW response into a worked example verbatim (HW responses stay where they are; we adapt for pedagogical contrast)
- Audio / video / animation features

---

## 12. Open Questions Resolved During Brainstorming

| Question | Resolution |
|---|---|
| One mega-page vs multi-page? | 3 chapter pages + 1 overview (option β) |
| Section structure same as Topics? | No — exam-oriented 7-section with cheat sheet at TOP (option ii) |
| Folder layout? | `Review/midterm2/` subfolder (option b) |
| Theorem numbering? | Double-track: local Thm A.x + cross-link to Topic Thm 8.x (option r) |
| Index integration? | New part-section above existing 14-topic TOC (option β for `index.html`) |
| Overview page role? | Entry + cross-chapter cheat sheet + 5-question mock mini-final (option q) |
| Mock exercises per page? | 6-8 with 3 routine + 3 mid + 2 stretch difficulty gradient |
| HW integration? | HW3 (9 problems on §4.9-4.10) is primary source for MT2-A/B; MT2-C has no HW source (Lebesgue HW not posted) so falls back to H&H + synthesis |

---

## 13. Implementation Order (To Be Detailed in PLAN.md)

Suggested high-level order (final detail in `PLAN.md`):

1. Read H&H §4.9-4.11 + existing Topics 08-14 + HW3 for content mining (foundation phase)
2. Add minimal CSS for `.textbook-index` table to `style.css` (1-2 line addition)
3. Build a shared MT2-page HTML template (copy from `topics/08-linear-cov.html` skeleton, adjust paths + add §1-§7 scaffolding with anchor IDs)
4. Write `MT2-A_linear_cov.html` first (smallest scope, validate template + ergonomics)
5. **Checkpoint**: user reviews MT2-A → adjust template / 7-section structure if feedback differs from spec
6. Write `MT2-B_nonlinear_cov.html` and `MT2-C_lebesgue.html` (can be done in parallel via subagents per the existing topic-batch pattern). **Subagent briefing recipe** (to be detailed concretely in `PLAN.md`): each subagent receives — (a) this `SPEC.md` as the contract, (b) the completed `MT2-A_linear_cov.html` as the working template/style exemplar, (c) the specific source pointers for their scope (lecture notes paths, topic page paths, H&H section ranges, HW3 problems if MT2-B), (d) explicit output spec (file path, expected sections, anchor IDs, approximate length). Subagents must not invent math; they must trace each numbered claim back to one of the cited sources.
7. Write `MT2-overview.html` last (depends on knowing what's in MT2-A/B/C for accurate mega-cheat-sheet and cross-theme mock final)
8. Update `index.html` with new part-section (verified markup in §8 of this spec)
9. Browser smoke test all 4 pages — KaTeX rendering, scroll-spy active state cycles correctly, all cross-links work, mobile toggle works
10. Math correctness pass-by-pass review (4 pages, 1-by-1, like the existing 14-topic review on 2026-05-15)

---

## 14. Success Criteria

This section is "done" when:

- All 4 HTML files exist in `Review/midterm2/`, render without KaTeX errors, all internal/cross-page links work
- `index.html` has the new MT2 part-section, visually consistent with existing parts
- Each MT2 page has all 7 sections (or 4 sections for overview) populated, not stub
- Every numbered theorem / definition / example has been cross-checked against H&H or existing Topics 08-14
- 6-8 exercises per page (5 on overview) with hidden answers
- User can read MT2-A or MT2-B or MT2-C end-to-end and feel "I could pass MT2 if I knew this page cold"

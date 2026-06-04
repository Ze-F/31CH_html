# MATH 31CH Review Pages — Design Spec

**Date:** 2026-05-15
**Status:** Design approved; pending POC implementation.

---

## 1. 目标 (Goal)

为 MATH 31CH (Honors Vector Calculus) 建立一套 **HTML 自学/复习页**，作为现有 typed lecture notes 的补充。

| | typed notes | review pages |
|---|---|---|
| 风格 | formal reference (英文 LaTeX) | personal study guide (中文叙述) |
| 单位 | 一节课 (Lec X.Y) | 一个 topic (跨多节课) |
| 用途 | 写作业、回顾 lecture 时的标准引用 | 考前 / 长时间间隔后重新拾起时的入口 |
| 长度 | 每页 ~10 页 PDF | 每页 ~5000-8000 字 HTML，~30-60 min 精读 |

复习页要解决的根本问题：**遗忘** — 学期结束半年后再看 typed notes 会觉得"知道这是什么定理但忘了为什么需要它"。Review pages 通过 (motivation + 直觉 + worked examples + 陷阱 + 练习) 让重新上手的成本降到最低。

---

## 2. 范围 (Scope)

**Phase A (本次实施):** 覆盖 Chapter 4 (integration) 全部内容 = **14 个 topic 页**，对应 Lec 1.1 至 Lec 7.3 (17 节 lecture 内容)。

**Phase B (未来扩展, 不在本 spec 范围):** 学期推进到 Ch 5 (differential forms) 和 Ch 6 (Stokes) 时，按同一模板再追加 ~6-10 个 topic 页。

---

## 3. Topic 切分 (14 页)

按 H&H 大致章节顺序，分 5 个 Part：

### Part I — Riemann 积分基础 (4 页)

| # | Topic | Lectures | 一句话 |
|---|---|---|---|
| 1 | **1D Riemann 积分** | 1.1 | Partitions, upper/lower sums, Cauchy 准则: 在最熟悉的 1D 设置中建立可积性的概念基础 |
| 2 | **n-维 Riemann 积分: dyadic paving 与可积性** | 1.2, 1.3, 2.1 | 用 dyadic cubes 把 1D 思想推广到 ℝⁿ，并完整证明 Cauchy 准则 |
| 3 | **Riemann 积分的代数与序性质** | 2.1, 2.2, 3.3 (product) | 线性、单调、\|f\|、f⁺/f⁻、lattice 操作、product on ℝⁿ×ℝᵐ |
| 4 | **体积与 pavable 集** | 2.2, 3.1 | vol via 1_A，平移/缩放不变、有限/可数可加性 |

### Part II — 测度零理论 (2 页)

| # | Topic | Lectures | 一句话 |
|---|---|---|---|
| 5 | **测度零: 定义与基本性质** | 3.1, 3.2 (前半) | Vol 0 vs measure 0、k-维子空间为零、countable union 仍为零 |
| 6 | **Lebesgue 准则与 a.e. 推论** | 3.2 (后半), 3.3 (positivity) | 可积 ⟺ a.e. 连续；Thomae 函数；正性引理 |

### Part III — Fubini (1 页)

| # | Topic | Lectures | 一句话 |
|---|---|---|---|
| 7 | **Fubini 定理与应用** | 4.1, 4.2 | Iterated integrals 与 multiple integral 的等价；ball volume、Steinmetz、Fubini 反例 |

### Part IV — 变量代换 (3 页)

| # | Topic | Lectures | 一句话 |
|---|---|---|---|
| 8 | **行列式 scales 体积 / 线性 CoV** | 5.1, 5.2 | Determinant scales volume 定理 + elementary matrix 分解证明 + linear CoV |
| 9 | **非线性 CoV 定理与标准坐标** | 5.3 | Jacobian 出现的逻辑；polar/spherical/cylindrical 三大公式推导 |
| 10 | **CoV 实战: 三种设计模式** | 6.1 | symmetry-/boundary-/slice-driven 三种 pattern + 三个完整 worked examples |

### Part V — 极限与 Lebesgue 积分 (4 页)

| # | Topic | Lectures | 一句话 |
|---|---|---|---|
| 11 | **Riemann 框架下的极限与积分** | 6.2 | Uniform convergence theorem; traveling box / tall spike 两个 paradigm 反例 |
| 12 | **Lebesgue 积分的构造** | 7.1 | Daniell-Stone 砖块分解; Beppo-Levi; 定义; 𝓘_R ⊂ 𝓘_L; Dirichlet & log 例子 |
| 13 | **良定性证明** | 7.2, 7.3 (proof part) | Truncation; dyadic paving; Markov-style 估计 — 全课最技术化的一个证明 |
| 14 | **Lebesgue 积分的初等性质** | 7.3 (后半) | 线性、与 bounded R 函数的乘积、单调性；$1/\sqrt{\|x\|}$ 反例 |

---

## 4. 每页结构 (9 个固定 component)

每个 topic 页按以下顺序展开，叙述串联，**整体读起来是一篇 essay**。页内 section 编号 §1, §2, ..., §9 与下列顺序一致。

1. **§1 动机 (Motivation)** — 2-3 段中文叙述，约 300-500 字，回答"为什么我们关心这个 topic？前一个 topic 之后为什么走到这里？"
2. **§2 前置知识 (Prerequisites)** — 浅蓝小盒子 (略小于 definition 盒)，列出阅读本页前应掌握的内容 (链接到其他 topic 页)
3. **§3 核心定义 (Definitions)** — 浅蓝色 boxed cards，**每页内连续编号 Def N.1, N.2, ...** 其中 N 是 topic 编号 (e.g. Topic 6 → Def 6.1, 6.2)。每个定义之后跟一段中文叙述解释直觉 + 简单例子
4. **§4 主要定理 (Theorems)** — 浅黄色 boxed cards，**编号 Thm N.1, N.2 ...**，含 statement
   - **Proof sketch** 紧跟其后，叙述关键思路 (~200-400 字中文)
   - **完整证明** (选择性，仅核心定理) 用 `<details>` 折叠 (用户主动展开)
   - Lemma / Corollary / Proposition 共用同一计数序列
5. **§5 Worked Examples** — 浅绿色 boxed cards，**编号 Example N.1, N.2 ...**，**每页 2-4 个**，逐步展开计算或论证
6. **§6 常见陷阱 / 反例 (Pitfalls)** — 浅红色 boxed cards，**每页 2-3 个**，"为什么 hypothesis X 不能去掉"、"学生最容易犯的错"
7. **§7 练习题 (Exercises)** — **每页 4-8 道题**，每题用 `<details>` 隐藏答案
8. **§8 速查表 (Cheat Sheet)** — 页末紧凑总结，**bullet list 形式** (非 table)，用 emoji 标记 component 类型:
   - 🟦 关键定义: ...
   - 🟨 关键定理: ... (1-2 句 statement)
   - 🟢 核心技术 / 公式: ...
   - 🟥 常见陷阱: ...
9. **§9 进一步阅读 (Further Reading)** — H&H 章节号、typed notes 链接、相关 topic 页交叉引用

**定理/定义/例子标题约定**: 中文标签为主 ("Theorem 6.1 (Lebesgue 准则)", "Definition 6.2 (a.e. 连续)", "Example 6.1 (Thomae 函数)")。这与 typed notes 的英文标签 ("Theorem 4.1.13 (Lebesgue criterion)") 形成对比, 是 personal review mode 的预期风格。

---

## 5. 版面布局 (Layout)

```
┌────────────────────────────────────────────────────────────────┐
│  ← Prev Topic    |    Math 31CH Review    |    Next Topic →    │  ← 顶部 sticky 导航 (高 ~50px)
├──────────┬─────────────────────────────────────────────────────┤
│ 左侧 TOC  │                    主体内容                          │
│ (sticky) │                                                     │
│ 240px宽  │   max-width 70ch, 居中                              │
│          │   §1 动机 → §2 前置 → §3 定义 → ... → §9 进一步阅读   │
└──────────┴─────────────────────────────────────────────────────┘
   ↑ gap 40px ↑
```

- **左侧 TOC**: `position: sticky; top: 70px;` 240px 宽; anchor links 跳转到主体各 §; 高亮当前 § (scroll-spy via IntersectionObserver)
- **顶部 nav**: Prev / Home / Next, `position: sticky; top: 0;` 始终可见
- **主体行宽**: `max-width: 70ch;` (~700px @ 17px font)
- **TOC 与正文间距**: 40px gap
- **页面总宽**: 240 + 40 + 700 + 边距 ≈ 1080px (容器 max-width 1100px)
- **响应式断点 `< 900px`**: 左侧 TOC 隐藏, 主体占满, 顶部 nav 加一个 "目录" 按钮展开浮层式 TOC

---

## 6. 视觉设计 (Visual Design)

- **字体 stack** (正文): `"Source Serif Pro", Charter, "Iowan Old Style", Georgia, serif`
- **字体 stack** (代码/数学行内符号 fallback): `"SF Mono", Menlo, Consolas, monospace`
- **字号**: 正文 17px, line-height 1.7
- **标题层级**: H1 (页标题) 32px, H2 (§ 标题) 24px, H3 (盒内副标题) 19px
- **背景**: 浅米色 `#fbfaf6` (比纯白柔和，长时间阅读不刺眼)
- **段落间距**: 0.9em (略松, 配合 serif 阅读)
- **链接色**: 内部跳转 `#0b58a6`, 已访问 `#5a3893` (浏览器默认)
- **颜色编码 component**:
  - 🟦 定义盒: 淡蓝 background (`#e8f0fb`) + 深蓝 border
  - 🟨 定理盒: 淡黄 background (`#fcf6e3`) + 棕黄 border
  - 🟩 例子盒: 淡绿 background (`#eaf5e9`) + 深绿 border
  - 🟥 陷阱盒: 淡红 background (`#fbeaea`) + 深红 border
  - 🟪 备注盒: 淡紫 background (`#f1ecf7`) + 深紫 border (轻量级)
- **数学公式**: KaTeX 渲染, display 模式居中
- **不做深色模式**: 复杂度不值得 (浏览器自带反色可用)

---

## 7. 技术栈 (Technical Stack)

**Pure static HTML + KaTeX + minimal vanilla JS**:

- 每个 topic = 一个 `.html` 文件 (手写)
- 数学公式: **KaTeX 0.16.x via CDN**:
  - `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">`
  - `<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"></script>`
  - `<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js"></script>`
  - Auto-render delimiters: `$$...$$` 块, `$...$` 行内, `\(...\)`, `\[...\]`
  - `throwOnError: false`, `errorColor: "#cc0000"` (公式错误时仍然显示原 LaTeX 不崩页面)
  - **⚠️ 易踩坑**: KaTeX 的 align/aligned/cases/pmatrix/array 等 environment 是 KaTeX-supported, **但必须在 math 模式里** — 即被 `$$...$$` (或 `\[...\]`) 包住. 单独写 `\begin{align*}...\end{align*}` (没 `$$` 包裹) 会被 auto-render 当作纯文本, 直接渲染成 raw LaTeX 源码. 推荐统一用 `$$\begin{aligned}...\end{aligned}$$` 写多行对齐方程 (`aligned` 是 KaTeX 在 math 模式里的标准多行环境). 2026-05-20 全 review 系统 sweep 修复 19 处此类 bug.
- 样式: 单一共享 `style.css` (放 `Review/style.css`)
- 交互需要 JS 的:
  - Scroll-spy TOC 高亮 (IntersectionObserver, ~30 行)
  - 移动端 TOC 浮层 toggle (~10 行)
  - 顶部 nav 的 Prev/Next 链接由各页 HTML 静态指定, 不需要 JS
- 全部 JS 写在共享 `Review/scripts.js`, < 100 行
- **无 build 步骤**, `open Review/index.html` 直接浏览

---

## 8. 文件夹结构

```
MATH 31CH/
├── Review/                          ← NEW
│   ├── SPEC.md                      ← 本设计文档
│   ├── index.html                   ← 主页 + 14 topic 总览 TOC
│   ├── style.css                    ← 全局样式
│   ├── scripts.js                   ← 全局 JS (scroll-spy, mobile TOC)
│   ├── assets/                      ← 图片 / SVG 示意图 (Phase 1 暂空)
│   └── topics/
│       ├── 01-1d-riemann.html
│       ├── 02-nd-riemann.html
│       ├── 03-algebra-properties.html
│       ├── 04-volume-pavable.html
│       ├── 05-measure-zero-basics.html
│       ├── 06-lebesgue-criterion.html       ← Phase 1 POC
│       ├── 07-fubini.html
│       ├── 08-linear-cov.html
│       ├── 09-nonlinear-cov.html
│       ├── 10-cov-patterns.html
│       ├── 11-limits-riemann.html
│       ├── 12-lebesgue-construction.html
│       ├── 13-well-definedness.html
│       └── 14-lebesgue-properties.html
```

**图 / 示意图策略**: 只在 truly necessary 时画 (e.g. Thomae 函数图、traveling box 演化、truncation 示意)。手写 **inline SVG** 嵌入 HTML (不放 `assets/` 是为了减少文件依赖, 但复杂图可放 `assets/` 单独 `.svg`)。POC (Topic 6) 阶段先**不画任何图**, 验证模板是否需要图再决定 — 节省 POC 时间。

**命名约定**: 双位数字前缀 (`01-`, `02-`, ..., `14-`) 保证文件按拓扑顺序排列；slug 用 kebab-case 描述内容。

---

## 9. 语言风格 (Language)

- **叙述 (motivation, intuition, pitfalls, takeaways, exercise hints)**: 中文
- **数学符号 / 公式 (LaTeX)**: 标准英文符号 (与 typed notes 一致)
- **关键术语首次出现**: 中英并列, e.g. "可积 (integrable)", "测度零 (measure zero)", "支撑 (support)"
- **定义/定理 statement**: 仍可英文，因为这是 formal content; 后续的解释和直觉用中文。例如：
  > **Definition (Riemann 可积).** A bounded function $f \colon [a,b] \to \R$ is *Riemann integrable* if for every $\eps > 0$ there exists a partition $P$ such that $U(P,f) - L(P,f) < \eps$.
  >
  > **直觉**: 上和下和能任意逼近，说明"高估"和"低估"之间没有 fundamental gap，积分的值唯一确定...

(这个 hybrid 模式比"全中文叙述 + 英文公式"更平衡 — 不强行把 "Riemann integrable" 翻译成"黎曼可积"造成阅读分裂。)

---

## 10. 实施阶段 (Phasing)

### Phase 1 — Proof of Concept (本次)
1. 建立 `Review/` 文件夹及子目录
2. 写 `style.css` (色板、字体、布局、box 样式、TOC sticky behavior)
3. 写 `index.html` (主页 + 完整 14 topic TOC — 链接到所有 14 个 topic 页, 但 Phase 1 只有 06 实际存在; 其余链接在 Phase 3 完成前点击会 404, 这是预期行为)
4. 完成 **Topic 6 (Lebesgue 准则与 a.e. 推论)** 作为模板基准
5. 用户审核 → 反馈调整模板

**为什么选 Topic 6 做 POC**:
- 有多种定义 (measure zero, a.e., continuity at a point) → 测试"definition 盒"
- 有大定理 (Lebesgue 准则) → 测试"theorem 盒 + proof sketch + 折叠完整证明"
- 有 Thomae 函数 → 测试"example 盒"
- 有 positivity 引理 → 测试 lemma 风格
- 难度中等，长度可控

### Phase 2 — 用户反馈 + 模板锁定
- 字号、颜色、行宽、narrative tone 调整
- 一旦定型，剩余 13 页按相同模板生产

### Phase 3 — 批量生产剩余 13 页
- 按 Part I → V 顺序: 01 → 02 → ... → 14 (跳过已完成的 06)
- 每页约 1 小时左右完成

---

## 11. 成功标准 (Success Criteria)

完成后的复习系统应满足：
- ✅ 学期结束 3-6 个月后回看，仍能 30-60 分钟读懂一个 topic 页并回忆起 typed notes 对应内容
- ✅ 14 个页面之间通过 prerequisites 和 cross-references 形成清晰的 dependency 网络
- ✅ 每页 narrative 顺畅，不是 bullet point 堆砌
- ✅ 练习题可以在不偷看答案的情况下自测
- ✅ 全部内容可以脱机 (无网络) 使用 (除非依赖 KaTeX CDN — 可选本地化)

---

## 12. 不在范围内 (Out of Scope)

- ❌ Ch 5 / Ch 6 内容 (forms, Stokes) — 等讲到时再追加
- ❌ 全文搜索功能
- ❌ 深色模式
- ❌ 多用户/进度跟踪
- ❌ 可编辑/笔记功能 (review pages 是 read-only)
- ❌ 移动端深度优化 (basic responsive 即可，不专门为手机设计)
- ❌ 中英对照逐句翻译
- ❌ HW pset / DI 内容 (那是另一个体系)

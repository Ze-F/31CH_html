# Homework HTML 讲解专区 — 设计 Spec

**Date:** 2026-05-26
**Scope (this iteration):** HW4.html (Sec 4.11 of H&H — Lebesgue integral, 6 problems) + index.html 索引骏架 + CLAUDE.md routine 更新.
**Out of scope:** HW1/HW2/HW3.html (deferred to future iteration), HW5+ (not yet assigned).

---

## 1. 目标与定位

`Review/homework/` 是 `Review/` 下与 `topics/` 和 `midterm2/` 并列的第三个分区，专门承载**每周 HW 的 HTML 讲解页**。

- **与 LaTeX response 的关系 (`HW/Response/HWN_response.tex`)**: LaTeX 是已提交的"严格证明"; HTML 是"严格证明 + 策略层叙述 + 跨题方法论 + 自学回顾"。数学内容以 LaTeX response 为 single source of truth, HTML 不重新推导，只重新包装。
- **与 topic/MT2 页的关系**: topic 是"概念教学"，MT2 是"考前主题复习"，HW 是"周作业方法论复盘"。三者风格同源 (KaTeX + 中文叙述 + 色彩 box + `<details>` 折叠)，但内部结构因目的差异有调整。
- **使用场景**: HW 提交完成后立即写一份 HTML，作为 3-6 个月后回头复习时"我当时是怎么想的、为什么选这条路、容易栽哪"的备忘。

---

## 2. 目录与文件

```
Review/
├── homework/                       (新增)
│   ├── SPEC.md                     ← 本文档
│   ├── PLAN.md                     (后续 writing-plans 阶段产出)
│   └── HW4.html                    (~1700-2000 行预估)
└── index.html                      (修改: 新增 Homework 详解专区 section)
```

CLAUDE.md 末尾「Routine: Review HTML Pages」节之后新增一条 routine "Routine: HW HTML 讲解" (见 §7)。

---

## 3. HW4.html 整体布局

题型驱动 9-section 结构。**与 topic 页的 9-section (动机/前置/定义/定理/例/陷阱/练习/速查/进一步) 不硬对齐**——HW 的本质是问题集，不是概念教学。

| § | 标题 | 主要内容 |
|---|---|---|
| §1 | 总览 | 1段引入 ("本次 HW 是 §4.11 Lebesgue 积分的 MCT/DCT 应用集"); **题型分布表**; `box prereq` 列出 5 条「本次 HW 通用工具箱」(MCT, DCT, Lebesgue Fubini, product rule, abs value closure) |
| §1.5 | Problems 5-7 联合策略 | **W2 决定**: 5/6/7 共用 "p-参数 + truncation + Riemann Fubini + MCT" 模板，先在这里集中讲透模板，§2/§3/§4 只讲各自的特殊差异 |
| §2 | Problem 4.11.5 | 4-段 (题面/策略/证明/反思); 证明默认折叠 |
| §3 | Problem 4.11.6 | 4-段, 证明内**嵌 `<details>` 按 Case 切分** (W3 决定): m=1 / m>1 / m<1 三 case 各占一个折叠块, 末尾 Synthesis 不折叠 |
| §4 | Problem 4.11.7 | 同 §3 (与 4.11.6 对偶, 无界域) |
| §5 | Problem 4.11.8 | **W1 决定**: 特殊 envelope. §5.0 串联引入 (4 题合在一起 = "Lebesgue 版 IBP 完整链条") → §5.a/§5.b/§5.c/§5.d 各只有「题面 + 证明」, 证明默认折叠 → §5.e 整体反思 (策略与几何意义合并) |
| §6 | Problem 4.11.11 | 4-段, 标准 |
| §7 | Problem 4.11.19 | 4-段, 标准 |
| §8 | 本次 HW 方法论速查 | Cheat sheet, 仿 topic/MT2 页 §8 风格: 🟦 def (truncation 类型) / 🟨 thm (核心定理) / 🟢 tech (技巧) / 🟥 pitfall (陷阱). **具体条目在 implementation 期落地** (W5: 不在 spec 期承诺词句) |
| §9 | 进一步阅读 | H&H §4.11 ref; typed notes paths (`Notes/Typed/7.1-7.3`); 相关 topic 页链接 (Topic 12/13/14); LaTeX response 路径 |

---

## 4. 每题的 4-段标准结构 (§2, §6, §7 适用; §3/§4 加 case-internal `<details>`; §5 用 special envelope)

| 段 | Box class | 折叠? | 内容 |
|---|---|---|---|
| 题面 (Problem) | `box def` (蓝) | 默认展开 | 原题英文 + 必要的符号定义 (e.g. `A_m`) |
| 策略 (Strategy) | 普通段落, 关键句加粗 | **默认展开 (W4)** | 1-2 段中文叙述: 这道题在问什么 / 为什么 MCT 而不是 DCT / truncation 怎么选 / 哪一步是关键. 这是 HTML 相对 LaTeX 的核心增量 |
| 证明 (Proof) | `box thm` (黄) 包 `<details>` | **默认折叠 (W4)** | 严格证明, 数学与 LaTeX response 一致, 分 Step 1/2/3. 对 §3/§4 的 case-heavy 证明, 在 `box thm` 内再嵌 `<details>` per case |
| 反思 (Reflection) | `box remark` (紫) 或 `box pitfall` (红) | 默认展开 | 几何/物理直觉; 阈值意义; 跨题对比; 常见错误警示 |

§5 的 special envelope:
- §5.0 (Problem 4.11.8 串联引入, 普通段落): 4 个 part 怎么搭起来形成 "IBP for Lebesgue 完整链条"
- §5.a, §5.b, §5.c, §5.d: 各一个小节, 仅「题面 + 证明 (折叠)」, 不重复策略与反思
- §5.e (整体反思, `box remark`): 4 个 part 串起来的几何/几何意义 + 跟经典 IBP 的对比

---

## 5. 编号与跨页约定

- HW 页**不引入** `Def N.M / Thm N.M` 全局计数器 (与 topic 页不同) — HW 不教新概念，只解原题。使用 `Problem 4.11.5` (textbook-numbered) 作为问题锚点，证明内部用 `Step 1/2/3` 编号。
- 链接方向: HW 页可链接 topic 页 (Topic 12/13/14) 和 MT2 页; topic/MT2 页**不**反向链 HW 页 (保持单向, 防 topic 页因 HW 而变更)。
- Top nav: prev/next 链 — 当前 HW4.html 在 `homework/` 内是唯一实页, prev/next 均为 "无 (灰)"。未来 HWN 加入时再回填。

---

## 6. index.html 改动

在 MT2 复习专区 section **之后**、Part I section **之前** 插入新 section:

```html
<section class="part-section">
  <h2>Homework 详解专区 (每周 HW 的 HTML 讲解, 与 LaTeX response 互补)</h2>
  <ul class="topic-list">
    <li class="placeholder">
      <div class="topic-num">HW1</div>
      <div>
        <a class="topic-title nav-disabled">HW1 详解 (未实现)</a>
        <div class="topic-meta">§4.1 Riemann 积分基础</div>
        <div class="topic-desc">未来补充. 当前请参阅 HW/Response/HW1_response.pdf.</div>
      </div>
    </li>
    <!-- HW2 / HW3 同 HW1 占位样式 -->
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
```

**占位项的视觉处理** (2026-05-26 更新 — spec 二审发现): `Review/style.css:262-272` 已有 `.topic-list li.unavailable` class, 行为正是占位需要的 (opacity 0.5, topic-title pointer-events: none). 但 lines 268-272 有一条硬编码 ::after content 说"(待 Phase 3 完成)" — 这是 Ch 4 build 期临时用的, Ch 4 已完成此规则已无活跃 selector. **决定**: 复用 `.unavailable` 并删掉 lines 268-272 的 ::after 规则, 让 `.unavailable` 成为干净可复用的占位 class. HW1/HW2/HW3 占位项用 `<li class="unavailable">`. 提示文本 (e.g. "未实现, 当前请参阅 ...") 写在 HTML 内而非 CSS.

---

## 7. CLAUDE.md 新增 routine 条目

放在「Routine: Review HTML Pages」之后, 「Folder Structure」之前. 简要描述:

- 触发: HW LaTeX response 完成后, 可选转 HTML.
- 位置: `Review/homework/HWN.html`.
- 结构: 9-section, 题型驱动 (overview + 串联策略 [如适用] + 各问题 4-段 + cheat sheet + refs).
- 默认: 策略段展开, 证明段 `<details>` 折叠.
- Source of truth: `HW/Response/HWN_response.tex`. 数学不重证, 只重包装.
- 完成后: 更新 `Review/index.html` Homework 专区把对应 placeholder 转为实体链接.
- Convention/style 全部从 `Review/SPEC.md` 与 topic/MT2 页继承.

---

## 8. 已识别风险 (Acknowledged, not blocking)

| ID | 风险 | 决策 |
|---|---|---|
| R1 | 单页 ~1700-2000 行已是站内最长, 实现期可能膨胀超 2500 行 | 授权: 实现期若超 2500 行可触发拆页 (最自然的切线是 §5 Problem 4.11.8 拆出 HW4-8.html). 不需重新设计. |
| R2 | 未来 HW3.html 与 MT2-A/B 内容会重合 (§4.9/4.10) | 出 scope. 实现 HW3 时再决定 "重抄/链接/删 MT2 对应段". 现在仅 flag. |
| R3 | HTML 数学忠实搬 LaTeX, 若 LaTeX 有 bug 会被传染 | 不主动 re-prove. 实现期逐行翻译时若发现可疑步骤可标记, 否则信任 LaTeX. |

---

## 9. 实现期可调项 (W5 spec 期不锁)

- §8 cheat sheet 的具体词句 (类别数 5/6/4/3 锁; 每条具体写什么留待 implementation 阶段, 在写完所有 §2-§7 后回填能保证条目可被实际抄出)
- 每题 "反思" 段的具体内容 (取决于翻译 LaTeX 时哪些 remark 自然冒出来)
- §1 题型分布表的精确措辞 (核心信息: 5/6/7 = p-参数 truncation; 8 = 综合 [DCT + Fubini + 反证]; 11 = DCT + Gaussian; 19 = MCT 主链)

---

## 10. 出口

本 spec 通过后 → invoke `writing-plans` skill 产出 step-by-step 实现计划 (`PLAN.md`), 包含 phase 切分 (例如 Phase 1: scaffold HTML + §1 + §1.5; Phase 2: §2-§4 三个 p-参数题; Phase 3: §5 IBP 链条; Phase 4: §6-§7 余下两题; Phase 5: §8-§9 cheat + refs; Phase 6: index.html + CLAUDE.md + 渲染验证), KaTeX 渲染检查点, 与各 phase 的 sanity check.

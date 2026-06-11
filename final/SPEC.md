# Final 冲刺区 — Design Spec

Date: 2026-06-11 · Status: approved by user (单页总览 + 可打印 cheat sheet + 暂不打 typed notes)

## 定位

考前最后冲刺层。不教新内容,聚合已有资源(topics 16–22、MT2 区、homework/PracticeFinal.html)
+ 两份新手写 PDF(`Notes/Written/10.3 notes written.pdf`、`Notes/Written/Final Review.pdf`)
+ 教授 Jun 5 公告的考试情报。

## 考试情报来源(教授公告, posted Jun 5)

- 计算题 100% 出自 MT2 之后: Fourier/Laplace 变换、用变换解 PDE/ODE、平面/空间曲线曲率、曲面 — 约 40%
- 另一最重要板块: 收敛定理 (MCT, DCT, Fatou for Lebesgue integral) 的**应用** — 约 30%
- Practice Final = HW V, 每 Part 至少做一题, 至少交两题, 按完成度计分
- 允许一张 A4 双面 cheat sheet (手写/iPad/打印均可)
- 评分: 50% Final + 30% Best MT + 20% HW

## 页面

1. **`FinalSprint.html`** — 8 节: §1 考试情报 / §2 冲刺路线图 / §3 Fourier & Laplace 速查
   / §4 曲线速查 / §5 曲面速查 (graph + torus worked results) / §6 收敛定理速查 + 决策树
   / §7 易错点 Top 10 / §8 考前 checklist + 资源导航
2. **`CheatSheet.html`** — 可打印 A4 双面: `.sheet` ×2 + 页面内 `@media print` CSS
   (正面: Fourier/Laplace + 收敛定理; 反面: 曲线 + 曲面)。屏幕可读, ⌘P 直接打印。

## 约定

- 复用 `../style.css` + KaTeX 头部(从 `midterm2/MT2-practice.html` 复制), 宏补 `\FT \LT \I \II \T \NN \B`
- 无全局 Def/Thm 编号(同 HW 页惯例);数学内容来自已 review 的 topic 页 + 两份 PDF, 不发明新内容
- nav 链: index → FinalSprint ⇄ CheatSheet;index.html 顶部新增「Final 冲刺」专区(2 卡片)
- 板书勘误: Final Review 板书 graph-surface 的 H 公式漏分母 2(minimal set 结论不受影响),
  torus 板书用内法向;页面统一外法向并标注 H 的符号依赖 ν

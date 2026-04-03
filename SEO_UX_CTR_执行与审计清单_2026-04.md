# SEO / UX / CTR 执行与审计清单（2026-04）
## 1) 北极星目标（28 天滚动）
- SEO：核心专题页进入可见排名（Top 30），长尾词优先冲 Top 10。
- UX：移动端 Core Web Vitals 达标（LCP < 2.5s，CLS < 0.1，INP < 200ms）。
- CTR：重点页面较基线提升 +2% ~ +5%。
## 2) 页面级关键词与目标
- `/[locale]/what-is-ambigram`
  - 主词：`what is an ambigram`
  - 副词：`ambigram definition`、`ambigram tattoo designs`
  - 目标：修复“高曝光低点击”，首屏引导到生成器。
- `/[locale]/ai-tattoo-generator`（待建）
  - 主词：`ai tattoo generator`
  - 副词：`tattoo ai generator free`、`ai tattoo generator from text`
  - 目标：承担主流量入口与转化入口。
- `/[locale]/ai-tattoo-generator/cover-up`（待建）
  - 主词：`ai tattoo cover up generator`
  - 目标：低 KD 快速起量页。
- `/[locale]/ai-tattoo-generator/names`（待建）
  - 主词：`ai name tattoo generator`
  - 副词：`free ambigram generator two names`
  - 目标：高意图转化页。
- `/[locale]/ai-tattoo-generator/3d-stl`（待建）
  - 主词：`ambigram generator stl`
  - 副词：`ambigram 3d print`
  - 目标：技术差异化与高价值转化。
- `/[locale]/best-ai-tattoo-generator`（已存在）
  - 主词：`best ai tattoo generator`
  - 目标：竞品对比拦截流量。

## 3) 单页上线验收（必须全部通过）

- Title：主词前置，长度控制在可展示范围，包含价值点（Free / No Sign-up / 3D）。
- H1：主词精确匹配一次；首屏 100 词内出现主词与 1 个副词。
- CTA：首屏至少 1 个主 CTA（`Start Free` / `Launch Generator`）。
- 内链：至少 5 个有效内链（专题页互链 + 教程页 + 工具页）。
- 结构化数据：Article/FAQ/HowTo 按页面类型补齐。
- 多语言：`hreflang` 与 sitemap 同步更新，避免孤页。
- 移动体验：按钮可点击区域足够，首屏不跳动，交互路径 <= 2 步到生成器。

## 4) 6 周执行节奏

- Week 1：修复高曝光低点击页（`what-is-ambigram`）+ 新专题路由骨架。
- Week 2：上线英文主专题（main/cover-up/names/3d-stl）。
- Week 3：增强转化模块（样例、FAQ、比较模块、CTA A/B 文案）。
- Week 4：上线 `/it`、`/fr` 专题页（第一梯队）。
- Week 5：上线 `/es`，并做本地关键词替换。
- Week 6：复盘 28 天 GSC（曝光/CTR/排名），按表现做第二轮改版。

## 5) 审计节奏（固定）

- T+0：代码审计（metadata、内链、sitemap、结构化数据）。
- T+7：看收录与初始曝光，修正抓取与标题描述。
- T+14：看 CTR 与平均排名，调整标题/H1/首屏 CTA。
- T+28：看稳定趋势，决定扩词还是提转化。

## 6) 本轮（Day 1）已执行

- 已优化 `what-is-ambigram` 英文 Title/Description，增强搜索点击动机。
- 已修复该页多语言 CTA/功能链接路径，统一到 locale 路由，降低跳转损耗。

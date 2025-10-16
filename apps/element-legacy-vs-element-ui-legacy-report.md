# element-legacy 与 element-ui-legacy（产物对比）

## 概览
- `apps/element-legacy-dist`（v0.0.1）：8.7 MB，含 1,122 个文件。
- `apps/element-ui-legacy-dist`（v3.0.3）：6.7 MB，含 957 个文件。
- 两个构建发布了相同的组件、指令与入口，但 `element-legacy` 额外引入了 TypeScript 源码、更丰富的编译产物以及更新后的工具链信息。

## 路径与结构差异
- `element-legacy` 在包根目录提供 `theme-chalk/`；`element-ui-legacy` 的主题仍位于 `packages/theme-chalk/`。
- `src/` 目录语言结构不同：`element-legacy` 使用 93 个 `.ts` 文件替换原先的 `.js` 实现，覆盖工具函数、mixins、动画与多语言配置。
- `element-legacy/lib` 中新增多个编译后的辅助 chunk（如 `aria-utils-*.{js,cjs}`、`collapse-transition-*.{js,cjs}`），这些在旧版本中不存在。
- `element-legacy/types` 新增 `date-picker-v2.d.ts`，其它声明文件仍与旧版本保持同样的组织结构。

## 核心内容改动
- 生成的 bundle（`lib/*.js|cjs`）全面不同。`element-legacy` 借由中间变量包裹默认导出（如 `const _ElOption = ElOption`），并因重新构建导致 chunk 哈希改变（`main-CO0p3cHT.js` 对比 `main-CC-PwbsJ.js`）。
- `packages/*/index.[tj]s` 改写为带 Vue 类型标注的 TypeScript，安装逻辑保持一致，但多了显式的泛型签名。
- `types/element-ui.d.ts` 调整为具名导出（例如 `export { ElAlert }`），契合 TS 化方案。
- README 仅移除部分生态链接，其余内容基本一致。

## 工具与依赖差异（`package.json`）
- 包名与版本从 `element-ui-legacy@3.0.3` 切换到 `element-legacy@0.0.1`，证明是重新发布的构建。
- `files[]` 新增根目录的 `theme-chalk` 以反映主题路径变更。
- 开发依赖更新：`@icebreakers/*`、`eslint`、`lint-staged`、`vite` 等版本提升，同时移除了 `gulp-sass`、`copy-webpack-plugin`、`html-webpack-plugin` 等偏向旧版构建链的插件。
- 脚本改用 monorepo 辅助命令（`monorepo clean`、`monorepo sync`），并调整主题构建流程（`pnpm --filter @element-legacy/theme-chalk run build` 替换 gulp 方案），发布脚本简化为 `pnpm publish`。

## 总结
- `element-legacy` 可视作对 `element-ui-legacy` 的 TypeScript 化重构，提供更完善的类型、额外的辅助文件和重定位的主题资源，同时保持运行时 API 未见显著变动。
- 迁移时需留意 `theme-chalk` 新路径、入口文件的类型注入以及额外的 chunk 命名差异，构建流程需确保能找到重新布局的 CSS 资源。

## 功能与表现评估
- 路径与源码语言虽有大幅调整，但组件目录、导出结构与依赖关系保持一致；`lib` 产物仍基于 Vue 2 组件工厂生成，说明功能覆盖面未减少。
- 差异主要集中在构建工具与类型支持，未发现 API 缩减或行为改变的证据，推测整体功能与表现与旧版本保持一致。
- 建议在现有项目中执行一次集成测试或关键功能冒烟测试，以确认新主题路径及新增 TypeScript 编译流程不会影响运行时表现。

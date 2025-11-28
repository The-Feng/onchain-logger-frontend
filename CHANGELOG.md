# 更新日志

## [1.0.0] - 2024-11-28

### 新增功能
- ✅ 完整的链上事件写入和查询功能
- ✅ Wagmi + RainbowKit 钱包连接
- ✅ The Graph 子图数据查询
- ✅ Toast 提示系统（成功/错误/信息）
- ✅ 响应式布局（左右分栏）
- ✅ 表格数据展示（带滚动）
- ✅ 自动刷新功能（每 10 秒）

### 技术实现
- React 19.2.0 + TypeScript
- Vite 7.2.4 构建工具
- Wagmi 2.12.7 以太坊交互
- RainbowKit 2.2.3 钱包连接
- The Graph GraphQL 查询
- Cloudflare Pages 自动部署

### 样式优化
- 深色主题 UI
- 左右分栏布局（左侧 40%，右侧 60%）
- 表格内部滚动
- 成功提示样式优化（渐变背景、加粗文字）
- 表格文字省略号处理

### 部署配置
- GitHub Actions 自动部署到 Cloudflare Pages
- Wrangler 配置
- 环境变量支持（GitHub Secrets）

### 已知问题
- RPC 超时问题：建议配置自定义 RPC 端点（Infura/Alchemy）

### 后续计划
- [ ] 添加分页功能
- [ ] 添加搜索和筛选
- [ ] 优化代码分割，减少打包体积
- [ ] 添加更多错误处理


# 项目信息

## 项目名称
Onchain Logger Frontend

## 项目描述
一个完整的 Web3 前端应用，用于在 Sepolia 测试网上写入和查询链上事件。演示了智能合约、The Graph 子图和现代前端技术的集成。

## 核心功能

### 1. 钱包连接
- 支持 MetaMask、WalletConnect 等多种钱包
- 自动检测网络（Sepolia 测试网）
- 显示钱包余额和地址

### 2. 写入链上事件
- 通过智能合约 `writeLog` 函数写入事件
- 支持 Topic、Message、Metadata 三个字段
- 实时显示交易状态（提交中、确认中、已确认）

### 3. 查询链上事件
- 通过 The Graph 子图查询链上事件
- 自动刷新（每 10 秒）
- 表格展示：日志 ID、发送者、Topic、消息、Metadata、时间、交易链接

## 技术亮点

1. **TypeScript**：完整的类型安全
2. **React Hooks**：自定义 Hook 封装数据查询逻辑
3. **错误处理**：友好的错误提示和重试机制
4. **响应式设计**：适配不同屏幕尺寸
5. **自动部署**：GitHub Actions + Cloudflare Pages CI/CD

## 部署状态

- ✅ 合约已部署到 Sepolia：`0x67914c63047df7F366f2dd1088a815BB61Bad4ff`
- ✅ 子图已部署到 The Graph Studio：`v0.0.2`
- ✅ 前端已配置 Cloudflare Pages 自动部署

## 开发时间线

- 2024-11-28：项目创建和初始开发
- 完成合约部署和子图配置
- 完成前端开发和样式优化
- 配置 Cloudflare Pages 自动部署


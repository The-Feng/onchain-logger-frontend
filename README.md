# Onchain Logger Frontend

通过事件把数据写上链并回读的前端应用。

## 功能特性

- 🔗 使用 Wagmi + RainbowKit 连接钱包
- 📝 通过合约写入链上事件
- 📊 通过 The Graph 子图查询链上事件
- 🎨 现代化的 UI 设计

## 技术栈

- React + TypeScript
- Vite
- Wagmi v2
- RainbowKit
- The Graph (GraphQL)

## 环境变量配置

创建 `.env` 文件：

```bash
VITE_WALLETCONNECT_PROJECT_ID=你的WalletConnect项目ID
VITE_LOGGER_CONTRACT=0x67914c63047df7F366f2dd1088a815BB61Bad4ff
VITE_SUBGRAPH_URL=https://api.studio.thegraph.com/query/117504/onchain-logger/v0.0.2
VITE_SEPOLIA_RPC_URL=可选，自定义RPC端点
```

## 本地开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

## GitHub Pages 部署

项目已配置 GitHub Actions 自动部署到 GitHub Pages。

### 部署步骤

1. 在 GitHub 仓库设置中启用 Pages：
   - Settings → Pages
   - Source: GitHub Actions

2. 配置 GitHub Secrets（可选，用于生产环境变量）：
   - Settings → Secrets and variables → Actions
   - 添加以下 secrets：
     - `VITE_LOGGER_CONTRACT`
     - `VITE_SUBGRAPH_URL`
     - `VITE_WALLETCONNECT_PROJECT_ID`
     - `VITE_SEPOLIA_RPC_URL`

3. 推送代码到 main/master 分支，GitHub Actions 会自动构建并部署

### 注意事项

- 如果仓库名不是 `onchain-logger-frontend`，需要修改 `vite.config.ts` 中的 `base` 路径
- 生产环境的环境变量需要通过 GitHub Secrets 配置
- 首次部署后，访问地址为：`https://你的用户名.github.io/仓库名/`

## 相关项目

- [合约项目](../onchain-logger-contracts/)
- [子图项目](../onchain-logger-subgraph/)

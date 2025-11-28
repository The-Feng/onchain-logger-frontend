# Cloudflare Pages 部署问题修复

## 问题
GitHub Actions 部署时出现错误：`Project not found. The specified project name does not match any of your existing projects.`

## 解决方案

### 方案 1：使用 Wrangler CLI（推荐，已更新）

工作流已更新为使用 `cloudflare/wrangler-action@v3`，它会自动创建项目（如果不存在）。

**已更新的配置：**
- 使用 `wrangler pages deploy` 命令
- 自动创建项目（如果不存在）

### 方案 2：手动创建项目（备选）

如果方案 1 仍有问题，可以手动创建项目：

1. 访问 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 **Workers & Pages**
3. 点击 **Create application** → **Pages** → **Connect to Git**
4. 连接你的 GitHub 仓库
5. 配置项目名称：`onchain-logger-frontend`
6. 构建配置：
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `/`

### 方案 3：使用 Wrangler 本地创建

```bash
# 登录 Cloudflare
npx wrangler login

# 创建并部署项目（会自动创建如果不存在）
npx wrangler pages deploy ./dist --project-name=onchain-logger-frontend
```

## 环境变量配置

在 Cloudflare Pages Dashboard 中配置环境变量：
1. 进入项目设置
2. Settings → Environment Variables
3. 添加以下变量：
   - `VITE_LOGGER_CONTRACT`
   - `VITE_SUBGRAPH_URL`
   - `VITE_WALLETCONNECT_PROJECT_ID`
   - `VITE_SEPOLIA_RPC_URL`（可选）

或者通过 GitHub Secrets 在构建时注入（当前工作流已配置）。

## 验证部署

部署成功后，访问地址：
- 生产环境：`https://onchain-logger-frontend.pages.dev`
- 或自定义域名（在 Cloudflare Dashboard 中配置）


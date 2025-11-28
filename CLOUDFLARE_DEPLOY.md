# Cloudflare Pages 部署指南

## 快速开始

### 1. 安装依赖

```bash
npm install
```

这会自动安装 `wrangler` 作为开发依赖。

### 2. 登录 Cloudflare

```bash
npx wrangler login
```

这会打开浏览器，让你登录 Cloudflare 账号。

### 3. 配置环境变量

#### 方式一：通过 GitHub Secrets（推荐，用于 CI/CD）

在 GitHub 仓库的 Settings → Secrets and variables → Actions 中添加：

**必需：**
- `CLOUDFLARE_API_TOKEN`: Cloudflare API Token
- `CLOUDFLARE_ACCOUNT_ID`: Cloudflare Account ID

**应用环境变量：**
- `VITE_LOGGER_CONTRACT`
- `VITE_SUBGRAPH_URL`
- `VITE_WALLETCONNECT_PROJECT_ID`
- `VITE_SEPOLIA_RPC_URL`

#### 方式二：通过 Cloudflare Dashboard

1. 访问 Cloudflare Dashboard → Pages
2. 选择项目 `onchain-logger-frontend`
3. Settings → Environment variables
4. 添加生产环境变量

### 4. 手动部署

```bash
# 构建
npm run build

# 部署到生产环境
npm run deploy
```

### 5. 自动部署（GitHub Actions）

推送代码到 main/master 分支，GitHub Actions 会自动：
1. 构建项目
2. 部署到 Cloudflare Pages

## 获取 Cloudflare API Token

1. 访问 https://dash.cloudflare.com/profile/api-tokens
2. 点击 "Create Token"
3. 选择 "Edit Cloudflare Workers" 模板，或自定义权限：
   - **Account** → **Cloudflare Pages** → **Edit**
4. 复制生成的 Token
5. 添加到 GitHub Secrets 作为 `CLOUDFLARE_API_TOKEN`

## 获取 Account ID

1. 访问 Cloudflare Dashboard
2. 在右侧边栏可以看到 **Account ID**
3. 复制并添加到 GitHub Secrets 作为 `CLOUDFLARE_ACCOUNT_ID`

## 项目配置

### wrangler.toml

项目已包含 `wrangler.toml` 配置文件：

```toml
name = "onchain-logger-frontend"
compatibility_date = "2024-11-28"
```

### 自定义域名

1. 在 Cloudflare Dashboard → Pages → 你的项目
2. 进入 Settings → Custom domains
3. 添加你的域名
4. 按照提示配置 DNS 记录

## 环境变量说明

### 开发环境

使用项目根目录的 `.env` 文件。

### 生产环境

通过以下方式之一配置：

1. **GitHub Secrets**（推荐）：在 GitHub Actions 构建时注入
2. **Cloudflare Dashboard**：在 Pages 项目设置中配置
3. **Wrangler**：使用 `wrangler pages secret put` 命令

```bash
# 设置生产环境变量
npx wrangler pages secret put VITE_LOGGER_CONTRACT --project-name=onchain-logger-frontend
```

## 故障排查

### 部署失败

1. 检查 GitHub Actions 日志
2. 确认 `CLOUDFLARE_API_TOKEN` 和 `CLOUDFLARE_ACCOUNT_ID` 配置正确
3. 确认 Token 有足够的权限

### 页面空白

1. 检查浏览器控制台错误
2. 确认环境变量已正确配置
3. 检查构建输出是否正确

### 环境变量未生效

1. 确认在 GitHub Secrets 中配置了环境变量
2. 确认变量名以 `VITE_` 开头
3. 重新构建和部署

## 相关链接

- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
- [Wrangler 文档](https://developers.cloudflare.com/workers/wrangler/)
- [GitHub Actions 文档](https://docs.github.com/en/actions)


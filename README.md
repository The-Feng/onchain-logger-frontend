# Onchain Logger Frontend

通过事件把数据写上链并回读的前端应用。这是一个完整的 Web3 应用示例，演示了智能合约、The Graph 子图和前端应用的集成。

## ✨ 功能特性

- 🔗 **钱包连接**：使用 Wagmi + RainbowKit 连接 MetaMask 等钱包
- 📝 **写入事件**：通过智能合约在 Sepolia 测试网上写入链上事件
- 📊 **查询数据**：通过 The Graph 子图实时查询和展示链上事件
- 🎨 **现代化 UI**：深色主题，响应式设计，左右分栏布局
- 🔔 **智能提示**：Toast 通知系统，友好的错误和成功提示
- 🔄 **自动刷新**：每 10 秒自动刷新链上事件数据
- 🚀 **自动部署**：GitHub Actions 自动部署到 Cloudflare Pages

## 📸 界面预览

应用采用左右分栏布局：
- **左侧**：写入事件表单（Topic、Message、Metadata）
- **右侧**：链上事件表格（实时展示从 The Graph 查询的数据）

## 🎯 使用流程

1. **连接钱包**：点击右上角连接按钮，选择 MetaMask 等钱包
2. **切换到 Sepolia 网络**：确保钱包连接到 Sepolia 测试网
3. **写入事件**：
   - 填写 Topic（如：`test`）
   - 填写 Message（如：`这是一条测试日志`）
   - 可选填写 Metadata（JSON 格式）
   - 点击"提交"按钮
   - 在钱包中确认交易
4. **查看数据**：等待交易确认后，右侧表格会自动显示新的事件（子图同步需要 1-2 分钟）

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

## Cloudflare Pages 部署

项目已配置 GitHub Actions 自动部署到 Cloudflare Pages。

### 部署步骤

#### 1. 安装 Wrangler（本地测试用）

```bash
npm install
```

#### 2. 登录 Cloudflare

```bash
npx wrangler login
```

#### 3. 配置 GitHub Secrets

在 GitHub 仓库的 Settings → Secrets and variables → Actions 中添加：

**必需：**
- `CLOUDFLARE_API_TOKEN`: Cloudflare API Token
  - 获取方式：Cloudflare Dashboard → My Profile → API Tokens → Create Token
  - 权限：Account → Cloudflare Pages → Edit
- `CLOUDFLARE_ACCOUNT_ID`: Cloudflare Account ID
  - 获取方式：Cloudflare Dashboard → 右侧边栏可以看到 Account ID

**可选（用于生产环境变量）：**
- `VITE_LOGGER_CONTRACT`: `0x67914c63047df7F366f2dd1088a815BB61Bad4ff`
- `VITE_SUBGRAPH_URL`: `https://api.studio.thegraph.com/query/117504/onchain-logger/v0.0.2`
- `VITE_WALLETCONNECT_PROJECT_ID`: 你的 WalletConnect 项目 ID
- `VITE_SEPOLIA_RPC_URL`: 你的自定义 RPC URL

#### 4. 自动部署

推送代码到 main/master 分支，GitHub Actions 会自动构建并部署到 Cloudflare Pages。

#### 5. 手动部署（可选）

```bash
# 构建项目
npm run build

# 部署到生产环境
npm run deploy

# 或部署到预览环境
npm run deploy:preview
```

### 获取 Cloudflare API Token

1. 访问 https://dash.cloudflare.com/profile/api-tokens
2. 点击 "Create Token"
3. 使用 "Edit Cloudflare Workers" 模板，或自定义：
   - Account → Cloudflare Pages → Edit
4. 复制生成的 Token，添加到 GitHub Secrets

### 访问地址

部署成功后，访问地址为：
- 生产环境：`https://onchain-logger-frontend.pages.dev`
- 或自定义域名（在 Cloudflare Pages 中配置）

### 注意事项

- Cloudflare Pages 不需要 base 路径配置
- 生产环境的环境变量通过 GitHub Secrets 配置
- 首次部署后，可以在 Cloudflare Dashboard 中配置自定义域名

## 📁 项目结构

```
onchain-logger-frontend/
├── src/
│   ├── components/          # React 组件
│   │   ├── LogWriter.tsx    # 写入事件表单
│   │   ├── LogTable.tsx     # 事件数据表格
│   │   └── Toast.tsx        # 提示组件
│   ├── hooks/               # 自定义 Hooks
│   │   └── useLogEntries.ts # 查询子图数据的 Hook
│   ├── lib/                 # 工具库
│   │   ├── abi.ts           # 合约 ABI
│   │   └── config.ts        # 配置管理
│   ├── App.tsx              # 主应用组件
│   └── main.tsx             # 入口文件
├── .github/workflows/       # GitHub Actions
│   └── deploy-cloudflare.yml # Cloudflare 部署工作流
├── wrangler.toml            # Wrangler 配置
└── vite.config.ts           # Vite 配置
```

## 🔧 开发说明

### 组件说明

- **LogWriter**：处理用户输入，调用合约 `writeLog` 函数写入事件
- **LogTable**：通过 GraphQL 查询 The Graph 子图，展示链上事件
- **Toast**：全局提示系统，显示成功/错误/信息提示

### 数据流

1. 用户填写表单 → 调用合约 `writeLog` → 发出 `LogStored` 事件
2. The Graph 子图索引事件 → 存储到 GraphQL 数据库
3. 前端通过 GraphQL 查询 → 展示在表格中

## ⚠️ 常见问题

### RPC 请求超时

如果遇到 RPC 超时错误：
1. 重试提交交易
2. 配置自定义 RPC 端点（推荐）：
   - 在 `.env` 中添加 `VITE_SEPOLIA_RPC_URL`
   - 使用 Infura 或 Alchemy 的免费端点

### 子图数据未显示

1. 确认子图已同步完成（在 The Graph Studio 查看状态）
2. 检查 `VITE_SUBGRAPH_URL` 配置是否正确
3. 等待 1-2 分钟让子图索引新事件

### 钱包连接失败

1. 确认已安装 MetaMask 或其他兼容钱包
2. 确认钱包已切换到 Sepolia 测试网
3. 检查 `VITE_WALLETCONNECT_PROJECT_ID` 是否配置

## 📚 相关项目

- [合约项目](../onchain-logger-contracts/) - 智能合约源码和部署脚本
- [子图项目](../onchain-logger-subgraph/) - The Graph 子图配置和映射逻辑

## 📄 许可证

ISC

## 🙏 致谢

- [Wagmi](https://wagmi.sh/) - React Hooks for Ethereum
- [RainbowKit](https://www.rainbowkit.com/) - 钱包连接 UI
- [The Graph](https://thegraph.com/) - 去中心化索引协议
- [Vite](https://vitejs.dev/) - 下一代前端构建工具

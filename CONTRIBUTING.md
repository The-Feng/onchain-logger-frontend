# 贡献指南

感谢您对 Onchain Logger Frontend 项目的关注！

## 开发环境设置

1. 克隆仓库
```bash
git clone <repository-url>
cd onchain-logger-frontend
```

2. 安装依赖
```bash
npm install
```

3. 配置环境变量
创建 `.env` 文件并配置必要的环境变量（参考 README.md）

4. 启动开发服务器
```bash
npm run dev
```

## 代码规范

- 使用 TypeScript 进行类型检查
- 遵循 ESLint 规则
- 使用 Prettier 格式化代码（如果配置了）
- 提交前运行 `npm run build` 确保没有编译错误

## 提交规范

提交信息请使用清晰的中文或英文描述：
- `feat: 添加新功能`
- `fix: 修复bug`
- `docs: 更新文档`
- `style: 代码格式调整`
- `refactor: 代码重构`
- `test: 添加测试`

## Pull Request 流程

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: 添加新功能'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 问题反馈

如果发现问题或有功能建议，请在 GitHub Issues 中提交。


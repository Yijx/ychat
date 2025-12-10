# GitHub 发布配置指南

## 已配置的 GitHub 发布功能

在 `forge.config.ts` 中已经配置了 GitHub 发布功能：

```typescript
import { PublisherGithub } from '@electron-forge/publisher-github'

// ... 其他配置

publishers: [
  new PublisherGithub({
    repository: {
      owner: 'jiaxunyang',
      name: 'ychat',
    },
    prerelease: false,
    draft: true,
  }),
],
```

## 配置说明

### 1. **仓库信息**
- `owner`: `jiaxunyang` - GitHub 用户名
- `name`: `ychat` - 仓库名称

### 2. **发布选项**
- `prerelease: false` - 不发布预发布版本
- `draft: true` - 创建草稿版本（需要手动发布）

### 3. **环境变量要求**

GitHub 发布需要以下环境变量：

```bash
# 在 .env 文件中添加
GITHUB_TOKEN=your_github_personal_access_token
```

或者通过命令行设置：
```bash
export GITHUB_TOKEN=your_github_personal_access_token
```

## 如何获取 GitHub Token

1. 访问 GitHub: https://github.com/settings/tokens
2. 点击 "Generate new token" → "Generate new token (classic)"
3. 设置 Token 名称（如：`electron-forge-publish`）
4. 选择权限：
   - `repo` (完全控制仓库)
   - `write:packages` (如果需要发布到 GitHub Packages)
5. 生成 Token 并复制

## 发布命令

### 1. **设置环境变量**
```bash
# 临时设置（当前终端会话）
export GITHUB_TOKEN=your_token_here

# 永久设置（添加到 .env 文件）
echo "GITHUB_TOKEN=your_token_here" >> .env
```

### 2. **执行发布命令**
```bash
# 构建并发布到 GitHub
npm run publish

# 或者直接使用 electron-forge
npx electron-forge publish
```

### 3. **发布流程**
1. 构建应用程序
2. 创建发布包（DMG 和 ZIP）
3. 上传到 GitHub Releases
4. 创建草稿版本

## 发布选项配置

### 版本控制
```typescript
new PublisherGithub({
  repository: {
    owner: 'jiaxunyang',
    name: 'ychat',
  },
  prerelease: false,      // 正式版本
  draft: true,           // 草稿版本（需要手动发布）
  generateReleaseNotes: true, // 自动生成发布说明
})
```

### 标签配置
```typescript
new PublisherGithub({
  // ... 其他配置
  tagPrefix: 'v',        // 标签前缀，如 v1.0.0
  releaseType: 'release', // release, prerelease, draft
})
```

## 常见问题

### 1. **认证失败**
```
Error: Failed to publish, reason: HttpError: Bad credentials
```
**解决方案**：
- 检查 `GITHUB_TOKEN` 环境变量是否正确设置
- 确认 Token 有足够的权限
- 重新生成 Token

### 2. **仓库不存在**
```
Error: Failed to publish, reason: HttpError: Not Found
```
**解决方案**：
- 确认仓库 `jiaxunyang/ychat` 存在
- 确认有仓库的写入权限

### 3. **版本已存在**
```
Error: Failed to publish, reason: HttpError: Conflict
```
**解决方案**：
- 删除已存在的 GitHub Release
- 或增加版本号

## 自动化发布脚本

可以创建发布脚本 `scripts/publish.sh`：

```bash
#!/bin/bash

# 检查环境变量
if [ -z "$GITHUB_TOKEN" ]; then
  echo "错误: GITHUB_TOKEN 环境变量未设置"
  echo "请设置: export GITHUB_TOKEN=your_token_here"
  exit 1
fi

# 构建并发布
echo "开始构建和发布..."
npm run publish

if [ $? -eq 0 ]; then
  echo "✅ 发布成功！"
  echo "请访问: https://github.com/jiaxunyang/ychat/releases"
else
  echo "❌ 发布失败"
  exit 1
fi
```

## 发布后的操作

1. **检查发布**：访问 https://github.com/jiaxunyang/ychat/releases
2. **编辑发布说明**：添加版本更新内容
3. **发布草稿**：点击 "Publish release"
4. **分发链接**：分享下载链接给用户

## 注意事项

1. **Token 安全**：不要将 GitHub Token 提交到版本控制
2. **版本号**：确保 `package.json` 中的版本号已更新
3. **测试发布**：可以先使用 `draft: true` 创建草稿进行测试
4. **网络要求**：发布需要稳定的网络连接

## 参考链接

- [Electron Forge Publisher GitHub](https://www.electronforge.io/config/publishers/github)
- [GitHub Personal Access Tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
- [Electron Forge Publishing](https://www.electronforge.io/guides/publish-applications)
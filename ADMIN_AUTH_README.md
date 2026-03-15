# 管理员身份验证功能

## 功能概述

已为 `/admin` 页面添加了身份验证功能，确保只有授权用户才能访问管理后台。

## 实现的功能

### 1. 身份验证
- 用户名：`tangmaokai`
- 密码：`19125880840`

### 2. 路由保护
- 访问 `/admin` 页面时自动检查登录状态
- 未登录用户会被重定向到 `/login` 页面
- 登录成功后会自动跳转到原请求页面

### 3. 登录界面
- 创建了美观的登录页面 (`/src/components/Login.vue`)
- 包含用户名和密码输入框
- 显示错误信息提示
- 响应式设计

### 4. 管理页面更新
- 添加了欢迎信息和用户名显示
- 添加了"退出登录"按钮
- 更新了页面布局以适应新功能

## 文件结构

```
src/
├── components/
│   └── Login.vue                 # 登录组件
├── mixins/
│   ├── index.js                  # 原有数据 mixin
│   └── auth.js                   # 身份验证 mixin
├── router/
│   └── index.js                  # 路由配置（已更新）
└── views/
    └── admin/
        └── index.vue              # 管理页面（已更新）
```

## 使用方法

### 1. 首次使用前
需要运行以下命令更新 Gist 数据，添加用户信息：

```bash
# 设置环境变量（Windows）
set GITHUB_PAT=your_github_personal_access_token

# 设置环境变量（Linux/Mac）
export GITHUB_PAT=your_github_personal_access_token

# 运行更新脚本
node update_gist_with_auth.js
```

### 2. 访问管理页面
1. 直接访问 `/admin` 会跳转到登录页面
2. 输入正确的用户名和密码
3. 登录成功后进入管理后台
4. 可以点击"退出登录"按钮退出

### 3. 登录状态
- 登录状态保存在 `sessionStorage` 中
- 刷新页面后会保持登录状态
- 关闭浏览器标签页后会清除登录状态

## 安全说明

1. **密码安全**：当前密码为明文存储，生产环境建议使用加密存储
2. **会话管理**：使用 sessionStorage 进行简单的会话管理
3. **路由保护**：所有管理页面都有路由守卫保护

## 自定义配置

### 修改用户信息
在 Gist 数据中的 `userinfo` 字段修改用户信息：

```json
{
  "userinfo": [
    {
      "username": "your_username",
      "password": "your_password"
    }
  ]
}
```

### 添加更多用户
可以在 `userinfo` 数组中添加更多用户：

```json
{
  "userinfo": [
    {
      "username": "admin1",
      "password": "password1"
    },
    {
      "username": "admin2",
      "password": "password2"
    }
  ]
}
```

## 测试步骤

1. 启动开发服务器
2. 访问 `http://localhost:3000/admin`
3. 应该会自动跳转到登录页面
4. 输入错误的用户名/密码，验证错误提示
5. 输入正确的用户名密码，验证登录成功
6. 验证能正常访问管理功能
7. 点击退出登录，验证能正确退出并跳转

## 注意事项

- 确保 Gist 中已包含 `userinfo` 数据
- 确保网络能正常访问 GitHub Gist API
- 开发时可能需要处理 CORS 问题
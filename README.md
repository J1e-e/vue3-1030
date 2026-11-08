# 渔家湾点餐系统

基于 Vue 3 的餐厅点餐演示项目，包含用户注册/登录、菜品浏览、购物车和演示下单功能。前端通过 Axios 调用本地 Express API。

## 技术栈

- Vue 3、Vite、Vue Router
- Pinia
- Element Plus、`@element-plus/icons-vue`
- Axios
- Express

## 环境要求

- Node.js `^22.18.0` 或 `>=24.12.0`
- npm

## 启动项目

安装依赖：

```bash
npm install
```

分别在两个终端启动后端和前端：

```bash
npm run server
```

```bash
npm run dev
```

Vite 默认开发地址为 `http://localhost:5173`。开发服务器会将 `/api` 请求代理到 `http://localhost:3000`。

后端用户数据目前保存在内存中，服务重启后注册的账号会清空。预置演示账号为手机号 `17673873233`、密码 `123456`。

## 功能模块

- **主页**：餐厅介绍和登录入口。
- **注册与登录**：表单校验、演示验证码和 Express API 认证。
- **菜单**：按分类展示菜品图片、简介、价格和销量。
- **购物车**：添加、增减、移除菜品，查看数量与金额；数据保存在浏览器本地。
- **账户操作**：展示当前登录手机号，支持登出。

## 项目结构

```text
src/
  data/dishes.js       菜品分类和菜品数据
  Store/               Pinia 用户与购物车状态
  utils/request.js     Axios 实例、请求和响应拦截器
  Views/               页面组件
server/server.js       Express 登录与注册 API
```

## 常用命令

```bash
npm run dev       # 启动 Vite 开发服务器
npm run server    # 启动 Express API
npm run build     # 构建生产版本
npm run preview   # 预览生产构建
```

可通过 `VITE_API_BASE_URL` 配置 Axios 的 API 基础地址；未设置时使用同源请求和 Vite 开发代理。

# Bytedance-ChatterBox

### 基础信息


技术栈：`react + typescript + vite + antd + redux`

编辑器:  `Visual Studio Code`

运行环境: `Node.js （v18.20.4）`

## 项目步骤

### Install

`npm install`

### Development

`npm run dev`    

## 项目结构

```
/Bytedance-ChatterBox             # 项目根目录
├── /public                       # 公共资源
├── /src                          # 源代码目录
│   ├── /api                      # API 请求相关
│   │   └── index.ts              # API 统一导出
│   ├── /assets                   # 静态资源
│   ├── /components               # 可复用的 UI 组件
│   │   └── /chatInput            # 聊天输入框组件
│   │       ├── index.tsx         # 组件逻辑
│   │       └── index.css         # 组件样式
│   ├── /containers               # 页面级别的组件
│   │   ├── /chatPage             # 对话页
│   │   └── /homePage             # 首页
│   ├── /router                   # 路由配置
│   │   └── index.tsx             # 路由定义和配置
│   ├── /services                 # 业务逻辑服务
│   ├── /utils                    # 工具函数
│   ├── App.css                   # 根组件样式
│   ├── App.tsx                   # 根组件逻辑
│   ├── main.tsx                  # 应用入口文件
│   └── vite-env.d.ts             # Vite 环境变量类型定义
└── index.html                    # 应用的 HTML 入口文件
```

### 已做内容

- 首页、对话页的逻辑及其样式
- 对话框组件的封装  

### 目前需要解决的问题

- 完善侧边栏的item，使其可以被重命名和删除
- 每次发送消息后，在侧边栏更新一条消息（标题截取前12个字符）
- 发送消息后还有一个加载动画
- 对话页面的输入框置于相对底部位置，位于顶层（不会被消息气泡遮挡）
- 接入扣子大模型API
- 流式处理
- 内联模式
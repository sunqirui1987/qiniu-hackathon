# OneStory - AI驱动的视频故事板创作平台

OneStory是专业的AI视频故事板创作工具，帮助创作者快速将创意转化为可视化分镜脚本。

## 项目结构

```
qiniu-hackathon/
├── index.html          # 主页面
├── css/
│   └── style.css       # 样式文件
├── js/
│   └── main.js         # JavaScript交互
├── assets/
│   └── images/
│       └── logo.svg    # Logo图标
├── docs/               # 设计文档
│   ├── API接口设计.md
│   ├── UI设计方案.md
│   ├── 架构设计.md
│   ├── 设计系统.md
│   ├── 产品分析报告.md
│   ├── page/
│   │   ├── 01-首页.md
│   │   └── ...
│   └── ui/
└── data/               # 参考数据
```

## 功能特性

### 主页面 (Landing Page)

1. **导航栏**
   - 响应式设计
   - 登录/注册按钮
   - 滚动时添加阴影效果

2. **Hero区域**
   - 自动播放的展示视频
   - 产品标题和副标题
   - CTA按钮（开始创作）

3. **案例展示区**
   - 4个精选案例卡片
   - 悬停时自动播放视频
   - 响应式网格布局

4. **页脚**
   - Logo和导航链接
   - 社交媒体图标
   - 版权信息

## 技术栈

- **HTML5**: 语义化标签，支持无障碍访问
- **CSS3**: 
  - CSS变量
  - Flexbox/Grid布局
  - 响应式设计
  - 动画和过渡效果
- **JavaScript (原生)**:
  - 模态窗口管理
  - 视频交互控制
  - 事件追踪

## 本地运行

### 方式1: 直接打开
```bash
# 直接用浏览器打开 index.html
open index.html
```

### 方式2: 使用本地服务器
```bash
# Python 3
python3 -m http.server 8000

# Node.js (需要安装 http-server)
npx http-server -p 8000

# PHP
php -S localhost:8000
```

然后在浏览器访问 `http://localhost:8000`

## 响应式断点

- **桌面端**: > 1024px
- **平板端**: 768px - 1024px  
- **移动端**: < 768px

## SEO优化

- Meta标签完善
- Open Graph标签
- 语义化HTML
- 性能优化（视频懒加载）

## 无障碍设计

- ARIA标签支持
- 键盘导航
- 屏幕阅读器友好
- 色彩对比度符合WCAG标准

## 浏览器支持

- Chrome/Edge (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- 移动端浏览器

## 后续开发计划

根据设计文档，后续将实现：

1. **用户系统**
   - 登录/注册功能
   - 微信扫码登录
   - 用户认证

2. **Dashboard页面**
   - 项目列表管理
   - 项目创建/编辑/删除
   - 搜索和筛选

3. **故事板编辑器**
   - 剧本编辑视图
   - 角色管理视图
   - 分镜表编辑视图
   - 视频编辑视图

4. **AI功能**
   - 文本转图像
   - 批量生成
   - 角色生成

## 设计参考

详细的设计规范请查看 `docs/` 目录：
- [首页设计](docs/page/01-首页.md)
- [UI设计方案](docs/UI设计方案.md)
- [架构设计](docs/架构设计.md)
- [设计系统](docs/设计系统.md)

## 许可证

© 2025 OneStory. All rights reserved.

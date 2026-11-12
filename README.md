# 花开给你 · Birthday in Bloom

两份手机生日礼物：`letter/` 是一封可以拆开的花信，`garden/` 是四朵可以触摸的祝福。

## 本地预览

在本目录运行 `python3 -m http.server 8765`，打开 http://localhost:8765 。无需安装依赖或构建。

## 发布

GitHub Pages → Deploy from a branch → main / (root)。资源均使用相对路径，支持项目子路径。

## 内容与图片

祝福文案在 HTML 和 app.js 中。用户提供的照片经过尺寸优化，WebP 不含原始 EXIF。人物照片未经过 AI 修改。花枝插画为代码生成的 SVG。无统计、无外部请求、无音乐。

公开 Pages 及本仓库内图片可被任何人访问。noindex 和 robots.txt 仅提示搜索引擎，不提供访问控制。

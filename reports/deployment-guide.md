# Apache 静态部署与上线操作指南

- **目标域名**：`https://dingyuezhinan.biz`
- **构建输出目录**：`dist/`（纯静态输出，无需 Node.js 常驻进程）

## 1. 部署前构建

```bash
npm install
npm run build
npm run qa:all
```

将 `dist/` 目录内的全部文件（包含隐藏文件 `.htaccess`）上传至 Apache 虚拟主机的站点根目录（如 `public_html/`）。

## 2. `.htaccess` 已配置规则

`public/.htaccess`（构建后自动复制到 `dist/.htaccess`）已内置以下生产规则：

1. **HTTPS 与域名统一**：强制将 `http://` 与 `www.dingyuezhinan.biz` 301 重定向至 `https://dingyuezhinan.biz`。
2. **追踪参数清理**：自动剥离 `utm_*`、`fbclid`、`gclid`、`spm` 参数并 301 跳转到规范路径。
3. **自定义 404**：`ErrorDocument 404 /404.html`，确保不存在的路径返回真实 HTTP 404 状态。
4. **安全响应头**：配置 `X-Content-Type-Options`、`X-Frame-Options`、`Referrer-Policy`、`Permissions-Policy` 与 `Strict-Transport-Security`（HSTS），同时不屏蔽搜索引擎爬虫。
5. **缓存与压缩**：为 CSS/JS/WebP/PNG/SVG 开启长期缓存，为 HTML 设置短缓存（10 分钟），启用 `mod_deflate` 文本压缩。

## 3. 上线后需要人工完成的搜索引擎提交清单

1. **站点部署与验证**：确认 `https://dingyuezhinan.biz/`、`https://dingyuezhinan.biz/robots.txt`、`https://dingyuezhinan.biz/sitemap-index.xml`、`https://dingyuezhinan.biz/pagefind/pagefind-ui.js` 均返回 HTTP 200。
2. **Google Search Console**：添加资源 `https://dingyuezhinan.biz`，完成 DNS TXT 或设置 `PUBLIC_GOOGLE_SITE_VERIFICATION` 重建验证后，提交 `https://dingyuezhinan.biz/sitemap-index.xml`。
3. **Bing Webmaster Tools**：添加站点并验证后，提交 `https://dingyuezhinan.biz/sitemap-index.xml`。
4. **神马站长平台 / 百度搜索资源平台**：如账号具备对应权限，设置对应环境变量重建验证后提交 Sitemap。
5. **日常运营工作流**：每周可通过 `npm run keywords:import` 与 `npm run briefs:generate` 更新待办选题，每月运行 `npm run qa:all` 复核链接与品牌状态。

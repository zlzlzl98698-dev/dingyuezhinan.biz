import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const avatarPath = path.join(root, 'public/images/avatars/brand-avatar.webp');
const outPath = path.join(root, 'public/og-default.png');

const width = 1200;
const height = 630;
const avatarSize = 260;

const circleMaskSvg = Buffer.from(
  `<svg width="${avatarSize}" height="${avatarSize}" xmlns="http://www.w3.org/2000/svg">
    <circle cx="${avatarSize / 2}" cy="${avatarSize / 2}" r="${avatarSize / 2}" fill="#fff" />
  </svg>`,
);

const bgSvg = Buffer.from(
  `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#0B1324" />
        <stop offset="65%" stop-color="#0F1B33" />
        <stop offset="100%" stop-color="#0A172D" />
      </linearGradient>
      <radialGradient id="glowCyan" cx="0.24" cy="0.5" r="0.45">
        <stop offset="0%" stop-color="#38BDF8" stop-opacity="0.22" />
        <stop offset="100%" stop-color="#38BDF8" stop-opacity="0" />
      </radialGradient>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1E2E4A" stroke-width="1" stroke-opacity="0.45" />
      </pattern>
    </defs>

    <rect width="${width}" height="${height}" fill="url(#bgGrad)" />
    <rect width="${width}" height="${height}" fill="url(#grid)" />
    <rect width="${width}" height="${height}" fill="url(#glowCyan)" />

    <rect x="36" y="36" width="${width - 72}" height="${height - 72}" rx="24" fill="none" stroke="#1E2E4A" stroke-width="2" />

    <circle cx="240" cy="315" r="142" fill="#0F1B33" stroke="#38BDF8" stroke-width="3" stroke-opacity="0.7" />
    <circle cx="240" cy="315" r="154" fill="none" stroke="#38BDF8" stroke-width="1" stroke-opacity="0.28" stroke-dasharray="6 6" />

    <rect x="440" y="138" width="276" height="36" rx="18" fill="#132645" stroke="#38BDF8" stroke-opacity="0.45" stroke-width="1" />
    <circle cx="464" cy="156" r="5" fill="#38BDF8" />
    <text x="480" y="162" fill="#7DD3FC" font-family="Microsoft YaHei, PingFang SC, Segoe UI, sans-serif" font-size="17" font-weight="600" letter-spacing="1.5">
      SUBSCRIPTION GUIDE
    </text>

    <text x="440" y="246" fill="#F8FAFC" font-family="Microsoft YaHei, PingFang SC, Segoe UI, sans-serif" font-size="68" font-weight="800" letter-spacing="2">
      订阅指南
    </text>

    <text x="440" y="314" fill="#CBD5E1" font-family="Microsoft YaHei, PingFang SC, Segoe UI, sans-serif" font-size="30" font-weight="500">
      从订阅选择到日常使用，一站式网络订阅指南
    </text>

    <line x1="440" y1="364" x2="1080" y2="364" stroke="#1E2E4A" stroke-width="2" />

    <rect x="440" y="396" width="154" height="40" rx="10" fill="#11223D" stroke="#253A5E" stroke-width="1" />
    <text x="517" y="422" text-anchor="middle" fill="#E2E8F0" font-family="Microsoft YaHei, PingFang SC, sans-serif" font-size="18" font-weight="600">
      31 品牌评测库
    </text>

    <rect x="610" y="396" width="166" height="40" rx="10" fill="#11223D" stroke="#253A5E" stroke-width="1" />
    <text x="693" y="422" text-anchor="middle" fill="#E2E8F0" font-family="Microsoft YaHei, PingFang SC, sans-serif" font-size="18" font-weight="600">
      客户端安装排错
    </text>

    <rect x="792" y="396" width="166" height="40" rx="10" fill="#11223D" stroke="#253A5E" stroke-width="1" />
    <text x="875" y="422" text-anchor="middle" fill="#E2E8F0" font-family="Microsoft YaHei, PingFang SC, sans-serif" font-size="18" font-weight="600">
      套餐预算计算器
    </text>

    <text x="440" y="502" fill="#38BDF8" font-family="Consolas, Menlo, monospace" font-size="22" font-weight="700" letter-spacing="1">
      https://dingyuezhinan.biz
    </text>
  </svg>`,
);

async function main() {
  const avatarBuffer = await sharp(avatarPath)
    .resize(avatarSize, avatarSize, { fit: 'cover' })
    .composite([{ input: circleMaskSvg, blend: 'dest-in' }])
    .png()
    .toBuffer();

  await sharp(bgSvg)
    .composite([
      {
        input: avatarBuffer,
        left: 240 - avatarSize / 2,
        top: 315 - avatarSize / 2,
      },
    ])
    .png({ compressionLevel: 9 })
    .toFile(outPath);

  const stat = await fs.stat(outPath);
  const meta = await sharp(outPath).metadata();
  console.log(`Generated ${outPath}: ${meta.width}x${meta.height}, ${stat.size} bytes`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

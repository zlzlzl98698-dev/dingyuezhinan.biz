/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        page: '#FAFBFD',
        surface: '#FFFFFF',
        subtle: '#F1F5F9',
        ink: {
          DEFAULT: '#0F172A',
          muted: '#475569',
          faint: '#64748B',
        },
        brand: {
          DEFAULT: '#0E7490',
          hover: '#0891B2',
          soft: '#ECFEFF',
          border: '#A5F3FC',
        },
        observatory: {
          bg: '#0B1324',
          panel: '#111C33',
          border: '#1E2E4A',
          text: '#E2E8F0',
          muted: '#94A3B8',
          cyan: '#38BDF8',
          emerald: '#10B981',
          amber: '#F59E0B',
          rose: '#EF4444',
        },
      },
      fontFamily: {
        sans: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"PingFang SC"',
          '"Hiragino Sans GB"',
          '"Microsoft YaHei"',
          '"Noto Sans SC"',
          'sans-serif',
        ],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          '"Liberation Mono"',
          'monospace',
        ],
      },
      maxWidth: {
        editorial: '72ch',
      },
    },
  },
  plugins: [typography],
};

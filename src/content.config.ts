import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const baseContentSchema = z.object({
  title: z.string(),
  description: z.string().max(240),
  slug: z.string().optional(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date(),
  category: z.string(),
  tags: z.array(z.string()).default([]),
  cover: z.string().optional(),
  author: z.string().default('订阅指南编辑部'),
  reviewer: z.string().default('网络架构资料校验组'),
  faq: z
    .array(
      z.object({
        question: z.string(),
        answer: z.string(),
      })
    )
    .default([]),
  relatedSlugs: z.array(z.string()).default([]),
  pillar: z.string(),
  primaryKeyword: z.string(),
  searchIntent: z.enum(['informational', 'navigational', 'commercial', 'transactional']).default('informational'),
  entities: z.array(z.string()).default([]),
  sources: z.array(z.string()).default([]),
  dataStatus: z.enum(['measured', 'vendor', 'historical', 'unverified', 'conflicting']).default('vendor'),
  draft: z.boolean().default(false),
  brandSlug: z.string().optional(),
  clientSlug: z.string().optional(),
  subtopicUrl: z.string().optional(),
  order: z.number().default(99),
});

export const collections = {
  reviews: defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/reviews' }),
    schema: baseContentSchema,
  }),
  pillars: defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pillars' }),
    schema: baseContentSchema,
  }),
  subtopics: defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/subtopics' }),
    schema: baseContentSchema,
  }),
  guides: defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/guides' }),
    schema: baseContentSchema,
  }),
  compare: defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/compare' }),
    schema: baseContentSchema,
  }),
  troubleshooting: defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/troubleshooting' }),
    schema: baseContentSchema,
  }),
  knowledge: defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/knowledge' }),
    schema: baseContentSchema,
  }),
  clients: defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/clients' }),
    schema: baseContentSchema,
  }),
  articles: defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
    schema: baseContentSchema,
  }),
};

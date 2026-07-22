import { z } from "zod";

export const projectStatusSchema = z.enum([
  "PLANNED",
  "IN_PROGRESS",
  "COMPLETED",
  "ARCHIVED",
]);

export const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  summary: z.string(),
  description: z.string(),
  status: projectStatusSchema,
  repository: z.string().url().nullable(),
  liveUrl: z.string().url().nullable(),
  featured: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const createProjectSchema = z.object({
  title: z.string().trim().min(2).max(100),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(100)
    .regex(/^[a-z0-9-]+$/),
  summary: z.string().trim().min(10).max(250),
  description: z.string().trim().min(10),
  status: projectStatusSchema.default("PLANNED"),
  repository: z.string().url().nullable().optional(),
  liveUrl: z.string().url().nullable().optional(),
  featured: z.boolean().default(false),
});

export type Project = z.infer<typeof projectSchema>;
export type ProjectStatus = z.infer<typeof projectStatusSchema>;
export type CreateProjectInput = z.infer<typeof createProjectSchema>;
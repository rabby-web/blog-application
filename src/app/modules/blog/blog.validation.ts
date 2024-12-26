import { z } from 'zod';

const createBlogValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required!' }),
    content: z.string({ required_error: 'Content is required!' }),
    author: z.string().optional(),
    isPublished: z.boolean().default(true),
    isDeleted: z.boolean().default(false),
  }),
});

export const BlogValidation = {
  createBlogValidationSchema,
};

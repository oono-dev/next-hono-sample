//models/blogSchemas.ts
import { z } from "@hono/zod-openapi";

export const UserSchema = z.object({
  name: z.string().nullable().openapi({
    example: "oono"
  }),
  image: z.string().nullable().openapi({
    example: "https://avatars.githubusercontent.com/u/xxxxxxxx?v=4"
  }),
})

export const BlogSchema = z.object({
  id: z.number().openapi({
    example: 1
  }),
  title: z.string().openapi({
    example: "honteを作った。"
  }),
  content: z.string().openapi({
    example: "まだまだhono勉強中だけど、ちょっとわかってきた。"
  }),
  createdAt: z.string().datetime().openapi({
    example: "2025-02-16T12:00:00Z"
  }),
  userId: z.string().openapi({
    example: "xxxxxxxxxxxxxxxxxxx"
  }),
  user: UserSchema
})

export const BlogsSchema = z.array(BlogSchema)

export const BlogIdSchema = z.object({
  id: z.string().openapi({ example: "1" }),
})

export const CreateBlogSchema = z.object({
  title: z.string().min(1, { message: "入力されていません。" }).openapi({
    example: "honteを作った。"
  }),
  content: z.string().min(1, { message: "入力されていません。" }).openapi({
    example: "まだまだhono勉強中だけど、ちょっとわかってきた。"
  })
})

export const EditBlogSchema = z.object({
  title: z.string().min(1, { message: "入力されていません。" }).openapi({
    example: "honteを作った。"
  }),
  content: z.string().min(1, { message: "入力されていません。" }).openapi({
    example: "まだまだhono勉強中だけど、ちょっとわかってきた。"
  })
})


export type User = z.infer<typeof UserSchema>
export type Blog = z.infer<typeof BlogSchema>
export type CreateBlog = z.infer<typeof CreateBlogSchema>
export type EditBlog = z.infer<typeof EditBlogSchema>
export const DeleteBlogSchema = z.object({
  id: z.string().openapi({ example: "1" })
})

export type DeleteBlog = z.infer<typeof DeleteBlogSchema>

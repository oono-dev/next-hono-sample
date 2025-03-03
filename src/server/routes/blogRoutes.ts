//routes/blogRoutes.ts
import { createRoute, z } from "@hono/zod-openapi";
import { BlogIdSchema, BlogSchema, BlogsSchema, CreateBlogSchema } from "../models/blogSchemas";

export const getBlogsRoute = createRoute({
  path: "/",
  method: "get",
  description: "全部ブログの取得",
  responses: {
    200: {
      description: "取得成功",
      content: {
        "application/json": {
          schema: BlogsSchema
        }
      }
    }
  },
})

export const getBlogByIdRoute = createRoute({
  path: "/{id}",
  method: "get",
  description: "個別のブログ記事を取得",
  request: {
    params: BlogIdSchema
  },
  responses: {
    200: {
      description: "取得成功",
      content: { "application/json": { schema: BlogSchema } }
    },
    404: {
      description: "ブログが見つかりませんでした。",
      content: {
        "application/json": {
          schema: z.null()
        }
      }
    }
  }
})

export const createBlogRoute = createRoute({
  path: "/",
  method: "post",
  description: "新しいブログを作成",
  request: {
    body: {
      content: {
        "application/json": {
          schema: CreateBlogSchema
        }
      }
    }
  },
  responses: {
    201: {
      description: "作成成功",
      content: {
        "application/json": {
          schema: BlogSchema
        }
      }
    }
  }
})

export const deleteBlogByIdRoute = createRoute({
  path: "/{id}",
  method: "delete",
  description: "指定したブログを削除",
  request: {
    params: BlogIdSchema
  },
  responses: {
    200: {
      description: "削除成功",
      content: { "application/json": { schema: BlogSchema } }
    },
    404: {
      description: "ブログが見つかりませんでした。",
      content: {
        "application/json": {
          schema: z.null()
        }
      }
    }
  }
})
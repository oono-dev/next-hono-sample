import { prisma } from "@/lib/prisma"
import { RouteHandler } from "@hono/zod-openapi"
import { getBlogsRoute } from "../routes/blogRoutes"

export const getBlogsHandler: RouteHandler<typeof getBlogsRoute> = async (c) => {
    const blogs = await prisma.blog.findMany({
      include: {
        user: {
          select: {
            name: true,
            image: true
          }
        }
      }
    })
  
    return c.json(blogs, 200)
  }
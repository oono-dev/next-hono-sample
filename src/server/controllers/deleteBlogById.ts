import { RouteHandler } from "@hono/zod-openapi";
import { getBlogByIdRoute } from "../routes/blogRoutes";
import { prisma } from "@/lib/prisma";

export const deleteBlogByIdHandler: RouteHandler<typeof getBlogByIdRoute> = async (c) => {
    const { id } = c.req.param();
    const blog = await prisma.blog.delete({
      where: { id: Number(id) },
      include: {
        user: {
          select: {
            name: true,
            image: true
          }
        }
      }
    })
  
    if (!blog) {
      return c.json(null, 404)
    }
  
    return c.json(blog, 200)
  }
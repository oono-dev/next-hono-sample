import { RouteHandler } from "@hono/zod-openapi";
import { editBlogByIdRoute } from "../routes/blogRoutes";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export const editBlogByIdHandler: RouteHandler<typeof editBlogByIdRoute> = async (c) => {
  const { id } = c.req.param();
  const { title, content } = c.req.valid("json");

  const session = await auth()

  if (!session?.user?.id) {
    throw Error("認証してください。")
  }

  const blog = await prisma.blog.update({
    where: { 
      id: Number(id),
      userId: session.user.id 
    },
    data: {
      title,
      content
    },
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

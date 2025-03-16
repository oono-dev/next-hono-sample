//server/hono.ts
import { OpenAPIHono } from "@hono/zod-openapi";
import {
  createBlogRoute,
  deleteBlogByIdRoute,
  editBlogByIdRoute,
  getBlogByIdRoute,
  getBlogsRoute
} from "@/server/routes/blogRoutes";
import { getBlogsHandler } from "./controllers/getBlogs";
import { getBlogByIdHandler } from "./controllers/getBlogById";
import { createBlogHandler } from "./controllers/createBlog";
import { swaggerUI } from "@hono/swagger-ui";
import { basicAuth } from "hono/basic-auth";
import { deleteBlogByIdHandler } from "./controllers/deleteBlogById";
import { editBlogByIdHandler } from "./controllers/editBlogById";

export const app = new OpenAPIHono().basePath("/api");

const blogApp = new OpenAPIHono()
  .openapi(getBlogsRoute, getBlogsHandler)
  .openapi(getBlogByIdRoute, getBlogByIdHandler)
  .openapi(createBlogRoute, createBlogHandler)
  .openapi(editBlogByIdRoute, editBlogByIdHandler)
  .openapi(deleteBlogByIdRoute, deleteBlogByIdHandler)

const route = app.route("/blogs", blogApp);

app.doc("/specification", {
    openapi: "3.0.0",
    info: { title: "Honote API", version: "1.0.0" },
}).use('/doc/*', async (c, next) => {
    const auth = basicAuth({
        username: process.env.API_DOC_BASIC_AUTH_USER!, 
        password: process.env.API_DOC_BASIC_AUTH_PASS!, 
    });
    return auth(c, next);
}).get("/doc", swaggerUI({ url: "/api/specification" }));
   
export type AppType = typeof route;
export default app;
import { hono } from "@/lib/hono";
import { notFound } from "next/navigation";
import BlogDetail from "@/Components/BlogDetail";

type Props = {
  params: { id: string };
};

export default async function Page({ params }: Props) {
  const res = await hono.api.blogs[":id"].$get({
    param: { id: params.id },
  });

  const blog = await res.json();

  if (!blog) return notFound();

  return <BlogDetail blog={blog} />;
}

//src/app/blogs/new/page.tsx
import { auth } from "@/lib/auth";
import EditForm from "@/Components/EditForm";
import { hono } from "@/lib/hono";

export default async function Page({ params }: { params: { id: string } }) {
  const session = await auth();

  if (!session) {
    return <div>ログインしてください。</div>;
  }

  const res = await hono.api.blogs[":id"].$get({
    param: { id: params.id },
  });

  const blogData = await res.json();

  if (!blogData) {
    return <div>ブログが見つかりません。</div>;
  }

  const blog = {
    ...blogData,
    createdAt: new Date(blogData.createdAt),
  };

  return (
    <div>
      <EditForm blog={blog} />
    </div>
  );
}

//src/app/page.tsx
import { hono } from "@/lib/hono";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
  //hono rpcを使ったデータ取得
  const res = await hono.api.blogs.$get();
  const blogs = await res.json();

  if (blogs.length === 0) {
    return <div>まだ投稿がありません。</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-3 mt-6">
      <h1 className="text-2xl font-bold text-center mb-6">ブログ一覧</h1>
      <div className="space-y-6">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white shadow-md rounded-lg border border-gray-200 hover:shadow-lg transition duration-200"
          >
            <Link
              href={`/blogs/${blog.id}`}
              className="block w-full h-full p-4"
            >
              <h2 className="lg:text-xl text-lg font-semibold text-gray-800 mb-2">
                {blog.title}
              </h2>
              <p className="text-gray-600 lg:text-md text-sm mb-4">
                {blog.content}
              </p>
              <div className="flex items-center justify-between text-gray-600 text-sm">
                <div className="flex items-center space-x-3">
                  <Image
                    src={blog.user.image as string}
                    alt="著者のアイコン"
                    className="w-7 h-7 rounded-full border"
                    width={28}
                    height={28}
                  />
                  <p className="font-medium">{blog.user.name}</p>
                </div>
                <p className="text-gray-500">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

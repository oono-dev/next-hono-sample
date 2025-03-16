"use client";

import { hono } from "@/lib/hono";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Blog } from "@/server/models/blogSchemas";

export default function BlogDetail({ blog }: { blog: Blog }) {
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("削除処理開始");
    try {
      await hono.api.blogs[":id"].$delete({
        param: { id: blog.id.toString() },
      });
      console.log("削除成功");
      router.push("/");
    } catch (error) {
      console.error("ブログの削除に失敗しました:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-3 mt-6">
      <Link
        href="/"
        className="inline-block text-blue-500 hover:underline mb-4"
      >
        ← ブログ一覧へ戻る
      </Link>

      <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-4">
        <div className="flex justify-between items-center">
          <h1 className="lg:text-xl text-lg font-bold text-gray-800 mb-4">
            {blog.title}
          </h1>
          <div className="flex gap-4">
            <Link
              href={`/blogs/${blog.id}/edit`}
              className="bg-blue-500 text-white py-2 px-6 rounded-lg mb-8 hover:bg-blue-600"
            >
              編集
            </Link>
            <form onSubmit={onSubmit}>
              <button
                type="submit"
                className="bg-red-400 py-2 px-6 rounded-lg cursor-pointer hover:bg-red-500"
              >
                削除
              </button>
            </form>
          </div>
        </div>

        <p className="text-gray-600 lg:text-md text-sm mb-6">{blog.content}</p>

        <div className="flex items-center justify-between text-gray-600 text-sm">
          <div className="flex items-center space-x-3">
            <Image
              src={blog.user.image || ""}
              alt="作者のアイコン"
              className="w-9 h-9 rounded-full border"
              width={36}
              height={36}
            />
            <div>
              <p className="font-medium">{blog.user.name}</p>
              <p className="text-gray-500">
                {new Date(blog.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

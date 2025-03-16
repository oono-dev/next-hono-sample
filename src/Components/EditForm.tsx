//src/components/EditForm.tsx
"use client";

import { hono } from "@/lib/hono";
import { EditBlog, EditBlogSchema } from "@/server/models/blogSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Blog } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

export default function Page({ blog }: { blog: Blog }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditBlog>({
    resolver: zodResolver(EditBlogSchema),
    defaultValues: {
      title: blog.title ?? "",
      content: blog.content ?? "",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: EditBlog) => {
    const { title, content } = data;

    //hono rpcでブログを投稿する
    await hono.api.blogs[":id"].$put({
      json: { title, content },
      param: { id: blog.id.toString() },
    });

    router.push(`/blogs/${blog.id}`);
    router.refresh();
  };

  return (
    <div className="max-w-2xl mx-auto mt-6 bg-white px-3">
      <div className="p-6 border border-gray-200 shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          ブログを編集する
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              タイトル
            </label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                  placeholder="タイトルを入力"
                />
              )}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">内容</label>
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 h-32"
                  placeholder="ブログの内容を入力"
                />
              )}
            />
            {errors.content && (
              <p className="text-red-500 text-sm mt-1">
                {errors.content.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-300 py-1 px-3 rounded-full font-bold 
             hover:bg-yellow-400 hover:shadow-md 
             transition-all duration-200 ease-in-out 
             active:scale-95"
          >
            更新する
          </button>
        </form>
      </div>
    </div>
  );
}

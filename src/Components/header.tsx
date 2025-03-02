//components/header.tsx
import { auth, signIn, signOut } from "@/lib/auth";
import Link from "next/link";

export default async function Header() {
  const session = await auth();

  return (
    <header className="h-[70px] border-b">
      <div className="container mx-auto h-full flex items-center justify-between px-3">
        <h1 className="text-[1.5rem] font-bold">
          <Link href="/">🔥 hono-sample</Link>
        </h1>
        {!session && (
          <form
            action={async () => {
              "use server";
              await signIn("github");
            }}
          >
            <button
              type="submit"
              className="bg-yellow-300 py-1 px-3 rounded-full font-bold 
             hover:bg-yellow-400 hover:shadow-md 
             transition-all duration-200 ease-in-out 
             active:scale-95"
            >
              ログイン
            </button>
          </form>
        )}

        {session && (
          <div className="flex gap-2 items-center">
            <button
              type="button"
              className="bg-yellow-300 py-1 px-3 rounded-full font-bold 
             hover:bg-yellow-400 hover:shadow-md 
             transition-all duration-200 ease-in-out 
             active:scale-95"
            >
              <Link href="/blogs/create">+</Link>
            </button>
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button
                type="submit"
                className="bg-yellow-300 py-1 px-3 rounded-full font-bold 
             hover:bg-yellow-400 hover:shadow-md 
             transition-all duration-200 ease-in-out 
             active:scale-95"
              >
                ログアウト
              </button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
}

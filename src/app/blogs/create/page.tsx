//src/app/blogs/new/page.tsx
import { auth } from "@/lib/auth";
import NewForm from "@/Components/newForm";

export default async function Page() {
  const session = await auth();

  if (!session) {
    return <div>ログインしてください。</div>;
  }

  return (
    <div>
      <NewForm />
    </div>
  );
}

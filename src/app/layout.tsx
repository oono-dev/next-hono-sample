//src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/Components/header";

export const metadata: Metadata = {
  title: "Next-Honoブログサンプル",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="js">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}

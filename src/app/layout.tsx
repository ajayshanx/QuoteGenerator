import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Motivational Quote Generator",
  description: "Get fresh motivational quotes instantly."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="text-slate-800 antialiased">{children}</body>
    </html>
  );
}

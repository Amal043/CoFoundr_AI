import type { Metadata } from "next";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "CoFoundr AI | Your AI Founding Team",
  description: "Turn startup ideas into investor-ready businesses with an intelligent AI founding team.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="bg-ink font-sans text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}

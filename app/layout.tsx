import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { CustomCursor } from "../components/CustomCursor";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js Portfolio",
  description: "Modern portfolio built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-background text-foreground antialiased`}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}

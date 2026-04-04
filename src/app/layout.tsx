import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Muhammad Uhib Ibadatarrahman | Junior Web Developer",
  description: "Portfolio of Muhammad Uhib Ibadatarrahman, a passionate Junior Web Developer specialized in Next.js and modern web technologies.",
  keywords: ["web developer", "next.js", "muhammad uhib ibadatarrahman", "portfolio", "junior developer"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable}`}>
        <div className="bg-dots" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}

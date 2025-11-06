import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Kulfi Dashboard - Global Supply Chain Intelligence",
  description: "Professional supply chain management platform with AI-powered insights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} light`} suppressHydrationWarning>
      <body className="antialiased bg-gray-50 font-sans">
        {children}
      </body>
    </html>
  );
}

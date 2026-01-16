import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll, CustomCursor } from "@/components";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "CantaLusto | Fullstack Developer",
  description:
    "Fullstack Developer & Creative Technologist crafting unique digital experiences",
  keywords: [
    "Fullstack Developer",
    "Frontend Developer",
    "Backend Developer",
    "Creative Coding",
    "Web Development",
    "React",
    "Next.js",
    "Node.js",
  ],
  icons: {
    icon: "/broswer.png",
    apple: "/broswer.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="noise-bg">
      <body className={`${inter.variable} antialiased`}>
        <LanguageProvider>
          <SmoothScroll>
            <CustomCursor />
            {children}
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}

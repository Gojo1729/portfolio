import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import portfolioData from "@/data/portfolio.json";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${portfolioData.personal.name} | ${portfolioData.personal.title}`,
  description: portfolioData.personal.tagline,
  keywords: [
    "portfolio",
    "developer",
    "software engineer",
    "web development",
    portfolioData.personal.name,
    portfolioData.personal.title,
  ],
  authors: [{ name: portfolioData.personal.name }],
  creator: portfolioData.personal.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    title: `${portfolioData.personal.name} | ${portfolioData.personal.title}`,
    description: portfolioData.personal.tagline,
    siteName: portfolioData.personal.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${portfolioData.personal.name} | ${portfolioData.personal.title}`,
    description: portfolioData.personal.tagline,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

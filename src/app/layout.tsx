import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"], weight: ["200", "300", "400", "500"] });

export const metadata: Metadata = {
  title: "Infirow - Your entire life, optimized.",
  description: "Infirow brings together smart finance, intelligent investing, and performance tools — built for people who refuse to settle.",
  icons: {
    icon: "/Logos/favicon.ico"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body className={inter.className}>
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

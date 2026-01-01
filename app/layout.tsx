import type { Metadata } from "next";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { ThemeProvider } from "next-themes";
import Navbar from "./components/Navbar/Navbar";
import { Footer } from "./components/Footer";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Good First Guide",
  description: "Discover Your Perfect Good First Issue",
  openGraph: {
    title: "Good First Guide",
    description: "Discover Your Perfect Good First Issue",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <Theme>
            <Navbar />
            {children}
            <Analytics />
            <Footer />
          </Theme>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

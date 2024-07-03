import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import Navbar from "./components/navbar/Navbar";
import ThemeHydration from "./components/theme/ThemeHydration";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Commerce",
  description: "E-Commerce firze20 portfolio app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/ecommerce.ico" />
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <ThemeProvider 
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeHydration />
          <Navbar />
          <main className="flex-grow">{children}</main>
          <footer className="py-6 w-full text-center text-sm bg-black bg-opacity-50 text-white dark:bg-opacity-60 dark:text-gray-100">
            © 2024 E-Commerce. All rights reserved. Github firze20
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
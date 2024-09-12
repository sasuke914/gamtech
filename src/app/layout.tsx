import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";

import Header from "@/components/common/header";
import UIProvider from "@/providers/uiprovider";
import { AuthProvider } from "@/providers/auth";
import { montserrat } from "../components/ui/fonts";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/common/footer";
import CartProvider from "@/providers/cart";

export const metadata: Metadata = {
  title: "Gamtech | Elevando sua experiência tecnológica!",
  description: "Na Gamtech, somos apaixonados por eletrônicos. Oferecemos uma ampla seleção de items para computadores, tudo para aprimorar sua jornada tecnológica. Explore nossa loja online e mergulhe em um universo de entretenimento eletrônico de alta qualidade.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} antialiased`} >
        <AuthProvider>
          <CartProvider>
            <UIProvider>
              <Toaster position="top-center" reverseOrder={false} />
              <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                <div className="flex min-h-screen flex-col bg-gradient-to-t from-neutral-200 to-neutral-200 dark:from-neutral-900 dark:to-zinc-900">
                  <Header />
                  <main className="flex-grow">{children}</main>
                  <Footer />
                </div>
              </ThemeProvider>
            </UIProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

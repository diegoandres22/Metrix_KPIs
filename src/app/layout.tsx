
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBarLeft from "@/components/navbarLeft/page";
import NavBarTop from "@/components/navbarTop/page";

import { Providers } from "@/redux/provider";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Don Manuel Grill",
  description: "Metricas exactas de operaciones",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <Providers>
        <body className="flex ">
          <NavBarTop />
          <NavBarLeft />
          {children}

        </body>
      </Providers>

    </html>
  );
}



import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../app/global.css";
import NavBarLeft from "@/components/navbarLeft/page";
import NavBarTop from "@/components/navbarTop/page";
import { Providers } from "@/redux/provider";
import { ChakraProvider } from "@chakra-ui/react";
import { NextUIProvider } from "@nextui-org/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Don Manuel Grill",
  description: "Metricas exactas de operaciones",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-backgColor text-white flex">
        <Providers>
          <ChakraProvider>
            <NextUIProvider >
              <main className="flex dark text-foreground bg-backgroundColor">

                <NavBarTop />
                <NavBarLeft />

                {children}
              </main>
            </NextUIProvider>
          </ChakraProvider>
        </Providers>
      </body>
    </html>
  );
}

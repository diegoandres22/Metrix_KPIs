'use client'

import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "../app/global.css";
import NavBarLeft from "@/components/navbarLeft/page";
import NavBarTop from "@/components/navbarTop/page";
import { Providers } from "@/redux/provider";
import { ChakraProvider } from "@chakra-ui/react";
import { NextUIProvider } from "@nextui-org/react";
import { SnackbarProvider } from "notistack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ['700', '800'],
  variable: '--nunito'
});


const theme = createTheme({
  palette: {
    mode: 'dark', // Usa el tema oscuro
  },
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <title>Don Manuel Grill</title>
        <meta name="description" content="Metricas exactas de operaciones" />
      </head>
      <body className={`${nunito.variable} flex dark text-foreground bg-backgColor nunito`}>
        <Providers>
          <ChakraProvider>
            <NextUIProvider >

              <ThemeProvider theme={theme}>

                <CssBaseline />

                <SnackbarProvider anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                  maxSnack={2}>

                  <main className="flex ">

                    <NavBarTop />
                    <NavBarLeft />

                    {children}
                  </main>
                </SnackbarProvider>
              </ThemeProvider>
            </NextUIProvider>
          </ChakraProvider>
        </Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";

import NextAuthSessionProvider from "@/providers/sessionProvider";
import "./globals.css";
import ChakraUIProvider from "@/providers/ChakraUIProvider";


export const metadata: Metadata = {
  description: "next-auth credentials",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <title>IF-Eventos</title>
        <link rel="shortcut icon" type="imagex/png" href="/images/icon.ico"></link>
        <meta charSet="utf-8" />
      </head>
      <body className="m-0 p-x box-border">
        <NextAuthSessionProvider>
          <ChakraUIProvider>
            {children}
          </ChakraUIProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}

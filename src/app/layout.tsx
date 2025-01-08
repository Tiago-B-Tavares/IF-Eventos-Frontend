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
      <body>
        <NextAuthSessionProvider>
          <ChakraUIProvider>
            {children}
          </ChakraUIProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}

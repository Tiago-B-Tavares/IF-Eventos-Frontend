"use client"

import { ChakraProvider } from "@chakra-ui/react";
import { ReactNode } from "react";

interface ToastifyProviderProps {
    children: ReactNode;
}

export default function ToastifyProvider({ children }: ToastifyProviderProps) {
    return <ChakraProvider>{children}</ChakraProvider>
}

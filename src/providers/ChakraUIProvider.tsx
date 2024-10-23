"use client"

import { ChakraProvider } from "@chakra-ui/react";
import { ReactNode } from "react";

interface ChakraUIProviderProps {
    children: ReactNode;
}

export default function ChakraUIProvider({ children }: ChakraUIProviderProps) {
    return <ChakraProvider>{children}</ChakraProvider>
}

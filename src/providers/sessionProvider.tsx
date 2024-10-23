"use client"
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

interface NextAuthProviderProps {
    children: ReactNode;
}

export default function NextAuthSessionProvider({ children }: NextAuthProviderProps) {
    return <SessionProvider>{ children }</SessionProvider>
}

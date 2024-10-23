"use client";

import { signIn } from "next-auth/react";
import { Input, Box, Divider, AbsoluteCenter, Heading, Text, Image } from '@chakra-ui/react'
import GoogleLoginBtn from "../LoginByGoogle/googleLoginBtn";
import { Highlight } from '@chakra-ui/react'
import Link from "next/link";
import NextImage from "next/image"
export function FormLogin() {

    async function login(e: React.FormEvent<HTMLFormElement>) {
        try {
            e.preventDefault()
            const formData = new FormData(e.currentTarget)

            let email = formData.get("email") as string;

            email = email.trim().toLowerCase();

            const password = formData.get("password")

            const data = {
                email: email,
                password: password
            }
            signIn("credentials", {
                ...data,
                callbackUrl: "/dashboard"
            })

        } catch (error) {

        }
    }

    return (
        <div>

            <div className='w-full lg:w-96 h-auto py-7 flex flex-col items-center justify-center border rounded-2xl shadow-2xl'>
                <Heading as='h2' fontSize="4xl" className="py-8 text-purple-700">
                    <Highlight query='login' styles={{ px: '2', py: '1', rounded: 'lg', bg: 'orange.100', color: '#7e22ce' }}>
                        Faça seu login
                    </Highlight>
                </Heading>
    
         
                <form onSubmit={login} className='flex items-center flex-col gap-4 py-6  lg:w-64 sm:w-96'>
                    <Input
                        type="email"
                        placeholder="Email"
                        name="email"
                        size="md"
                        focusBorderColor='#7e22ce'
                    />

                    <Input
                        className='outline-purple-700'
                        type="password"
                        placeholder="Senha"
                        name="password"
                        size="md"
                        focusBorderColor='#7e22ce'
                    />
                    <button className="text-white bg-purple-700 py-2 px-4 rounded-md" type="submit">Entrar</button>
                </form>
                <Text className="text-xs text-right" color='#7e22ce'>
                    Não possui uma conta?{' '}
                    <Link className='' href='/Signup'>
                        Cadastre-se
                    </Link>
                </Text>
                <Box position='relative' padding='7'>
                    <Divider />
                    <AbsoluteCenter className="text-gray-950 text-xs text-center text-nowrap" bg='white' px='4'>
                        Ou entre com
                    </AbsoluteCenter>
                </Box>

                <GoogleLoginBtn />
            </div>
        </div>

    )
}

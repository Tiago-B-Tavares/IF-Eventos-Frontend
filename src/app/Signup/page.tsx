"use client"
import React from 'react';
import { Heading, Highlight, Input, Text, Link, useToast } from "@chakra-ui/react";
import registerNewUser from "@/services/user/registerNewUser";
import { useRouter } from 'next/navigation'; // Use next/navigation ao invés de next/router

export default function Signup() {
    const toast = useToast();
    const router = useRouter();

    async function getDataNewUser(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const nome = formData.get("nome") as string;
        let email = formData.get("email") as string;
        const senha = formData.get("senha") as string;
        const confirmaSenha = formData.get("confirmaSenha") as string;


        email = email.trim().toLowerCase();

        if (senha !== confirmaSenha) {
            toast({
                title: 'Erro',
                description: 'As senhas não conferem.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        const data = {
            nome,
            email,
            senha,
        };

        try {
            await registerNewUser(data);
            toast({
                title: 'Cadastro realizado com sucesso!',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            router.push('/');
        } catch (error: any) {
            const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
            toast({
                title: 'Erro ao cadastrar',
                description: errorMessage,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    }

    return (
        <div className='w-full min-h-screen h-auto flex justify-center items-center'>
            <div className="w-full lg:w-96 h-auto py-7 flex flex-col items-center justify-center border rounded-2xl shadow-2xl">
                <Heading as='h2' fontSize="4xl" className=" text-black flex-1">
                    <Highlight query='cadastro' styles={{ px: '2', py: '1', rounded: 'lg', bg: '#0c0b0b', color: '#fff' }}>
                        Faça seu cadastro
                    </Highlight>
                </Heading>

                <form onSubmit={getDataNewUser} className="flex items-center flex-col gap-4 py-6  lg:w-64 sm:w-96">
                    <Input
                        type="text"
                        placeholder="Nome"
                        _placeholder={{ color: 'black' }}
                        name="nome"
                        size="md"
                        border={'none'}
                        borderBottom={'2px solid black'}
                        focusBorderColor='#000'
                    />
                    <Input
                        type="email"
                        placeholder="Email"
                        _placeholder={{ color: 'black', opacity: 0.9 }}
                        name="email"
                        size="md"
                        border={'none'}
                        borderBottom={'2px solid black'}
                        focusBorderColor='#000'
                    />
                    <Input

                        type="password"
                        placeholder="Senha"
                        _placeholder={{ color: 'black', opacity: 0.9 }}
                        name="senha"
                        size="md"
                        border={'none'}
                        borderBottom={'2px solid black'}
                        focusBorderColor='#000'
                    />
                    <Input

                        type="password"
                        placeholder="Confirme sua senha"
                        _placeholder={{ color: 'black', opacity: 0.9 }}
                        name="confirmaSenha"
                        size="md"
                        border={'none'}
                        borderBottom={'2px solid black'}
                        focusBorderColor='#000'
                    />
                    <button className="text-white bg-[#0c0b0b] hover:bg-gray-700 py-2 px-4 rounded-md" type="submit">
                        Cadastrar
                    </button>
                </form>
                <Text className="text-xs text-right mb-7" >
                    Já possui uma conta?{' '}
                    <Link href='/' className='underline'>
                        Faça login!
                    </Link>
                </Text>
            </div>
        </div>
    );
}

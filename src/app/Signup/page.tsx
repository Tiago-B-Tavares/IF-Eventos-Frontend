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
                <Heading as="h3" fontSize="4xl" className="text-purple-700  pt-3">
                    <Highlight
                        query="cadastro!"
                        styles={{ px: "2", py: "", rounded: "lg", bg: "orange.100", color: "#7e22ce" }}
                    >
                        Faça seu cadastro!
                    </Highlight>
                </Heading>
                <form onSubmit={getDataNewUser} className="flex items-center flex-col gap-4 py-6  lg:w-64 sm:w-96">
                    <Input
                        type="text"
                        placeholder="Nome"
                        name="nome"
                        size="md"
                        focusBorderColor="#7e22ce"
                    />
                    <Input
                        type="email"
                        placeholder="Email"
                        name="email"
                        size="md"
                        focusBorderColor="#7e22ce"
                    />
                    <Input
                        className="outline-purple-700"
                        type="password"
                        placeholder="Senha"
                        name="senha"
                        size="md"
                        focusBorderColor="#7e22ce"
                    />
                    <Input
                        className="outline-purple-700"
                        type="password"
                        placeholder="Confirme sua senha"
                        name="confirmaSenha"
                        size="md"
                        focusBorderColor="#7e22ce"
                    />
                    <button className="text-white bg-purple-700 py-2 px-4 rounded-md" type="submit">
                        Cadastrar
                    </button>
                </form>
                <Text className="text-xs text-right mb-7" color="#7e22ce">
                    Já possui uma conta?{' '}
                    <Link href='/'>
                        Faça login!
                    </Link>
                </Text>
            </div>
        </div>
    );
}

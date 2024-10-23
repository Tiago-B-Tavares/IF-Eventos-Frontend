"use client";

import React, { useState } from 'react';
import { Button, useToast } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import registerNewEvent from "@/services/events/registerNewEvent";

export default function CadastrarEvento() {
    const { data } = useSession();
    const toast = useToast();
    const [nome, setNome] = useState('');
    const [horario, setHorario] = useState('');
    const [descricao, setDescricao] = useState('');
    const [local, setLocal] = useState('');
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');
    const [loading, setLoading] = useState(false); // Estado de carregamento
    const organizador_id = data?.user.id as string;

    async function handleRegisterEvent(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault(); // Evita o comportamento padrão do formulário

       

        const dados = { organizador_id, nome, horario, descricao, local, dataInicio, dataFim };

        try {
            setLoading(true); 
            await registerNewEvent(dados);
           
            setNome('');
            setHorario('');
            setDescricao('');
            setLocal('');
            setDataInicio('');
            setDataFim('');
        } catch (err) {
            console.error("Failed to register event", err);
            toast({
                title: "Erro",
                description: "Falha ao cadastrar o evento.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setLoading(false); 
        }
    }

    return (
        <div className="bg-white p-10 gap-4 rounded-lg">
            <form className="flex flex-col gap-4" onSubmit={handleRegisterEvent}>
                <label className="text-base font-semibold text-green-800" htmlFor="nome">Nome:</label>
                <input
                    id="nome"
                    className="border-b-2 px-2 border-b-green-800 font-normal text-orange-700 outline-none placeholder:text-orange-700 placeholder:opacity-40"
                    type='text'
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />

                <label className="text-base font-semibold text-green-800" htmlFor="descricao">Descrição:</label>
                <textarea
                    id="descricao"
                    className="border-b-2 px-2 border-b-green-800 font-normal text-orange-700 outline-none placeholder:text-orange-700 placeholder:opacity-40"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                />

                <label className="text-base font-semibold text-green-800" htmlFor="horario">Horário:</label>
                <input
                    id="horario"
                    className="border-b-2 px-2 border-b-green-800 font-normal text-orange-700 outline-none placeholder:text-orange-700 placeholder:opacity-40"
                    type='time'
                    value={horario}
                    onChange={(e) => setHorario(e.target.value)}
                />

                <label className="text-base font-semibold text-green-800" htmlFor="dataInicio">Início:</label>
                <input
                    id="dataInicio"
                    className="border-b-2 px-2 border-b-green-800 font-normal text-orange-700 outline-none placeholder:text-orange-700 placeholder:opacity-40"
                    type='date'
                    value={dataInicio}
                    onChange={(e) => setDataInicio(e.target.value)}
                />

                <label className="text-base font-semibold text-green-800" htmlFor="dataFim">Término:</label>
                <input
                    id="dataFim"
                    className="border-b-2 px-2 border-b-green-800 font-normal text-orange-700 outline-none placeholder:text-orange-700 placeholder:opacity-40"
                    type='date'
                    value={dataFim}
                    onChange={(e) => setDataFim(e.target.value)}
                />

                <label className="text-base font-semibold text-green-800" htmlFor="local">Local:</label>
                <input
                    id="local"
                    className="border-b-2 px-2 border-b-green-800 font-normal text-orange-700 outline-none placeholder:text-orange-700 placeholder:opacity-40"
                    type='text'
                    value={local}
                    onChange={(e) => setLocal(e.target.value)}
                />

                <Button type="submit" className="w-40" isLoading={loading} loadingText="Cadastrando...">
                    Cadastrar
                </Button>
            </form>
        </div>
    );
}

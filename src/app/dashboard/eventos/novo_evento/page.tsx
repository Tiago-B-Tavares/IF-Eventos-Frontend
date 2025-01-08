"use client";

import React, { ChangeEvent, useState } from 'react';
import { Button, useToast } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import registerNewEvent from "@/services/events/registerNewEvent";
import Image from 'next/image';
import { TypesEventsProps } from '@/types/interfaces';

export default function CadastrarEvento() {
    const { data } = useSession();
    const toast = useToast();
    const [image, setImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState("");
    const [loading, setLoading] = useState(false);
    const organizador_id = data?.user.id as string;

    function handleFile(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file.type !== "image/jpeg" && file.type !== "image/png") {
                toast({
                    title: "Formato inválido",
                    description: "Apenas formatos JPEG e PNG são permitidos.",
                    status: "warning",
                    duration: 5000,
                    isClosable: true,
                });
                return;
            }
            setImage(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    }

    async function handleRegisterEvent(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
    
        const formData = new FormData(e.currentTarget);
        formData.append("organizador_id", organizador_id);
    
        if (image) {
            formData.append("file", image);
        }
    
      
        const dados: TypesEventsProps = {
            nome: formData.get("nome") as string,
            descricao: formData.get("descricao") as string,
            dataInicio: formData.get("dataInicio") as string,
            dataFim: formData.get("dataFim") as string,
            horario: formData.get("horario") as string,
            local: formData.get("local") as string,
            image: image,
            organizador_id: organizador_id,
        };
    
        try {
            setLoading(true);
            await registerNewEvent(dados);
            
         
            e.currentTarget.reset();
            setImage(null);
            setPreviewImage("");
    
            toast({
                title: "Evento cadastrado!",
                description: "O evento foi cadastrado com sucesso.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        } catch (err) {
            console.error("Falha ao cadastrar o evento:", err);
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
            <form className="flex flex-col gap-4" onSubmit={handleRegisterEvent} method="POST" encType="multipart/form-data">
                <label>
                    <span>Imagem do Evento</span>
                    <input
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={handleFile}
                        name='file'
                    />
                    {previewImage && (
                        <Image
                            alt="Imagem de preview"
                            src={previewImage}
                            quality={100}
                            priority={true}
                            width={100}
                            height={100}
                        />
                    )}
                </label>

                <label htmlFor="nome">Nome:</label>
                <input id="nome" name="nome" type="text" className="input-field" />

                <label htmlFor="descricao">Descrição:</label>
                <textarea id="descricao" name="descricao" className="input-field"></textarea>

                <label htmlFor="horario">Horário:</label>
                <input id="horario" name="horario" type="time" className="input-field" />

                <label htmlFor="dataInicio">Início:</label>
                <input id="dataInicio" name="dataInicio" type="date" className="input-field" />

                <label htmlFor="dataFim">Término:</label>
                <input id="dataFim" name="dataFim" type="date" className="input-field" />

                <label htmlFor="local">Local:</label>
                <input id="local" name="local" type="text" className="input-field" />

                <Button type="submit" isLoading={loading} loadingText="Cadastrando...">
                    Cadastrar
                </Button>
            </form>
        </div>
    );
}

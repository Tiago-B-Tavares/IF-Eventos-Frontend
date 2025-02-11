
"use client";
import React, { ChangeEvent, useState, useRef } from "react";
import {
  Button,
  useToast,
  Stack,
  Input,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import registerNewEvent from "@/services/events/registerNewEvent";
import Image from "next/image";
import { TypesEventsProps } from "@/types/interfaces";
import { useRouter } from "next/router";

export default function CadastrarEvento() {
  const { data, status } = useSession();

  const toast = useToast();
  const formRef = useRef<HTMLFormElement>(null);
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
    if (!data) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para cadastrar um evento.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const formData = new FormData(e.currentTarget);
    formData.append("organizador_id", organizador_id);

    if (image) {
      formData.append("file", image);
    }

    let dados: TypesEventsProps = {
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

      toast({
        title: "Evento cadastrado!",
        description: "O evento foi cadastrado com sucesso.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      window.location.href = '/dashboard';

    } catch (err: any) {
      toast({
        title: "Atenção",
        description: "Ocorreu um erro ao cadastrar o evento.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  }

  if (status === "loading") {
   
    return <div>Carregando...</div>;
  }

  return (
    <div className="bg-white p-10 gap-4 rounded-lg">
      {"organizador_id: " + organizador_id}
      <form
        ref={formRef}
        onSubmit={handleRegisterEvent}
        method="POST"
        encType="multipart/form-data"
        id="event-form"
      >
        <Stack spacing={4}>
          <div className="flex flex-col">
            <label htmlFor="file" className="text-sm font-bold">
              Imagem do Evento:
            </label>
            <Input
            required
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleFile}
              name="file"
              id="file"
              className="border border-gray-300 rounded-md"
            />
          </div>

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

          <label htmlFor="nome" className="text-sm font-bold text-gray-500">
            Nome:
          </label>
          <Input
            id="nome"
            required
            name="nome"
            type="text"
            placeholder="Nome do evento"
            className="rounded-md"
            border={"2px solid #166534"}
          />

          <label htmlFor="descricao" className="text-sm font-bold">
            Descrição:
          </label>
          <Input
            id="descricao"
            name="descricao"
            required
            placeholder="Descrição do evento"
            className="rounded-md"
            border={"2px solid #166534"}
          />

          <label htmlFor="horario" className="text-sm font-bold">
            Horário:
          </label>
          <Input
            id="horario"
            name="horario"
            type="time"
            required
            className="rounded-md"
            border={"2px solid #166534"}
          />

          <label htmlFor="dataInicio" className="text-sm font-bold">
            Data de Início:
          </label>
          <Input
            id="dataInicio"
            name="dataInicio"
            type="date"
            required
            className="rounded-md"
            border={"2px solid #166534"}
          />

          <label htmlFor="dataFim" className="text-sm font-bold">
            Data de Término:
          </label>
          <Input
            id="dataFim"
            name="dataFim"
            type="date"
            required
            className="rounded-md"
            border={"2px solid #166534"}
          />

          <label htmlFor="local" className="text-sm font-bold">
            Local:
          </label>
          <Input
            id="local"
            name="local"
            type="text"
            required
            placeholder="Local do evento"
            className="rounded-md"
            border={"2px solid #166534"}
          />

          <Button
            type="submit"
            isLoading={loading}
            loadingText="Cadastrando..."
            colorScheme="blue"
          >
            Cadastrar
          </Button>
        </Stack>
      </form>
    </div>
  );
}

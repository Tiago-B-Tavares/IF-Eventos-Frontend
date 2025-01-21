import editEvent from "@/services/events/editEvent";
import { AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, AlertDialogBody, Stack, Input, Textarea, Button, useDisclosure, AlertDialogFooter, useToast } from "@chakra-ui/react";
import { useState, useRef, useEffect, ChangeEvent } from "react";
import { MdEditDocument } from "react-icons/md";
import { EventoProps, TypesEventsProps } from "@/types/interfaces";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Image from "next/image";
export default function BtnEditar({ evento }: { evento: EventoProps }) {

    const [nome, setNome] = useState<string>(evento.nome);
    const [local, setLocal] = useState<string>(evento.local);
    const [descricao, setDescricao] = useState<string>(evento.descricao);
    const [dataInicio, setDataInicio] = useState<string>(evento.dataInicio);
    const [dataFim, setDataFim] = useState<string>(evento.dataFim);
    const [horario, setHorario] = useState<string>(evento.horario);
    const [image, setImage] = useState<File | null | string>(null);
    const [previewImage, setPreviewImage] = useState("");
    const [loading, setLoading] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef<HTMLButtonElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const toast = useToast();
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



    async function handleEditEvent(e: React.FormEvent<HTMLFormElement>) {
     
        const formData = new FormData(e.currentTarget);


        if (image) {
            formData.append("file", image);
        } else {
            formData.append("banner", evento.banner);
        }


        let dados: TypesEventsProps = {
            id: evento.id,
            nome: formData.get("nome") as string,
            descricao: formData.get("descricao") as string,
            dataInicio: formData.get("dataInicio") as string,
            dataFim: formData.get("dataFim") as string,
            horario: formData.get("horario") as string,
            local: formData.get("local") as string,
            image: image || evento.banner
        }

        try {
            setLoading(true);
            await editEvent(dados);
            toast({
                title: "Evento Alterado!",
                description: "O evento foi alterado com sucesso.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });


            formRef.current?.reset();
            onClose();

        } catch (err: any) {
            toast({
                title: "Erro",
                description: err.message,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Button
                backgroundColor="#60a5fa"
                _hover={{
                    bg: '#1d4ed8',
                    color: 'white'
                }}
                color="blue.700"
                onClick={onOpen}
                w='100%'
                textAlign="left"
            >
                <span className="w-full mr-3">Editar dados</span>
                <MdEditDocument className="text-lg" />
            </Button>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Editar Evento
                        </AlertDialogHeader>
                        <AlertDialogCloseButton />
                        <AlertDialogBody>
                            <form onSubmit={handleEditEvent} id="edit-form" ref={formRef}>
                                <Stack spacing={3} className="border-1 border-green-700 font-semibold">
                                    <div className="flex flex-col">
                                        <label htmlFor="file" className="text-sm font-bold">
                                            Imagem do Evento:
                                        </label>
                                        {previewImage ? (
                                            <figure className="w-full h-40 object-cover my-4 border-2 border-gray-300 rounded-md">
                                                <Image
                                                    className="w-full h-full object-cover"
                                                    alt="Imagem de preview"
                                                    src={previewImage}
                                                    quality={100}
                                                    priority={true}
                                                    width={100}
                                                    height={100}
                                                />
                                            </figure>

                                        ) : (
                                            <figure className="w-full h-40 object-cover my-4 border-2 border-gray-300 rounded-md">
                                                <Image
                                                    className="w-full h-full object-cover"
                                                    alt="Imagem de preview"
                                                    src={evento.banner}
                                                    quality={100}
                                                    priority={true}
                                                    width={100}
                                                    height={100}
                                                />
                                            </figure>
                                        )}

                                        <Input 
                                            type="file"
                                            accept="image/png, image/jpeg"
                                            onChange={handleFile}
                                            name="file"
                                            id="file"
                                        />
                                    </div>


                                    <label htmlFor="nome">Nome do Evento</label>
                                    <Input
                                        required
                                        id="nome"
                                        value={nome}
                                        placeholder="Nome do Evento"
                                        name="nome"
                                        onChange={(e) => setNome(e.target.value)}
                                        className="border border-gray-300 rounded-md"
                                    />

                                    <label htmlFor="local">Local</label>
                                    <Input
                                        required
                                        id="local"
                                        name="local"
                                        placeholder="Local"
                                        value={local}
                                        onChange={(e) => setLocal(e.target.value)}
                                        className="border border-gray-300 rounded-md"
                                    />

                                    <label htmlFor="horario">Horário de início:</label>
                                    <Input
                                        required
                                        id="horario"
                                        name="horario"
                                        placeholder="Horário"
                                        value={horario}
                                        type="time"
                                        onChange={(e) => setHorario(e.target.value)}
                                        className="border border-gray-300 rounded-md"
                                    />


                                    <label htmlFor="descricao">Descrição</label>
                                    <Textarea
                                        required
                                        id="descricao"
                                        name="descricao"
                                        placeholder="Descrição"
                                        value={descricao}
                                        onChange={(e) => setDescricao(e.target.value)}
                                        className="border border-gray-300 rounded-md"
                                    />

                                    <label htmlFor="dataInicio">Data de Início</label>
                                    <Input
                                        required
                                        id="dataInicio"
                                        name="dataInicio"
                                        type="date"
                                        value={format(new Date(dataInicio), "yyyy-MM-dd")}
                                        onChange={(e) => setDataInicio(e.target.value)}
                                        className="border border-gray-300 rounded-md"
                                    />

                                    <label htmlFor="dataFim">Data de Término</label>
                                    <Input
                                        required
                                        id="dataFim"
                                        name="dataFim"
                                        type="date"
                                        value={format(new Date(dataFim), "yyyy-MM-dd")}
                                        onChange={(e) => setDataFim(e.target.value)}
                                        className="border border-gray-300 rounded-md"
                                    />
                                </Stack>


                            </form>

                        </AlertDialogBody>
                        <AlertDialogFooter className="flex gap-3">
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancelar
                            </Button>

                            <Button colorScheme="blue" type="submit" form="edit-form">
                                Salvar
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
}

import editEvent from "@/services/events/editEvent";
import { AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, AlertDialogBody, Stack, Input, Textarea, Button, useDisclosure, AlertDialogFooter } from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import { MdEditDocument } from "react-icons/md";
import { EventoProps } from "@/types/interfaces";

export default function BtnEditar({ evento }: { evento: EventoProps }) {

    const [nome, setNome] = useState<string>('');
    const [local, setLocal] = useState<string>('');
    const [descricao, setDescricao] = useState<string>('');
    const [dataInicio, setDataInicio] = useState<string>('');
    const [dataFim, setDataFim] = useState<string>('');
    const [horario, setHorario] = useState<string>('');

    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef<HTMLButtonElement>(null);




    const handleEditEvent = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await editEvent({
                id: evento.id,
                nome,
                local,
                descricao,
                dataInicio,
                dataFim,
                horario,
            });
            onClose();
        } catch (error) {
            console.error("Erro ao editar o evento:", error);
        }
    };

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
                <MdEditDocument className="text-lg"/>
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
                            <form onSubmit={handleEditEvent} id="edit-form">
                                <Stack spacing={3} className="border-1 border-green-700 font-semibold">
                                    <label htmlFor="nome">Nome do Evento</label>
                                    <Input
                                        required
                                        id="nome"
                                        placeholder="Nome do Evento"
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)}
                                        className="border border-gray-300 rounded-md"
                                    />

                                    <label htmlFor="local">Local</label>
                                    <Input
                                        required
                                        id="local"
                                        placeholder="Local"
                                        value={local}
                                        onChange={(e) => setLocal(e.target.value)}
                                        className="border border-gray-300 rounded-md"
                                    />

                                    <label htmlFor="horario">Horário</label>
                                    <Input
                                        required
                                        id="horario"
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
                                        placeholder="Descrição"
                                        value={descricao}
                                        onChange={(e) => setDescricao(e.target.value)}
                                        className="border border-gray-300 rounded-md"
                                    />

                                    <label htmlFor="dataInicio">Data de Início</label>
                                    <Input
                                        required
                                        id="dataInicio"
                                        type="date"
                                        value={dataInicio}
                                        onChange={(e) => setDataInicio(e.target.value)}
                                        className="border border-gray-300 rounded-md"
                                    />

                                    <label htmlFor="dataFim">Data de Término</label>
                                    <Input
                                        required
                                        id="dataFim"
                                        type="date"
                                        value={dataFim}
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

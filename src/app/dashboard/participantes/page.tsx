"use client";

import { useEffect, useRef, useState } from "react";
import getParticipants from "@/services/participant/getParticipants";

import {
    Table,
    TableContainer,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Input,
    Stack,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { MdEditDocument } from "react-icons/md";
import Email from "next-auth/providers/email";
import { api } from "@/services/setupApiClient";

interface ParticipantesProps {
    id: string;
    nome: string;
    email: string;
    idade: number;
    sexo: "M" | "F";
}

export default function Page() {
    const [participantes, setParticipantes] = useState<ParticipantesProps[]>([]);
    const [selectedParticipant, setSelectedParticipant] = useState<ParticipantesProps | null>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef<HTMLButtonElement>(null);
    const toast = useToast();
    const { data } = useSession();




    const handleEditParticipant = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const Nome = selectedParticipant?.nome || "";
        const Email = selectedParticipant?.email || "";

        try {


            const response = await api.put(`/app/user?id=${selectedParticipant?.id}`, {
                Nome, Email
            });

            toast({
                title: 'Edição realizada com sucesso!',
                status: 'success',
                duration: 5000,
                isClosable: false,
                position: "top"
            })

            onClose();
        } catch {
            toast({
                title: 'Ero ao editar!',
                status: 'error',
                duration: 5000,
                isClosable: false,
                position: "top"
            })

        }
    }
        useEffect(() => {
            async function fetchParticipants() {
                try {
                    const response = await getParticipants();
                    setParticipantes(response);
                } catch (error) {
                    console.error("Erro ao obter participantes:", error);
                    toast({
                        title: "Erro ao buscar participantes.",
                        description: "Não foi possível carregar os dados dos participantes.",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                    });
                }
            }
            fetchParticipants();
        }, []);





        // Atualiza os dados do participante selecionado
        const handleEditClick = (participant: ParticipantesProps) => {
            setSelectedParticipant(participant);
            onOpen();
        };

        const handleSave = () => {
            if (selectedParticipant) {
                const updatedParticipants = participantes.map((p) =>
                    p.id === selectedParticipant.id ? selectedParticipant : p
                );
                setParticipantes(updatedParticipants);
                toast({
                    title: "Dados atualizados com sucesso.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                onClose();
            }
        };

        return (
            <div className=" bg-gray-100 rounded-xl p-4">
                <TableContainer className="w-full ">
                    <Table size="sm" variant='simple' className=" mb-2" >
                        <Thead className=" ">
                            <Tr>
                                <Th>Nome</Th>
                                <Th>Email</Th>
                                <Th>Ações</Th>
                            </Tr>
                        </Thead>
                        <Tbody className="">
                            {participantes.map((participant) => (
                                <Tr key={participant.id} className="hover:bg-gray-200 border-b-2">
                                    <Td>{participant.nome}</Td>
                                    <Td>{participant.email}</Td>
                                    <Td>
                                        <Button
                                            leftIcon={<MdEditDocument />}
                                            colorScheme="blue"
                                            onClick={() => handleEditClick(participant)}
                                        >
                                            Editar
                                        </Button>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>

                {/* Modal de edição */}
                <AlertDialog
                    isOpen={isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                Editar Participante
                            </AlertDialogHeader>
                            <AlertDialogCloseButton />
                            <AlertDialogBody>
                                <Stack spacing={4}>
                                    <label htmlFor="nome">Nome</label>
                                    <Input
                                        id="nome"
                                        value={selectedParticipant?.nome || ""}
                                        onChange={(e) =>
                                            setSelectedParticipant((prev) =>
                                                prev ? { ...prev, nome: e.target.value } : null
                                            )
                                        }
                                    />
                                    <label htmlFor="email">Email</label>
                                    <Input
                                        id="email"
                                        value={selectedParticipant?.email || ""}
                                        onChange={(e) =>
                                            setSelectedParticipant((prev) =>
                                                prev ? { ...prev, email: e.target.value } : null
                                            )
                                        }
                                    />
                                </Stack>
                            </AlertDialogBody>
                            <AlertDialogFooter>
                                <Button ref={cancelRef} onClick={onClose}>
                                    Cancelar
                                </Button>
                                <Button colorScheme="blue" ml={3} onClick={handleSave}>
                                    Salvar
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            </div>
        );
}
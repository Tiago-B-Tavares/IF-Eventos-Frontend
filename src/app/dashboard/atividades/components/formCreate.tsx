"use client"
import { TipoAtividade } from "@/enums/activityTipe";
import CreateActivity from "@/services/activities/createActivity";
import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Input, Select, Stack } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import React from "react";
import { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";

export default function AddActivity({ evento_id, name }: { evento_id: string, name?: any }) {
    const [nome, setNome] = useState<string>("");
    const [local, setLocal] = useState<string>("");
    const [descricao, setDescricao] = useState<string>("");
    const [horario, setHorario] = useState<string>("");
    const [data, setData] = useState<string>("");
    const [concomitante, setConcomitante] = useState<boolean>(false);
    const [ch, setCh] = useState<number>(0);
    const [tipo, setTipo] = useState<TipoAtividade>(TipoAtividade.Oficina);
    const [vagas, setVagas] = useState<number>(0);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { data: session } = useSession();

    const organizador_id = session?.user.id

    const handleCreateActivity = async (e: React.FormEvent<HTMLFormElement>) => {

        try {
            if (!evento_id) {
                console.log("Não tem evento id");
                return;
            }
            await CreateActivity({ nome, horario, data, local, descricao, vagas, concomitante, ch, tipo, evento_id, organizador_id });

            onClose();
        } catch (error) {
            console.log("Erro ao criar atividade:", error);
        }
    };

    return (
        <>
            <Button onClick={onOpen} color="green.600" size="sm" backgroundColor="green.100" border="violet" className="text-green-600 bg-green-100">
                {name}
            </Button>

            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Adicionar Nova Atividade</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6} className="border-1 border-green-700 font-semibold">
                        <form onSubmit={handleCreateActivity} id="edit-form">
                            <Stack spacing={3} className="border-1 border-green-700 font-semibold">
                                <label htmlFor="nome">Nome:</label>
                                <Input
                                    required
                                    id="nome"
                                    placeholder="Nome da Atividade"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    className="border border-gray-300 rounded-md"
                                />
                                <label htmlFor="local">Local:</label>
                                <Input
                                    required
                                    id="local"
                                    placeholder="Local"
                                    value={local}
                                    onChange={(e) => setLocal(e.target.value)}
                                    className="border border-gray-300 rounded-md"
                                />
                                <label htmlFor="descricao">Descrição:</label>
                                <Input
                                    required
                                    id="descricao"
                                    placeholder="Descrição"
                                    value={descricao}
                                    onChange={(e) => setDescricao(e.target.value)}
                                    className="border border-gray-300 rounded-md"
                                />
                                <label htmlFor="horario">Horário:</label>
                                <Input
                                    required
                                    id="horario"
                                    placeholder="Horário"
                                    value={horario}
                                    type='time'
                                    onChange={(e) => setHorario(e.target.value)}
                                    className="border border-gray-300 rounded-md"
                                />
                                <label htmlFor="data">Data:</label>
                                <Input
                                    required
                                    id="data"
                                    placeholder="Data"
                                    value={data}
                                    type='date'
                                    onChange={(e) => setData(e.target.value)}
                                    className="border border-gray-300 rounded-md"
                                />
                                <label htmlFor="concomitante">Concomitante:</label>
                                <Select
                                    id="concomitante"
                                    value={concomitante ? "Sim" : "Não"}
                                    onChange={(e) => setConcomitante(e.target.value === "Sim")}
                                    className="border border-gray-300 rounded-md"
                                >
                                    <option value="Sim">Sim</option>
                                    <option value="Não">Não</option>
                                </Select>
                                <label htmlFor="tipo">Tipo:</label>
                                <Select
                                    id="tipo"
                                    onChange={(e) => setTipo(e.target.value as unknown as TipoAtividade)}
                                    className="border border-gray-300 rounded-md"
                                    required
                                    value={tipo} 
                                >
                                    <option value="" disabled>
                                        Selecione o tipo
                                    </option>
                                    <option value={TipoAtividade.Oficina}>Oficina</option>
                                    <option value={TipoAtividade.Palestra}>Palestra</option>
                                    <option value={TipoAtividade.Workshop}>Workshop</option>
                                    <option value={TipoAtividade.Minicurso}>Minicurso</option>
                                    <option value={TipoAtividade.Seminario}>Seminário</option>
                                    <option value={TipoAtividade["Mesa Redonda"]}>Mesa Redonda</option>
                                    <option value={TipoAtividade["Roda de Conversa"]}>Roda de Conversa</option>
                                    <option value={TipoAtividade.Outro}>Outro</option>
                                </Select>

                                <label htmlFor="ch">Carga Horária:</label>
                                <Input
                                    required
                                    id="ch"
                                    type="number"
                                    placeholder="Carga Horária"
                                    value={ch}
                                    onChange={(e) => setCh(Number(e.target.value))}
                                    className="border border-gray-300 rounded-md"
                                />
                                <label htmlFor="vagas">Vagas:</label>
                                <Input
                                    required
                                    id="vagas"
                                    type="number"
                                    placeholder="Vagas"
                                    value={vagas}
                                    onChange={(e) => setVagas(Number(e.target.value))}
                                    className="border border-gray-300 rounded-md"
                                />
                            </Stack>
                        </form>
                    </ModalBody>

                    <ModalFooter className="flex gap-3">

                        <Button onClick={onClose}>Cancel</Button>
                        <Button form="edit-form" colorScheme='blue' mr={3} type="submit">
                            Salvar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}





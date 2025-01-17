import { TipoAtividade } from "@/enums/activityTipe";
import editActivity from "@/app/dashboard/atividades/service/editActivity";
import { AtividadesProps } from "@/types/interfaces";
import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Input, Select, Stack, useDisclosure, useToast } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { MdEditDocument } from "react-icons/md";


export default function BtnEditar({ atividade }: { atividade: AtividadesProps }) {
    const [nome, setNome] = useState<string>(atividade.nome);
    const [local, setLocal] = useState<string>(atividade.local);
    const [descricao, setDescricao] = useState<string>(atividade.descricao);
    const [concomitante, setConcomitante] = useState<boolean>(atividade.concomitante);
    const [ch, setCh] = useState<number>(atividade.ch);
    const [vagas, setVagas] = useState<number>(atividade.vagas);
    const [tipo, setTipo] = useState<string>(atividade.tipo);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [horario, setHorario] = useState<string>(() => {
        const date = new Date(atividade.horario);
        return date.toISOString().substring(11, 16);
    });
    const cancelRef = useRef<HTMLButtonElement>(null);
    const toast = useToast()






    const handleEditActivity = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
       
        try {



            await editActivity({
                id: atividade.id,
                nome,
                local,
                descricao,
                horario,
                concomitante,
                tipo,
                ch,
                vagas,
            });

            toast({
                title: 'Edição realizada com sucesso!',
                status: 'success',
                duration: 5000,
                isClosable: false,
                position: "top"
            })

            onClose();
        } catch (error) {
            toast({
                title: 'Erro ao remover responsável',
                description: "We've removed your account for you.",
                status: 'warning',
                duration: 3000,
                isClosable: false,
                position: "top"
            })
            console.error('Erro ao editar a atividade:', error);
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
                            Editar Atividade
                        </AlertDialogHeader>
                        <AlertDialogCloseButton />

                        <AlertDialogBody>
                            <form onSubmit={handleEditActivity} id="edit-form">
                                <Stack spacing={3} className="border-1 border-green-700 font-semibold">
                                    <label htmlFor="nome">Nome da Atividade</label>
                                    <Input
                                        required
                                        id="nome"
                                        placeholder="Nome da Atividade"
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
                                    <label htmlFor="descricao">Descrição</label>
                                    <Input
                                        required
                                        id="descricao"
                                        placeholder="Descrição"
                                        value={descricao}
                                        onChange={(e) => setDescricao(e.target.value)}
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

                                    <label htmlFor="concomitante">Concomitante</label>
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
                                        onChange={(e) => setTipo(e.target.value)}
                                        value={tipo}
                                        required
                                    >
                                        <option  value="Oficina">Oficina</option>
                                        <option value="Palestra">Palestra</option>
                                        <option value="Workshop">Workshop</option>
                                        <option value="Minicurso">Minicurso</option>
                                        <option value="Seminario">Seminário</option>
                                        <option value="Mesa Redonda">Mesa Redonda</option>
                                        <option value="Roda de Conversa">Roda de Conversa</option>
                                        <option value="Outro">Outro</option>
                                    </Select>
                                    <label htmlFor="ch">Carga Horária</label>
                                    <Input
                                        required
                                        id="ch"
                                        type="number"
                                        placeholder="Carga Horária"
                                        value={ch}
                                        onChange={(e) => setCh(Number(e.target.value))}
                                        className="border border-gray-300 rounded-md"
                                    />
                                    <label htmlFor="vagas">Vagas</label>
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


"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import {
    Accordion,
    AccordionButton,
    AccordionItem,
    AccordionPanel,
    Box,
    Heading,
    Tabs,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Button,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Thead,
    TableContainer,
    Table,
    Tbody,
    Td,
    Tfoot,
    Th,
    Tr,
    Link,
    MenuGroup,
    MenuDivider
} from "@chakra-ui/react";
import { PiFileMagnifyingGlassLight } from "react-icons/pi";
import { useSession } from "next-auth/react";
import getEvents from "@/services/events/getEvents";
import { EventoProps } from "@/types/interfaces";
import AddActivity from './components/formCreate';
import BtnEditar from './components/btnEditar';
import BtnExluir from './components/btnExcluir';
import getAllEvents from '@/services/events/getAllEvents';

import { BsThreeDotsVertical } from "react-icons/bs";
import { FaPlusCircle } from 'react-icons/fa';
import AddResponsavel from './components/AddResponsavel';
import NoActivitiesMessage from './components/NoActivitiesMessage';
import BtnExcluir from './components/btnExcluir';
import RemoveResponsavel from './components/btnRemoveResponsavel';

export default function Atividades() {
    const { data: session, status } = useSession();
    const [eventos, setEventos] = useState<EventoProps[]>([]);

    const fetchEvents = useCallback(async () => {
        const userID = session?.user?.id;

        if (userID) {
            try {
                const listaEventos = session.user.role === "SUPER_ADMIN"
                    ? await getAllEvents()
                    : await getEvents(userID);

                setEventos(listaEventos);
            } catch (error) {
                console.error("Erro ao obter lista de Eventos:", error);
            }
        }
    }, [session])

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    return (
        <>
            {status === "loading" ? (
                <div>Carregando...</div>
            ) : (
                eventos.length > 0 ? (
                    <div>
                        {eventos.map((e) => (
                            <div key={e.id} className="bg-white">
                                <ul className="bg-slate-200">
                                    <li className="mb-4 bg-white rounded-lg p-4">
                                        <Box
                                            as="span"
                                            flex="1"
                                            textAlign="left"
                                            className="flex lg:flex-row sm:flex-col flex-wrap justify-start items-center h-auto relative"
                                        >
                                            <Heading as="h2" size="lg" className="underline text-green-800 pb-4 ">
                                                {e.nome}
                                            </Heading>
                                        </Box>

                                        <Heading as="h2" size="md" className="text-green-800 pb-4 flex flex-row gap-2 justify-start items-center'">
                                            Atividades:
                                            {session?.user?.role === "SUPER_ADMIN" && (
                                                <div className='text-sm'>
                                                    <AddActivity name={<FaPlusCircle />} evento_id={String(e.id)} />
                                                </div>
                                            )}
                                        </Heading>

                                        {e.atividades.length > 0 ? (
                                            e.atividades.map((atividade) =>(
                                                <div key={atividade.id}>
                                                    <Accordion defaultIndex={[1]} allowMultiple className="bg-white rounded-lg mb-2">
                                                        <AccordionItem>
                                                            <AccordionButton className="flex flex-wrap justify-between font-medium border border-green-700 rounded-lg text-green-700 mt-4">
                                                                <div>{atividade.nome}</div>

                                                                <Menu>
                                                                    {({ isOpen }) => (
                                                                        <>
                                                                            <MenuButton
                                                                                as={Button}
                                                                                bg="none"
                                                                                isActive={isOpen}
                                                                                className="border-2 p-2 rounded-lg"
                                                                            >
                                                                                <BsThreeDotsVertical className="text-2xl" />
                                                                            </MenuButton>

                                                                            <MenuList
                                                                                zIndex={100}
                                                                                maxHeight="200px"
                                                                                overflowY="auto"
                                                                                css={{
                                                                                    "&::-webkit-scrollbar": {
                                                                                        width: "4px",
                                                                                    },
                                                                                    "&::-webkit-scrollbar-track": {
                                                                                        width: "6px",
                                                                                    },
                                                                                    "&::-webkit-scrollbar-thumb": {
                                                                                        background: "#8ccef0",
                                                                                        borderRadius: "24px",
                                                                                    },
                                                                                }}
                                                                            >
                                                                                <MenuGroup title="Opções do Evento">
                                                                                    <MenuItem>
                                                                                        <BtnEditar atividade={atividade} />
                                                                                    </MenuItem>
                                                                                    <MenuItem>
                                                                                       <BtnExcluir  id={atividade.id as string} />
                                                                                    </MenuItem>
                                                                                </MenuGroup>
                                                                                <MenuDivider />
                                                                                <MenuGroup title="Responsáveis">
                                                                                    <MenuItem>
                                                                                        <AddResponsavel atividade_id={atividade.id as string} />
                                                                                    </MenuItem>
                                                                                    <MenuItem>
                                                                                        <RemoveResponsavel atividade_id={atividade.id as string} />
                                                                                    </MenuItem>
                                                                                </MenuGroup>
                                                                            </MenuList>
                                                                        </>
                                                                    )}
                                                                </Menu>
                                                            </AccordionButton>

                                                            <AccordionPanel pb={4} className=" flex felx-row justify-between">
                                                                <div className='flex flex-col  w-full '>
                                                                    <div className='flex flex-row justify-between'>
                                                                        <div>
                                                                            <p className="text-green-800">
                                                                                <b>Local:</b> {atividade.local}
                                                                            </p>
                                                                            <p className="text-green-800">
                                                                                <b>Horário:</b> {(new Date(atividade.horario).getHours() + 3).toLocaleString()}h{(new Date(atividade.horario).getMinutes()).toLocaleString()}
                                                                            </p>
                                                                            <p className="text-green-800">
                                                                                <b>Carga Horária:</b> {atividade.ch}h
                                                                            </p>
                                                                            <p className="text-green-800">
                                                                                <b>Concomitante:</b> {atividade.concomitante ? "Sim" : "Não"}
                                                                            </p>
                                                                            <p className="text-green-800">
                                                                                <b>Tipo:</b> {atividade.tipo}
                                                                            </p>
                                                                            <p className="text-green-800">
                                                                                <b>Descrição:</b> {atividade.descricao}
                                                                            </p>
                                                                            <p className="text-green-800">
                                                                                <b>Vagas:</b> {atividade.vagas}
                                                                            </p>
                                                                        </div>
                                                                        <div className='flex items-center flex-col border-2 border-green-700 rounded-lg'>
                                                                            <Image src={atividade.qr_code_link} alt="Imagem da atividade" width={192} height={192} className='w-48 h-48' />
                                                                            <Link href={atividade.qr_code_link} target="_blank" download={atividade.qr_code_link} className="text-green-800">Baixar QR Code</Link>
                                                                        </div>
                                                                    </div>
                                                                    <div className='mt-4 text-green-800'>
                                                                        <Tabs align='start' variant='enclosed' border="green" bg="green.50" >
                                                                            <TabList mb='1em'>
                                                                                <Tab _selected={{ color: 'white', bg: '#166534' }}> <b>Responsáveis</b></Tab>
                                                                                <Tab _selected={{ color: 'white', bg: '#166534' }}><b>Inscritos</b></Tab>
                                                                            </TabList>
                                                                            <TabPanels>
                                                                                <TabPanel>
                                                                                    {atividade.organizadores ? (
                                                                                        <ul >
                                                                                            {atividade.organizadores.map((responsavel, index) => (
                                                                                                <li className='text-sm pb-3' key={index}>{responsavel.organizador.nome}</li>
                                                                                            ))}
                                                                                        </ul>
                                                                                    ) : (
                                                                                        <p>Ainda não há responsáveis para esta atividade.</p>
                                                                                    )}
                                                                                </TabPanel>

                                                                                <TabPanel>
                                                                                    {atividade.inscricoes && atividade.inscricoes.length > 0 ? (
                                                                                        <ul>
                                                                                            <li className='text-sm pb-3' key={atividade.id}>
                                                                                                <TableContainer>
                                                                                                    <Table size='sm'>
                                                                                                        <Thead>
                                                                                                            <Tr>
                                                                                                                <Th>Participante</Th>
                                                                                                                <Th>Email</Th>
                                                                                                            </Tr>
                                                                                                        </Thead>

                                                                                                        <Tbody>
                                                                                                            {atividade.inscricoes.map((inscricao, index) => (
                                                                                                                <Tr className='bg-green-59' key={index}>
                                                                                                                    <Td>{inscricao.participante.nome}</Td>
                                                                                                                    <Td>{inscricao.participante.email}</Td>
                                                                                                                </Tr>
                                                                                                            ))}
                                                                                                        </Tbody>
                                                                                                    </Table>
                                                                                                </TableContainer>
                                                                                            </li>
                                                                                        </ul>
                                                                                    ) : (
                                                                                        <p>Ainda não há inscritos para esta atividade.</p>
                                                                                    )}
                                                                                </TabPanel>
                                                                            </TabPanels>
                                                                        </Tabs>
                                                                    </div>
                                                                </div>
                                                            </AccordionPanel>
                                                        </AccordionItem>
                                                    </Accordion>
                                                </div>
                                            ))
                                        ) : (
                                            <div>
                                                {session?.user?.role === "SUPER_ADMIN" ? (
                                                    <div className="text-center border border-green-700 rounded-lg text-red-500 text-xl flex justify-center flex-col items-center p-3">
                                                        <PiFileMagnifyingGlassLight className="text-2xl" />
                                                        <p className="font-normal">Este evento ainda não possui atividades</p>
                                                    </div>
                                                ) : (
                                                    <div className="text-center border border-green-700 rounded-lg text-red-500 text-xl flex justify-center flex-col items-center p-3">
                                                        <p className="">Este evento ainda não possui atividades</p>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </li>
                                </ul>
                            </div>
                        ))}
                    </div>
                ) : (
                    <NoActivitiesMessage />
                )
            )}
        </>
    );
}


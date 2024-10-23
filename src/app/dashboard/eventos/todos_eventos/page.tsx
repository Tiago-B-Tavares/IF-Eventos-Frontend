"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import getEvents from "@/services/events/getEvents";
import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Heading, Input, Menu, MenuButton, MenuItem, MenuList, Stack, Textarea, useDisclosure, useToast } from "@chakra-ui/react";
import { LuCalendarClock } from "react-icons/lu";
import { MdEditDocument, MdPlace, MdAccessTimeFilled } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { EventoProps } from "@/types/interfaces";

import getAllEvents from "@/services/events/getAllEvents";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";


import BtnEditar from "../components/btnEditar";
import { BtnExcluir } from "../components/btnExcluir";
import AddResponsavelEvento from "../components/btnAddResponsavelEvento";




export default function Eventos() {
  const { data: session } = useSession();
  let [eventos, setEventos] = useState<EventoProps[]>([]);

  let IsAdmin = false;
  if (session?.user.role === "SUPER_ADMIN") {
    IsAdmin = true;
  }

  async function fetchEventsAndActivities() {
    if (session?.user?.id) {
      if (IsAdmin) {
        try {
          const listaEventos = await getAllEvents();
          setEventos(listaEventos);


        } catch (error) {
          console.error("Erro ao obter lista de Eventos:", error);
        }
      } else {
        try {
          const listaEventos = await getEvents(session.user.id);
          setEventos(listaEventos);
        } catch (error) {
          console.error("Erro ao obter lista de Eventos:", error);
        }
      }
    }
  }
  useEffect(() => {
    fetchEventsAndActivities();
  }, [session, eventos]);



  return (
    <>
      {eventos.map((e) => (

        <ul className="bg-gray-300 mx-auto min-w-screen-lg p-4" key={e.id}>
          <li className="flex flex-col justify-start rounded-lg bg-white border border-green-700 m-4">
            <div className="text-base flex gap-2 p-4 flex-col">
              <div className="flex justify-between">
                <Heading as='h2' size='lg' className="underline text-green-800 pb-4">
                  {e.nome}
                </Heading>
                <Menu>
                  {({ isOpen }) => (
                    <>
                      <MenuButton
                        bg="none"
                        justifyContent="space-between"
                        isActive={isOpen}
                        as={Button}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <BsThreeDotsVertical className="text-2xl" />
                      </MenuButton>
                      <MenuList>
                        <MenuItem w="100%">
                          <BtnEditar evento={e} />
                        </MenuItem>
                        <MenuItem w="100%">
                          {IsAdmin && (
                            <>
                              <BtnExcluir id={e.id as string} />
                            </>
                          )}
                        </MenuItem>
                        <MenuItem w="100%">
                        <AddResponsavelEvento evento_id={e.id as string}/>
                        </MenuItem>
                      </MenuList>
                    </>
                  )}
                </Menu>
              </div>

              <div className="text-gray-500 font-medium">
                <p className="text-lg text-green-700">Sobre o evento:</p>
                {e.descricao}
              </div>
              <div className="flex flex-row gap-4">
                <LuCalendarClock className="text-xl text-green-700" />
                <div className="flex flex-row justify-between gap-4 text-green-700">
                  <span><b>De:</b> {e.dataInicio}</span>
                  <span><b>Até:</b> {e.dataFim}</span>
                </div>
                <div className="flex flex-row justify-between items-center gap-4 text-green-700">
                  <MdAccessTimeFilled />
                  <span><b>Horário:</b> {e.horario}</span>
                </div>
              </div>
              <div className="flex flex-row justify-start gap-4">
                <MdPlace className="text-xl text-red-700" />
                <div className="flex flex-row justify-between gap-4 text-green-700">
                  <span>{e.local}</span>
                </div>
              </div>

              <div className="flex justify-between  items-center">
                <div className="text-green-700">
                  <b>Organizadores: </b>
                  {e.organizadores.map((orgEvent) => (
                    <p className="text-sm" key={orgEvent.organizador.nome}>{orgEvent.organizador.nome}</p>
                  ))}
                </div>

                <div className='flex flex-row gap-4 border border-red-600'>



                </div>
              </div>
            </div>
          </li>
        </ul>
      ))}
    </>
  );

}


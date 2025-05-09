"use client";

import { useState, useEffect, useCallback, cache } from "react";
import { useSession } from "next-auth/react";
import {
  Image,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  Card,
  CardBody,
  Divider,
  Heading,
  MenuGroup,
  MenuDivider,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdAccessTimeFilled, MdCalendarMonth, MdPlace } from "react-icons/md";
import { EventoProps } from "@/types/interfaces";

import getEvents from "@/services/events/getEvents";
import getAllEvents from "@/services/events/getAllEvents";
import AddResponsavelEvento from "./eventos/components/btnAddResponsavelEvento";
import BtnEditar from "./eventos/components/btnEditar";
import { BtnExcluir } from "./eventos/components/btnExcluir";
import NoEventsMessage from "./eventos/components/noEventMessage";
import RemoveResponsavelEvento from "./eventos/components/btnRemoveResponsavelEvento";
import { format } from "date-fns";
export default function Dashboard() {
  const { data: session } = useSession();
  const [eventos, setEventos] = useState<EventoProps[]>([]);
  const isAdmin = session?.user?.role === "SUPER_ADMIN";

  // Função para buscar eventos
  const fetchEventsAndActivities = useCallback(cache( async () => {
    if (session?.user?.id) {
      try {
        const listaEventos = isAdmin
          ? await getAllEvents()
          : await getEvents(session.user.id);
        setEventos(listaEventos);
      } catch (error) {
        console.error("Erro ao obter lista de Eventos:", error);
      }
    }
  }), []);

  useEffect(() => {
    if (session) {
      fetchEventsAndActivities();
    }
  }, []);

  return (
    <div className="w-full flex flex-wrap gap-6 p-4 border-2 flex-col">
      {eventos.length > 0 ? (
        eventos.map((e) => (
          <Card
            key={e.id}
            direction={{ base: "row", sm: "column" }}
            overflow="hidden"
            variant="outline"
            alignItems={{ base: "center", sm: "flex-start" }}
            shadow={"lg"}
          >
            <CardBody className="w-full flex lg:flex-row md:flex-row sm:flex-col items-center gap-6">
              <div>
                <Image
                  objectFit="cover"
                  maxW={{ base: "100%", sm: "200px" }}
                  maxHeight={{ base: "100%", sm: "200px" }}
                  src={e.banner}
                  alt={e.nome}
                  shadow={"lg"}
                  borderRadius={"md"}
                  border={"1px solid gray"}
                />
              </div>

              <Stack direction="column" className="flex-1">
                <div key={e.id} className="text-gray-500 font-medium p-2">
                  <div className="flex justify-between items-center" key={e.id}>
                    <Heading size="lg">{e.nome}</Heading>
                    {isAdmin && (
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
                                  <BtnEditar evento={e} />
                                </MenuItem>
                                <MenuItem>
                                  <BtnExcluir id={e.id as string} />
                                </MenuItem>
                              </MenuGroup>
                              <MenuDivider />
                              <MenuGroup title="Responsáveis">
                                <MenuItem>
                                  <AddResponsavelEvento evento_id={e.id as string} />
                                </MenuItem>
                                <MenuItem>
                                  <RemoveResponsavelEvento evento_id={e.id as string} />
                                </MenuItem>
                              </MenuGroup>
                            </MenuList>
                          </>
                        )}
                      </Menu>


                    )}
                  </div>
                  <p className="text-lg text-green-700">Descrição:</p>
                  <p className={`text-sm ${e.descricao.length > 5 ? "line-clamp-4" : ""}`}>
                    {e.descricao}
                  </p>
                  <div className="flex flex-col gap-2 text-green-700">
                    <div className="flex flex-row items-center gap-2">
                      <MdCalendarMonth />
                      <b>Duração:</b> {format(new Date(e.dataInicio), 'dd/MM/yyyy')} - {format(new Date(e.dataFim), 'dd/MM/yyyy')}
                      <div className="flex items-center gap-3">
                        <MdAccessTimeFilled />
                        <b>Horário de início:</b> {e.horario}
                        <div className="flex items-center gap-2 text-red-700">
                          <MdPlace />
                          <span>{e.local}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-row items-center gap-2 text-green-700">
                      <b>Nº de Atividades: {e.atividades.length}</b>
                    </div>
                  </div>
                </div>
              </Stack>
            </CardBody>

            <Divider />
            <div className="flex justify-between items-center p-4 text-green-700">
              <div>
                <b>Organizadores: </b>
                {e.organizadores.map((orgEvent) => (
                  <p className="text-sm" key={orgEvent.organizador.id as string}>{orgEvent.organizador.nome}</p>
                ))}
              </div>
            </div>
          </Card >
        ))
      ) : (
        <NoEventsMessage />
      )
      }
    </div >
  );
}

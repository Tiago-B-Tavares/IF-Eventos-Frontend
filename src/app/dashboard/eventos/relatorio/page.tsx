"use client";

import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Heading } from '@chakra-ui/react';
import getAllEvents from '@/services/events/getAllEvents';
import getEvents from '@/services/events/getEvents';
import { EventoProps } from '@/types/interfaces';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import ActivityTypeChart from '@/app/components/charts/bar';

export default function Relatorio() {
  const { data: session } = useSession();
  const [eventos, setEventos] = useState<EventoProps[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Set 'isClient' to true after component mounts to avoid server-side rendering issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Fetch events when the session is available and after component mounts
  useEffect(() => {
    if (isClient && session) {
      const IsAdmin = session.user.role === "SUPER_ADMIN";
      const userID = session.user.id;
      if (userID) {
        const fetchEvents = async () => {
          try {
            const listaEventos = IsAdmin
              ? await getAllEvents()
              : await getEvents(userID);
            setEventos(listaEventos);
          } catch (error) {
            console.error("Erro ao obter lista de Eventos:", error);
          }
        };
        fetchEvents();
      }
    }
  }, [isClient, session]);

  return (
    <div>
      <Heading size={"md"} className='mb-4'>Análise dos eventos</Heading>
      <div className='w-full bg-slate-300 rounded-xl'>
        {session ? (
          eventos.length > 0 ? (
            eventos.map((e) => (
              <Accordion allowToggle key={e.id}>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as='span' flex='1' textAlign='left'>{e.nome}</Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <ActivityTypeChart eventId={e.id as string} />
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            ))
          ) : (
            <p>Nenhum evento encontrado.</p>
          )
        ) : (
          <p>Carregando...</p>
        )}
      </div>
    </div>
  );
}

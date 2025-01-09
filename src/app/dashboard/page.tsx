"use client";

import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Heading } from '@chakra-ui/react';

import getAllEvents from '@/services/events/getAllEvents';
import getEvents from '@/services/events/getEvents';
import { EventoProps } from '@/types/interfaces';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import ActivityTypeChart from '../components/charts/bar';


export default function Dashboard() {
  const { data: session } = useSession();
  const [eventos, setEventos] = useState<EventoProps[]>([]);
  const IsAdmin = session?.user.role === "SUPER_ADMIN";

  useEffect(() => {
    async function fetchEvents() {
      const userID = session?.user?.id;
      if (userID) {
        try {
          const listaEventos = IsAdmin
            ? await getAllEvents()
            : await getEvents(session.user.id);
          setEventos(listaEventos);
        } catch (error) {
          console.error("Erro ao obter lista de Eventos:", error);
        }
      }
    }
    fetchEvents();
    console.log(eventos.map((e) => e.id));
    
  }, [session]);

  return (
    <div>
      <Heading size={"md"} className='mb-4'>Análise dos eventos</Heading>
      <div className='w-full bg-slate-300 rounded-xl'>
        {
            eventos.map((e) => (
                <Accordion allowToggle key={e.id} >
                    <AccordionItem>
                        <h2>
                            <AccordionButton >
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
        }
       
      </div>
    </div>
  );
}

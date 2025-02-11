"use client";

import { Accordion, AccordionButton, Text, AccordionIcon, AccordionItem, AccordionPanel, Box, Heading, HStack } from '@chakra-ui/react';
import getAllEvents from '@/services/events/getAllEvents';
import getEvents from '@/services/events/getEvents';
import { EventoProps } from '@/types/interfaces';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

import EventChart from '@/app/components/charts/BarChart';
import ActivityParticipationChart from '@/app/components/charts/ActivityParticipation';
import CheckInChart from '@/app/components/charts/chsckinAtividade';
import { FaCalendar } from 'react-icons/fa';
import Dashboard from '../../../page';
import DashboardEvent from './components/dashboard';



export default function RelatorioEvento() {
  const { data: session } = useSession();
  const [eventos, setEventos] = useState<EventoProps[]>([]);
  const [isClient, setIsClient] = useState(false);

 
  useEffect(() => {
    setIsClient(true);
  }, []);

 
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
      <Heading className='mb-4 text-2xl'>Relatório geral</Heading>
      <div className='w-full rounded-xl'>

        <Box as='span' flex='1' textAlign='left' className='text-xl font-semibold border-'>
         
          <DashboardEvent />
        </Box>

      </div>
    </div>
  );
}

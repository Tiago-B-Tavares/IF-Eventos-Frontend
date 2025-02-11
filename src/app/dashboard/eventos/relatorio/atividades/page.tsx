"use client";

import { Heading, Box } from "@chakra-ui/react";
import { DashboardEvent } from "../eventos/components/dashboard";
import { DashboardAtividades } from "./components/dashboard";


export default function RelatorioEvento() {
 
  return (
    <div>
      <Heading className='mb-4 text-2xl'>Relatório de atividades</Heading>
      <div className='w-full rounded-xl'>

        <Box as='span' flex='1' textAlign='left' className='text-xl font-semibold border-'>
         
          <DashboardAtividades />
        </Box>

      </div>
    </div>
  );
}

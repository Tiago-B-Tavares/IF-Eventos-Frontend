"use client";
import ActivityParticipationChart from "@/app/components/charts/ActivityParticipation";
import EventChart from "@/app/components/charts/BarChart";
import CheckInChart from "@/app/components/charts/chsckinAtividade";
import ActivityTypeChart from "@/app/components/charts/donutChart";

import { api } from "@/services/setupApiClient";
import { Text, Card, CardHeader, Heading, CardBody, CardFooter, Button } from "@chakra-ui/react";

import React from "react";

export default function DashboardEvent() {
 const [dataInscritosPorAtividade, setdataInscritosPorAtividade] = React.useState<{ nome: string; inscritos: number; }[] | null>(null);
 const [dataEvento, setdataEvento] = React.useState<{ totalAtividades: number; totalEventos: number;  totalInscricoes: number; } | null>(null);
 const [dataCheckinAtividade, setCheckinAtividade] = React.useState<{nome: string, checkIns: number }[] | null>(null);
 const [inscritosTipoAtividade, setInscritosTipoAtividade] = React.useState<{tipo: string, quantidade: number }[] | null>(null);

 React.useEffect(() => {
    async function fetchData() {
        try {
            const atividadesData = await api.get(`/evento/analise/atividades`);
            const eventoData = await api.get(`/evento/analise/evento`);
            const checkinAtividade = await api.get(`/evento/analise/checkin-atividade`);
            const inscritosTipoAtividade = await api.get(`/eventos/analise/tipo-atividade`);

            setdataInscritosPorAtividade(atividadesData.data || []);
            setdataEvento(eventoData.data || null);
            setCheckinAtividade(checkinAtividade.data || []);
            setInscritosTipoAtividade(inscritosTipoAtividade.data || []);
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
    }

    fetchData();
}, []);
    return (
        <div className="w-full flex flex-col gap-5">
            <div className="w-full grid grid-cols-3 justify-evenly gap-5">
                <Card borderLeft={'4px solid green'}>
                    <CardHeader>
                        <Heading size='md'> Total de evento criados</Heading>
                    </CardHeader>
                    <CardBody className="flex justify-center text-3xl">
                        <Text>{dataEvento?.totalEventos}</Text>
                    </CardBody>
                </Card>
                <Card borderLeft={'4px solid red'}>
                    <CardHeader >
                        <Heading size='md'> Total de atividades adicionadas</Heading>
                    </CardHeader>
                    <CardBody className="flex justify-center text-3xl">
                        <Text>{dataEvento?.totalAtividades}</Text>
                    </CardBody>
                </Card>
                <Card borderLeft={'4px solid purple'}>
                    <CardHeader >
                        <Heading size='md'> Total de inscritos em todo o evento</Heading>
                    </CardHeader>
                    <CardBody className="flex justify-center text-3xl">
                        <Text>{dataEvento?.totalInscricoes}</Text>
                    </CardBody>
                </Card>
            </div>
            <div className="w-full grid grid-cols-2 justify-evenly gap-5">
                <ActivityTypeChart data={inscritosTipoAtividade || []}/>
                <ActivityParticipationChart data={dataInscritosPorAtividade || []}/>
                <CheckInChart  data={dataCheckinAtividade || []}/>
                <EventChart/>
            </div>
        </div>
    )
}
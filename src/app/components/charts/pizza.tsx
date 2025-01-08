import getAllEvents from "@/services/events/getAllEvents";
import getEvents from "@/services/events/getEvents";
import { api } from "@/services/setupApiClient";
import { EventoProps } from "@/types/interfaces";
import { ApexOptions } from "apexcharts";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

export default function PieChart() {
  const { data: session } = useSession();
  const [eventos, setEventos] = useState<EventoProps[]>([]);
  const isAdmin = session?.user?.role === "SUPER_ADMIN";

  const getEventData = async () => {
    try {
      if (session?.user?.id) {
        const estatisticasEvento = await api.get(`/eventos/estatisticas`);
        setEventos(estatisticasEvento.data);
      }
    } catch (error) {
      console.error("Erro ao obter lista de Eventos:", error);
    }
  };

  useEffect(() => {
    getEventData();
  }, [session?.user?.id, isAdmin]);

  const [chartOptions, setChartOptions] = useState<ApexOptions>({
    labels: ["Oficina", "Palestra", "Workshop", "Minicurso", "Seminário", "Outro"],
    legend: {
      position: "bottom",
    },
    colors: ["#FF4560", "#008FFB", "#00E396", "#FEB019", "#775DD0"],
  });

  const [chartSeries, setChartSeries] = useState([20, 20, 20, 20, 20, 12]);

  return (
   
    <div className="rounded-lg shadow-lg p-4 bg-white">
      <h2>Gráfico de Pizza</h2>
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="pie"
        height="350"
      />
     
    </div>
  );
}

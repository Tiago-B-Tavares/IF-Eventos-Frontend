import { api } from "@/services/setupApiClient";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { ActivityTypeStats } from "@/types/interfaces";

export default function ActivityTypeChart({ eventId }: { eventId: string }) {
  const [activityTypeStats, setActivityTypeStats] = useState<ActivityTypeStats[] | null>(null);


  useEffect(() => {
    async function getEventAnalysis() {
      try {
        const response = await api.get(`/eventos/estatisticas?id=${eventId}`);
        console.log(response.data); // Verifique a estrutura dos dados aqui
        setActivityTypeStats(response.data.activityTypeStats); // Ajuste conforme necessário
      } catch (error) {
        console.error("Erro ao obter estatísticas do evento:", error);
      }
    }

    getEventAnalysis();
  }, [eventId]); // Dependência: a função será chamada novamente se eventId mudar

  if (!activityTypeStats) {
    return <div>Carregando...</div>; // Exibe um indicador de carregamento
  }

  // Preparando os dados para o gráfico
  const chartSeries = activityTypeStats.map(item => item.quantidade);
  const chartLabels = activityTypeStats.map(item => item.tipo);

  const chartOptions: ApexOptions = {
    chart: {
      type: "donut", // Altera o tipo de gráfico para donut
      height: 350,
    },
    labels: chartLabels,
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return `${(parseFloat(val.toString()) || 0).toFixed(2)}%`; // Garante formatação correta
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "40%", // Tamanho do buraco central
        },
      },
    },
    title: {
      text: "Inscrições por Tipo de Atividade",
      align: "center",
      style: {
        fontSize: "20px",
        fontWeight: "bold",
        color: "#000",
      },
    },
    legend: {
      position: "bottom", // Posiciona a legenda na parte inferior
    },
  };

  return (
    <div className="sm:w-full md:w-1/2 lg:w-1/3 bg-gray-100 p-4 rounded-xl shadow-lg">
      <Chart options={chartOptions} series={chartSeries} type="donut" height="350" />
    </div>
  );
}

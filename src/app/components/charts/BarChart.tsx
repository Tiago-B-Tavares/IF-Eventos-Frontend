"use client";
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

// Interface para representar os dados mensais
interface EventMonth {
  mes: number; // Número do mês (1 para janeiro, 2 para fevereiro, etc.)
  quantidade: number; // Quantidade de eventos no mês
}

// Componente EventChart com tipagem
interface EventChartProps {
  eventId: string;
}

const EventChart: React.FC = () => {
  // Dados simulados (os dados fornecidos)
  const mockData: EventMonth[] = [
    { mes: 1, quantidade: 5 }, // Janeiro
    { mes: 3, quantidade: 3 }, // Março
    { mes: 7, quantidade: 7 }, // Julho
  ];

  const [chartData, setChartData] = useState<{
    options: ApexOptions;
    series: {
      name: string;
      data: number[];
    }[];
  }>({
    options: {
      chart: {
        id: 'event-chart',
        type: 'bar' as const, // Define explicitamente o tipo como 'bar'
      },
      plotOptions: {
        bar: {
          horizontal: true, // Gráfico de barras horizontais
        },
      },
      xaxis: {
        categories: [] as string[], // Os meses (categorias)
      },
      title: {
        text: "Comparativo de Eventos por Mês",
        align: "center",
        style: {
          fontSize: "20px",
          fontWeight: "bold",
          color: "#000",
        },
      },
        responsive: [
          {
            breakpoint: 600,
            options: {
              chart: {
                height: 250,
              },
            },
          },
        ],
      },
      series: [
        {
          name: 'Quantidade de Eventos',
          data: [] as number[], // Quantidade de eventos por mês
        },
      ],
    });

  useEffect(() => {
    // Array com os nomes dos meses
    const monthNames = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ];

    // Inicializa um array com zeros para todos os meses
    const quantities = Array(12).fill(0);

    // Atualiza as quantidades com base nos dados fornecidos
    mockData.forEach((item) => {
      quantities[item.mes - 1] = item.quantidade; // Ajusta o índice baseado no número do mês
    });

    // Atualiza o estado do gráfico
    setChartData((prevState) => ({
      ...prevState,
      options: {
        ...prevState.options,
        xaxis: {
          ...prevState.options.xaxis,
          categories: monthNames, // Todos os meses
        },
      },
      series: [
        {
          name: 'Quantidade de Eventos',
          data: quantities, // Quantidades atualizadas
        },
      ],
    }));
  }, []);

  // Verifica se os dados estão prontos para renderização
  if (!chartData.options.xaxis?.categories || !chartData.series[0].data) {
    return <div>Carregando gráfico...</div>;
  }

  return (
    <div className="w-full bg-gray-100 p-4 rounded-xl shadow-lg">

      <Chart
        options={chartData.options} // Passa as opções do gráfico
        series={chartData.series} // Passa os dados das séries
        type="bar"
        height={400}
      />
    </div>
  );
};

export default EventChart;
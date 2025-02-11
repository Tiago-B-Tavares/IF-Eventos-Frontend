"use client";
import React from "react";
import Chart from "react-apexcharts";

const CheckInsRateChart: React.FC = () =>  {



    const mockInscriptionData = {
        totalInscriptions: 300,
        inscriptionsByActivity: [
          { nome: "Workshop de IA", inscritos: 15 },
          { nome: "Palestra de UX", inscritos: 24 },
          { nome: "Oficina de Python", inscritos: 22 },
        ],
        checkInsByActivity: [
          { nome: "Workshop de IA", checkIns: 12 },
          { nome: "Palestra de UX", checkIns: 10 },
          { nome: "Oficina de Python", checkIns: 16 },
        ],
      };
  const data = mockInscriptionData.checkInsByActivity;

  const chartOptions = {
    chart: {
      id: "check-ins-rate",
      type: "line" as "line",
      toolbar: { show: false },
    },
    xaxis: {
      categories: data.map((activity: { nome: any; }) => activity.nome),
    },
    title: {
      text: "Taxa de Check-Ins por Atividade (%)",
      align: "center" as "center",
    },
    markers: {
      size: 6,
    },
  };

  const chartSeries = [
    {
      name: "Check-Ins",
      data: data.map((activity) => activity.checkIns),
    },
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <Chart options={chartOptions} series={chartSeries} type="line" height={350} />
    </div>
  );
};

export default CheckInsRateChart;
"use client";
import { api } from "@/services/setupApiClient";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

 interface ActivityTypeStats {
  tipo: string;
  quantidade: number;
}

const ActivityTypeChart: React.FC<{ data: ActivityTypeStats[] }> = ({ data }) => {

  const chartOptions: ApexOptions = {
    chart: {
      type: "donut",
      height: 350,
    },
    labels: data.map(item => item.tipo),
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return `${(parseFloat(val.toString()) || 0).toFixed(2)}%`;
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "40%",
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
      position: "bottom",
    },
  };

  return (
    <div className="w-full bg-gray-100 p-4 rounded-xl shadow-lg">
      <Chart options={chartOptions} series={data.map(item => item.quantidade)} type="donut" height="350" />
    </div>
  );
}
export default ActivityTypeChart;

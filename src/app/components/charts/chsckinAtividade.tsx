"use client";

import React from "react";
import Chart from "react-apexcharts";

interface CheckInData {
    nome: string;
    checkIns: number;
}

interface CheckInChartProps {
    data: CheckInData[];
}

const CheckInChart: React.FC<CheckInChartProps> = ({data}) => {


   
    const chartData = {
        options: {
            chart: {
                id: "check-in-chart",
                type: "bar" as const,
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                },
            },
            xaxis: {
                categories: data.map((activity) => activity.nome), 
            },
            title: {
                text: "Check-Ins por Atividade",
                align: "center" as const,
            }, style: {
                fontSize: "20px",
                fontWeight: "bold",
                color: "#000",
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
                name: "Check-Ins",
                data: data.map((activity) => activity.checkIns),
            },
        ],
    };

    return (
        <div className="w-full bg-gray-100 p-4 rounded-xl shadow-lg">
            <Chart
                options={chartData.options}
                series={chartData.series}
                type="bar"
                height={350}
            />
        </div>
    );
};

export default CheckInChart;
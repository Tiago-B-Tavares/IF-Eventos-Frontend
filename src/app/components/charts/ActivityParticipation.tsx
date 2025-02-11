"use client";
import React from "react";
import Chart from "react-apexcharts";

interface ActivityParticipationData {
    data: {
        nome: string;
        inscritos: number;
    }[];
}

const ActivityParticipationChart: React.FC<ActivityParticipationData> = ({data}) => {
    const nomesAtividades = data.map((atividade: { nome: any; }) => atividade.nome);
    const inscritosAtividades = data.map((atividade: { inscritos: any; }) => atividade.inscritos);
    
    
    const chartData = {
        options: {
            chart: {
                id: "activity-participation-chart",
                type: "bar" as const,
            },
            plotOptions: {
                bar: {
                    horizontal: false, 
                },
            },
            xaxis: {
                categories: nomesAtividades, 
            },
            title: {
                text: "Inscritos por Atividade",
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
                name: "Inscritos",
                data: inscritosAtividades, 
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

export default ActivityParticipationChart;
import React from "react";
import Chart from "react-apexcharts";

interface GenderDistributionData {
    sexo: string;
    quantidade: number;
}

const GenderDistributionChart: React.FC = () => {

    const mockGenderDistribution = [
        { sexo: "Masculino", quantidade: 70 },
        { sexo: "Feminino", quantidade: 50 },
    ];
    const chartData = {
        options: {
            chart: {
                id: "gender-distribution-chart",
                type: "pie" as const,
            },
            labels: mockGenderDistribution.map((gender) => gender.sexo), // Categorias (Masculino, Feminino)
            title: {
                text: "Distribuição de Participantes por Sexo",
                align: "center" as const,
            },style: {
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
        series: mockGenderDistribution.map((gender) => gender.quantidade), // Quantidade de participantes
    };

    return (
        <div className="w-full bg-gray-100 p-4 rounded-xl shadow-lg">
            <Chart
                options={chartData.options}
                series={chartData.series}
                type="pie"
                height={350}
            />
        </div>
    );
};

export default GenderDistributionChart;
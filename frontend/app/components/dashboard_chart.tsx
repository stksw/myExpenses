import React, { useRef, useEffect } from "react";
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController,
    Title,
    ChartOptions
  } from "chart.js";
import { Chart } from "react-chartjs-2";
import { AccountHistory } from "@/types/account_history";
import { Box } from "@radix-ui/themes";

ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController,
    Title
);

const monthlyLabels = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];

let chartData = {
    labels: monthlyLabels,
    datasets: [
        {
            label: "",
            data: [],
            backgroundColor: ['rgba(120, 150, 210)'],
            borderWidth: 1,
        }
    ]
};

const options: ChartOptions<'bar'> = {
    plugins: {
        title: { display: false },
        legend: { position: "bottom" }
    },
    responsive: true,
    scales: {
        x: { stacked: false },
        y: {
            stacked: false,
            max: 1000000,
            min: 0
        },
    }
};

export const DashboardChart = ({ apiData, range = 'yearly' }: { 
    apiData?: AccountHistory[],
    range?: 'yearly' | 'monthly'
 }) => {
    const chartRef = useRef<ChartJS<'bar', number[], string>>(null);

    useEffect(() => {
        updateChart()
    }, [apiData])

    const updateChart = async () => {
        if (!apiData) return

        const data = await apiData.map(d => d.balance)
        const labels = await apiData.map(d => String(d.recorded_at))

        if (chartRef.current) {
            chartRef.current.data.labels = labels
            chartRef.current.data.datasets[0].data = data
            chartRef.current.options.scales!.y!.max = range == 'monthly' ? 1000000 : 10000000
            chartRef.current.update()
        }
    }

    return (
        <Box pb="8">
            {apiData && 
                <Chart ref={chartRef} type="bar" data={chartData} options={options} />
            }
        </Box>
    )
}

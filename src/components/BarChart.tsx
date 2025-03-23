import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface YearData {
  name: string;
  amount: number;
}

interface BarChartProps {
  yearData: YearData[];
}

const BarChart: React.FC<BarChartProps> = ({ yearData }) => {
  const chartData: ChartData<"bar", number[], string> = {
    labels: yearData.map((data) => data.name),
    datasets: [
      {
        label: "Amount",
        data: yearData.map((data) => data.amount),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Yearly Amount Data",
      },
    },
  };

  return (
    <div className="mx-auto my-10 max-w-4xl p-4">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;

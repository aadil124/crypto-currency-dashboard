import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const Chart = ({ data }) => {
  const chartData = {
    labels: data.map((point) => new Date(point[0]).toLocaleDateString()),
    datasets: [
      {
        label: "Price (USD)",
        data: data.map((point) => point[1]),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 5,
          font: {
            size: 12,
          },
        },
        title: {
          display: true,
          text: "Date",
          font: {
            size: 14,
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 12,
          },
        },
        title: {
          display: true,
          text: "Price (USD)",
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] p-2 bg-white rounded-lg shadow-md">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default Chart;

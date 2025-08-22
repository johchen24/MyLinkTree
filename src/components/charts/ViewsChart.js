'use client';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

// Renders a simple line chart for daily views.
// Expects plain arrays for labels (YYYY-MM-DD) and dataPoints (numbers).
export default function ViewsChart({ labels = [], dataPoints = [], color = 'rgb(16, 185, 129)' }) {
  const data = {
    labels,
    datasets: [
      {
        label: 'Views',
        data: dataPoints,
        borderColor: color,
        backgroundColor: 'rgba(16, 185, 129, 0.25)',
        fill: true,
        tension: 0.35,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { display: false }, tooltip: { intersect: false, mode: 'index' } },
    scales: { x: { grid: { display: false } }, y: { grid: { color: 'rgba(0,0,0,0.06)' }, beginAtZero: true } },
  };

  return <Line options={options} data={data} />;
}



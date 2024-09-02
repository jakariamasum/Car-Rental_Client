import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale
);

const Dashboard = () => {
  const barData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Revenue",
        data: [12000, 19000, 30000, 50000, 20000, 30000],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: ["Available Cars", "Booked Cars"],
    datasets: [
      {
        data: [60, 40],
        backgroundColor: ["rgba(54, 162, 235, 0.6)", "rgba(255, 99, 132, 0.6)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-700 mb-6">
        Dashboard Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
          <div className="p-4 bg-blue-500 text-white rounded-full mr-4">
            <i className="fas fa-calendar-check fa-2x"></i>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-700">
              Total Bookings
            </h4>
            <p className="text-2xl font-bold">150</p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
          <div className="p-4 bg-green-500 text-white rounded-full mr-4">
            <i className="fas fa-car fa-2x"></i>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-700">
              Available Cars
            </h4>
            <p className="text-2xl font-bold">60</p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
          <div className="p-4 bg-yellow-500 text-white rounded-full mr-4">
            <i className="fas fa-dollar-sign fa-2x"></i>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-700">Revenue</h4>
            <p className="text-2xl font-bold">$150,000</p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
          <div className="p-4 bg-red-500 text-white rounded-full mr-4">
            <i className="fas fa-chart-line fa-2x"></i>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-700">Total Users</h4>
            <p className="text-2xl font-bold">350</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-6 h-80">
          {" "}
          <h4 className="text-xl font-semibold text-gray-700 mb-4">
            Revenue Over Time
          </h4>
          <div className="h-64">
            {" "}
            <Bar data={barData} options={chartOptions} />
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 h-80">
          {" "}
          <h4 className="text-xl font-semibold text-gray-700 mb-4">
            Car Availability
          </h4>
          <div className="h-64">
            {" "}
            <Pie data={pieData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

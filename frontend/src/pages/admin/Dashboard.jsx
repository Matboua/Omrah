import { useEffect, useState } from 'react';
import axios from '../../config/axios';
import {
    PieChart, Pie, Cell, Tooltip, Legend,
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    LineChart, Line,
    ResponsiveContainer
} from 'recharts';

const BOOKINGCOLORS = ['#4ade80', '#60a5fa', '#facc15', '#f87171']; // green, blue, yellow, red

// const PACKAGECOLORS = {
//     "Silver Umrah": "#4ade80", // Green
//     "Gold Umrah": "#60a5fa",   // Blue
//     "Platinum Umrah": "#facc15", // Yellow
// };

const generateColor = (index) => {
    const colors = [
        "#4ade80", "#60a5fa", "#facc15", "#f472b6",
        "#a78bfa", "#34d399", "#fb923c", "#f87171",
        "#c084fc", "#fcd34d", "#818cf8", "#f9a8d4",
    ];
    return colors[index % colors.length];
};

const assignPackageColors = (data) => {
    const packageNames = [...new Set(data.seats.map(item => item.package))];
    const colorMap = {};
    packageNames.forEach((pkg, idx) => {
        colorMap[pkg] = generateColor(idx);
        
    })
    return colorMap;
};

export default function AdminDashboard() {
    const [data, setData] = useState(null);
    const [monthlyBookings, setMonthlyBookings] = useState([]);
    const [colorMap, setColorMap] = useState([]);
    
    useEffect(() => {
        axios.get('api/admin/dashboard')
            .then(res => {
                setData(res.data)
                setColorMap(assignPackageColors(res.data))
            })
            .catch(err => console.error(err));

        axios.get('api/admin/dashboard/bookings-monthly')
            .then(res => setMonthlyBookings(res.data))
            .catch(err => console.error(err));
    }, []);

    if (!data) return <div>Loading...</div>;

    const bookingStats = [
        { name: 'Confirmed', value: data.confirmed_bookings },
        { name: 'Pending', value: data.pending_bookings },
        { name: 'Cancelled', value: data.cancelled_bookings },
    ];

    const seatData = data.seats.map(item => ({
        name: item.name,
        seats: item.seats,
        package: item.package
    }));



    return (
        <div className="p-6 space-y-10">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <Card title="Total Bookings" value={data.total_bookings} />
                <Card title="Confirmed" value={data.confirmed_bookings} />
                <Card title="Pending" value={data.pending_bookings} />
                <Card title="Cancelled" value={data.cancelled_bookings} />
                <Card title="Total Packages" value={data.total_packages} />
                <Card title="Total Users" value={data.total_users} />
            </div>

            {/* Charts */}
            <div className="grid md:grid-cols-2 gap-8">
                {/* Pie Chart */}
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-lg font-semibold mb-4">Booking Status</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={bookingStats}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {bookingStats.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={BOOKINGCOLORS[index % BOOKINGCOLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Bar Chart */}
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-lg font-semibold mb-4">Available Seats</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={seatData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="package" />
                            <YAxis />
                            <Tooltip />
                            <Bar
                                dataKey="seats"
                                name="Available Seats"
                                label={{ position: 'top' }}
                            >
                                {seatData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={colorMap[entry.package]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="bg-white p-4 rounded shadow">
                <h2 className="text-lg font-semibold mb-4">Bookings per Month</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyBookings}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Line type="monotone" dataKey="count" stroke="#4ade80" strokeWidth={3} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
}

function Card({ title, value }) {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 text-center">
            <h3 className="text-gray-500">{title}</h3>
            <p className="text-2xl font-bold text-blue-600">{value}</p>
        </div>
    );
}

import { useEffect, useState } from 'react';
import axios from '../../config/axios';
import Header from "./components/Header";
import Footer from "./components/Footer";
import logo from '../../assets/images/letter-o.webp'

export default function Mybookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await axios.get('/api/mybookings');
                setBookings(res.data);
            } catch (err) {
                console.error("Failed to fetch bookings:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'confirmed':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // if (loading) {
    //     return (
    //         <div className="p-6 flex justify-center items-center h-64">
    //                         <div className="relative flex justify-center items-center h-screen">
    //                             <div className="absolute animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-600"></div>
    //                             <img src={logo} className="rounded-full h-8 animate-spin-reverse" />
    //                         </div>
    //                     </div>
    //     );
    // }

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <div className="flex-grow">
                <Header />
                
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
                        <p className="mt-2 text-gray-600">View your Oumrah bookings</p>
                    </div>

                    {bookings.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-sm p-8 text-center border border-gray-200">
                            <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1}
                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                />
                            </svg>
                            <h3 className="mt-4 text-lg font-medium text-gray-900">No bookings found</h3>
                            <p className="mt-1 text-gray-500">You haven't made any bookings yet.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {bookings.map((booking) => (
                                <div
                                    key={booking.id}
                                    className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow duration-200"
                                >
                                    <div className="p-6">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h2 className="text-lg font-semibold text-gray-900">
                                                    {booking.package_class.package.name}
                                                </h2>
                                                <p className="text-gray-600">{booking.package_class.name}</p>
                                            </div>
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                            </span>
                                        </div>

                                        <div className="mt-6 space-y-3">
                                            <div className="flex justify-between">
                                                <span className="text-sm text-gray-500">Booking Date</span>
                                                <span className="text-sm font-medium text-gray-900">
                                                    {new Date(booking.created_at).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>

            <Footer />
        </div>
    );
}
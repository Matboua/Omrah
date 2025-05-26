import React, { useState, useEffect, useMemo, useCallback } from "react";
import Pagination from "../../admin/Pagination"; // import the Pagination component
import axios from "../../../config/axios";
import { toast } from "react-toastify";
import logo from "../../../assets/images/letter-o.webp";
import { useSelector } from "react-redux";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Bookingslist = ({ data }) => {
	const [filters, setFilters] = useState({
		cin: "",
		packName: "",
		packClass: "",
		status: "",
	});
	const [bookings, setBookings] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const [currentPage, setCurrentPage] = useState(1);
	const recordsPerPage = 6;

	const [showStatusModal, setShowStatusModal] = useState(false);
	const [selectedBooking, setSelectedBooking] = useState(null);
	const [newStatus, setNewStatus] = useState("");

	const fetchBookings = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);
			const res = await axios.get("/api/bookings");
			setBookings(res.data);
		} catch (err) {
			console.error("Failed to fetch bookings:", err);
			setError("Failed to load bookings. Please try again.");
			toast.error("Failed to load bookings");
		} finally {
			setLoading(false);
		}
	}, []);

	// Memoize filtered data for better performance
	const filteredData = useMemo(() => {
		if (!Array.isArray(data)) return [];

		return data.filter((item) => {
			if (
				!item?.user?.cin ||
				!item?.pack?.name ||
				!item?.pack?.class ||
				!item?.status
			) {
				return false;
			}

			const cinMatch =
				!filters.cin ||
				item.user.cin.toLowerCase().includes(filters.cin.toLowerCase());

			const nameMatch =
				!filters.packName ||
				item.pack.name.toLowerCase().includes(filters.packName.toLowerCase());

			const classMatch =
				!filters.packClass ||
				item.pack.class.toLowerCase() === filters.packClass.toLowerCase();

			const statusMatch =
				!filters.status ||
				item.status.toLowerCase() === filters.status.toLowerCase();

			return cinMatch && nameMatch && classMatch && statusMatch;
		});
	}, [data, filters]);

	// Calculate total pages
	const totalPages = Math.max(
		1,
		Math.ceil(filteredData.length / recordsPerPage)
	);

	// Reset to first page when filters change
	useEffect(() => {
		setCurrentPage(1);
	}, [filters]);

	// Ensure current page is valid
	useEffect(() => {
		if (currentPage > totalPages) {
			setCurrentPage(totalPages);
		}
	}, [totalPages, currentPage]);

	// Calculate current page data
	const firstIndex = (currentPage - 1) * recordsPerPage;
	const records = filteredData.slice(firstIndex, firstIndex + recordsPerPage);

	// Handle filter changes
	const handleFilterChange = (e) => {
		const { name, value } = e.target;
		setFilters((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	// Reset filters
	const handleResetFilters = () => {
		setFilters({
			cin: "",
			packName: "",
			packClass: "",
			status: "",
		});
	};

	// Handle page changes
	const handlePageChange = (pageNumber) => {
		const validPage = Math.max(1, Math.min(pageNumber, totalPages));
		setCurrentPage(validPage);
	};

	const getStatusColor = (status) => {
		switch (status.toLowerCase()) {
			case "confirmed":
				return "bg-green-100 text-green-700";
			case "pending":
				return "bg-yellow-100 text-yellow-700";
			case "cancelled":
				return "bg-red-100 text-red-700";
			default:
				return "bg-gray-100 text-gray-700";
		}
	};

	const handleStatusClick = (booking) => {
		setSelectedBooking(booking);
		setNewStatus(booking.status);
		setShowStatusModal(true);
	};

	const handleStatusUpdate = async () => {
		try {
			setLoading(true);
			// API call to update the status
			await axios.put(`/api/bookings/${selectedBooking.id}`, {
				status: newStatus,
			});

			// Update local state
			setBookings((prevBookings) =>
				prevBookings.map((booking) =>
					booking.id === selectedBooking.id
						? { ...booking, status: newStatus }
						: booking
				)
			);

			toast.success("Booking status updated successfully");
			setShowStatusModal(false);
		} catch (error) {
			console.error("Failed to update status:", error);
			toast.error("Failed to update status");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchBookings();
	}, [fetchBookings]);

	if (loading) {
		return (
			<div className="p-6 flex justify-center items-center h-64">
				<div className="relative flex justify-center items-center h-screen">
					<div className="absolute animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-600"></div>
					<img src={logo} className="rounded-full h-8 animate-spin-reverse" />
				</div>
			</div>
		);
	}

	return (
		<div className="relative flex flex-col gap-3 min-h-[calc(100dvh-96px)] w-full bg-white rounded-lg shadow-sm border border-gray-200">
			{/* Filter Section */}
			<div className="p-4 bg-white border-b border-gray-200">
				<div className="flex flex-col md:flex-row gap-4">
					<div className="md:w-1/5">
						<input
							type="text"
							name="cin"
							value={filters.cin}
							onChange={handleFilterChange}
							placeholder="Search by CIN..."
							className="block w-full p-2 text-sm text-gray-900 border-gray-300 rounded-lg bg-gray-50 border focus:border-orange-200 outline-0"
						/>
					</div>
					<div className="md:w-1/5">
						<input
							type="text"
							name="packName"
							value={filters.packName}
							onChange={handleFilterChange}
							placeholder="Pack Name..."
							className="block w-full p-2 text-sm text-gray-900 border-gray-300 rounded-lg bg-gray-50 border focus:border-orange-200 outline-0"
						/>
					</div>
					<div className="md:w-1/5">
						<select
							name="packClass"
							value={filters.packClass}
							onChange={handleFilterChange}
							className="bg-gray-50 border border-gray-300 focus:border-orange-200 text-gray-900 text-sm rounded-lg outline-0 block w-full p-2.5"
						>
							<option value="">All Classes</option>
							<option value="vip">VIP</option>
							<option value="business">Business</option>
							<option value="economic">Economic</option>
						</select>
					</div>
					<div className="md:w-1/5">
						<select
							name="status"
							value={filters.status}
							onChange={handleFilterChange}
							className="bg-gray-50 border border-gray-300 focus:border-orange-200 text-gray-900 text-sm rounded-lg outline-0 block w-full p-2.5"
						>
							<option value="">All Status</option>
							<option value="pending">Pending</option>
							<option value="confirmed">Confirmed</option>
							<option value="cancelled">Cancelled</option>
						</select>
					</div>
					<div className="md:w-1/5">
						<button
							onClick={handleResetFilters}
							className="w-full p-2 text-sm text-gray-900 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:border-orange-200 outline-0"
						>
							Reset Filters
						</button>
					</div>
				</div>
			</div>
			{/* Table Container */}
			<div className="flex-1 overflow-x-auto">
				<table className="w-full min-w-[750px] text-sm text-left text-gray-500">
					<thead className="text-xs text-gray-700 uppercase bg-gray-100 sticky top-0">
						<tr>
							<th className="px-6 py-3 font-medium">CIN</th>
							<th className="px-6 py-3 font-medium">Pack Name</th>
							<th className="px-6 py-3 font-medium">Class</th>
							<th className="px-6 py-3 font-medium">Status</th>
							<th className="px-6 py-3 font-medium">Date</th>
							<th className="px-6 py-3 font-medium">Update Status</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200">
						{bookings.length > 0 ? (
							bookings.map((item) => (
								<tr
									key={item.id}
									className="bg-white border-b border-gray-200 hover:bg-gray-50"
								>
									<td className="px-6 py-4 whitespace-nowrap">
										{item.user.cin}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										{item.package_class.package.name}
									</td>
									<td className="px-6 py-4 whitespace-nowrap capitalize">
										{item.package_class.name}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<span
											className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
												item.status
											)}`}
										>
											{item.status}
										</span>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										{new Date(item.created_at).toLocaleDateString()}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<button
											onClick={() => handleStatusClick(item)}
											disabled={item.status === "confirmed" || item.status === "cancelled"}
											className={`px-4 py-2 rounded-lg text-sm font-medium ${
												item.status === "confirmed" || item.status === "cancelled"
													? "bg-gray-100 text-gray-400 cursor-not-allowed"
													: "bg-blue-50 text-blue-600 hover:bg-blue-100"
											}`}
										>
											Update Status
										</button>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan="5" className="px-6 py-8 text-center text-gray-500">
									No bookings found.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
			{/* Pagination */}
			{filteredData.length > 0 && (
				<div className="mt-auto border-t border-gray-200">
					<Pagination
						currentPage={currentPage}
						npage={totalPages}
						handlePageChange={handlePageChange}
					/>
				</div>
			)}
			{showStatusModal && (
				<div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
					<div className="bg-white rounded-lg shadow-xl max-w-md w-full">
						{/* Modal Header */}
						<div className="flex items-center justify-between p-4 border-b">
							<h3 className="text-xl font-semibold text-gray-900">
								Update Booking Status
							</h3>
							<button
								onClick={() => setShowStatusModal(false)}
								className="text-gray-400 hover:text-gray-500 focus:outline-none"
							>
								<FontAwesomeIcon icon={faXmark} className="h-5 w-5" />
							</button>
						</div>

						{/* Modal Body */}
						<div className="p-4">
							<div className="mb-4">
								<p className="text-sm text-gray-500 mb-2">
									Current Status:{" "}
									<span
										className={`font-medium ${getStatusColor(
											selectedBooking?.status
										)}`}
									>
										{selectedBooking?.status.toUpperCase()}
									</span>
								</p>

								<label className="block text-sm font-medium text-gray-700 mb-2">
									New Status
								</label>
								<select
									value={newStatus}
									onChange={(e) => setNewStatus(e.target.value)}
									disabled={selectedBooking?.status === "confirmed"}
									className="w-full p-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
								>
									<option value="pending">Pending</option>
									<option value="confirmed">Confirmed</option>
									<option value="cancelled">Cancelled</option>
								</select>
							</div>

							{selectedBooking?.status === "confirmed" ? (
								<p className="text-sm text-red-600 mb-4">
									This booking is confirmed and cannot be modified.
								</p>
							) : (
								<p className="text-sm text-gray-500 mb-4">
									Are you sure you want to update this booking's status?
								</p>
							)}

							<div className="flex justify-end gap-3">
								<button
									onClick={() => setShowStatusModal(false)}
									className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
								>
									Cancel
								</button>
								<button
									onClick={handleStatusUpdate}
									disabled={selectedBooking?.status === "confirmed" || loading}
									className={`px-4 py-2 text-sm font-medium text-white rounded-lg ${
										selectedBooking?.status === "confirmed" || loading
											? "bg-gray-300 cursor-not-allowed"
											: "bg-orange-600 hover:bg-orange-700"
									}`}
								>
									{loading ? "Updating..." : "Update Status"}
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Bookingslist;

import {
	faEdit,
	faInfoCircle,
	faTrash,
	faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import Pagination from "../../admin/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
	deleteClient,
	fetchClients,
	editClient,
} from "../../../store/slices/clientsReducer";
import logo from "../../../assets/images/letter-o.webp";
import { toast } from "react-toastify";

export default function Clients() {
	// Search and Filter States
	const [searchTerm, setSearchTerm] = useState("");
	const [filterCity, setFilterCity] = useState("");

	// Modal States
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [showDetailModal, setShowDetailModal] = useState(false);
	const [selectedClient, setSelectedClient] = useState(null);
	const [editFormData, setEditFormData] = useState({
		cin: "",
		first_name: "",
		last_name: "",
		city: "",
		phone: "",
		email: "",
	});

	// Start Pagination
	const [currentPage, setCurrentPage] = useState(1);
	const recordsPerPage = 6;
	const clients = useSelector((state) => state.clients.clients);
	const loading = useSelector((state) => state.clients.loading);

	// Apply filters
	const filteredClients = clients.filter((client) => {
		// Skip invalid client records
		if (
			!client ||
			!client.cin ||
			!client.first_name ||
			!client.last_name ||
			!client.city
		) {
			return false;
		}

		// Search by CIN
		const cinMatch = client.cin
			.toLowerCase()
			.includes(searchTerm.toLowerCase());

		// Filter by city
		const cityMatch =
			filterCity === "" ||
			client.city.toLowerCase() === filterCity.toLowerCase();

		return cinMatch && cityMatch;
	});

	// Ensure current page is valid when filtered results change
	useEffect(() => {
		const maxPage = Math.max(
			1,
			Math.ceil(filteredClients.length / recordsPerPage)
		);
		if (currentPage > maxPage) {
			setCurrentPage(maxPage);
		}
	}, [filteredClients, currentPage]);

	// Calculate pagination indices
	const lastIndex = currentPage * recordsPerPage;
	const firstIndex = lastIndex - recordsPerPage;

	// Ensure we don't try to access beyond the array bounds
	const records = filteredClients.slice(
		firstIndex,
		Math.min(lastIndex, filteredClients.length)
	);
	const npage = Math.max(1, Math.ceil(filteredClients.length / recordsPerPage));

	const handlePageChange = (pageNumber) => {
		// Ensure we don't set an invalid page number
		if (pageNumber >= 1 && pageNumber <= npage) {
			setCurrentPage(pageNumber);
		}
	};
	// End Pagination

	// Get unique cities for filter dropdown
	const cities = [
		...new Set(clients.map((client) => client.city.toLowerCase())),
	];

	// navigate + dispatch
	const dispatch = useDispatch();

	// fetch clients
	useEffect(() => {
		dispatch(fetchClients());
	}, [dispatch]);

	// Handle Delete Client
	const handleDelete = async (id) => {
		try {
			await dispatch(deleteClient(id)).unwrap();
			setShowDeleteModal(false);
			toast.success("Client deleted successfully");
		} catch (err) {
			console.error("Delete error:", err);
			toast.error(err?.response?.data?.message || "Failed to delete client");
		}
	};

	// Handle Edit Client
	const handleEdit = async (e) => {
		e.preventDefault();

		// Validate required fields
		const requiredFields = [
			"cin",
			"first_name",
			"last_name",
			"city",
			"phone",
			"email",
		];
		const missingFields = requiredFields.filter(
			(field) => !editFormData[field]
		);

		if (missingFields.length > 0) {
			toast.error(
				`Please fill in all required fields: ${missingFields.join(", ")}`
			);
			return;
		}

		// Validate email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(editFormData.email)) {
			toast.error("Please enter a valid email address");
			return;
		}

		try {
			await dispatch(
				editClient({ id: selectedClient.id, ...editFormData })
			).unwrap();
			setShowEditModal(false);
			toast.success("Client updated successfully");
		} catch (err) {
			console.error("Edit error:", err);
			toast.error(err?.response?.data?.message || "Failed to update client");
		}
	};

	// Open Edit Modal
	const openEditModal = (client) => {
		setSelectedClient(client);
		setEditFormData({
			cin: client?.cin || "",
			first_name: client?.first_name || "",
			last_name: client?.last_name || "",
			city: client?.city || "",
			phone: client?.phone || "",
			email: client?.email || "",
		});
		setShowEditModal(true);
	};

	// Format text with capitalization
	const formatText = (text) => {
		if (!text) return "N/A";
		return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
	};

	// Format full name
	const formatFullName = (firstName, lastName) => {
		if (!firstName || !lastName) return "N/A";
		return `${formatText(firstName)} ${formatText(lastName)}`;
	};

	// Open Detail Modal
	const openDetailModal = (client) => {
		setSelectedClient(client);
		setShowDetailModal(true);
	};

	// Open Delete Modal
	const openDeleteModal = (client) => {
		setSelectedClient(client);
		setShowDeleteModal(true);
	};

	// Reset filters
	const resetFilters = () => {
		setSearchTerm("");
		setFilterCity("");
		setCurrentPage(1);
	};

	// Handle modal scroll lock
	useEffect(() => {
		if (showDeleteModal || showEditModal || showDetailModal) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}

		return () => {
			document.body.style.overflow = "unset";
		};
	}, [showDeleteModal, showEditModal, showDetailModal]);

	if (loading && clients.length === 0) {
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
			{/* Search and Filter Section */}
			<div className="p-4 border-b border-gray-200">
				<div className="flex flex-col md:flex-row gap-4">
					{/* Search Input */}
					<div className="flex-1">
						<label htmlFor="search" className="sr-only">
							Search
						</label>
						<div className="relative">
							<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
								<svg
									className="w-4 h-4 text-gray-500"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 20 20"
								>
									<path
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
									/>
								</svg>
							</div>
							<input
								type="text"
								id="search"
								className="block w-full p-2 pl-10 text-sm text-gray-900 border-gray-300 rounded-lg bg-gray-50 border focus:border-orange-200 outline-0"
								placeholder="Search by CIN..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
						</div>
					</div>

					{/* Filter by City */}
					<div className="md:w-1/4">
						<select
							className="bg-gray-50 border border-gray-300 focus:border-orange-200 text-gray-900 text-sm rounded-lg outline-0 block w-full p-2.5"
							value={filterCity}
							onChange={(e) => setFilterCity(e.target.value)}
						>
							<option value="">Filter by City</option>
							{cities.map((city, index) => (
								<option key={index} value={city}>
									{city.charAt(0).toUpperCase() + city.slice(1)}
								</option>
							))}
						</select>
					</div>

					{/* Reset Filters Button */}
					<button
						onClick={resetFilters}
						className="px-4 py-1.5 bg-gray-50 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 cursor-pointer"
					>
						Reset
					</button>
				</div>
			</div>

			{/* Table Container */}
			<div className="flex-1 overflow-x-auto">
				<table className="w-full min-w-[750px] text-sm text-left text-gray-500">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
						<tr>
							<th scope="col" className="px-6 py-4 font-medium">
								Id
							</th>
							<th scope="col" className="px-6 py-4 font-medium">
								CIN
							</th>
							<th scope="col" className="px-6 py-4 font-medium">
								First Name
							</th>
							<th scope="col" className="px-6 py-4 font-medium">
								Last Name
							</th>
							<th scope="col" className="px-6 py-4 font-medium">
								Phone
							</th>
							<th scope="col" className="px-6 py-4 font-medium">
								Email
							</th>
							<th scope="col" className="px-6 py-4 font-medium">
								City
							</th>
							<th scope="col" className="px-6 py-4 font-medium">
								Role
							</th>
							<th scope="col" className="px-6 py-4 font-medium text-center">
								Action
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200">
						{records.length > 0 ? (
							records.map((item, key) => (
								<tr key={key} className="hover:bg-gray-50">
									<td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
									<td className="px-6 py-4 whitespace-nowrap">
										{item.cin ? item.cin.toUpperCase() : "N/A"}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										{item.first_name
											? item.first_name[0].toUpperCase() +
											  item.first_name.slice(1).toLowerCase()
											: "N/A"}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										{item.last_name
											? item.last_name[0].toUpperCase() +
											  item.last_name.slice(1).toLowerCase()
											: "N/A"}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										{item.phone || "N/A"}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										{item.email || "N/A"}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										{item.city
											? item.city[0].toUpperCase() +
											  item.city.slice(1).toLowerCase()
											: "N/A"}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										{item.role
											? item.role[0].toUpperCase() +
											  item.role.slice(1).toLowerCase()
											: "N/A"}
									</td>
									<td className="px-6 py-4 text-center space-x-2">
										<button
											onClick={() => openDetailModal(item)}
											className="py-1.5 px-4 text-blue-500 bg-blue-100 hover:bg-blue-200 rounded-full cursor-pointer transition duration-300 ease-in-out"
										>
											<FontAwesomeIcon icon={faInfoCircle} size="lg" />
										</button>
										<button
											onClick={() => openEditModal(item)}
											className="py-1.5 px-4 text-yellow-500 bg-yellow-100  hover:bg-yellow-200 rounded-full cursor-pointer transition duration-300 ease-in-out"
										>
											<FontAwesomeIcon icon={faEdit} size="lg" />
										</button>
										<button
											onClick={() => openDeleteModal(item)}
											className="py-1.5 px-4 text-red-500 bg-red-100 hover:bg-red-200 rounded-full cursor-pointer transition duration-300 ease-in-out"
										>
											<FontAwesomeIcon icon={faTrash} size="lg" />
										</button>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan="8" className="px-6 py-8 text-center text-gray-500">
									No clients found matching your search criteria.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			{/* Pagination */}
			{filteredClients.length > 0 && (
				<Pagination
					currentPage={currentPage}
					npage={npage}
					handlePageChange={handlePageChange}
				/>
			)}

			{/* Modal Backdrop */}
			{(showDeleteModal || showEditModal || showDetailModal) && (
				<div className="fixed inset-0 bg-black/50 z-50" />
			)}

			{/* Delete Modal */}
			{showDeleteModal && (
				<div className="fixed inset-0 z-50 overflow-y-auto">
					<div className="flex items-center justify-center min-h-screen p-4">
						<div className="relative bg-white rounded-xl shadow-2xl max-w-lg w-full mx-4 transform transition-all">
							<div className="p-8">
								<div className="flex items-start space-x-6">
									<div className="flex-shrink-0">
										<div className="flex items-center justify-center h-14 w-14 rounded-full bg-red-100">
											<FontAwesomeIcon
												icon={faTrash}
												className="h-7 w-7 text-red-600"
											/>
										</div>
									</div>
									<div className="flex-1">
										<h3 className="text-xl font-semibold text-gray-900 mb-2">
											Delete Client
										</h3>
										<p className="text-gray-500">
											Are you sure you want to delete this client? This action
											cannot be undone.
										</p>
									</div>
								</div>
								<div className="mt-8 flex justify-end gap-4">
									<button
										type="button"
										className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all"
										onClick={() => setShowDeleteModal(false)}
									>
										Cancel
									</button>
									<button
										type="button"
										className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 border border-transparent rounded-lg hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all shadow-sm"
										onClick={() => handleDelete(selectedClient.id)}
									>
										Delete
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Edit Modal */}
			{showEditModal && (
				<div className="fixed inset-0 z-50 overflow-y-auto">
					<div className="flex items-center justify-center min-h-screen p-4">
						<div className="relative bg-white rounded-xl shadow-2xl max-w-3xl w-full mx-4 transform transition-all">
							<div className="absolute top-5 right-5">
								<button
									onClick={() => setShowEditModal(false)}
									className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 rounded-full p-2 transition-all hover:bg-gray-100"
								>
									<FontAwesomeIcon icon={faXmark} size="lg" />
								</button>
							</div>
							<form onSubmit={handleEdit} className="p-8">
								<h3 className="text-xl font-semibold text-gray-900 mb-8">
									Edit Client
								</h3>
								<div className="bg-gray-50 rounded-xl p-6 shadow-inner">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												CIN
											</label>
											<input
												type="text"
												required
												value={editFormData.cin || ""}
												onChange={(e) =>
													setEditFormData({
														...editFormData,
														cin: e.target.value.toUpperCase(),
													})
												}
												className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50 transition-all"
												placeholder="Enter CIN"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												First Name
											</label>
											<input
												type="text"
												required
												value={editFormData.first_name || ""}
												onChange={(e) =>
													setEditFormData({
														...editFormData,
														first_name: e.target.value,
													})
												}
												className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50 transition-all"
												placeholder="Enter first name"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												Last Name
											</label>
											<input
												type="text"
												required
												value={editFormData.last_name || ""}
												onChange={(e) =>
													setEditFormData({
														...editFormData,
														last_name: e.target.value,
													})
												}
												className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50 transition-all"
												placeholder="Enter last name"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												City
											</label>
											<input
												type="text"
												required
												value={editFormData.city || ""}
												onChange={(e) =>
													setEditFormData({
														...editFormData,
														city: e.target.value,
													})
												}
												className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50 transition-all"
												placeholder="Enter city"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												Phone
											</label>
											<input
												type="tel"
												required
												value={editFormData.phone || ""}
												onChange={(e) =>
													setEditFormData({
														...editFormData,
														phone: e.target.value,
													})
												}
												className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50 transition-all"
												placeholder="Enter phone number"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												Email
											</label>
											<input
												type="email"
												required
												value={editFormData.email || ""}
												onChange={(e) =>
													setEditFormData({
														...editFormData,
														email: e.target.value,
													})
												}
												className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50 transition-all"
												placeholder="Enter email address"
											/>
										</div>
									</div>
								</div>
								<div className="mt-8 flex justify-end gap-4">
									<button
										type="button"
										onClick={() => setShowEditModal(false)}
										className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all"
									>
										Cancel
									</button>
									<button
										type="submit"
										className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-orange-600 border border-transparent rounded-lg hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all shadow-sm"
									>
										Save Changes
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			)}

			{/* Detail Modal */}
			{showDetailModal && selectedClient && (
				<div className="fixed inset-0 z-50 overflow-y-auto">
					<div className="flex items-center justify-center min-h-screen p-4">
						<div className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 transform transition-all">
							<div className="absolute top-5 right-5">
								<button
									onClick={() => setShowDetailModal(false)}
									className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 rounded-full p-2 transition-all hover:bg-gray-100"
								>
									<FontAwesomeIcon icon={faXmark} size="lg" />
								</button>
							</div>
							<div className="p-8">
								<div className="flex items-start space-x-4 mb-8">
									<div className="flex-shrink-0">
										<div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
											<FontAwesomeIcon
												icon={faInfoCircle}
												className="h-6 w-6 text-blue-600"
											/>
										</div>
									</div>
									<h3 className="text-xl font-semibold text-gray-900">
										Client Details
									</h3>
								</div>
								<div className="bg-gray-50 rounded-xl p-6 shadow-inner">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
										<div className="space-y-2">
											<h4 className="text-sm font-medium text-gray-500">CIN</h4>
											<p className="text-base font-semibold text-gray-900">
												{selectedClient?.cin?.toUpperCase() || "N/A"}
											</p>
										</div>
										<div className="space-y-2">
											<h4 className="text-sm font-medium text-gray-500">
												Full Name
											</h4>
											<p className="text-base font-semibold text-gray-900">
												{formatFullName(
													selectedClient?.first_name,
													selectedClient?.last_name
												)}
											</p>
										</div>
										<div className="space-y-2">
											<h4 className="text-sm font-medium text-gray-500">
												Email
											</h4>
											<p className="text-base font-semibold text-gray-900">
												{selectedClient?.email || "N/A"}
											</p>
										</div>
										<div className="space-y-2">
											<h4 className="text-sm font-medium text-gray-500">
												Phone
											</h4>
											<p className="text-base font-semibold text-gray-900">
												{selectedClient?.phone || "N/A"}
											</p>
										</div>
										<div className="space-y-2">
											<h4 className="text-sm font-medium text-gray-500">
												City
											</h4>
											<p className="text-base font-semibold text-gray-900">
												{formatText(selectedClient?.city)}
											</p>
										</div>
										<div className="space-y-2">
											<h4 className="text-sm font-medium text-gray-500">
												Role
											</h4>
											<p className="text-base font-semibold text-gray-900">
												{formatText(selectedClient?.role)}
											</p>
										</div>
									</div>
								</div>
								<div className="mt-8">
									<button
										type="button"
										onClick={() => setShowDetailModal(false)}
										className="w-full px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all"
									>
										Close
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

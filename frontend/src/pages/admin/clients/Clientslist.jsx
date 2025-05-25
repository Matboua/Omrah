import {
	faEdit,
	faInfoCircle,
	faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../../admin/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { deleteClient } from "../../../store/slices/clientsReducer";
import { fetchClients } from "../../../store/slices/clientsReducer";

export default function Clients() {
	// Search and Filter States
	const [searchTerm, setSearchTerm] = useState("");
	const [filterCity, setFilterCity] = useState("");

	// Start Pagination
	const [currentPage, setCurrentPage] = useState(1);
	const recordsPerPage = 6;
	const clients = useSelector((state) => state.clients.clients);

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
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// fetch clients
	useEffect(() => {
		dispatch(fetchClients());
	}, [dispatch]);

	// Delete Client (handleDelete)
	const handleDelete = (id) => {
		dispatch(deleteClient(id));
	};

	// Navigate To Client Detail
	const detailClient = (id) => {
		navigate("/admin/clients/detail/" + id);
	};

	// Navigate To Edit Client
	const editClient = (id) => {
		navigate("/admin/clients/edit/" + id);
	};

	// Reset filters
	const resetFilters = () => {
		setSearchTerm("");
		setFilterCity("");
		setCurrentPage(1);
	};

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
									<td className="px-6 py-4 text-center whitespace-nowrap">
										<button
											onClick={() => detailClient(item.id)}
											className="py-1.5 px-4 text-blue-500 bg-blue-100 hover:bg-blue-200 rounded-full cursor-pointer transition duration-300 ease-in-out"
										>
											<FontAwesomeIcon icon={faInfoCircle} size="lg" />
										</button>
										<button
											onClick={() => editClient(item.id)}
											className="mx-4 py-1.5 px-4 text-yellow-500 bg-yellow-100  hover:bg-yellow-200 rounded-full cursor-pointer transition duration-300 ease-in-out"
										>
											<FontAwesomeIcon icon={faEdit} size="lg" />
										</button>
										<button
											onClick={() => handleDelete(item.id)}
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
		</div>
	);
}

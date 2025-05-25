import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faXmark,
	faEdit,
	faTrash,
	faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import Pagination from "../../admin/Pagination";

export default function AdminPackages() {
	// State management
	const [packages, setPackages] = useState([]);
	const [selectedPackageId, setSelectedPackageId] = useState(null);
	const [classes, setClasses] = useState([]);
	const [loading, setLoading] = useState({
		packages: true,
		classes: false,
	});
	const [error, setError] = useState(null);

	// Form states
	const [showPackageForm, setShowPackageForm] = useState(false);
	const [showClassForm, setShowClassForm] = useState(false);
	const [currentPackage, setCurrentPackage] = useState({
		id: null,
		name: "",
		start_date: null,
		end_date: null,
		description: "",
	});
	const [currentClass, setCurrentClass] = useState({
		id: null,
		name: "",
		price: null,
		seats: null,
		features: [],
		package_id: null,
	});
	const [newFeature, setNewFeature] = useState("");

	// Search state
	const [searchTerm, setSearchTerm] = useState("");

	// Modal states
	const [showClassesModal, setShowClassesModal] = useState(false);
	const [selectedPackage, setSelectedPackage] = useState(null);

	// Pagination states
	const [currentPage, setCurrentPage] = useState(1);
	const recordsPerPage = 6; // Same as clients list

	// Handle modal scroll lock
	useEffect(() => {
		if (showClassesModal) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}

		return () => {
			document.body.style.overflow = "unset";
		};
	}, [showClassesModal]);

	// Add animation styles
	useEffect(() => {
		const style = document.createElement("style");
		style.textContent = `
			@keyframes modalFade {
				from {
					opacity: 0;
					transform: scale(0.95);
				}
				to {
					opacity: 1;
					transform: scale(1);
				}
			}

			.animate-modal {
				animation: modalFade 0.3s ease-out;
			}
		`;
		document.head.appendChild(style);

		return () => {
			document.head.removeChild(style);
		};
	}, []);

	// Fetch packages
	const fetchPackages = useCallback(async () => {
		try {
			setLoading((prev) => ({ ...prev, packages: true }));
			setError(null);
			const res = await axios.get("/api/packages");
			setPackages(res.data);
		} catch (err) {
			console.error("Failed to fetch packages:", err);
			setError("Failed to load packages. Please try again.");
			toast.error("Failed to load packages");
		} finally {
			setLoading((prev) => ({ ...prev, packages: false }));
		}
	}, []);

	// Fetch classes for a package
	const fetchClasses = async (pkgId) => {
		try {
			setLoading((prev) => ({ ...prev, classes: true }));
			const res = await axios.get(`/api/packages/${pkgId}`);
			setClasses(res.data.classes);
		} catch (err) {
			console.error("Failed to fetch package classes:", err);
			toast.error("Failed to load package classes");
		} finally {
			setLoading((prev) => ({ ...prev, classes: false }));
		}
	};

	// Handle package selection
	const handleViewClasses = async (pkg) => {
		setSelectedPackage(pkg);
		setShowClassesModal(true);
		await fetchClasses(pkg.id);
	};

	// Add close modal function
	const handleCloseModal = () => {
		setShowClassesModal(false);
		setSelectedPackage(null);
		setClasses([]);
	};

	// Package CRUD operations
	const handleAddPackage = () => {
		setCurrentPackage({
			id: null,
			name: "",
			start_date: null,
			end_date: null,
			description: "",
		});
		setShowPackageForm(true);
	};

	const handleEditPackage = (pkg) => {
		setCurrentPackage({
			id: pkg.id,
			name: pkg.name,
			start_date: pkg.start_date,
			end_date: pkg.end_date,
			description: pkg.description,
		});
		setShowPackageForm(true);
	};

	const handleDeletePackage = async (pkgId) => {
		if (!window.confirm("Are you sure you want to delete this package?"))
			return;

		try {
			await axios.delete(`/api/packages/${pkgId}`);
			setPackages(packages.filter((pkg) => pkg.id !== pkgId));
			toast.success("Package deleted successfully");
			if (selectedPackageId === pkgId) {
				setSelectedPackageId(null);
				setClasses([]);
			}
		} catch (err) {
			console.error("Failed to delete package:", err);
			toast.error("Failed to delete package");
		}
	};

	const handlePackageSubmit = async (e) => {
		e.preventDefault();
		try {
			if (currentPackage.id) {
				// Update existing package
				await axios.put(`/api/packages/${currentPackage.id}`, currentPackage);
				setPackages(
					packages.map((pkg) =>
						pkg.id === currentPackage.id ? currentPackage : pkg
					)
				);
				toast.success("Package updated successfully");
			} else {
				// Add new package
				const res = await axios.post(`/api/packages`, currentPackage);
				setPackages([...packages, res.data]);
				toast.success("Package added successfully");
			}
			setShowPackageForm(false);
		} catch (err) {
			console.error("Failed to save package:", err);
			toast.error("Failed to save package");
		}
	};

	// Class CRUD operations
	const handleAddClass = (pkgId) => {
		setCurrentClass({
			id: null,
			name: "",
			price: null,
			seats: null,
			features: [],
			package_id: pkgId,
		});
		setShowClassForm(true);
	};

	const handleEditClass = (cls) => {
		setCurrentClass({
			id: cls.id,
			name: cls.name,
			price: cls.price,
			seats: cls.seats,
			features: [...cls.features],
			package_id: selectedPackageId,
		});
		setShowClassForm(true);
	};

	const handleDeleteClass = async (clsId) => {
		if (!window.confirm("Are you sure you want to delete this class?")) return;

		try {
			await axios.delete(`/api/classes/${clsId}`);
			setClasses(classes.filter((cls) => cls.id !== clsId));
			toast.success("Class deleted successfully");
		} catch (err) {
			console.error("Failed to delete class:", err);
			toast.error("Failed to delete class");
		}
	};

	const handleClassSubmit = async (e) => {
		e.preventDefault();
		try {
			if (currentClass.id) {
				// Update existing class
				await axios.put(`/api/classes/${currentClass.id}`, currentClass);
				setClasses(
					classes.map((cls) =>
						cls.id === currentClass.id ? currentClass : cls
					)
				);
				toast.success("Class updated successfully");
			} else {
				// Add new class
				const res = await axios.post(
					`/api/packages/${selectedPackageId}/classes`,
					currentClass
				);
				setClasses([...classes, res.data]);
				toast.success("Class added successfully");
			}
			setShowClassForm(false);
		} catch (err) {
			console.log(currentClass);
			console.error("Failed to save class:", err);
			toast.error("Failed to save class");
		}
	};

	// Feature management
	const addFeature = () => {
		if (
			newFeature.trim() &&
			!currentClass.features.includes(newFeature.trim())
		) {
			setCurrentClass({
				...currentClass,
				features: [...currentClass.features, newFeature.trim()],
			});
			setNewFeature("");
		}
	};

	const removeFeature = (featureToRemove) => {
		setCurrentClass({
			...currentClass,
			features: currentClass.features.filter((f) => f !== featureToRemove),
		});
	};

	// Initial data load
	useEffect(() => {
		fetchPackages();
	}, [fetchPackages]);

	// Add this new function to handle outside click
	const handleModalOutsideClick = (e) => {
		if (e.target === e.currentTarget) {
			handleCloseModal();
		}
	};

	// Add this function to handle page changes
	const handlePageChange = (pageNumber) => {
		if (pageNumber >= 1 && pageNumber <= npage) {
			setCurrentPage(pageNumber);
		}
	};

	// Add pagination calculation logic
	const filteredPackages = packages.filter((pkg) =>
		pkg.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const lastIndex = currentPage * recordsPerPage;
	const firstIndex = lastIndex - recordsPerPage;
	const records = filteredPackages.slice(
		firstIndex,
		Math.min(lastIndex, filteredPackages.length)
	);
	const npage = Math.max(
		1,
		Math.ceil(filteredPackages.length / recordsPerPage)
	);

	// Loading and error states
	if (loading.packages && packages.length === 0) {
		return (
			<div className="p-6 flex justify-center items-center h-64">
				<div className="text-lg">Loading packages...</div>
			</div>
		);
	}

	if (error && packages.length === 0) {
		return (
			<div className="p-6">
				<div className="text-red-500 mb-4">{error}</div>
				<button
					onClick={fetchPackages}
					className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
				>
					Retry
				</button>
			</div>
		);
	}

	return (
		<div className="relative flex flex-col gap-3 min-h-[calc(100dvh-96px)] w-full bg-white rounded-lg shadow-sm border border-gray-200">
			{/* Search and Filter Section */}
			<div className="p-4 bg-white border-b border-gray-200">
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
								placeholder="Search by package name..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
						</div>
					</div>

					{/* Add Package Button */}
					<button
						onClick={handleAddPackage}
						className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out"
					>
						Add New Package
					</button>
				</div>
			</div>

			{/* Table Container */}
			<div className="flex-1 overflow-x-auto">
				<table className="w-full min-w-[750px] text-sm text-left text-gray-500">
					<thead className="text-xs text-gray-700 uppercase bg-gray-100 sticky top-0">
						<tr>
							<th scope="col" className="px-6 py-3 font-medium">
								#
							</th>
							<th scope="col" className="px-6 py-3 font-medium">
								Name
							</th>
							<th scope="col" className="px-6 py-3 font-medium">
								Description
							</th>
							<th scope="col" className="px-6 py-3 font-medium">
								Start date
							</th>
							<th scope="col" className="px-6 py-3 font-medium">
								End date
							</th>
							<th scope="col" className="px-6 py-3 font-medium text-center">
								Actions
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200">
						{records.map((pkg, index) => (
							<tr
								key={pkg.id}
								className="bg-white border-b border-gray-200 hover:bg-gray-50"
							>
								<td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
								<td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
									{pkg.name}
								</td>
								<td className="px-6 py-4">
									<div className="line-clamp-2">{pkg.description}</div>
								</td>
								<td className="px-6 py-4">{pkg.start_date}</td>
								<td className="px-6 py-4">{pkg.end_date}</td>
								<td className="px-6 py-4 text-center space-x-2">
									<button
										onClick={() => handleViewClasses(pkg)}
										className="py-1.5 px-4 text-blue-500 bg-blue-100 hover:bg-blue-200 rounded-full cursor-pointer transition duration-300 ease-in-out"
									>
										<FontAwesomeIcon icon={faInfoCircle} size="lg" />
									</button>
									<button
										onClick={() => handleEditPackage(pkg)}
										className="py-1.5 px-4 text-yellow-500 bg-yellow-100 hover:bg-yellow-200 rounded-full cursor-pointer transition duration-300 ease-in-out"
									>
										<FontAwesomeIcon icon={faEdit} size="lg" />
									</button>
									<button
										onClick={() => handleDeletePackage(pkg.id)}
										className="py-1.5 px-4 text-red-500 bg-red-100 hover:bg-red-200 rounded-full cursor-pointer transition duration-300 ease-in-out"
									>
										<FontAwesomeIcon icon={faTrash} size="lg" />
									</button>
								</td>
							</tr>
						))}
						{records.length === 0 && (
							<tr>
								<td colSpan="6" className="px-6 py-8 text-center text-gray-500">
									No packages found.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			{/* Add Pagination */}
			{filteredPackages.length > 0 && (
				<div className="mt-auto border-t border-gray-200">
					<Pagination
						currentPage={currentPage}
						npage={npage}
						handlePageChange={handlePageChange}
					/>
				</div>
			)}

			{/* Classes Modal */}
			{showClassesModal && selectedPackage && (
				<div
					className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
					onClick={handleModalOutsideClick}
				>
					<div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-modal">
						{/* Modal Header */}
						<div className="p-6 bg-gradient-to-r from-orange-50 to-transparent border-b border-gray-200">
							<div className="flex justify-between items-center">
								<h3 className="text-2xl font-bold text-gray-800">
									Classes for {selectedPackage.name}
								</h3>
								<div className="flex items-center gap-4">
									<button
										onClick={() => handleAddClass(selectedPackage.id)}
										className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300 ease-in-out flex items-center gap-2"
									>
										<span className="text-lg font-bold">+</span>
										Add Class
									</button>
									<button
										onClick={handleCloseModal}
										className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer transition-all duration-300 group"
									>
										<FontAwesomeIcon
											icon={faXmark}
											className="w-5 h-5 text-gray-500 group-hover:text-gray-700 group-hover:scale-110 transition-all duration-300"
										/>
									</button>
								</div>
							</div>
						</div>

						{/* Modal Body */}
						<div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
							{loading.classes ? (
								<div className="flex justify-center items-center py-12">
									<div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-r-transparent"></div>
								</div>
							) : classes.length > 0 ? (
								<div className="overflow-x-auto">
									<table className="w-full text-sm text-left text-gray-500">
										<thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
											<tr>
												<th className="px-6 py-4 font-medium">Name</th>
												<th className="px-6 py-4 font-medium">Price</th>
												<th className="px-6 py-4 font-medium">Seats</th>
												<th className="px-6 py-4 font-medium">Features</th>
												<th className="px-6 py-4 font-medium text-center">
													Actions
												</th>
											</tr>
										</thead>
										<tbody className="divide-y divide-gray-200">
											{classes.map((cls) => (
												<tr key={cls.id} className="hover:bg-gray-50">
													<td className="px-6 py-4 whitespace-nowrap">
														{cls.name}
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-green-600 font-medium">
														${cls.price}
													</td>
													<td className="px-6 py-4">{cls.seats}</td>
													<td className="px-6 py-4">
														<ul className="space-y-2">
															{cls.features.map((feature, i) => (
																<li key={i} className="flex items-center gap-2">
																	<span className="w-2 h-2 bg-orange-400 rounded-full"></span>
																	{feature}
																</li>
															))}
														</ul>
													</td>
													<td className="px-6 py-4 text-center space-x-2">
														<button
															onClick={() => handleEditClass(cls)}
															className="py-1.5 px-4 text-yellow-500 bg-yellow-100 hover:bg-yellow-200 rounded-full cursor-pointer transition duration-300 ease-in-out"
														>
															<FontAwesomeIcon icon={faEdit} size="lg" />
														</button>
														<button
															onClick={() => handleDeleteClass(cls.id)}
															className="py-1.5 px-4 text-red-500 bg-red-100 hover:bg-red-200 rounded-full cursor-pointer transition duration-300 ease-in-out"
														>
															<FontAwesomeIcon icon={faTrash} size="lg" />
														</button>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							) : (
								<div className="text-center text-gray-500 py-12">
									<p className="text-lg">No classes found for this package.</p>
									<p className="mt-2 text-sm">
										Click the "Add Class" button to create one.
									</p>
								</div>
							)}
						</div>
					</div>
				</div>
			)}

			{/* Package Form Modal */}
			{showPackageForm && (
				<div
					className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
					onClick={(e) =>
						e.target === e.currentTarget && setShowPackageForm(false)
					}
				>
					<div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-modal">
						{/* Modal Header */}
						<div className="p-6 bg-gradient-to-r from-orange-50 to-transparent border-b border-gray-200">
							<div className="flex justify-between items-center">
								<h3 className="text-2xl font-bold text-gray-800">
									{currentPackage.id ? "Edit Package" : "Add New Package"}
								</h3>
								<button
									onClick={() => setShowPackageForm(false)}
									className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer transition-all duration-300 group"
								>
									<FontAwesomeIcon
										icon={faXmark}
										className="w-5 h-5 text-gray-500 group-hover:text-gray-700 group-hover:scale-110 transition-all duration-300"
									/>
								</button>
							</div>
						</div>

						{/* Modal Body */}
						<div className="p-6">
							<form onSubmit={handlePackageSubmit} className="space-y-4">
								<div>
									<label
										className="block text-gray-700 text-sm font-semibold mb-2"
										htmlFor="package-name"
									>
										Name
									</label>
									<input
										id="package-name"
										type="text"
										className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none transition-all duration-300"
										value={currentPackage.name}
										onChange={(e) =>
											setCurrentPackage({
												...currentPackage,
												name: e.target.value,
											})
										}
										required
									/>
								</div>
								<div>
									<label
										className="block text-gray-700 text-sm font-semibold mb-2"
										htmlFor="package-description"
									>
										Description
									</label>
									<textarea
										id="package-description"
										className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none transition-all duration-300 min-h-[100px]"
										value={currentPackage.description}
										onChange={(e) =>
											setCurrentPackage({
												...currentPackage,
												description: e.target.value,
											})
										}
										required
									/>
								</div>
								<div>
									<label
										className="block text-gray-700 text-sm font-semibold mb-2"
										htmlFor="package-start-date"
									>
										Start Date
									</label>
									<input
										id="package-start-date"
										type="date"
										className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none transition-all duration-300"
										value={currentPackage.start_date || ""}
										onChange={(e) =>
											setCurrentPackage({
												...currentPackage,
												start_date: e.target.value,
											})
										}
										required
									/>
								</div>
								<div>
									<label
										className="block text-gray-700 text-sm font-semibold mb-2"
										htmlFor="package-end-date"
									>
										End Date
									</label>
									<input
										id="package-end-date"
										type="date"
										className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none transition-all duration-300"
										value={currentPackage.end_date || ""}
										onChange={(e) =>
											setCurrentPackage({
												...currentPackage,
												end_date: e.target.value,
											})
										}
										required
									/>
								</div>
								<div className="flex justify-end gap-3 pt-4">
									<button
										type="button"
										onClick={() => setShowPackageForm(false)}
										className="px-4 py-2 text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-300"
									>
										Cancel
									</button>
									<button
										type="submit"
										className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-300"
									>
										{currentPackage.id ? "Update Package" : "Create Package"}
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			)}

			{/* Class Form Modal */}
			{showClassForm && (
				<div
					className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
					onClick={(e) =>
						e.target === e.currentTarget && setShowClassForm(false)
					}
				>
					<div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-modal">
						{/* Modal Header */}
						<div className="p-6 bg-gradient-to-r from-orange-50 to-transparent border-b border-gray-200">
							<div className="flex justify-between items-center">
								<h3 className="text-2xl font-bold text-gray-800">
									{currentClass.id ? "Edit Class" : "Add New Class"}
								</h3>
								<button
									onClick={() => setShowClassForm(false)}
									className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer transition-all duration-300 group"
								>
									<FontAwesomeIcon
										icon={faXmark}
										className="w-5 h-5 text-gray-500 group-hover:text-gray-700 group-hover:scale-110 transition-all duration-300"
									/>
								</button>
							</div>
						</div>

						{/* Modal Body */}
						<div className="p-6">
							<form onSubmit={handleClassSubmit} className="space-y-4">
								<div>
									<label
										className="block text-gray-700 text-sm font-semibold mb-2"
										htmlFor="class-name"
									>
										Name
									</label>
									<input
										id="class-name"
										type="text"
										className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none transition-all duration-300"
										value={currentClass.name}
										onChange={(e) =>
											setCurrentClass({ ...currentClass, name: e.target.value })
										}
										required
									/>
								</div>
								<div>
									<label
										className="block text-gray-700 text-sm font-semibold mb-2"
										htmlFor="class-price"
									>
										Price
									</label>
									<div className="relative">
										<span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
											$
										</span>
										<input
											id="class-price"
											type="number"
											step="0.01"
											className="w-full p-2.5 pl-7 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none transition-all duration-300"
											value={currentClass.price || ""}
											onChange={(e) =>
												setCurrentClass({
													...currentClass,
													price: e.target.value,
												})
											}
											required
										/>
									</div>
								</div>
								<div>
									<label
										className="block text-gray-700 text-sm font-semibold mb-2"
										htmlFor="class-seats"
									>
										Seats
									</label>
									<input
										id="class-seats"
										type="number"
										className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none transition-all duration-300"
										value={currentClass.seats || ""}
										onChange={(e) =>
											setCurrentClass({
												...currentClass,
												seats: e.target.value,
											})
										}
										required
									/>
								</div>
								<div>
									<label className="block text-gray-700 text-sm font-semibold mb-2">
										Features
									</label>
									<div className="space-y-3">
										<div className="flex gap-2">
											<input
												type="text"
												className="flex-1 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none transition-all duration-300"
												value={newFeature}
												onChange={(e) => setNewFeature(e.target.value)}
												placeholder="Add a feature"
												onKeyPress={(e) =>
													e.key === "Enter" &&
													(e.preventDefault(), addFeature())
												}
											/>
											<button
												type="button"
												onClick={addFeature}
												className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-300"
											>
												Add
											</button>
										</div>
										<div className="space-y-2 max-h-[150px] overflow-y-auto">
											{currentClass.features.map((feature, index) => (
												<div
													key={index}
													className="flex items-center justify-between p-2 bg-gray-50 rounded-lg group"
												>
													<span className="text-gray-700">{feature}</span>
													<button
														type="button"
														onClick={() => removeFeature(feature)}
														className="text-gray-400 hover:text-red-500 transition-colors duration-300"
													>
														<FontAwesomeIcon
															icon={faXmark}
															className="w-4 h-4"
														/>
													</button>
												</div>
											))}
										</div>
									</div>
								</div>
								<div className="flex justify-end gap-3 pt-4">
									<button
										type="button"
										onClick={() => setShowClassForm(false)}
										className="px-4 py-2 text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-300"
									>
										Cancel
									</button>
									<button
										type="submit"
										className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-300"
									>
										{currentClass.id ? "Update Class" : "Create Class"}
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

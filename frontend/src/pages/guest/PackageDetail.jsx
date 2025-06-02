"use client";

import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Calendar, MapPin, Users, Star, Check, ArrowLeft } from "lucide-react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import axios from "../../config/axios";
import { toast } from "react-toastify";

// This would normally come from your API or props
const packagesData = [
	{
		id: 1,
		name: "Ramadan Umrah Package",
		image:
			"https://images.unsplash.com/photo-1574246604907-db69e30ddb97?q=80&w=1946&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		description:
			"A special Umrah package during the holy month of Ramadan with spiritual guidance and premium services.",
		start_date: "2025-03-01",
		end_date: "2025-04-15",
		duration: "15 days",
		location: "Makkah & Madinah",
		group_size: "20-30 people",
		levels: [
			{
				id: 1,
				name: "VIP",
				price: 3500,
				description:
					"Premium experience with luxury amenities and personalized service.",
				features: [
					{ id: 1, title: "5-Star Hotel near Haram", icon: "🏨" },
					{ id: 2, title: "Private Transportation", icon: "🚗" },
					{ id: 3, title: "Full-Board Meals", icon: "🍽" },
					{ id: 4, title: "Dedicated Guide", icon: "🧑‍✈" },
					{ id: 5, title: "Priority Flight Check-in", icon: "🛫" },
					{ id: 6, title: "VIP Lounge Access", icon: "✨" },
				],
			},
			{
				id: 2,
				name: "Business",
				price: 2500,
				description:
					"Comfortable journey with essential amenities and group guidance.",
				features: [
					{ id: 7, title: "4-Star Hotel", icon: "🏨" },
					{ id: 8, title: "Shared Transportation", icon: "🚐" },
					{ id: 9, title: "Half-Board Meals", icon: "🥘" },
					{ id: 10, title: "Group Guide", icon: "👨‍✈" },
					{ id: 11, title: "Airport Assistance", icon: "🛫" },
				],
			},
			{
				id: 3,
				name: "Economic",
				price: 1500,
				description: "Affordable pilgrimage option with basic amenities.",
				features: [
					{ id: 12, title: "3-Star Hotel", icon: "🏨" },
					{ id: 13, title: "Group Bus Transportation", icon: "🚌" },
					{ id: 14, title: "Breakfast Only", icon: "🍞" },
					{ id: 15, title: "Group Guide", icon: "👥" },
				],
			},
		],
	},
	{
		id: 2,
		name: "Eid Umrah Package",
		image:
			"https://images.unsplash.com/photo-1519818187420-8e49de7adeef?q=80&w=1683&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		description:
			"Celebrate Eid in the holy cities with our special Eid Umrah package.",
		start_date: "2025-05-01",
		end_date: "2025-05-15",
		duration: "14 days",
		location: "Makkah & Madinah",
		group_size: "25-35 people",
		levels: [
			{
				id: 1,
				name: "VIP",
				price: 3800,
				description:
					"Premium experience with luxury amenities and personalized service.",
				features: [
					{ id: 1, title: "5-Star Hotel near Haram", icon: "🏨" },
					{ id: 2, title: "Private Transportation", icon: "🚗" },
					{ id: 3, title: "Full-Board Meals", icon: "🍽" },
					{ id: 4, title: "Dedicated Guide", icon: "🧑‍✈" },
					{ id: 5, title: "Priority Flight Check-in", icon: "🛫" },
					{ id: 6, title: "VIP Lounge Access", icon: "✨" },
				],
			},
			{
				id: 2,
				name: "Business",
				price: 2800,
				description:
					"Comfortable journey with essential amenities and group guidance.",
				features: [
					{ id: 7, title: "4-Star Hotel", icon: "🏨" },
					{ id: 8, title: "Shared Transportation", icon: "🚐" },
					{ id: 9, title: "Half-Board Meals", icon: "🥘" },
					{ id: 10, title: "Group Guide", icon: "👨‍✈" },
					{ id: 11, title: "Airport Assistance", icon: "🛫" },
				],
			},
			{
				id: 3,
				name: "Economic",
				price: 1800,
				description: "Affordable pilgrimage option with basic amenities.",
				features: [
					{ id: 12, title: "3-Star Hotel", icon: "🏨" },
					{ id: 13, title: "Group Bus Transportation", icon: "🚌" },
					{ id: 14, title: "Breakfast Only", icon: "🍞" },
					{ id: 15, title: "Group Guide", icon: "👥" },
				],
			},
		],
	},
	{
		id: 3,
		name: "Quick Umrah Package",
		image:
			"https://images.unsplash.com/photo-1577561426384-62154a1e9457?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		description:
			"Perfect for those with limited time - a quick but complete Umrah experience.",
		start_date: "2025-06-01",
		end_date: "2025-06-08",
		duration: "7 days",
		location: "Makkah & Madinah",
		group_size: "15-25 people",
		levels: [
			{
				id: 1,
				name: "VIP",
				price: 2500,
				description:
					"Premium experience with luxury amenities and personalized service.",
				features: [
					{ id: 1, title: "5-Star Hotel near Haram", icon: "🏨" },
					{ id: 2, title: "Private Transportation", icon: "🚗" },
					{ id: 3, title: "Full-Board Meals", icon: "🍽" },
					{ id: 4, title: "Dedicated Guide", icon: "🧑‍✈" },
					{ id: 5, title: "Priority Flight Check-in", icon: "🛫" },
				],
			},
			{
				id: 2,
				name: "Business",
				price: 1800,
				description:
					"Comfortable journey with essential amenities and group guidance.",
				features: [
					{ id: 7, title: "4-Star Hotel", icon: "🏨" },
					{ id: 8, title: "Shared Transportation", icon: "🚐" },
					{ id: 9, title: "Half-Board Meals", icon: "🥘" },
					{ id: 10, title: "Group Guide", icon: "👨‍✈" },
				],
			},
			{
				id: 3,
				name: "Economic",
				price: 1200,
				description: "Affordable pilgrimage option with basic amenities.",
				features: [
					{ id: 12, title: "3-Star Hotel", icon: "🏨" },
					{ id: 13, title: "Group Bus Transportation", icon: "🚌" },
					{ id: 14, title: "Breakfast Only", icon: "🍞" },
				],
			},
		],
	},
];

export default function PackageDetail() {
	const { id } = useParams();
	const navigate = useNavigate();
	const user = useSelector((state) => state.auth.user);
	const [selectedLevel, setSelectedLevel] = useState(null);
	const [isBooking, setIsBooking] = useState(false);

	// Find the package by ID
	const packageData = packagesData.find(
		(pkg) => pkg.id === Number.parseInt(id)
	);

	if (!packageData) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center">
					<h1 className="text-2xl font-bold text-gray-900 mb-4">
						Package Not Found
					</h1>
					<button
						onClick={() => navigate(-1)}
						className="text-orange-600 hover:text-orange-700"
					>
						Go Back
					</button>
				</div>
			</div>
		);
	}

	const handleBooking = async () => {
		if (!selectedLevel) {
			toast.warning("Please select a package level first");
			return;
		}

		setIsBooking(true);

		// Prepare booking data
		const bookingData = {
			package_id: packageData.id,
			package_class_id: selectedLevel.id,
		};

		try {
			await axios.post("api/bookings", bookingData);
			toast.success(
				"Booking successful! You will receive a confirmation email shortly."
			);
			navigate("/mybookings");
		} catch (error) {
			console.error("Booking failed:", error);
			toast.error(
				error?.response?.data?.message || "Booking failed. Please try again."
			);
		} finally {
			setIsBooking(false);
		}
	};

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<div className="bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<Header />
				</div>
			</div>

			{/* Back Button */}
			{/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
				<button
					onClick={() => navigate(-1)}
					className="flex items-center text-orange-600 hover:text-orange-700 font-medium"
				>
					<ArrowLeft size={20} className="mr-2" />
					Back to Packages
				</button>
			</div> */}

			{/* Hero Section */}
			<div className="relative h-96 overflow-hidden">
				<img
					src={packageData.image || "/placeholder.svg"}
					alt={packageData.name}
					className="w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-black/60 flex items-center justify-center">
					<div className="text-center text-white">
						<h1 className="text-4xl md:text-5xl font-bold mb-4">
							{packageData.name}
						</h1>
						<p className="text-xl max-w-2xl mx-auto px-4">
							{packageData.description}
						</p>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Left Column - Package Details */}
					<div className="lg:col-span-2 space-y-8">
						{/* Package Info */}
						<div className="bg-white rounded-2xl shadow-lg p-6">
							<h2 className="text-2xl font-bold text-gray-900 mb-6">
								Package Details
							</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="flex items-center">
									<Calendar className="text-orange-600 mr-3" size={24} />
									<div>
										<p className="font-semibold">Duration</p>
										<p className="text-gray-600">{packageData.duration}</p>
									</div>
								</div>
								<div className="flex items-center">
									<MapPin className="text-orange-600 mr-3" size={24} />
									<div>
										<p className="font-semibold">Location</p>
										<p className="text-gray-600">{packageData.location}</p>
									</div>
								</div>
								<div className="flex items-center">
									<Users className="text-orange-600 mr-3" size={24} />
									<div>
										<p className="font-semibold">Group Size</p>
										<p className="text-gray-600">{packageData.group_size}</p>
									</div>
								</div>
								<div className="flex items-center">
									<Calendar className="text-orange-600 mr-3" size={24} />
									<div>
										<p className="font-semibold">Dates</p>
										<p className="text-gray-600">
											{new Date(packageData.start_date).toLocaleDateString()} -{" "}
											{new Date(packageData.end_date).toLocaleDateString()}
										</p>
									</div>
								</div>
							</div>
						</div>

						{/* Package Levels */}
						<div className="bg-white rounded-2xl shadow-lg p-6">
							<h2 className="text-2xl font-bold text-gray-900 mb-6">
								Choose Your Package Level
							</h2>
							<div className="space-y-4">
								{packageData.levels.map((level) => (
									<div
										key={level.id}
										className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
											selectedLevel?.id === level.id
												? "border-orange-600 bg-orange-50"
												: "border-gray-200 hover:border-orange-300"
										}`}
										onClick={() => setSelectedLevel(level)}
									>
										<div className="flex justify-between items-start mb-4">
											<div>
												<h3 className="text-xl font-bold text-gray-900 flex items-center">
													{level.name}
													{level.name === "VIP" && (
														<Star className="ml-2 text-yellow-500" size={20} />
													)}
												</h3>
												<p className="text-gray-600 mt-1">
													{level.description}
												</p>
											</div>
											<div className="text-right">
												<p className="text-2xl font-bold text-orange-600">
													{level.price.toLocaleString()} DH
												</p>
												<p className="text-sm text-gray-500">per person</p>
											</div>
										</div>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
											{level.features.map((feature) => (
												<div key={feature.id} className="flex items-center">
													<Check className="text-green-500 mr-2" size={16} />
													<span className="text-sm">{feature.title}</span>
												</div>
											))}
										</div>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Right Column - Booking Card */}
					<div className="lg:col-span-1">
						<div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
							<h3 className="text-xl font-bold text-gray-900 mb-4">
								Your Booking
							</h3>

							{/* Client Info */}
							<div className="mb-6 p-4 bg-gray-50 rounded-lg">
								<h4 className="font-semibold text-gray-900 mb-2">
									Client Information
								</h4>
								<p className="text-sm text-gray-600">
									{user.first_name} {user.last_name}
								</p>
								<p className="text-sm text-gray-600">{user.email}</p>
								<p className="text-sm text-gray-600">{user.phone}</p>
							</div>

							{/* Selected Package */}
							<div className="mb-6">
								<h4 className="font-semibold text-gray-900 mb-2">Package</h4>
								<p className="text-sm text-gray-600">{packageData.name}</p>
								<p className="text-sm text-gray-600">{packageData.duration}</p>
							</div>

							{/* Selected Level */}
							{selectedLevel && (
								<div className="mb-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
									<h4 className="font-semibold text-gray-900 mb-2">
										Selected Level
									</h4>
									<p className="font-medium text-orange-600">
										{selectedLevel.name}
									</p>
									<p className="text-2xl font-bold text-orange-600 mt-2">
										{selectedLevel.price.toLocaleString()} DH
									</p>
								</div>
							)}

							{/* Book Button */}
							<button
								onClick={handleBooking}
								disabled={!selectedLevel || isBooking}
								className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
									selectedLevel && !isBooking
										? "bg-orange-600 hover:bg-orange-700 text-white"
										: "bg-gray-300 text-gray-500 cursor-not-allowed"
								}`}
							>
								{isBooking
									? "Processing..."
									: selectedLevel
									? "Book Now"
									: "Select a Package Level"}
							</button>

							{!selectedLevel && (
								<p className="text-sm text-gray-500 text-center mt-2">
									Please select a package level to continue
								</p>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Footer */}
			<Footer />
		</div>
	);
}

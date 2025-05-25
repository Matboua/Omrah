import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

import axios from '../../../config/axios'
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginPopup from "./LoginPopup";

// data test
const packagesData = [
	{
		id: 1,
		name: "Ramadan Umrah Package",
		image:
			"https://images.unsplash.com/photo-1574246604907-db69e30ddb97?q=80&w=1946&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		description: "A special Umrah package during the holy month of Ramadan.",
		start_date: "2025-03-01",
		end_date: "2025-04-15",
		classes: [
			{
				id: 1,
				name: "VIP",
				price: 3500,
				description: "Premium experience with luxury amenities.",
				features: [
					{ id: 1, title: "5-Star Hotel", icon: "🏨" },
					{ id: 2, title: "Private Transportation", icon: "🚗" },
					{ id: 3, title: "Full-Board Meals", icon: "🍽" },
					{ id: 4, title: "Dedicated Guide", icon: "🧑‍✈" },
					{ id: 5, title: "Priority Flight Check-in", icon: "🛫" },
				],
			},
			{
				id: 2,
				name: "Business",
				price: 2500,
				description: "Comfortable journey with key amenities.",
				features: [
					{ id: 6, title: "4-Star Hotel", icon: "🏨" },
					{ id: 7, title: "Shared Transportation", icon: "🚐" },
					{ id: 8, title: "Half-Board Meals", icon: "🥘" },
					{ id: 9, title: "Group Guide", icon: "👨‍✈" },
				],
			},
			{
				id: 3,
				name: "Economic",
				price: 1500,
				description: "Affordable pilgrimage for all.",
				features: [
					{ id: 10, title: "3-Star Hotel", icon: "🏨" },
					{ id: 11, title: "Public Group Bus", icon: "🚌" },
					{ id: 12, title: "Breakfast Only", icon: "🍞" },
				],
			},
		],
	},
	{
		id: 2,
		name: "Eid Umrah Package",
		image:
			"https://images.unsplash.com/photo-1519818187420-8e49de7adeef?q=80&w=1683&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		description: "A special Umrah package during the holy month of Ramadan.",
		start_date: "2025-03-01",
		end_date: "2025-04-15",
		classes: [
			{
				id: 1,
				name: "VIP",
				price: 3500,
				description: "Premium experience with luxury amenities.",
				features: [
					{ id: 1, title: "5-Star Hotel", icon: "🏨" },
					{ id: 2, title: "Private Transportation", icon: "🚗" },
					{ id: 3, title: "Full-Board Meals", icon: "🍽" },
					{ id: 4, title: "Dedicated Guide", icon: "🧑‍✈" },
					{ id: 5, title: "Priority Flight Check-in", icon: "🛫" },
				],
			},
			{
				id: 2,
				name: "Business",
				price: 2500,
				description: "Comfortable journey with key amenities.",
				features: [
					{ id: 6, title: "4-Star Hotel", icon: "🏨" },
					{ id: 7, title: "Shared Transportation", icon: "🚐" },
					{ id: 8, title: "Half-Board Meals", icon: "🥘" },
					{ id: 9, title: "Group Guide", icon: "👨‍✈" },
				],
			},
			{
				id: 3,
				name: "Economic",
				price: 1500,
				description: "Affordable pilgrimage for all.",
				features: [
					{ id: 10, title: "3-Star Hotel", icon: "🏨" },
					{ id: 11, title: "Public Group Bus", icon: "🚌" },
					{ id: 12, title: "Breakfast Only", icon: "🍞" },
				],
			},
		],
	},
	{
		id: 3,
		name: "Quick Umrah Package",
		image:
			"https://images.unsplash.com/photo-1577561426384-62154a1e9457?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		description: "A special Umrah package during the holy month of Ramadan.",
		start_date: "2025-03-01",
		end_date: "2025-04-15",
		classes: [
			{
				id: 1,
				name: "VIP",
				price: 3500,
				description: "Premium experience with luxury amenities.",
				features: [
					{ id: 1, title: "5-Star Hotel", icon: "🏨" },
					{ id: 2, title: "Private Transportation", icon: "🚗" },
					{ id: 3, title: "Full-Board Meals", icon: "🍽" },
					{ id: 4, title: "Dedicated Guide", icon: "🧑‍✈" },
					{ id: 5, title: "Priority Flight Check-in", icon: "🛫" },
				],
			},
			{
				id: 2,
				name: "Business",
				price: 2500,
				description: "Comfortable journey with key amenities.",
				features: [
					{ id: 6, title: "4-Star Hotel", icon: "🏨" },
					{ id: 7, title: "Shared Transportation", icon: "🚐" },
					{ id: 8, title: "Half-Board Meals", icon: "🥘" },
					{ id: 9, title: "Group Guide", icon: "👨‍✈" },
				],
			},
			{
				id: 3,
				name: "Economic",
				price: 1500,
				description: "Affordable pilgrimage for all.",
				features: [
					{ id: 10, title: "3-Star Hotel", icon: "🏨" },
					{ id: 11, title: "Public Group Bus", icon: "🚌" },
					{ id: 12, title: "Breakfast Only", icon: "🍞" },
				],
			},
		],
	},
	{
		id: 3,
		name: "Quick Umrah Package",
		image:
			"https://images.unsplash.com/photo-1577561426384-62154a1e9457?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		description: "A special Umrah package during the holy month of Ramadan.",
		start_date: "2025-03-01",
		end_date: "2025-04-15",
		classes: [
			{
				id: 1,
				name: "VIP",
				price: 3500,
				description: "Premium experience with luxury amenities.",
				features: [
					{ id: 1, title: "5-Star Hotel", icon: "🏨" },
					{ id: 2, title: "Private Transportation", icon: "🚗" },
					{ id: 3, title: "Full-Board Meals", icon: "🍽" },
					{ id: 4, title: "Dedicated Guide", icon: "🧑‍✈" },
					{ id: 5, title: "Priority Flight Check-in", icon: "🛫" },
				],
			},
			{
				id: 2,
				name: "Business",
				price: 2500,
				description: "Comfortable journey with key amenities.",
				features: [
					{ id: 6, title: "4-Star Hotel", icon: "🏨" },
					{ id: 7, title: "Shared Transportation", icon: "🚐" },
					{ id: 8, title: "Half-Board Meals", icon: "🥘" },
					{ id: 9, title: "Group Guide", icon: "👨‍✈" },
				],
			},
			{
				id: 3,
				name: "Economic",
				price: 1500,
				description: "Affordable pilgrimage for all.",
				features: [
					{ id: 10, title: "3-Star Hotel", icon: "🏨" },
					{ id: 11, title: "Public Group Bus", icon: "🚌" },
					{ id: 12, title: "Breakfast Only", icon: "🍞" },
				],
			},
		],
	},
];

export default function SwiperComponents() {
	const swiperRef = useRef(null);
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const navigate = useNavigate();
	const [showLoginPopup, setShowLoginPopup] = useState(false);
	const [packages, setPackages] = useState([]);
	const image = "https://images.unsplash.com/photo-1574246604907-db69e30ddb97?q=80&w=1946&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

	const handleBookPackage = (pkg) => {
		if (isAuthenticated) {
			// User is logged in, navigate to package detail page
			navigate(`/package/${pkg.id}`);
		} else {
			// User is not logged in, show login popup
			setShowLoginPopup(true);
		}
	};
	
	useEffect(() => {
		axios.get('/api/packages')
			.then(res => {setPackages(res.data)
		console.log(res.data)})
			.then(console.log(packages))
			.catch(err => console.error(err));
	}, []);
	return (
		<>
			{showLoginPopup && (
				<LoginPopup onClose={() => setShowLoginPopup(false)} />
			)}
			<div className="relative">
				{/* Custom Navigation Buttons */}
				<div className="absolute -top-15 min-[490px]:-top-25 min-[640px]:-top-30 -right-2 min-[425px]:right-0 z-10 flex space-x-2 p-4 ">
					<button
						onClick={() => swiperRef.current?.slidePrev()}
						className="text-orange-600  border-1 dark:border-2 border-orange-600 p-1 sm:p-2 rounded-full cursor-pointer"
					>
						<ChevronLeft />
					</button>
					<button
						onClick={() => swiperRef.current?.slideNext()}
						className="text-orange-600 border-1 dark:border-2 border-orange-600 p-1 sm:p-2 rounded-full cursor-pointer"
					>
						<ChevronRight />
					</button>
				</div>
				<Swiper
					onSwiper={(swiper) => {
						swiperRef.current = swiper;
					}}
					spaceBetween={50}
					breakpoints={{
						0: { slidesPerView: 1 },
						768: { slidesPerView: 2 },
						1024: { slidesPerView: 3 },
					}}
					loop={true}
					modules={[Pagination, Navigation]}
					className="p-3"
				>
					{packages.map((pkg) => (
						<SwiperSlide key={pkg.id}>
							<div className="relative bg-gradient-to-br from-orange-100 to-white rounded-3xl shadow-xl overflow-hidden transition-all hover:scale-[1.01] duration-300 border border-orange-200 cursor-pointer">
								<div
									className="absolute inset-0 opacity-60 bg-cover bg-center"
									style={{
										backgroundImage: `url('${image}')`,
									}}
								/>

								<div className="relative z-10 p-6 flex flex-col h-full justify-between">
									<div>
										<h2 className="text-2xl font-extrabold text-orange-600 text-shadow-md text-shadow-orange-200 mb-1">
											{pkg.name}
										</h2>
										<p className="text-gray-100 font-bold text-shadow-md text-shadow-orange-300 mb-3 italic">
											{pkg.description}
										</p>
										<p className="text-sm text-orange-600 font-extrabold text-shadow-md text-shadow-orange-100 mb-6">
											From {new Date(pkg.start_date).toLocaleDateString()} To{" "}
											{new Date(pkg.end_date).toLocaleDateString()}
										</p>

										<div className="space-y-4">
											{pkg.classes.map((classe) => (
												<div
													key={classe.id}
													className="bg-white/80 backdrop-blur rounded-xl border border-orange-100 p-4 shadow-sm hover:shadow-md transition-all"
												>
													<div className="flex justify-between items-center mb-2">
														<h3 className="text-lg font-semibold text-orange-700">
															{classe.name}
														</h3>
														<span className="text-orange-600 font-bold">
															{classe.price.toLocaleString()} DH
														</span>
													</div>
													<p className="text-sm text-gray-600 mb-2">
														{classe.description}
													</p>
													<ul className="text-sm text-gray-800 space-y-1">
														{classe.features.map((feature) => (
															<li
																key={classe.id+'/'+ classe.features.indexOf(feature)}
																className="flex items-center gap-2"
															>
																{feature}
															</li>
														))}
													</ul>
												</div>
											))}
										</div>
									</div>

									<button
										className="mt-6 bg-orange-600 hover:bg-orange-700 text-white py-2 px-5 rounded-full font-semibold shadow-md transition-all cursor-pointer"
										onClick={() => handleBookPackage(pkg)}
									>
										Book Package
									</button>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</>
	);
}

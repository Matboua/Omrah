import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

export default function SwiperComponents() {
	const swiperRef = useRef(null);
	return (
		<>
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
					<SwiperSlide>
						<div className="bg-white rounded-sm overflow-hidden">
							<div className="relative">
								<img
									className="w-full h-64 object-cover"
									src="https://images.unsplash.com/photo-1540206395-68808572332f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
									alt="Nature scene"
								/>
								<div className="absolute top-0 right-0 bg-teal-500 text-white px-2 py-1 m-2 rounded-md text-sm font-semibold">
									Featured
								</div>
							</div>
							<div className="p-6">
								<h2 className="text-2xl font-bold mb-2 text-gray-800">
									Discover Nature's Beauty
								</h2>
								<p className="text-gray-600 mb-4">
									Immerse yourself in the tranquil landscapes and breathtaking
									vistas of the natural world.
								</p>
								<div className="flex items-center mb-4">
									<Star className="h-5 w-5 text-yellow-500 mr-1" />
									<span className="text-gray-600 ml-1">4.9 (128 reviews)</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-2xl font-bold text-gray-800">$299</span>
									<button className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition duration-300 ease-in-out">
										Book Now
									</button>
								</div>
							</div>
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div className="bg-white rounded-sm overflow-hidden">
							<div className="relative">
								<img
									className="w-full h-64 object-cover"
									src="https://images.unsplash.com/photo-1540206395-68808572332f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
									alt="Nature scene"
								/>
								<div className="absolute top-0 right-0 bg-teal-500 text-white px-2 py-1 m-2 rounded-md text-sm font-semibold">
									Featured
								</div>
							</div>
							<div className="p-6">
								<h2 className="text-2xl font-bold mb-2 text-gray-800">
									Discover Nature's Beauty
								</h2>
								<p className="text-gray-600 mb-4">
									Immerse yourself in the tranquil landscapes and breathtaking
									vistas of the natural world.
								</p>
								<div className="flex items-center mb-4">
									<Star className="h-5 w-5 text-yellow-500 mr-1" />
									<span className="text-gray-600 ml-1">4.9 (128 reviews)</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-2xl font-bold text-gray-800">$299</span>
									<button className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition duration-300 ease-in-out">
										Book Now
									</button>
								</div>
							</div>
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div className="bg-white rounded-sm overflow-hidden">
							<div className="relative">
								<img
									className="w-full h-64 object-cover"
									src="https://images.unsplash.com/photo-1540206395-68808572332f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
									alt="Nature scene"
								/>
								<div className="absolute top-0 right-0 bg-teal-500 text-white px-2 py-1 m-2 rounded-md text-sm font-semibold">
									Featured
								</div>
							</div>
							<div className="p-6">
								<h2 className="text-2xl font-bold mb-2 text-gray-800">
									Discover Nature's Beauty
								</h2>
								<p className="text-gray-600 mb-4">
									Immerse yourself in the tranquil landscapes and breathtaking
									vistas of the natural world.
								</p>
								<div className="flex items-center mb-4">
									<Star className="h-5 w-5 text-yellow-500 mr-1" />
									<span className="text-gray-600 ml-1">4.9 (128 reviews)</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-2xl font-bold text-gray-800">$299</span>
									<button className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition duration-300 ease-in-out">
										Book Now
									</button>
								</div>
							</div>
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div className="bg-white rounded-sm overflow-hidden">
							<div className="relative">
								<img
									className="w-full h-64 object-cover"
									src="https://images.unsplash.com/photo-1540206395-68808572332f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
									alt="Nature scene"
								/>
								<div className="absolute top-0 right-0 bg-teal-500 text-white px-2 py-1 m-2 rounded-md text-sm font-semibold">
									Featured
								</div>
							</div>
							<div className="p-6">
								<h2 className="text-2xl font-bold mb-2 text-gray-800">
									Discover Nature's Beauty
								</h2>
								<p className="text-gray-600 mb-4">
									Immerse yourself in the tranquil landscapes and breathtaking
									vistas of the natural world.
								</p>
								<div className="flex items-center mb-4">
									<Star className="h-5 w-5 text-yellow-500 mr-1" />
									<span className="text-gray-600 ml-1">4.9 (128 reviews)</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-2xl font-bold text-gray-800">$299</span>
									<button className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition duration-300 ease-in-out">
										Book Now
									</button>
								</div>
							</div>
						</div>
					</SwiperSlide>
				</Swiper>
			</div>
		</>
	);
}

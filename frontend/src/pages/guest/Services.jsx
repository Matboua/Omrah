import { Star } from "lucide-react";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Services() {
	return (
		<section className="grid grid-cols-12 bg-white  overflow-x-hidden">
			{/* Header */}
			<div className="col-span-10 col-start-2">
				<Header />
			</div>
			{/* Cards */}
			<section className="col-span-10 col-start-2 grid grid-cols-1 gap-5 py-20">
				<article className="flex flex-wrap md:flex-nowrap shadow-lg mx-auto group cursor-pointer transform duration-500 hover:-translate-y-1 bg-neutral-50">
					<div className="flex justify-center items-center bg-gradient-to-t">
						<img
							className="w-full md:w-52 h-32 md:h-auto object-cover"
							src="https://kaftravels.com/wp-content/uploads/2023/11/al-firdou-umrah-1.jpeg"
							alt=""
						/>
					</div>
					<div className="flex flex-col justify-between w-full">
						<div className="p-5 hidden md:block">
							<h1 className="text-lg font-semibold text-gray-800">
								The Magnificent Bogra
							</h1>
							<p className="text-gray-400 mt-2 leading-relaxed">
								Located in Rajshahi Division, Bogra is one of the oldest and
								most fascinating towns in Bangladesh Located in Rajshahi
								Division, Bogra is one of the oldest and most fascinating towns
								in Bangladesh
							</p>
						</div>
						<div className="bg-orange-100 p-5 w-full">
							<div className="sm:flex sm:justify-between">
								<div>
									<div className="text-lg text-gray-700">
										<span className="text-gray-900 font-bold">196 km</span> from
										Dhaka
									</div>
									<div className="flex items-center mt-1">
										<div className="flex">
											{[...Array(5)].map((_, index) => (
												<Star
													key={index}
													className="w-4 h-4 mx-px text-green-600 fill-green-600"
												/>
											))}
										</div>
										<div className="text-gray-600 ml-2 text-sm md:text-base">
											16 reviews
										</div>
									</div>
								</div>
							</div>
							<div className="mt-3 text-gray-600 text-sm md:text-sm">
								*Places to visit: Mahasthangarh, Vasu Bihar &amp; Momo Inn
							</div>
						</div>
						<button className="py-1 px-3 md:py-3 md:px-6 bg-orange-600 hover:bg-orange-700 font-semibold text-white shadow-md cursor-pointer">
							Book Ticket
						</button>
					</div>
				</article>
				<article className="flex flex-wrap md:flex-nowrap shadow-lg mx-auto group cursor-pointer transform duration-500 hover:-translate-y-1 bg-neutral-50">
					<img
						className="w-full md:w-52 h-32 md:h-auto  object-cover"
						src="https://i.ibb.co/Kr4b0zJ/152013403-10158311889099633-8423107287930246533-o.jpg"
						alt=""
					/>
					<div className="flex flex-col justify-between w-full">
						<div className="p-5 hidden md:block">
							<h1 className="text-lg font-semibold text-gray-800">
								The Magnificent Bogra
							</h1>
							<p className="text-gray-400 mt-2 leading-relaxed">
								Located in Rajshahi Division, Bogra is one of the oldest and
								most fascinating towns in Bangladesh Located in Rajshahi
								Division, Bogra is one of the oldest and most fascinating towns
								in Bangladesh
							</p>
						</div>
						<div className="bg-orange-100 p-5 w-full">
							<div className="sm:flex sm:justify-between">
								<div>
									<div className="text-lg text-gray-700">
										<span className="text-gray-900 font-bold">196 km</span> from
										Dhaka
									</div>
									<div className="flex items-center mt-1">
										<div className="flex">
											{[...Array(5)].map((_, index) => (
												<Star
													key={index}
													className="w-4 h-4 mx-px text-green-600 fill-green-600"
												/>
											))}
										</div>
										<div className="text-gray-600 ml-2 text-sm md:text-base">
											16 reviews
										</div>
									</div>
								</div>
							</div>
							<div className="mt-3 text-gray-600 text-sm md:text-sm">
								*Places to visit: Mahasthangarh, Vasu Bihar &amp; Momo Inn
							</div>
						</div>
						<button className="py-1 px-3 md:py-3 md:px-6 bg-orange-600 hover:bg-orange-700 font-semibold text-white shadow-md cursor-pointer">
							Book Ticket
						</button>
					</div>
				</article>
				<article className="flex flex-wrap md:flex-nowrap shadow-lg mx-auto group cursor-pointer transform duration-500 hover:-translate-y-1 bg-neutral-50">
					<img
						className="w-full md:w-52 h-32 md:h-auto  object-cover"
						src="https://i.ibb.co/Kr4b0zJ/152013403-10158311889099633-8423107287930246533-o.jpg"
						alt=""
					/>
					<div className="flex flex-col justify-between w-full">
						<div className="p-5 hidden md:block">
							<h1 className="text-lg font-semibold text-gray-800">
								The Magnificent Bogra
							</h1>
							<p className="text-gray-400 mt-2 leading-relaxed">
								Located in Rajshahi Division, Bogra is one of the oldest and
								most fascinating towns in Bangladesh Located in Rajshahi
								Division, Bogra is one of the oldest and most fascinating towns
								in Bangladesh
							</p>
						</div>
						<div className="bg-orange-100 p-5 w-full">
							<div className="sm:flex sm:justify-between">
								<div>
									<div className="text-lg text-gray-700">
										<span className="text-gray-900 font-bold">196 km</span> from
										Dhaka
									</div>
									<div className="flex items-center mt-1">
										<div className="flex">
											{[...Array(5)].map((_, index) => (
												<Star
													key={index}
													className="w-4 h-4 mx-px text-green-600 fill-green-600"
												/>
											))}
										</div>
										<div className="text-gray-600 ml-2 text-sm md:text-base">
											16 reviews
										</div>
									</div>
								</div>
							</div>
							<div className="mt-3 text-gray-600 text-sm md:text-sm">
								*Places to visit: Mahasthangarh, Vasu Bihar &amp; Momo Inn
							</div>
						</div>
						<button className="py-1 px-3 md:py-3 md:px-6 bg-orange-600 hover:bg-orange-700 font-semibold text-white shadow-md cursor-pointer">
							Book Ticket
						</button>
					</div>
				</article>
				<article className="flex flex-wrap md:flex-nowrap shadow-lg mx-auto group cursor-pointer transform duration-500 hover:-translate-y-1 bg-neutral-50">
					<img
						className="w-full md:w-52 h-32 md:h-auto  object-cover"
						src="https://i.ibb.co/Kr4b0zJ/152013403-10158311889099633-8423107287930246533-o.jpg"
						alt=""
					/>
					<div className="flex flex-col justify-between w-full">
						<div className="p-5 hidden md:block">
							<h1 className="text-lg font-semibold text-gray-800">
								The Magnificent Bogra
							</h1>
							<p className="text-gray-400 mt-2 leading-relaxed">
								Located in Rajshahi Division, Bogra is one of the oldest and
								most fascinating towns in Bangladesh Located in Rajshahi
								Division, Bogra is one of the oldest and most fascinating towns
								in Bangladesh
							</p>
						</div>
						<div className="bg-orange-100 p-5 w-full">
							<div className="sm:flex sm:justify-between">
								<div>
									<div className="text-lg text-gray-700">
										<span className="text-gray-900 font-bold">196 km</span> from
										Dhaka
									</div>
									<div className="flex items-center mt-1">
										<div className="flex">
											{[...Array(5)].map((_, index) => (
												<Star
													key={index}
													className="w-4 h-4 mx-px text-green-600 fill-green-600"
												/>
											))}
										</div>
										<div className="text-gray-600 ml-2 text-sm md:text-base">
											16 reviews
										</div>
									</div>
								</div>
							</div>
							<div className="mt-3 text-gray-600 text-sm md:text-sm">
								*Places to visit: Mahasthangarh, Vasu Bihar &amp; Momo Inn
							</div>
						</div>
						<button className="py-1 px-3 md:py-3 md:px-6 bg-orange-600 hover:bg-orange-700 font-semibold text-white shadow-md cursor-pointer">
							Book Ticket
						</button>
					</div>
				</article>
				<article className="flex flex-wrap md:flex-nowrap shadow-lg mx-auto group cursor-pointer transform duration-500 hover:-translate-y-1 bg-neutral-50">
					<img
						className="w-full md:w-52 h-32 md:h-auto  object-cover"
						src="https://i.ibb.co/Kr4b0zJ/152013403-10158311889099633-8423107287930246533-o.jpg"
						alt=""
					/>
					<div className="flex flex-col justify-between w-full">
						<div className="p-5 hidden md:block">
							<h1 className="text-lg font-semibold text-gray-800">
								The Magnificent Bogra
							</h1>
							<p className="text-gray-400 mt-2 leading-relaxed">
								Located in Rajshahi Division, Bogra is one of the oldest and
								most fascinating towns in Bangladesh Located in Rajshahi
								Division, Bogra is one of the oldest and most fascinating towns
								in Bangladesh
							</p>
						</div>
						<div className="bg-orange-100 p-5 w-full">
							<div className="sm:flex sm:justify-between">
								<div>
									<div className="text-lg text-gray-700">
										<span className="text-gray-900 font-bold">196 km</span> from
										Dhaka
									</div>
									<div className="flex items-center mt-1">
										<div className="flex">
											{[...Array(5)].map((_, index) => (
												<Star
													key={index}
													className="w-4 h-4 mx-px text-green-600 fill-green-600"
												/>
											))}
										</div>
										<div className="text-gray-600 ml-2 text-sm md:text-base">
											16 reviews
										</div>
									</div>
								</div>
							</div>
							<div className="mt-3 text-gray-600 text-sm md:text-sm">
								*Places to visit: Mahasthangarh, Vasu Bihar &amp; Momo Inn
							</div>
						</div>
						<button className="py-1 px-3 md:py-3 md:px-6 bg-orange-600 hover:bg-orange-700 font-semibold text-white shadow-md cursor-pointer">
							Book Ticket
						</button>
					</div>
				</article>
				<article className="flex flex-wrap md:flex-nowrap shadow-lg mx-auto group cursor-pointer transform duration-500 hover:-translate-y-1 bg-neutral-50">
					<img
						className="w-full md:w-52 h-32 md:h-auto  object-cover"
						src="https://i.ibb.co/Kr4b0zJ/152013403-10158311889099633-8423107287930246533-o.jpg"
						alt=""
					/>
					<div className="flex flex-col justify-between w-full">
						<div className="p-5 hidden md:block">
							<h1 className="text-lg font-semibold text-gray-800">
								The Magnificent Bogra
							</h1>
							<p className="text-gray-400 mt-2 leading-relaxed">
								Located in Rajshahi Division, Bogra is one of the oldest and
								most fascinating towns in Bangladesh Located in Rajshahi
								Division, Bogra is one of the oldest and most fascinating towns
								in Bangladesh
							</p>
						</div>
						<div className="bg-orange-100 p-5 w-full">
							<div className="sm:flex sm:justify-between">
								<div>
									<div className="text-lg text-gray-700">
										<span className="text-gray-900 font-bold">196 km</span> from
										Dhaka
									</div>
									<div className="flex items-center mt-1">
										<div className="flex">
											{[...Array(5)].map((_, index) => (
												<Star
													key={index}
													className="w-4 h-4 mx-px text-green-600 fill-green-600"
												/>
											))}
										</div>
										<div className="text-gray-600 ml-2 text-sm md:text-base">
											16 reviews
										</div>
									</div>
								</div>
							</div>
							<div className="mt-3 text-gray-600 text-sm md:text-sm">
								*Places to visit: Mahasthangarh, Vasu Bihar &amp; Momo Inn
							</div>
						</div>
						<button className="py-1 px-3 md:py-3 md:px-6 bg-orange-600 hover:bg-orange-700 font-semibold text-white shadow-md cursor-pointer">
							Book Ticket
						</button>
					</div>
				</article>
			</section>
			{/* Footer */}
			<div className="col-span-12 col-start-1 flex justify-center bg-gray-50">
				<Footer />
			</div>
		</section>
	);
}

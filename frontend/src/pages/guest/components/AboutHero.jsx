import contactMakkah from "../../../assets/images/contact-makkah.jpg";
export default function AboutHero() {
	return (
		<section className="w-full rounded-2xl">
			<h1 className="text-center font-medium text-3xl my-3 mb-7 p-10">
				About Us
			</h1>
			<div className="container flex gap-4 flex-col justify-center px-6 pb-8 pt-0 mx-auto lg:flex-row">
				<div className="relative flex items-center justify-center py-6 mt-8 lg:mt-0 w-5/10">
					<span className="absolute -left-10 rounded-2xl w-5/10 h-full bg-orange-400"></span>
					<img
						src={contactMakkah}
						alt="Makkah View"
						className="z-10 rounded-xl object-contain h-64 sm:h-72 lg:h-80 xl:h-96"
					/>
				</div>
				<div className="flex flex-col gap-4 justify-center py-6 text-center rounded-sm lg:text-left w-5/10">
					<div>
						<p className="text-blue-600 font-medium">ABOUT OUR AGENCY</p>
						<h2 className="font-medium text-2xl">
							Omrah Agency - Your Trusted Guide to Sacred Journey!
						</h2>
					</div>
					<p>
						At Omrah Agency, we are dedicated to providing exceptional Omrah
						services tailored to meet your spiritual aspirations. Based in the
						heart of Agadir, we facilitate seamless journeys to the holy cities
						of Makkah and Madinah. Whether you're embarking on your first Omrah
						or are a regular visitor to the holy sites, we ensure a deeply
						meaningful and comfortable experience.
					</p>
					<p>
						Our agency stands out with our comprehensive service offerings,
						ensuring every aspect of your sacred journey is carefully planned
						and executed. From visa processing and flight bookings to premium
						accommodations near the Haram and expert spiritual guidance, we
						handle all details with utmost care and attention. With competitive
						packages and a commitment to excellence, we make your spiritual
						journey accessible, comfortable, and profoundly rewarding. Trust
						Omrah Agency to be your dedicated partner in this blessed journey.
					</p>
				</div>
			</div>
		</section>
	);
}

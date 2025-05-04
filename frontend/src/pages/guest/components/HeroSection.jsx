import Makkah from "../../../components/Makkah";
export default function HeroSection() {
	return (
		<section className="relative col-span-10 col-start-2 flex justify-between items-center min-h-[calc(100vh-64px)]">
			{/* Left */}
			<div className="flex flex-col justify-center text-center rounded-sm lg:text-left -mt-20">
				<h1 className="flex flex-col gap-5 text-4xl font-bold leading-none sm:text-5xl">
					<span>Omrah Services Company</span>
					<span className="text-orange-600 block">Omrah Agency</span>
					<span>To Makkah</span>
				</h1>
				<p className="mt-6 mb-8 text-base sm:mb-12">
					<span>A Moroccan agency helping you perform Omrah with ease</span>
					<br className="hidden md:inline lg:hidden" />
					<span> — from Morocco to the holy city of Makkah.</span>
				</p>

				<div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
					<a
						to="/cars"
						rel="noopener noreferrer"
						href="#"
						className="px-6 py-2 text-base font-semibold rounded bg-orange-600 text-gray-50"
					>
						Book Your Omrah
					</a>
					<a
						to="/about"
						rel="noopener noreferrer"
						href="#"
						className="px-6 py-2 text-base font-semibold border rounded dark:border-gray-800"
					>
						About
					</a>
				</div>
			</div>
			{/* Right */}
			<div className="-mt-10">
				<Makkah />
			</div>
		</section>
	);
}

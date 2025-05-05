import Makkah from "../../../components/Makkah";
export default function HeroSection() {
	return (
		<section className="relative col-span-10 col-start-2 flex flex-col-reverse gap-30 md:gap-0 md:flex-row justify-center md:justify-between items-center min-h-[calc(100dvh-64px)] py-5">
			{/* Left */}
			<div className="flex flex-col justify-center rounded-sm -mt-20">
				<h1 className="flex flex-col gap-5 font-bold leading-none text-2xl xl:text-5xl">
					<span>Omrah Services Company</span>
					<span className="text-orange-600 block">Omrah Agency</span>
					<span>To Makkah</span>
				</h1>
				<p className="mt-6 mb-8 text-base sm:mb-12">
					A Moroccan agency helping you perform Omrah with ease{" "}
					<br className="hidden lg:block" /> — from Morocco to the holy city of
					Makkah.
				</p>

				<div className="flex gap-3">
					<a
						href="#"
						className="px-6 py-2 text-base font-semibold rounded bg-orange-600 text-gray-50"
					>
						Book Your Omrah
					</a>
					<a
						href="#"
						className="px-6 py-2 text-base font-semibold border rounded dark:border-gray-800"
					>
						About
					</a>
				</div>
			</div>
			{/* Right */}
			<Makkah />
		</section>
	);
}

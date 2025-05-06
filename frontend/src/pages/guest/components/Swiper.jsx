import SwiperComponents from "./SwiperComponents";

export default function Swiper() {
	return (
		<section
			id="témoignage"
			className="w-full flex justify-center px-5 xl:px-0 py-28 text-[14px] lg:text-[16px]"
		>
			<div className="flex flex-col justify-between gap-15 w-full lg:w-11/12 xl:w-10/12 max-w-[1260px]">
				{/* Top Column */}
				<div className="flex flex-col gap-4">
					<h2 className="text-3xl md:text-4xl xl:text-5xl font-bold">
						The Most <span className="text-orange-600">Popular </span>
						Packages
					</h2>
					<p className="">
						Ils ont amélioré leurs résultats grâce à Skoolution
					</p>
				</div>
				{/* Bottom Column */}
				<div>
					<SwiperComponents />
				</div>
			</div>
		</section>
	);
}

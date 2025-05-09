export default function Titles({ title, description }) {
	return (
		<div className="px-5 flex flex-col items-center gap-30">
			<h1 className="relative font-bold text-3xl p-10 pt-0 text-gray-900 -mb-8">
				{title}
				<span
					className="absolute top-[72%] left-[50%] block w-25 h-10 mt-2 mx-auto rounded-4xl border-t-2 border-orange-600"
					style={{ transform: "translateX(-50%)" }}
				></span>
				<span
					className="absolute top-[76%] left-[50%] block w-23 h-10 mt-2 mx-auto rounded-4xl border-t-2 border-orange-600"
					style={{ transform: "translateX(-50%)" }}
				></span>
			</h1>
			<p className="w-full md:w-6/10 text-center -mt-15">{description}</p>
		</div>
	);
}

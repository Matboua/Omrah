import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Card({ icon, title, value }) {
	return (
		<div className="hover:bg-orange-600 hover:text-white bg-neutral-50 border border-gray-300 rounded-2xl flex flex-col items-center justify-center gap-4 py-6 px-10 group transition-all duration-300">
			<FontAwesomeIcon
				icon={icon}
				size="xl"
				className=" bg-orange-600 group-hover:bg-white  text-white group-hover:text-orange-600  p-5 rounded-full w-fit"
			/>
			<h3 className="font-medium text-xl">{title}</h3>
			<p>{value}</p>
		</div>
	);
}

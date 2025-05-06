import { faCircleChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Faq({ title, description }) {
	return (
		<div className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
			<input type="checkbox" id={title} className="peer hidden" />
			<label
				htmlFor={title}
				className="flex items-center justify-between p-4 bg-white cursor-pointer hover:bg-orange-100  transition-colors peer-checked:bg-orange-100"
			>
				<span className="text-md font-semibold">{title}</span>
				<FontAwesomeIcon
					icon={faCircleChevronDown}
					size="lg"
					className="text-orange-600"
				/>
			</label>
			<div className="max-h-0 overflow-hidden transition-all duration-300 peer-checked:max-h-screen ">
				<p className="p-4 leading-relaxed">{description}</p>
			</div>
		</div>
	);
}

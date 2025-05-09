import { Bell, Pencil, Search } from "lucide-react";
import profile from "../../../assets/images/profile.webp";
import { Link } from "react-router-dom";
export default function Header() {
	return (
		<section>
			<div className="w-full flex flex-row-reverse gap-4 items-center">
				<Link to={`/settings`} className="w-9 flex justify-end">
					<img
						src={profile}
						alt="Profile"
						className="w-9 h-9 border-2 border-neutral-400 rounded-full"
					/>
				</Link>
				<div className="flex justify-end">
					<button className="text-neutral-400 flex items-center justify-center gap-1 w-9 rounded-full cursor-pointer">
						<span>|</span>
						<Bell size={18} />
					</button>
				</div>
			</div>
		</section>
	);
}

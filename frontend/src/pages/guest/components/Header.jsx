import { AlignJustify } from "lucide-react";
// import { Link } from "react-router-dom";

export default function Header() {
	return (
		<header className="sticky col-span-10 col-start-2 h-16 flex justify-between items-center">
			{/* Logo */}
			<div className="flex items-center text-4xl font-[500] text-orange-600">
				<img
					src="/src/assets/images/letter-o.png"
					alt="Omrah Logo"
					className="w-10"
				/>
				<p>mrah</p>
			</div>
			{/* Links */}
			<div className="absolute left-1/2 -translate-x-1/2 flex gap-15 font-semibold">
				<a href="/home">Home</a>
				<a href="/services">Services</a>
				<a href="/about">About</a>
				<a href="/contact">Contact</a>
			</div>
			{/* Menu */}
			<div>
				<AlignJustify size={30} strokeWidth={2} className="cursor-pointer" />
			</div>
		</header>
	);
}

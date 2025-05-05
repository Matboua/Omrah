import { AlignJustify } from "lucide-react";
import { useState } from "react";
import logo from "../../../assets/images/letter-o.png";
// import { Link } from "react-router-dom";

export default function Header() {
	const [openMenu, setOpenMenu] = useState(false);
	return (
		<header className="sticky col-span-10 col-start-2 h-16 flex justify-between items-center">
			{/* Logo */}
			<div className="flex items-center">
				<img src={logo} alt="Omrah Logo" className="w-10" />
				<p className="font-bold text-4xl text-orange-600">mrah</p>
			</div>
			{/* Links */}
			<div className="hidden md:flex gap-15 font-semibold">
				<a href="/home">Home</a>
				<a href="/services">Services</a>
				<a href="/about">About</a>
				<a href="/contact">Contact</a>
			</div>
			{/* Login + Register */}
			<div className="hidden lg:flex gap-3">
				<a
					href="login"
					className="px-6 py-2 text-base font-semibold border rounded bg-white text-orange-600"
				>
					Register
				</a>
				<a
					href="login"
					className="px-6 py-2 text-base font-semibold border rounded bg-orange-600 text-white"
				>
					Login
				</a>
			</div>
			{/* Menu */}
			<div className="relative inline-block lg:hidden">
				<AlignJustify
					size={30}
					strokeWidth={2}
					className="cursor-pointer"
					onClick={() => {
						setOpenMenu(!openMenu);
					}}
				/>
				<div
					className={`absolute top-9 flex gap-3 bg-red-500 w-screen h-[calc(100dvh-64px)] ${
						openMenu ? "translate-x-0" : "translate-x-96"
					}`}
				>
					<a
						href="login"
						className="px-6 py-2 text-base font-semibold border rounded bg-white text-orange-600 h-fit"
					>
						Register
					</a>
					<a
						href="login"
						className="px-6 py-2 text-base font-semibold border rounded bg-orange-600 text-white h-fit"
					>
						Login
					</a>
				</div>
			</div>
		</header>
	);
}

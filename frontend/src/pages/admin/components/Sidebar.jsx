import logo from "../../../assets/images/letter-o.webp";
import { useRef, useState } from "react";
import useClickOutside from "../../../hooks/useClickOutside";
import { Home, LogOut, Package, User } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Sidebar() {
	// Close and Open The Sidebar On Focus Change
	const [opensidebar, setOpensidebar] = useState();
	const sidebarRef = useRef(null);
	useClickOutside(sidebarRef, () => setOpensidebar(false));
	// Change color of current Link
	const pathname = useLocation().pathname;
	const links = [
		{
			href: "/dashboard",
			label: "Dashboard",
			logo: <Home size={20} />,
		},
		{
			href: "/clients",
			label: "Clients",
			logo: <User size={20} />,
		},
		{
			href: "/packages",
			label: "Packages",
			logo: <Package size={20} />,
		},
	];
	return (
		<div className="absolute md:relative z-50">
			<aside
				className={`bg-white h-dvh px-2 md:px-5 py-6 flex flex-col justify-between gap-5 shadow-sm md:shadow-[14px_4px_42px_-8px_#e3e3e3] ${
					opensidebar ? " w-[280px]" : " w-[60px] md:w-[80px]"
				}  transition-all duration-300`}
				ref={sidebarRef}
				onClick={() => setOpensidebar(true)}
			>
				{/* Logo + Links */}
				<div className="flex flex-col gap-5">
					{/* Logo */}
					<div
						className={`flex ${
							opensidebar ? "justify-start" : "justify-center"
						} items-center`}
					>
						<div className="text-xl sm:text-2xl flex items-center gap-1 tracking-wide font-semibold">
							<span
								className={`${
									opensidebar
										? "w-auto text-xl sm:text-2xl h-[40px]"
										: "w-9 text-sm h-[30px]"
								} flex justify-center items-center  text-white`}
							>
								<a href="/" className="flex items-center">
									<img src={logo} alt="Omrah Logo" className="w-6" />
								</a>
							</span>
							<span
								className={`${
									opensidebar ? "scale-100 w-auto" : "scale-0 w-0"
								} text-orange-600 transition-all duration-200`}
							>
								mrah
							</span>
						</div>
					</div>
					{/* Links */}
					<div className="flex items-center flex-col gap-3.5">
						{links.map((link) => (
							<Link
								key={link.href}
								to={link.href}
								className={`relative flex hover:bg-blue-50 p-2 rounded-md w-full text-neutral-500 
									${opensidebar ? "justify-start gap-3.5" : "justify-center gap-0"} 
									${
										pathname.startsWith(link.href)
											? "bg-blue-50 text-orange-600"
											: "bg-white text-neutral-500"
									}
									`}
							>
								{link.logo}
								<span
									className={`${
										opensidebar ? "scale-100 w-full" : "scale-0 w-0"
									} text-nowrap transition-all duration-200`}
								>
									{link.label}
								</span>
							</Link>
						))}
					</div>
				</div>
				{/* Logout */}
				<Link
					href="/login"
					className={`flex ${
						opensidebar ? "justify-start" : "justify-center"
					} gap-3.5 hover:bg-blue-50 text-neutral-500 p-2 rounded-md w-fit md:w-full`}
				>
					<LogOut size={20} className="text-neutral-500" />
					<span className={`${opensidebar ? "inline-block" : "hidden"}`}>
						Logout
					</span>
				</Link>
			</aside>
		</div>
	);
}

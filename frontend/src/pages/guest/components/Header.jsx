import { AlignJustify } from "lucide-react";
import { useState } from "react";
import logo from "../../../assets/images/letter-o.webp";
// import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../../store/slices/authSlice";

export default function Header() {
	const [openMenu, setOpenMenu] = useState(false);
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const dispatch = useDispatch();
  	const navigate = useNavigate();

	  
		const handleLogout = async () => {
		  try {
			await dispatch(logoutUser()).unwrap();
			navigate('/login'); // or wherever you want to send the user after logout
		  } catch (error) {
			console.error(error);
		  }
		};

	return (
		<header className="sticky h-16 flex justify-between items-center z-50 bg-white">
			{/* Logo */}
			<a href="/" className="flex items-center">
				<img src={logo} alt="Omrah Logo" className="w-10" />
				<p className="font-bold text-4xl text-orange-600">mrah</p>
			</a>
			{/* Links */}
			<div className="hidden md:flex gap-15 font-semibold">
				<a href="/" className="text-orange-600">
					Home
				</a>
				<a href="/services">Services</a>
				<a href="/about">About</a>
				<a href="/contact">Contact</a>
			</div>
			{/* Login + Register */}
			{isAuthenticated ? (
				<button
					className="px-6 py-2 text-base font-semibold border rounded bg-white text-orange-600 h-fit"
					onClick={handleLogout}
				>
					Logout
				</button>
			) : (
				<div className="hidden lg:flex gap-3">
					<a
						href="/register"
						className="px-6 py-2 text-base font-semibold border rounded bg-white text-orange-600"
					>
						Register
					</a>
					<a
						href="/login"
						className="px-6 py-2 text-base font-semibold border rounded bg-orange-600 text-white"
					>
						Login
					</a>
				</div>
			)}
			{/* Menu */}
			<div className="inline-block lg:hidden">
				<AlignJustify
					size={30}
					strokeWidth={2}
					className="cursor-pointer"
					onClick={() => {
						setOpenMenu(!openMenu);
					}}
				/>
				<div
					className={`absolute top-[100%] -left-[10%] flex flex-col items-center py-5 gap-10 bg-white w-screen h-[calc(100dvh-64px)] transition-all duration-300 ${
						openMenu ? "translate-x-0" : "translate-x-[112%]"
					}`}
				>
					{/* Links */}
					<div className="flex flex-col items-center gap-10">
						<a href="/" className="text-orange-600">
							Home
						</a>
						<a href="/services">Services & Offers</a>
						<a href="/articles">Articles</a>
						<a href="/about">About</a>
						<a href="/contact">Contact</a>
					</div>
					{/* Login + Register */}
					{isAuthenticated ? (
						<button
							className="px-6 py-2 text-base font-semibold border rounded bg-white text-orange-600 h-fit"
							onClick={handleLogout}
						>
							Logout
						</button>
					) : (
						<div className="flex gap-3">
							<a
								href="/register"
								className="px-6 py-2 text-base font-semibold border rounded bg-white text-orange-600 h-fit"
							>
								Register
							</a>
							<a
								href="/login"
								className="px-6 py-2 text-base font-semibold border rounded bg-orange-600 text-white h-fit"
							>
								Login
							</a>
						</div>
					)}
				</div>
			</div>
		</header>
	);
}

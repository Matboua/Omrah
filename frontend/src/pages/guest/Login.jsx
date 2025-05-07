import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faFacebook,
	faGoogle,
	faTiktok,
} from "@fortawesome/free-brands-svg-icons";

import makkah from "../../assets/images/makkah.webp";
import makkahh from "../../assets/images/makkah-2.webp";
import logo from "../../assets/images/letter-o.webp";
import { useState } from "react";
import axios from "../../config/axios";
import { useNavigate } from "react-router-dom";
export default function Login() {
	// Stock Data
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const navigate = useNavigate();
	// Send Data
	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			await axios.get("/sanctum/csrf-cookie");
			const response = await axios.post("/api/login", {
				email,
				password,
			});
			console.log(response.data.message);
			navigate("/");
		} catch (error) {
			console.error(error.response?.data?.message || "Login failed");
		}
	};
	return (
		<section className="grid grid-cols-12 min-h-screen">
			{/* Left Section */}
			<div
				style={{ backgroundImage: `url(${makkah})` }}
				className={`relative bg-cover col-span-12 md:col-span-5 flex flex-col md:flex-row justify-center items-center text-neutral-100 min-h-[250px]`}
			>
				<div className="absolute w-full h-full bg-black/40"></div>
				<div className="w-fit flex flex-col gap-5 z-10">
					<p>Welcome to</p>
					{/* Logo */}
					<a href="/" className="flex items-center gap-1 w-fit">
						<img src={logo} alt="Omrah Logo" className="w-10" />
						<p className="font-bold text-4xl text-orange-600">mrah</p>
					</a>
					<p>The number 1 Omrah platform in Morocco.</p>
				</div>
			</div>
			{/* Right Section */}
			<div className="relative col-span-12 md:col-span-7 flex flex-col justify-center gap-8 px-5 py-10  sm:px-10 lg:px-25 xl:px-40 overflow-hidden h-dvh">
				{/* bg */}
				<img
					src={makkahh}
					className="absolute top-1/4 right-0 w-full opacity-20"
					alt="makkah image"
				></img>
				<div className="z-10 flex flex-col justify-center gap-8">
					{/* Title */}
					<div>
						<h1 className="text-5xl font-semibold mb-2">Log In</h1>
						<p className="text-neutral-600">Please enter your credentials!</p>
					</div>
					{/* Check + Fields */}
					<form
						className="flex flex-col gap-4 text-neutral-600"
						onSubmit={(e) => {
							handleLogin(e);
						}}
					>
						<div className="flex flex-col gap-1">
							<label className="px-5">Email</label>
							<input
								type="text"
								className="border border-neutral-400 outline-0 py-2.5 pl-5"
								placeholder="Write Your Email..."
								value={email}
								onChange={(e) => {
									setEmail(e.target.value);
								}}
							/>
						</div>
						<div className="flex flex-col gap-1">
							<label className="px-5">Password</label>
							<input
								type="password"
								className="border border-neutral-400 outline-0 py-2.5 pl-5"
								placeholder="*************"
								value={password}
								onChange={(e) => {
									setPassword(e.target.value);
								}}
							/>
						</div>
						<input
							type="submit"
							value="Login"
							className="bg-orange-600 py-3 font-semibold text-white my-5 cursor-pointer rounded-sm"
						/>
					</form>
					{/* Under The Form */}
					<div className="flex flex-col gap-8">
						{/* Ou */}
						<div className="relative flex ">
							<div className="absolute left-0 top-1/2 w-5/12 h-[1px] bg-neutral-400"></div>
							<p className="text-skblack/60 text-center w-full">Ou</p>
							<div className="absolute right-0 top-1/2 w-5/12 h-[1px] bg-neutral-400"></div>
						</div>
						{/* Brand Icons */}
						<div className="flex justify-center gap-3 md:gap-10">
							<div className="border border-neutral-400 py-3 px-10 w-fit cursor-pointer rounded-md group">
								<FontAwesomeIcon
									icon={faGoogle}
									className=" w-5 text-neutral-600 group-hover:text-red-600"
								/>
							</div>
							<div className="border border-neutral-400 py-3 px-10 w-fit cursor-pointer rounded-md group">
								<FontAwesomeIcon
									icon={faFacebook}
									className=" w-5.5 text-neutral-600 group-hover:text-blue-700"
								/>
							</div>
							<div className="border border-neutral-400 py-3 px-10 w-fit cursor-pointer rounded-md group">
								<FontAwesomeIcon
									icon={faTiktok}
									className=" w-5 text-neutral-600 group-hover:text-black"
								/>
							</div>
						</div>
						<p className="text-center text-sm text-neutral-600">
							Don't have an account?{" "}
							<a href="/register" className="text-orange-600">
								Register now
							</a>
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}

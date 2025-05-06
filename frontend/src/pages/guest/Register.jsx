import makkah from "../../assets/images/makkah.jpg";
import makkahh from "../../assets/images/makkah-2.jpg";
import logo from "../../assets/images/letter-o.png";
export default function Register() {
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
			<div className="relative col-span-12 md:col-span-7 flex flex-col justify-center gap-8 px-5 py-10  sm:px-10 lg:px-25 xl:px-40 overflow-auto md:overflow-hidden h-auto md:h-dvh">
				{/* bg */}
				<img
					src={makkahh}
					className="absolute top-1/4 right-0 w-full opacity-20"
					alt="makkah image"
				></img>
				<div className="z-10 flex flex-col justify-center gap-8">
					{/* Title */}
					<div>
						<h1 className="text-5xl font-semibold mb-2">Register</h1>
						<p className="text-neutral-600">Please enter your informations!</p>
					</div>
					{/* Check + Fields */}
					<form className="grid grid-cols-1 gap-4 text-neutral-600">
						{/* First Name */}
						<div className="flex flex-col gap-1">
							<label className="px-5">First Name</label>
							<input
								type="text"
								name="first_name"
								className="border border-neutral-400 outline-0 py-2.5 pl-5"
								placeholder="Write Your First Name..."
							/>
						</div>
						{/* Last Name */}
						<div className="flex flex-col gap-1">
							<label className="px-5">Last Name</label>
							<input
								type="text"
								name="last_name"
								className="border border-neutral-400 outline-0 py-2.5 pl-5"
								placeholder="Write Your Last Name..."
							/>
						</div>
						{/* CIN */}
						<div className="flex flex-col gap-1">
							<label className="px-5">CIN</label>
							<input
								type="text"
								name="cin"
								className="border border-neutral-400 outline-0 py-2.5 pl-5"
								placeholder="Write Your CIN..."
							/>
						</div>
						{/* City */}
						<div className="flex flex-col gap-1">
							<label className="px-5">City</label>
							<input
								type="text"
								name="city"
								className="border border-neutral-400 outline-0 py-2.5 pl-5"
								placeholder="Write Your City..."
							/>
						</div>
						{/* Email */}
						<div className="flex flex-col gap-1">
							<label className="px-5">Email</label>
							<input
								type="text"
								name="email"
								className="border border-neutral-400 outline-0 py-2.5 pl-5"
								placeholder="Write Your Email..."
							/>
						</div>
						{/* Phone */}
						<div className="flex flex-col gap-1">
							<label className="px-5">Phone</label>
							<input
								type="text"
								name="phone"
								className="border border-neutral-400 outline-0 py-2.5 pl-5"
								placeholder="Write Your Phone..."
							/>
						</div>
						{/* Password */}
						<div className="flex flex-col gap-1">
							<label className="px-5">Password</label>
							<input
								type="password"
								name="password"
								className="border border-neutral-400 outline-0 py-2.5 pl-5"
								placeholder="*************"
							/>
						</div>
						{/* Confirmed Password */}
						<div className="flex flex-col gap-1">
							<label className="px-5">Confirme Password</label>
							<input
								type="password"
								name="confirmed_password"
								className="border border-neutral-400 outline-0 py-2.5 pl-5"
								placeholder="*************"
							/>
						</div>
						<input
							type="submit"
							value="Register"
							className="bg-orange-600 col-span-1 md:col-span-2 py-3 font-semibold text-white my-5 cursor-pointer rounded-sm"
						/>
					</form>
					{/* Under The Form */}
					<p className="text-center text-sm text-neutral-600">
						Already have an account?{" "}
						<a href="/register" className="text-orange-600">
							Login now
						</a>
					</p>
				</div>
			</div>
		</section>
	);
}

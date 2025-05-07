// import { Link } from "react-router-dom";

import {
	faFacebook,
	faGithub,
	faInstagram,
	faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import {
	faEnvelope,
	faPaperPlane,
	faX,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../../assets/images/letter-o.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function Footer() {
	return (
		<footer className="flex flex-col items-center">
			<div className="py-5 relative flex flex-col justify-center items-center gap-10 md:gap-15 w-10/12">
				<div className="-mx-4 flex text-center sm:text-start flex-wrap justify-between">
					{/* First */}
					<div className="flex flex-col gap-6 px-4 my-5 w-full xl:w-1/4">
						<a href="/" className="flex items-center">
							<img src={logo} alt="Omrah Logo" className="w-10" />
							<p className="font-bold text-4xl text-orange-600">mrah</p>
						</a>
						<p className="text-start">
							At Omrah Agency, we take pride in offering exceptional Omrah
							services designed to meet your spiritual and travel needs. Based
							in the heart of Agadir.
						</p>
					</div>
					{/* Second */}
					<div className="px-4 my-4 w-full sm:w-auto">
						<div>
							<h2 className="inline-block text-2xl pb-4 mb-4 border-b-4 border-orange-600">
								Our Pages
							</h2>
						</div>
						<ul className="leading-8">
							<li>
								<Link to="/" className="hover:text-orange-400">
									Home Page
								</Link>
							</li>
							<li>
								<Link to="/services" className="hover:text-orange-400">
									Services & Offers
								</Link>
							</li>
							<li>
								<Link to="/articles" className="hover:text-orange-400">
									Articles Page
								</Link>
							</li>
							<li>
								<Link to="/admin-login" className="hover:text-orange-400">
									Admin Login
								</Link>
							</li>
						</ul>
					</div>
					{/* Third */}
					<div className="px-4 my-4 w-full sm:w-auto">
						<div>
							<h2 className="inline-block text-2xl pb-4 mb-4 border-b-4 border-orange-600">
								Privacy Pages
							</h2>
						</div>
						<ul className="leading-8">
							<li>
								<Link to="/privacy-policy" className="hover:text-orange-400">
									Privacy Policy
								</Link>
							</li>
							<li>
								<Link
									to="/terms-and-conditions"
									className="hover:text-orange-400"
								>
									Terms &amp; Conditions
								</Link>
							</li>
							<li>
								<Link to="/about-us" className="hover:text-orange-400">
									About Us
								</Link>
							</li>
							<li>
								<Link to="/contact-us" className="hover:text-orange-400">
									Contact Us
								</Link>
							</li>
						</ul>
					</div>
					{/* Fourth */}
					<div className="px-4 flex flex-col gap-5 my-4 w-full sm:w-auto xl:w-1/4">
						{/* Title */}
						<div>
							<h2 className="inline-block text-2xl pb-4 border-b-4 border-orange-600">
								Stay Connected
							</h2>
						</div>
						{/* Social Media */}
						<div className="flex justify-center sm:justify-start gap-3">
							<a
								href="https://www.linkedin.com/in/matboua/"
								target="_blank"
								className="inline-flex items-center justify-center h-8 w-8 border dark:border-gray-100 rounded-full mr-1 hover:text-orange-400 hover:border-orange-400"
							>
								<FontAwesomeIcon icon={faFacebook} />
							</a>
							<a
								href="https://www.linkedin.com/in/matboua/"
								target="_blank"
								className="inline-flex items-center justify-center h-8 w-8 border dark:border-gray-100 rounded-full mr-1 hover:text-orange-400 hover:border-orange-400"
							>
								<FontAwesomeIcon icon={faX} />
							</a>
							<a
								href="https://www.linkedin.com/in/matboua/"
								target="_blank"
								className="inline-flex items-center justify-center h-8 w-8 border dark:border-gray-100 rounded-full mr-1 hover:text-orange-400 hover:border-orange-400"
							>
								<FontAwesomeIcon icon={faInstagram} />
							</a>
							<a
								href="https://www.linkedin.com/in/matboua/"
								target="_blank"
								className="inline-flex items-center justify-center h-8 w-8 border dark:border-gray-100 rounded-full mr-1 hover:text-orange-400 hover:border-orange-400"
							>
								<FontAwesomeIcon icon={faGithub} />
							</a>
							<a
								href="https://www.linkedin.com/in/matboua/"
								target="_blank"
								className="inline-flex items-center justify-center h-8 w-8 border dark:border-gray-100 rounded-full hover:text-orange-400 hover:border-orange-400"
							>
								<FontAwesomeIcon icon={faLinkedin} />
							</a>
						</div>
						{/* Subscribe */}
						<form
							className="relative w-full"
							onSubmit={(e) => {
								e.preventDefault();
							}}
						>
							<div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none ">
								<FontAwesomeIcon
									icon={faEnvelope}
									className="text-orange-600"
								/>
							</div>
							<input
								className="p-3 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border-2 border-gray-303 focus:outline-0 border-orange-600"
								placeholder="Enter your email"
								type="email"
								required=""
							/>
							<button
								type="submit"
								className="absolute right-0 top-[50%] mr-[6px] w-9 h-9 rounded-lg bg-orange-600 text-white cursor-pointer"
								style={{ transform: "translateY(-50%)" }}
							>
								<FontAwesomeIcon icon={faPaperPlane} size="sm" />
							</button>
						</form>
					</div>
				</div>
			</div>
			{/* Footer Footer */}
			<div className="py-3 flex flex-col justify-center items-center gap-10 md:gap-15 w-full bg-orange-600 text-white">
				<div className="w-10/12">
					<div className="-mx-4 flex flex-wrap justify-between">
						<div className="px-4 w-full text-center sm:w-auto sm:text-left">
							{`Copyright © 2024 - ${new Date().getFullYear()} Omrah. All Rights Reserved.`}
						</div>
						<div className="px-4 w-full text-center sm:w-auto sm:text-left">
							Made with 🤍 by{" "}
							<a
								className="font-medium"
								target="_blank"
								href="https://www.linkedin.com/in/othman-el-hyane-633788307/"
							>
								Elhyane
							</a>{" "}
							&{" "}
							<a
								className="font-medium"
								target="_blank"
								href="https://www.linkedin.com/in/matboua/"
							>
								Matboua
							</a>
							.
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}

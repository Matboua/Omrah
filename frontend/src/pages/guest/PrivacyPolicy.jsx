import Header from "./components/Header";
import Footer from "./components/Footer";
export default function PrivacyPolicy() {
	return (
		<section className="grid grid-cols-12 bg-white  overflow-x-hidden">
			<div className="col-span-10 col-start-2">
				<Header />
			</div>
			<div className="col-span-10 col-start-2 flex flex-col gap-5 pb-10">
				<h1 className="text-center font-medium text-3xl mt-3 mb-7 pt-10 text-neutral-900">
					Privacy Policy
				</h1>
				<h2 className="text-md font-semibold text-gray-800">
					Last Updated: 07/05/2025
				</h2>
				<p className="mb-4 text-neutral-700">
					At <span className="text-orange-600">OmrahAgency.com</span>, we value
					your privacy and are committed to protecting any personal information
					you provide. This Privacy Policy explains how we collect, use, and
					safeguard your data when you use our website and services for your
					pilgrimage arrangements.
				</p>

				<h2 className="text-xl font-semibold mb-2 text-neutral-900">
					1. Information We Collect
				</h2>
				<p>We may collect the following types of information:</p>
				<ul className="mb-4 text-neutral-700 list-disc list-inside">
					<li>
						<span className="font-medium">Personal Information: </span>
						Name, email address, phone number, passport details, and payment
						information.
					</li>
					<li>
						<span className="font-medium">Usage Data: </span>
						IP address, browser type, device information, and interactions with
						our website.
					</li>
					<li>
						<span className="font-medium">
							Cookies and Tracking Technologies:{" "}
						</span>
						To enhance your experience and analyze website performance.
					</li>
				</ul>

				<h2 className="text-xl font-semibold mb-2 text-neutral-900">
					2. How We Use Your Information
				</h2>
				<p>We use your information for:</p>
				<ul className="mb-4 text-neutral-700 list-disc list-inside">
					<li>Processing Omrah bookings and transactions.</li>
					<li>Providing customer support and guidance.</li>
					<li>Improving our services and website functionality.</li>
					<li>Ensuring legal compliance and preventing fraud.</li>
				</ul>

				<h2 className="text-xl font-semibold mb-2 text-neutral-900">
					3. Sharing Your Information
				</h2>
				<p>
					We do not sell or rent your personal data. However, we may share it
					with:
				</p>
				<ul className="mb-4 text-neutral-700 list-disc list-inside">
					<li>Payment processors to complete transactions.</li>
					<li>
						Government and religious authorities for visa processing and travel
						compliance.
					</li>
					<li>
						Service providers assisting in delivering your Omrah experience.
					</li>
				</ul>

				<h2 className="text-xl font-semibold mb-2 text-neutral-900">
					4. Data Security
				</h2>
				<p className="b-4 text-neutral-700">
					We apply appropriate security measures to protect your data from
					unauthorized access, alteration, or disclosure.
				</p>

				<h2 className="text-xl font-semibold mb-2 text-neutral-900">
					5. Your Rights
				</h2>
				<p>You have the right to:</p>
				<ul className="mb-4 text-neutral-700 list-disc list-inside">
					<li>Access, update, or delete your personal data.</li>
					<li>Opt out of marketing communications.</li>
					<li>Request data portability where applicable.</li>
				</ul>

				<h2 className="text-xl font-semibold mb-2 text-neutral-900">
					6. Contact Us
				</h2>
				<p className="mb-4 text-neutral-700">
					If you have any questions regarding our Privacy Policy, please contact
					us at{" "}
					<a
						href="mailto:omrahagency@gmail.com"
						className="text-orange-600 cursor-pointer"
					>
						omrahagency@gmail.com
					</a>
					.
				</p>
			</div>

			<div className="col-span-12 col-start-1 flex justify-center bg-gray-50">
				<Footer />
			</div>
		</section>
	);
}

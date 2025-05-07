import Header from "./components/Header";
import Footer from "./components/Footer";
export default function TermsAndConditions() {
	return (
		<section className="grid grid-cols-12 bg-white  overflow-x-hidden">
			<div className="col-span-10 col-start-2">
				<Header />
			</div>
			<div className="col-span-10 col-start-2 flex flex-col gap-5 pb-10">
				<h1 className="text-center font-medium text-3xl mt-3 mb-7 pt-10 text-neutral-900">
					Terms & Conditions
				</h1>
				<h2 className="text-md font-semibold text-gray-800">
					Last Updated: 07/05/2025
				</h2>
				<p className="mb-4 text-neutral-700">
					By using <span className="text-orange-600">OmrahAgency.com</span>, you
					agree to comply with the following Terms & Conditions. Please read
					them carefully before booking our services.
				</p>

				<h2 className="text-xl font-semibold mb-2 text-neutral-900">
					1. Booking & Payments
				</h2>
				<ul className="mb-4 text-neutral-700 list-disc list-inside">
					<li>
						Valid identification and passport information are required to book
						an Omrah package.
					</li>
					<li>
						Full payment must be completed before travel documents are issued.
					</li>
					<li>
						Additional charges may apply for modifications or special requests.
					</li>
				</ul>

				<h2 className="text-xl font-semibold mb-2 text-neutral-900">
					2. Cancellations & Refunds
				</h2>
				<ul className="mb-4 text-neutral-700 list-disc list-inside">
					<li>
						Cancellations made 7 days prior to departure may be eligible for a
						refund, minus processing fees.
					</li>
					<li>
						Late cancellations may be non-refundable depending on airline and
						hotel policies.
					</li>
				</ul>

				<h2 className="text-xl font-semibold mb-2 text-neutral-900">
					3. User Responsibilities
				</h2>
				<ul className="mb-4 text-neutral-700 list-disc list-inside">
					<li>
						Clients are responsible for ensuring all travel documents are
						accurate and up to date.
					</li>
					<li>
						Any changes to traveler information must be communicated promptly.
					</li>
					<li>
						Participants are expected to behave respectfully and comply with all
						local laws and regulations during the pilgrimage.
					</li>
				</ul>

				<h2 className="text-xl font-semibold mb-2 text-neutral-900">
					4. Liability
				</h2>
				<ul className="mb-4 text-neutral-700 list-disc list-inside">
					<li>
						OmrahAgency.com is not liable for delays, cancellations, or issues
						caused by third-party providers (airlines, hotels, etc.).
					</li>
					<li>
						We are not responsible for lost personal belongings during the trip.
					</li>
				</ul>

				<h2 className="text-xl font-semibold mb-2 text-neutral-900">
					5. Modifications to Terms
				</h2>
				<ul className="mb-4 text-neutral-700 list-disc list-inside">
					OmrahAgency.com reserves the right to update or modify these terms at
					any time. Users will be notified of any major changes.
				</ul>

				<h2 className="text-xl font-semibold mb-2 text-neutral-900">
					6. Contact Us
				</h2>
				<ul className="mb-4 text-neutral-700 list-disc list-inside">
					If you have any questions regarding our Terms & Conditions, please
					contact us at{" "}
					<a
						href="mailto:omrahagency@gmail.com"
						className="text-orange-600 cursor-pointer"
					>
						omrahagency@gmail.com
					</a>
					.
				</ul>
			</div>

			<div className="col-span-12 col-start-1 flex justify-center bg-gray-50">
				<Footer />
			</div>
		</section>
	);
}

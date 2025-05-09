import Titles from "../Titles";
import Faq from "./Faq";

export default function Faqs() {
	return (
		<section className="py-20 w-full flex flex-col items-center gap-10 md:gap-15">
			<Titles
				title="Frequently Asked Faqs"
				description="Explore common Faqs and essential details about renting with Carvoy"
			/>
			<div className="flex flex-col gap-5">
				<Faq
					title="What services are included in your rates?"
					description="At Carvoy, our rates include: vehicle rental, vehicle maintenance and lubricants, unlimited mileage for rentals of 3 days or more, civil liability coverage, collision protection with a deductible, theft protection with a deductible, local taxes, 24/7 breakdown assistance, pick-up and drop-off services, and a 20% VAT airport fee."
				/>
				<Faq
					title="What documents are required to rent a car?"
					description="To rent a car from Carvoy, customers must provide the following documents: a valid driver's license, a passport (for MRE and foreign customers), and either a residence permit or a valid ID card. We will make and archive copies of these documents at our first meeting."
				/>
				<Faq
					title="How is payment made?"
					description="Payment can be made by credit card or cash. You can choose to pay at the time of booking online or when you pick up the vehicle at our location. Our goal is to ensure a seamless and efficient rental process."
				/>
				<Faq
					title="Do I have to pay a deposit?"
					description="Yes, a deposit may be required when booking your vehicle. This deposit, often called a security deposit, is a bank pre-authorization that allows Carvoy to charge your account if any issues occur during your rental that are not covered and are due to your liability. If no such issues arise, the pre-authorization is released. If the “security deposit” option is not visible during booking, it means that it is not required for your chosen vehicle."
				/>
				<Faq
					title="Why choose Carvoy for your car rental?"
					description="Choosing Carvoy means experiencing the best of Morocco in comfort and style. We offer brand-new, fully guaranteed vehicles for a smooth and worry-free ride. Our competitive pricing ensures exceptional value for your money, and we provide car delivery to your chosen location without hidden surprises. Your satisfaction is our priority!"
				/>
				<Faq
					title="Can anyone else drive the car?"
					description="Only the driver or a second driver listed in the rental contract is authorized to drive the vehicle. Any additional driver must be disclosed at the time of contract signing and must meet the legal driving age (21 years) with a valid driver’s license held for at least 2 years. Their presence at the contract conclusion is mandatory."
				/>
				<Faq
					title="Can I change the car if I notice a mechanical failure?"
					description="Yes, if you experience a mechanical issue, please contact our agency or our 24/7 assistance service (included in your rental contract). We will authorize repairs or offer a replacement vehicle as needed."
				/>
				<Faq
					title="Vehicle Trackers"
					description="Some Carvoy vehicles are equipped with tracking devices, used in line with our data protection policy."
				/>
				<Faq
					title="Pricing"
					description="Our pricing is quoted on a per-day basis (24-hour period)."
				/>
				<Faq
					title="How much is deposit insurance?"
					description="For responsible accidents, the deductible amounts are as follows: Category A/B: 2000 euros Category C/D/E: 3000 euros"
				/>
			</div>
		</section>
	);
}

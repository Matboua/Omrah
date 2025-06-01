import Titles from "../Titles";
import Faq from "./Faq";

export default function Faqs() {
	return (
		<section className="py-20 w-full flex flex-col items-center gap-10 md:gap-15">
			<Titles
				title="Frequently Asked Faqs"
				description="Explore common questions and essential details about performing Omrah with our agency"
			/>
			<div className="flex flex-col gap-5">
				<Faq
					title="What services are included in your Omrah packages?"
					description="Our Omrah packages include: visa processing, round-trip flights, hotel accommodations near the Haram, ground transportation in Saudi Arabia, spiritual guidance, Ziyarat (visits to holy sites), 24/7 support services, and meals as per the selected package. We handle all documentation and provide pre-departure orientation sessions."
				/>
				<Faq
					title="What documents are required for Omrah?"
					description="For Omrah, you'll need: a valid passport with at least 6 months validity, recent passport-sized photographs, completed visa application forms, proof of vaccination as per current requirements, and a marriage certificate for married couples traveling together. Our team will guide you through the entire documentation process."
				/>
				<Faq
					title="How is payment handled?"
					description="We accept payments through bank transfer, credit card, or cash. A deposit is required to secure your booking, with the remaining balance due before departure. We offer flexible payment plans to make your spiritual journey more accessible."
				/>
				<Faq
					title="Do I need to make a deposit?"
					description="Yes, a deposit is required to confirm your Omrah booking. The deposit amount varies based on the package selected and typically ranges from 30% to 50% of the total package cost. This helps us secure your flights, hotel reservations, and visa processing."
				/>
				<Faq
					title="Why choose our Omrah Agency?"
					description="Our agency offers comprehensive Omrah services with years of experience, dedicated support, and competitive pricing. We provide accommodations close to the Haram, experienced guides, and personalized attention. Our team ensures a smooth and spiritually fulfilling journey from Morocco to the holy cities."
				/>
				<Faq
					title="What about accommodation arrangements?"
					description="We offer various accommodation options near the Haram in both Makkah and Madinah, ranging from 3-star to 5-star hotels. All our hotels are carefully selected for their proximity to the holy sites, comfort, and quality of service. Room arrangements can be customized based on family size and preferences."
				/>
				<Faq
					title="Is spiritual guidance provided?"
					description="Yes, our packages include experienced spiritual guides who will assist you throughout your journey. They provide guidance on performing Omrah rituals, lead daily prayers, and offer religious insights. Our guides are fluent in Arabic and French to ensure clear communication."
				/>
				<Faq
					title="What about transportation in Saudi Arabia?"
					description="We provide all necessary transportation in Saudi Arabia, including airport transfers and transportation between Makkah and Madinah. Our vehicles are modern, comfortable, and air-conditioned to ensure a pleasant journey."
				/>
				<Faq
					title="Are meals included?"
					description="Meal arrangements vary by package. Our VIP packages typically include full-board meals (breakfast, lunch, and dinner), while other packages may include breakfast only or half-board options. All meals are halal and cater to various dietary preferences."
				/>
				<Faq
					title="What happens in case of emergency?"
					description="We provide 24/7 emergency support throughout your journey. Our team in both Morocco and Saudi Arabia is always available to assist with any medical, logistical, or other emergencies. We also help arrange travel insurance for added peace of mind."
				/>
			</div>
		</section>
	);
}

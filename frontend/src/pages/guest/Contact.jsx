import ContactCards from "../guest/components/contact/ContactCards";
import ContactForm from "../guest/components/contact/ContactForm";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default function Contact() {
	return (
		<section className="grid grid-cols-12 bg-white overflow-x-hidden">
			<div className="col-span-10 col-start-2">
				<Header />
			</div>
			<div className="col-span-10 col-start-2 flex flex-col items-center gap-10  pb-20">
				<ContactCards />
				<ContactForm />
			</div>
			<div className="col-span-12 col-start-1 flex justify-center bg-gray-50">
				<Footer />
			</div>
		</section>
	);
}

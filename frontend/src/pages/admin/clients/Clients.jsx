import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Clientslist from "./Clientslist";

export default function Clients() {
	return (
		<section className="flex h-dvh overflow-hidden">
			<Sidebar />
			<section className="flex flex-col  gap-5 w-full py-5 pr-[12px] md:pr-5 pl-[72px] md:pl-5 bg-[#fafafa]  overflow-y-scroll">
				<Header />
				<Clientslist />
			</section>
		</section>
	);
}

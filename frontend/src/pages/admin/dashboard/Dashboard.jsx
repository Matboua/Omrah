import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
	return (
		<section className="flex h-dvh overflow-hidden">
			<Sidebar />
			<section className="flex flex-col w-full py-5 pr-[12px] md:pr-5 pl-[72px] md:pl-5 bg-[#fafafa]  overflow-y-scroll">
				<Header />
			</section>
		</section>
	);
}

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Bookingslist from "./Bookingslist";
const bookings = [
	{
		id: 1,
		user: { cin: "AB123456" },
		pack: { name: "Umrah Gold", class: "vip" },
		status: "confirmed",
		created_at: "2023-10-01",
	},
	{
		id: 2,
		user: { cin: "BC234567" },
		pack: { name: "Umrah Gold", class: "vip" },
		status: "confirmed",
		created_at: "2023-10-01",
	},
	{
		id: 3,
		user: { cin: "CD345678" },
		pack: { name: "Umrah Silver", class: "business" },
		status: "pending",
		created_at: "2023-10-02",
	},
	{
		id: 4,
		user: { cin: "DE456789" },
		pack: { name: "Umrah Bronze", class: "economic" },
		status: "canceled",
		created_at: "2023-10-03",
	},
	{
		id: 5,
		user: { cin: "EF567890" },
		pack: { name: "Umrah Gold", class: "vip" },
		status: "confirmed",
		created_at: "2023-10-04",
	},
	{
		id: 6,
		user: { cin: "FG678901" },
		pack: { name: "Umrah Silver", class: "business" },
		status: "pending",
		created_at: "2023-10-05",
	},
	{
		id: 7,
		user: { cin: "GH789012" },
		pack: { name: "Umrah Bronze", class: "economic" },
		status: "canceled",
		created_at: "2023-10-06",
	},
];

export default function Bookings() {
	return (
		<section className="flex h-dvh overflow-hidden">
			<Sidebar />
			<section className="flex flex-col gap-5 w-full py-5 pr-[12px] md:pr-5 pl-[72px] md:pl-5 bg-[#fafafa] overflow-y-scroll">
				<Header />
				<Bookingslist data={bookings} />
			</section>
		</section>
	);
}

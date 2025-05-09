import { Link } from "react-router-dom";

export default function Pagination({ currentPage, npage, handlePageChange }) {
	// Ensure npage is at least 1 to avoid empty pagination
	const totalPages = Math.max(1, npage);

	return (
		<div className="col-span-12 mx-auto mt-8 grid grid-cols-4 grid-rows-2 items-center gap-3 px-4 py-4 pb-8 sm:flex sm:justify-center  text-gray-700">
			<div className="wt-button-font order-2 col-span-2 flex justify-end gap-2 ">
				<Link
					className={`border  border-gray-400 rounded-lg flex items-center gap-2 px-3 py-1 transition duration-150 ease-in-out  bg-white  hover:bg-gray-100 ${
						currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
					}`}
					to="#"
					onClick={currentPage === 1 ? null : () => handlePageChange(1)}
				>
					First
				</Link>
				<Link
					className={`border  border-gray-400 rounded-lg flex items-center gap-2 px-3 py-1 transition duration-150 ease-in-out  bg-white  hover:bg-gray-100 ${
						currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
					}`}
					to="#"
					onClick={
						currentPage === 1 ? null : () => handlePageChange(currentPage - 1)
					}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						aria-hidden="true"
						data-slot="icon"
						className="rotate-180 transform"
						height="16px"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="m8.25 4.5 7.5 7.5-7.5 7.5"
						></path>
					</svg>
					Back
				</Link>
			</div>
			<div className="order-1 col-span-4 flex justify-center gap-3 sm:order-2">
				{[...Array(totalPages)].map((_, index) => (
					<Link
						key={index + 1}
						className={`border  border-gray-400 rounded-lg flex items-center gap-2 px-3 py-1 transition duration-150 ease-in-out  bg-white  hover:bg-gray-100  ${
							currentPage === index + 1 ? "bg-yellow-200 " : ""
						}`}
						to="#"
						onClick={() => handlePageChange(index + 1)}
					>
						{index + 1}
					</Link>
				))}
			</div>
			<div className="wt-button-font order-2 col-span-2 flex items-center gap-2">
				<Link
					className={`border  border-gray-400 rounded-lg flex items-center gap-2 px-3 py-1 transition duration-150 ease-in-out  bg-white  hover:bg-gray-100 ${
						currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
					}`}
					to="#"
					onClick={
						currentPage === totalPages
							? null
							: () => handlePageChange(currentPage + 1)
					}
				>
					Next
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						aria-hidden="true"
						data-slot="icon"
						height="16px"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="m8.25 4.5 7.5 7.5-7.5 7.5"
						></path>
					</svg>
				</Link>
				<Link
					className={`border  border-gray-400 rounded-lg flex items-center gap-2 px-3 py-1 transition duration-150 ease-in-out  bg-white  hover:bg-gray-100 ${
						currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
					}`}
					to="#"
					onClick={
						currentPage === totalPages
							? null
							: () => handlePageChange(totalPages)
					}
				>
					Last
				</Link>
			</div>
		</div>
	);
}

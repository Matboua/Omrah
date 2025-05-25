"use client";

import { X } from "lucide-react";

export default function LoginPopup({ onClose }) {
	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative">
				{/* Close button */}
				<button
					onClick={onClose}
					className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
				>
					<X size={24} />
				</button>

				{/* Content */}
				<div className="text-center">
					<h2 className="text-2xl font-bold text-gray-900 mb-4">
						Authentication Required
					</h2>
					<p className="text-gray-600 mb-8">
						Please login or register to book your Omrah package
					</p>

					{/* Buttons */}
					<div className="space-y-4">
						<a
							href="/login"
							className="block w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
						>
							Login
						</a>
						<a
							href="/register"
							className="block w-full border-2 border-orange-600 text-orange-600 hover:bg-orange-50 font-semibold py-3 px-6 rounded-lg transition-colors"
						>
							Register
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}

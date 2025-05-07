// src/router/index.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/guest/Home";
import Login from "./pages/guest/Login";
import Register from "./pages/guest/Register";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUser } from "./store/slices/authSlice";
import Cookies from 'js-cookie';
import PrivacyPolicy from "./pages/guest/PrivacyPolicy";
import TermsAndConditions from "./pages/guest/TermsAndConditions";
// import other roles and components...

export default function AppRoutes() {
	const dispatch = useDispatch();
	useEffect(() => {
		const xsrfToken = Cookies.get('XSRF-TOKEN');
		if (xsrfToken) {
			dispatch(fetchUser());
		}
	}, [dispatch]);
	return (
		<BrowserRouter>
			<Routes>
				{/* Guest Routes */}
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/Privacy-Policy" element={<PrivacyPolicy />} />
				<Route path="/terms-and-conditions" element={<TermsAndConditions />} />
				{/* Client Routes */}
				{/* Admin Routes */}
			</Routes>
		</BrowserRouter>
	);
}

// src/router/index.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/guest/Home";
import Login from "./pages/guest/Login";
import Register from "./pages/guest/Register";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUser } from "./store/slices/authSlice";
import Cookies from "js-cookie";
import PrivacyPolicy from "./pages/guest/PrivacyPolicy";
import TermsAndConditions from "./pages/guest/TermsAndConditions";
import Contact from "./pages/guest/Contact";
import About from "./pages/guest/About";
import Services from "./pages/guest/Services";
import Dashboard from "./pages/admin/Dashboard";
import Clients from "./pages/admin/Clients";
import Packages from "./pages/admin/Packages";
import Settings from "./pages/admin/Settings";
// import other roles and components...

export default function AppRoutes() {
	const dispatch = useDispatch();
	useEffect(() => {
		const xsrfToken = Cookies.get("XSRF-TOKEN");
		if (xsrfToken) {
			dispatch(fetchUser());
		}
	}, [dispatch]);
	return (
		<BrowserRouter>
			<Routes>
				{/* Guest Routes */}
				{/* Auth */}
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				{/* Global */}
				<Route path="/" element={<Home />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/about" element={<About />} />
				<Route path="/services" element={<Services />} />
				<Route path="/Privacy-Policy" element={<PrivacyPolicy />} />
				<Route path="/terms-and-conditions" element={<TermsAndConditions />} />
				{/* Client Routes */}
				{/* Admin Routes */}
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/clients" element={<Clients />} />
				<Route path="/packages" element={<Packages />} />
				<Route path="/settings" element={<Settings />} />
			</Routes>
		</BrowserRouter>
	);
}

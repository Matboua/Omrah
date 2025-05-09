// src/router/index.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/guest/Home";
import Login from "./pages/guest/Login";
import Register from "./pages/guest/Register";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUser } from "./store/slices/authSlice";
import { useSelector } from "react-redux";
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

	// Protecting admin routes
	const PrivateRoute = ({ children }) => {
		const loading = useSelector((state) => state.auth.loading);
		const role = useSelector((state) => state.auth.role);

		// Wait for the loading state to be false before checking role
		if (loading) {
			return <h1>Loading ...</h1>;
		}

		if (!role || role !== 'admin') {
			console.log('not admin')
			return <Navigate to="/login" />;
		}

		return children;
	};

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
				<Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
				<Route path="/clients" element={<PrivateRoute><Clients /></PrivateRoute>} />
				<Route path="/packages" element={<PrivateRoute><Packages /></PrivateRoute>} />
				<Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
				{/* <Route path="/clients" element={<Clients />} />
				<Route path="/packages" element={<Packages />} />
				<Route path="/settings" element={<Settings />} /> */}
			</Routes>
		</BrowserRouter>
	);
}

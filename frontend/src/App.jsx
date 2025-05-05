// src/router/index.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/guest/Home";
import Login from "./pages/guest/Login";
import Register from "./pages/guest/Register";
// import other roles and components...

export default function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				{/* Guest Routes */}
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				{/* Client Routes */}
				{/* Admin Routes */}
			</Routes>
		</BrowserRouter>
	);
}

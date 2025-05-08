import axios from "axios";
import Cookies from "js-cookie";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

axios.interceptors.request.use(async (config) => {
	if (["post", "put", "delete", "patch"].includes(config.method)) {
		try {
			await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
				withCredentials: true,
			});
			const xsrfToken = Cookies.get("XSRF-TOKEN");
			if (xsrfToken) {
				config.headers["X-XSRF-TOKEN"] = xsrfToken;
			}
		} catch (error) {
			console.error("Failed to fetch CSRF token:", error);
		}
	}
	return config;
});

export default axios;

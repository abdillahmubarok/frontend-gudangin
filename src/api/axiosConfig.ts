import axios from "axios";
// import Cookies from "js-cookie"; 

const apiClient = axios.create({
  baseURL: "https://demogudangin.mubarokah.com/api", // Disesuaikan dengan domain backend yang sebenarnya
  withCredentials: true, // Diperlukan untuk autentikasi Sanctum
  withXSRFToken: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Interceptor untuk memastikan CSRF Token dikirim
apiClient.interceptors.request.use(async (config) => {
  
  // Pastikan CSRF token diambil sebelum login/register
  if (config.url?.includes("/login") || config.url?.includes("/register")) {
    await axios.get("https://demogudangin.mubarokah.com/sanctum/csrf-cookie", {
        withCredentials: true,
        withXSRFToken: true,
    });
  }

  return config;
});

export default apiClient;

import axios from "axios";

console.log('urls: ',import.meta.env.VITE_FULL_URL, import.meta.env.VITE_BASE_URL);

export const instance = axios.create({
  baseURL: import.meta.env.VITE_FULL_URL,
});

instance.interceptors.request.use((config) => {
  const data = JSON.parse(localStorage.getItem("auth") || "{}");
  const token = data?.state?.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

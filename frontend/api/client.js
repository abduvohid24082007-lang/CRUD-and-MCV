import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5000,
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.error || "Serverda xatolik";

    return Promise.reject(new Error(message));
  },
);

export default client;

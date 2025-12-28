import axios from "axios";

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    // এটি যোগ না করলে ব্যাকেন্ডে credentials: true থাকলেও লগইন কাজ করবে না
    withCredentials: true 
});

export default axiosSecure;
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import AvailableCamps from "../pages/AvailableCamps/AvailableCamps";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />, // এটি মেইন লেআউট
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "available-camps",
                element: <AvailableCamps />,
            },
            // ভবিষ্যতে লগইন বা অন্যান্য পেজ এখানে যুক্ত হবে
        ],
    },
]);
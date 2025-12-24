import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import AvailableCamps from "../pages/AvailableCamps/AvailableCamps";
import Register from "../pages/Register/Register"; // ইম্পোর্ট নিশ্চিত করুন
import Login from "../pages/Login/Login";       // ইম্পোর্ট নিশ্চিত করুন

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />, 
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "available-camps",
                element: <AvailableCamps />,
            },
            {
                path: "register",
                element: <Register />,
            },
            {
                path: "login",
                element: <Login />,
            },
        ],
    },
]);
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import AvailableCamps from "../pages/AvailableCamps/AvailableCamps";
import CampDetails from "../pages/CampDetails/CampDetails";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";

// Organizer Pages
import OrganizerProfile from "../pages/Dashboard/OrganizerProfile";
import AddACamp from "../pages/Dashboard/AddACamp";
import ManageCamps from "../pages/Dashboard/ManageCamps";
import ManageRegisteredCamps from "../pages/Dashboard/ManageRegisteredCamps";

// Participant Pages (নতুন ইমপোর্ট)
import Analytics from "../pages/Dashboard/Analytics";
import ParticipantProfile from "../pages/Dashboard/ParticipantProfile";
import RegisteredCamps from "../pages/Dashboard/RegisteredCamps";
import PaymentHistory from "../pages/Dashboard/PaymentHistory";
import Payment from "../pages/Dashboard/Payment"; // Stripe পেমেন্ট পেজ (যদি তৈরি করেন)

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <div className="flex h-screen items-center justify-center text-3xl font-bold">404 - Page Not Found</div>,
        children: [
            { path: "/", element: <Home /> },
            { path: "available-camps", element: <AvailableCamps /> },
            {
                path: "camp-details/:id",
                element: <PrivateRoute><CampDetails /></PrivateRoute>,
            },
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
        ],
    },
    // ড্যাশবোর্ড রুট
    {
        path: "dashboard",
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            // --- Organizer Routes ---
            {
                path: "organizer-profile",
                element: <OrganizerProfile />
            },
            {
                path: "add-a-camp",
                element: <AddACamp />
            },
            {
                path: "manage-camps",
                element: <ManageCamps />
            },
            {
                path: "manage-registered-camps",
                element: <ManageRegisteredCamps />
            },

            // --- Participant Routes (নতুন রিকয়ারমেন্ট অনুযায়ী) ---
            {
                path: "analytics",
                element: <Analytics />
            },
            {
                path: "participant-profile",
                element: <ParticipantProfile />
            },
            {
                path: "registered-camps",
                element: <RegisteredCamps />
            },
            {
                path: "payment-history",
                element: <PaymentHistory />
            },
            {
                path: "payment/:id", // পেমেন্ট করার জন্য ডাইনামিক রুট
                element: <Payment />
            }
        ]
    }
]);
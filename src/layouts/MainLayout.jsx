import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar";
import Footer from "../components/Shared/Footer";

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* নেভিবার সবসময় উপরে থাকবে */}
            <Navbar />

            {/* মাঝখানের কন্টেন্ট পেজ অনুযায়ী পরিবর্তন হবে */}
            <div className="flex-grow">
                <Outlet />
            </div>

            {/* ফুটার সবসময় নিচে থাকবে */}
            <Footer />
        </div>
    );
};

export default MainLayout;
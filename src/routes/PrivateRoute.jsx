import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    // লোডিং অবস্থায় একটি সুন্দর স্পিনার দেখাবে
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    // ইউজার থাকলে তাকে নির্দিষ্ট পেজে যেতে দেবে
    if (user) {
        return children;
    }

    // ইউজার না থাকলে লগইন পেজে পাঠাবে এবং বর্তমান লোকেশন সেভ করে রাখবে
    return <Navigate to="/login" state={{ from: location }} replace />;
};

// এই লাইনটিই মিসিং ছিল, যা এরর দিচ্ছিল
export default PrivateRoute;
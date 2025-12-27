

import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { 
    FaPlusCircle, FaThList, FaUserEdit, FaHome, 
    FaClipboardList, FaChartBar, FaCalendarCheck, FaHistory, FaSignOutAlt 
} from "react-icons/fa";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import axiosSecure from "../api";

const DashboardLayout = () => {
    const { user, logOut } = useAuth(); // useAuth থেকে logOut আনা হলো
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/users/role/${user.email}`)
                .then(res => {
                    setRole(res.data.role);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }
    }, [user?.email]);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                navigate("/"); // হোমপেজে পাঠিয়ে দেওয়া
            })
            .catch(err => console.log(err));
    };

    if (loading) return <div className="h-screen flex justify-center items-center font-bold">Loading...</div>;

    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            {/* সাইডবার */}
            <div className="w-full md:w-72 bg-primary text-white p-6 shadow-xl flex flex-col">
                <h2 className="text-2xl font-bold mb-8 border-b border-white/20 pb-4 text-center md:text-left">
                    {role === 'organizer' ? "Organizer Panel" : "Participant Panel"}
                </h2>
                
                <ul className="menu space-y-2 p-0 flex-grow">
                    {role === 'organizer' ? (
                        <>
                            <li><NavLink to="/dashboard/organizer-profile" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg ${isActive ? 'bg-white text-primary font-bold' : 'hover:bg-white/10'}`}><FaUserEdit /> Organizer Profile</NavLink></li>
                            <li><NavLink to="/dashboard/add-a-camp" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg ${isActive ? 'bg-white text-primary font-bold' : 'hover:bg-white/10'}`}><FaPlusCircle /> Add A Camp</NavLink></li>
                            <li><NavLink to="/dashboard/manage-camps" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg ${isActive ? 'bg-white text-primary font-bold' : 'hover:bg-white/10'}`}><FaThList /> Manage Camps</NavLink></li>
                            <li><NavLink to="/dashboard/manage-registered-camps" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg ${isActive ? 'bg-white text-primary font-bold' : 'hover:bg-white/10'}`}><FaClipboardList /> Manage Registered Camps</NavLink></li>
                        </>
                    ) : (
                        <>
                            <li><NavLink to="/dashboard/analytics" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg ${isActive ? 'bg-white text-primary font-bold' : 'hover:bg-white/10'}`}><FaChartBar /> Analytics</NavLink></li>
                            <li><NavLink to="/dashboard/participant-profile" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg ${isActive ? 'bg-white text-primary font-bold' : 'hover:bg-white/10'}`}><FaUserEdit /> Participant Profile</NavLink></li>
                            <li><NavLink to="/dashboard/registered-camps" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg ${isActive ? 'bg-white text-primary font-bold' : 'hover:bg-white/10'}`}><FaCalendarCheck /> Registered Camps</NavLink></li>
                            <li><NavLink to="/dashboard/payment-history" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg ${isActive ? 'bg-white text-primary font-bold' : 'hover:bg-white/10'}`}><FaHistory /> Payment History</NavLink></li>
                        </>
                    )}

                    <div className="divider bg-white/20 h-[1px] my-6"></div>
                    
                    <li><NavLink to="/" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10"><FaHome /> Back to Home</NavLink></li>
                    
                    {/* Log Out Button */}
                    <li className="mt-auto">
                        <button 
                            onClick={handleLogOut} 
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-500 transition-all text-white"
                        >
                            <FaSignOutAlt /> Log Out
                        </button>
                    </li>
                </ul>
            </div>

            {/* কন্টেন্ট এরিয়া */}
            <div className="flex-1 p-6 md:p-10 bg-gray-50">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;
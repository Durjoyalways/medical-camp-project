import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { FaPlusSquare } from "react-icons/fa";

const Navbar = () => {
    // এখানে logout এর বদলে logOut হবে (আপনার AuthProvider এর সাথে মিল রেখে)
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logOut()
            .then(() => {
                console.log("Logged out successfully");
                navigate("/"); // লগআউট হওয়ার পর হোমপেজে পাঠিয়ে দিবে
            })
            .catch(error => console.error("Logout error:", error));
    };

    const navOptions = (
        <>
            <li><NavLink to="/" className={({ isActive }) => isActive ? "text-primary font-bold" : ""}>Home</NavLink></li>
            <li><NavLink to="/available-camps" className={({ isActive }) => isActive ? "text-primary font-bold" : ""}>Available Camps</NavLink></li>
            {/* ইউজার লগইন থাকলে ড্যাশবোর্ড মেনু দেখাবে */}
            {user && <li><NavLink to="/dashboard" className={({ isActive }) => isActive ? "text-primary font-bold" : ""}>Dashboard</NavLink></li>}
        </>
    );

    return (
        <div className="navbar bg-white shadow-lg px-4 md:px-10 sticky top-0 z-[1000]">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 font-medium">
                        {navOptions}
                    </ul>
                </div>
                
                <Link to="/" className="flex items-center gap-2">
                    <FaPlusSquare className="text-primary text-3xl" />
                    <span className="text-2xl font-black tracking-tight">
                        Medi<span className="text-primary">Camp</span>
                    </span>
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-6 font-semibold">
                    {navOptions}
                </ul>
            </div>

            <div className="navbar-end">
                {user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border-2 border-primary">
                            <div className="w-10 rounded-full">
                                <img src={user?.photoURL || "https://i.ibb.co/mR4t6S3/user.png"} alt="User" referrerPolicy="no-referrer" />
                            </div>
                        </div>
                        
                        <ul tabIndex={0} className="mt-5 z-[1] p-4 shadow-2xl menu menu-sm dropdown-content bg-base-100 rounded-xl w-60 border border-gray-100">
                            <div className="flex flex-col items-center mb-3 border-b pb-2 text-center">
                                <p className="font-bold text-gray-800 break-all">{user?.displayName}</p>
                                <p className="text-xs text-gray-400 break-all">{user?.email}</p>
                            </div>
                            
                            <li><Link to="/dashboard" className="hover:bg-primary hover:text-white p-2 rounded-lg">Dashboard</Link></li>
                            
                            <li className="mt-2">
                                {/* এখানে handleLogout ফাংশনটি কল হচ্ছে */}
                                <button onClick={handleLogout} className="btn btn-sm btn-error text-white w-full border-none">
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <Link to="/login" className="btn btn-primary rounded-full px-8 text-white">Join US</Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
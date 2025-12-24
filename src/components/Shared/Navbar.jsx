import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { FaPlusSquare } from "react-icons/fa"; // লোগোর পাশে আইকনের জন্য (npm i react-icons)

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout()
            .then(() => {})
            .catch(error => console.error(error));
    };

    const navOptions = (
        <>
            <li><NavLink to="/" className={({ isActive }) => isActive ? "text-primary font-bold" : ""}>Home</NavLink></li>
            <li><NavLink to="/available-camps" className={({ isActive }) => isActive ? "text-primary font-bold" : ""}>Available Camps</NavLink></li>
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
                {/* Logo Section */}
                <Link to="/" className="flex items-center gap-2">
                    <FaPlusSquare className="text-primary text-3xl" /> {/* লোগো আইকন */}
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
                                <img src={user?.photoURL} alt="User" referrerPolicy="no-referrer" />
                            </div>
                        </div>
                        {/* mt-5 যুক্ত করা হয়েছে যাতে ড্রপডাউন নিচে নামে */}
                        <ul tabIndex={0} className="mt-5 z-[1] p-4 shadow-2xl menu menu-sm dropdown-content bg-base-100 rounded-xl w-60 border border-gray-100">
                            <div className="flex flex-col items-center mb-3 border-b pb-2">
                                <p className="font-bold text-gray-800">{user?.displayName}</p>
                                <p className="text-xs text-gray-400">{user?.email}</p>
                            </div>
                            <li><Link to="/dashboard" className="hover:bg-primary hover:text-white p-2 rounded-lg">Dashboard</Link></li>
                            <li className="mt-2">
                                <button onClick={handleLogout} className="btn btn-sm btn-error text-white w-full">Logout</button>
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
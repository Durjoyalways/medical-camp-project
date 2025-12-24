import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
    // বর্তমানে ইউজার নেই ধরে নিচ্ছি (পরে Firebase থেকে আসবে)
    const user = null; 

    const navOptions = (
        <>
            <li>
                <NavLink 
                    to="/" 
                    className={({ isActive }) => isActive ? "text-primary font-bold underline" : "font-semibold"}
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink 
                    to="/available-camps" 
                    className={({ isActive }) => isActive ? "text-primary font-bold underline" : "font-semibold"}
                >
                    Available Camps
                </NavLink>
            </li>
        </>
    );

    return (
        <div className="navbar bg-base-100 shadow-md px-4 md:px-12 sticky top-0 z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navOptions}
                    </ul>
                </div>
                <Link to="/" className="text-2xl font-black text-primary tracking-tighter italic">
                    MediCamp
                </Link>
            </div>
            
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-6">
                    {navOptions}
                </ul>
            </div>

            <div className="navbar-end">
                {user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img 
                                    src={user?.photoURL || "https://i.ibb.co/mR7099X/user.png"} 
                                    alt="User Profile" 
                                />
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li className="px-4 py-2 font-bold text-gray-700">
                                {user?.displayName || "Anonymous User"}
                            </li>
                            <div className="divider my-0"></div>
                            <li><Link to="/dashboard">Dashboard</Link></li>
                            <li><button className="text-red-500 font-semibold">Logout</button></li>
                        </ul>
                    </div>
                ) : (
                    <Link to="/login" className="btn btn-primary btn-sm md:btn-md px-8 rounded-full">
                        Join US
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
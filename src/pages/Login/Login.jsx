import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axiosSecure from "../../api";
import Swal from "sweetalert2";

const Login = () => {
    const { googleLogin, login } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    // ইউজার যে পেজ থেকে এসেছে সেখানে ফেরত পাঠানোর জন্য
    const from = location.state?.from?.pathname || "/";

    // ১. গুগল লগইন হ্যান্ডলার
    const handleGoogleLogin = async () => {
        try {
            const result = await googleLogin();
            const user = result.user;

            const userInfo = {
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
                role: 'participant' 
            };

            // ব্যাকেন্ডে ইউজার ডাটা সেভ করা
            await axiosSecure.post('/users', userInfo);
            
            // রোল চেক করা
            const res = await axiosSecure.get(`/users/admin/${user.email}`);
            
            Swal.fire({
                icon: "success",
                title: "Login Successful",
                showConfirmButton: false,
                timer: 1500
            });

            if (res.data?.admin) {
                navigate('/dashboard/organizer-profile');
            } else {
                navigate(from, { replace: true });
            }

        } catch (error) {
            console.error("Google Login Error:", error);
            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: "Something went wrong. Please try again.",
            });
        }
    };

    // ২. ইমেইল/পাসওয়ার্ড লগইন হ্যান্ডলার
    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        login(email, password)
            .then(async (res) => {
                const adminRes = await axiosSecure.get(`/users/admin/${res.user.email}`);
                Swal.fire({
                    icon: "success",
                    title: "Welcome Back!",
                    showConfirmButton: false,
                    timer: 1500
                });
                if (adminRes.data?.admin) {
                    navigate('/dashboard/organizer-profile');
                } else {
                    navigate(from, { replace: true });
                }
            })
            .catch(error => {
                Swal.fire({ icon: "error", title: "Login Error", text: "Invalid Email or Password" });
            });
    };

    return (
        <div className="hero min-h-screen bg-base-200 py-10">
            <div className="hero-content flex-col">
                <div className="text-center mb-6">
                    <h1 className="text-5xl font-bold text-primary">Login Now</h1>
                    <p className="py-4 text-gray-600 font-medium">Manage your medical camps easily.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 p-8 border">
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="form-control">
                            <label className="label"><span className="label-text font-bold">Email</span></label>
                            <input type="email" name="email" placeholder="Your Email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text font-bold">Password</span></label>
                            <input type="password" name="password" placeholder="******" className="input input-bordered" required />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary w-full text-white">Login</button>
                        </div>
                    </form>

                    <div className="divider text-gray-400">OR</div>

                    <button 
                        onClick={handleGoogleLogin} 
                        className="btn btn-outline btn-primary flex items-center justify-center gap-2 w-full"
                    >
                        <img className="w-5" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/action/google.svg" alt="Google" />
                        Continue with Google
                    </button>

                    <p className="mt-6 text-center text-sm font-medium">
                        New here? 
                        {/* নিচের লিঙ্কে আমি /signup পরিবর্তন করে /register করে দিয়েছি */}
                        <Link to="/register" className="text-primary font-bold hover:underline ml-1">
                            Create an Account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axiosSecure from "../../api";
import Swal from "sweetalert2";

const Login = () => {
    const { googleLogin, login } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    // ইউজার যে পেজ থেকে এসেছে সেখানে ফেরত পাঠানোর জন্য (Optional)
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
                // ব্যাকেন্ডে নতুন ইউজার হলে ডিফল্ট 'participant' সেট হবে
            };

            // ২. ব্যাকেন্ডে ইউজার ডাটা সেভ করা
            await axiosSecure.post('/users', userInfo);
            
            // ৩. ব্যাকেন্ড থেকে চেক করা ইউজার কি অর্গানাইজার?
            const res = await axiosSecure.get(`/users/admin/${user.email}`);
            
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Login Successful",
                showConfirmButton: false,
                timer: 1500
            });

            // ৪. রোল অনুযায়ী সঠিক পেজে রিডাইরেক্ট করা
            if (res.data?.admin) {
                // অর্গানাইজার (td16122019@gmail.com) হলে ড্যাশবোর্ডে যাবে
                navigate('/dashboard/organizer-profile');
            } else {
                // সাধারণ ইউজার হলে হোমে যাবে
                navigate(from, { replace: true });
            }

        } catch (error) {
            console.error("Google Login Error:", error);
            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: "Network error or connection lost. Please try again.",
            });
        }
    };

    // ২. ইমেইল/পাসওয়ার্ড লগইন হ্যান্ডলার (যদি থাকে)
    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        login(email, password)
            .then(async (res) => {
                const adminRes = await axiosSecure.get(`/users/admin/${res.user.email}`);
                if (adminRes.data?.admin) {
                    navigate('/dashboard/organizer-profile');
                } else {
                    navigate(from, { replace: true });
                }
            })
            .catch(error => {
                Swal.fire({ icon: "error", title: "Oops...", text: error.message });
            });
    };

    return (
        <div className="hero min-h-screen bg-base-200 py-10">
            <div className="hero-content flex-col">
                <div className="text-center mb-6">
                    <h1 className="text-5xl font-bold">Login to HobbyHub</h1>
                    <p className="py-4 text-gray-600">Join our medical camps today.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 p-8 border">
                    {/* ইমেইল পাসওয়ার্ড ফর্ম */}
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="form-control">
                            <label className="label"><span className="label-text">Email</span></label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Password</span></label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary w-full">Login</button>
                        </div>
                    </form>

                    <div className="divider">OR</div>

                    {/* গুগল লগইন বাটন */}
                    <button 
                        onClick={handleGoogleLogin} 
                        className="btn btn-outline btn-primary flex items-center justify-center gap-2 w-full"
                    >
                        <img className="w-5" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/action/google.svg" alt="Google" />
                        Continue with Google
                    </button>

                    <p className="mt-6 text-center text-sm">
                        New here? <Link to="/signup" className="text-primary font-bold hover:underline">Create an Account</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import axiosSecure from "../../api"; 

const Login = () => {
    const { login, googleLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const from = location.state?.from?.pathname || "/";

    // কমন ফাংশন: ইউজারের তথ্য ডাটাবেজে সেভ করার জন্য
    const saveUserToDatabase = async (user) => {
        const userInfo = {
            email: user?.email,
            name: user?.displayName || "New User",
            photoURL: user?.photoURL
        };

        try {
            console.log("Sending to server:", userInfo);
            const res = await axiosSecure.post('/users', userInfo);
            console.log("Server response:", res.data);
            return res.data;
        } catch (err) {
            console.error("Database storage error:", err);
            throw err;
        }
    };

    // ১. ইমেইল ও পাসওয়ার্ড দিয়ে লগইন
    const onSubmit = async (data) => {
        try {
            const result = await login(data.email, data.password);
            await saveUserToDatabase(result.user);

            Swal.fire({
                icon: 'success',
                title: 'Welcome Back!',
                text: 'Login Successful',
                showConfirmButton: false,
                timer: 1500
            });
            navigate(from, { replace: true });
        } catch (error) {
            console.error("Login Error:", error);
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: error.message || 'Please check your email and password.',
            });
        }
    };

    // ২. গুগল দিয়ে লগইন
    const handleGoogleLogin = async () => {
        try {
            const result = await googleLogin();
            console.log("Firebase login successful:", result.user.email);
            
            // ডাটাবেজে জিমেইল পাঠানো হচ্ছে
            await saveUserToDatabase(result.user);

            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Login Successful',
                showConfirmButton: false,
                timer: 1500
            });
            navigate(from, { replace: true });
        } catch (error) {
            console.error("Google Login Error:", error);
            Swal.fire({
                icon: 'error',
                title: 'Login Error',
                text: error.response?.data?.message || error.message,
            });
        }
    };

    return (
        <div className="hero min-h-screen bg-base-200 py-10">
            <div className="card w-full max-w-sm shadow-2xl bg-base-100 p-8">
                <h2 className="text-3xl font-bold text-center text-primary mb-6">Login Now</h2>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Email</span>
                        </label>
                        <input 
                            type="email" 
                            {...register("email", { required: "Email is required" })} 
                            placeholder="your@email.com" 
                            className="input input-bordered focus:input-primary w-full" 
                        />
                        {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>}
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Password</span>
                        </label>
                        <input 
                            type="password" 
                            {...register("password", { required: "Password is required" })} 
                            placeholder="******" 
                            className="input input-bordered focus:input-primary w-full" 
                        />
                        {errors.password && <span className="text-red-500 text-xs mt-1">{errors.password.message}</span>}
                    </div>

                    <div className="form-control mt-6">
                        <button className="btn btn-primary w-full text-white font-bold uppercase">
                            Login
                        </button>
                    </div>
                </form>

                <div className="divider text-gray-400">OR</div>

                <button 
                    onClick={handleGoogleLogin} 
                    className="btn btn-outline btn-secondary w-full flex items-center justify-center gap-2"
                >
                    <img className="w-5" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/layout/google.png" alt="google" />
                    Continue with Google
                </button>

                <p className="text-center mt-6 text-sm">
                    New to MediCamp? <Link to="/register" className="text-primary font-bold hover:underline">Create an Account</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
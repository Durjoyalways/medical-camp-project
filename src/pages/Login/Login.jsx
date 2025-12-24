import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
    // AuthContext থেকে প্রয়োজনীয় ফাংশনগুলো আনা
    const { login, googleLogin } = useContext(AuthContext);
    
    // React Hook Form সেটআপ
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const navigate = useNavigate();
    const location = useLocation();

    // লগইন করার পর আগের পেজে বা হোমপেজে পাঠানোর জন্য
    const from = location.state?.from?.pathname || "/";

    // ইমেইল ও পাসওয়ার্ড দিয়ে লগইন হ্যান্ডলার
    const onSubmit = (data) => {
        login(data.email, data.password)
            .then((result) => {
                console.log("Logged user:", result.user);
                Swal.fire({
                    icon: 'success',
                    title: 'Welcome Back!',
                    text: 'Login Successful',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(from, { replace: true });
            })
            .catch((error) => {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: 'Please check your email and password.',
                });
            });
    };

    // গুগল দিয়ে লগইন হ্যান্ডলার
    const handleGoogleLogin = () => {
        googleLogin()
            .then((result) => {
                console.log("Google user:", result.user);
                navigate(from, { replace: true });
            })
            .catch((error) => console.error(error));
    };

    return (
        <div className="hero min-h-screen bg-base-200 py-10">
            <div className="card w-full max-w-sm shadow-2xl bg-base-100 p-8">
                <h2 className="text-3xl font-bold text-center text-primary mb-6">Login Now</h2>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Email Field */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Email</span>
                        </label>
                        <input 
                            type="email" 
                            {...register("email", { required: "Email is required" })} 
                            placeholder="your@email.com" 
                            className="input input-bordered focus:input-primary" 
                        />
                        {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>}
                    </div>

                    {/* Password Field */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Password</span>
                        </label>
                        <input 
                            type="password" 
                            {...register("password", { required: "Password is required" })} 
                            placeholder="******" 
                            className="input input-bordered focus:input-primary" 
                        />
                        {errors.password && <span className="text-red-500 text-xs mt-1">{errors.password.message}</span>}
                    </div>

                    <div className="form-control mt-6">
                        <button className="btn btn-primary w-full text-white font-bold">LOGIN</button>
                    </div>
                </form>

                <div className="divider text-gray-400">OR</div>

                {/* Google Login Button */}
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
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2"; // মিষ্টি অ্যালার্টের জন্য (ইন্সটল না থাকলে npm i sweetalert2)

const Register = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = (data) => {
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                // ইউজারের নাম এবং ছবি আপডেট করা
                updateProfile(loggedUser, {
                    displayName: data.name,
                    photoURL: data.photoURL
                })
                .then(() => {
                    reset();
                    Swal.fire({
                        icon: 'success',
                        title: 'Registration Successful!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/'); // রেজিস্ট্রেশন শেষে হোমপেজে নিয়ে যাবে
                })
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.message,
                });
            });
    };

    return (
        <div className="hero min-h-screen bg-base-200 py-10">
            <div className="card w-full max-w-lg shadow-2xl bg-base-100 p-8">
                <h2 className="text-3xl font-bold text-center text-primary mb-6">Create Account</h2>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Name Field */}
                    <div className="form-control">
                        <label className="label"><span className="label-text font-semibold">Full Name</span></label>
                        <input type="text" {...register("name", { required: true })} placeholder="Your Name" className="input input-bordered focus:input-primary" />
                        {errors.name && <span className="text-red-500 text-xs mt-1">Name is required</span>}
                    </div>

                    {/* Photo URL Field */}
                    <div className="form-control">
                        <label className="label"><span className="label-text font-semibold">Photo URL</span></label>
                        <input type="text" {...register("photoURL", { required: true })} placeholder="Image Link" className="input input-bordered focus:input-primary" />
                        {errors.photoURL && <span className="text-red-500 text-xs mt-1">Photo URL is required</span>}
                    </div>

                    {/* Email Field */}
                    <div className="form-control">
                        <label className="label"><span className="label-text font-semibold">Email Address</span></label>
                        <input type="email" {...register("email", { required: true })} placeholder="email@example.com" className="input input-bordered focus:input-primary" />
                    </div>

                    {/* Password Field */}
                    <div className="form-control">
                        <label className="label"><span className="label-text font-semibold">Password</span></label>
                        <input type="password" {...register("password", { 
                            required: true, 
                            minLength: 6,
                            pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/
                        })} placeholder="******" className="input input-bordered focus:input-primary" />
                        {errors.password?.type === 'minLength' && <span className="text-red-500 text-xs mt-1">Password must be 6 characters</span>}
                        {errors.password?.type === 'pattern' && <span className="text-red-500 text-xs mt-1">Add one capital letter and one special character</span>}
                    </div>

                    <div className="form-control mt-6">
                        <button className="btn btn-primary w-full text-white font-bold tracking-wider">REGISTER</button>
                    </div>
                </form>

                <p className="text-center mt-6 text-sm">
                    Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider"; // Register ফোল্ডার থেকে ২ ধাপ উপরে গিয়ে providers
import axiosSecure from "../../api"; // api ফাইল যদি সরাসরি src তে থাকে
import Swal from "sweetalert2";

const Register = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            // ১. ফায়ারবেসে ইউজার তৈরি
            const result = await createUser(data.email, data.password);
            
            // ২. ইউজারের নাম ও ছবি আপডেট
            await updateUserProfile(data.name, data.photoURL);

            // ৩. ডাটাবেসে (MongoDB) তথ্য সেভ করা
            const userInfo = {
                name: data.name,
                email: data.email,
                photo: data.photoURL,
                role: 'participant'
            };

            const res = await axiosSecure.post('/users', userInfo);
            if (res.data.insertedId || res.data.message === "User already exists") {
                reset();
                Swal.fire("Success", "Account Created Successfully!", "success");
                navigate('/');
            }
        } catch (error) {
            console.error(error);
            Swal.fire("Error", error.message, "error");
        }
    };

    return (
        <div className="hero min-h-screen bg-base-200 py-10">
            <div className="card w-full max-w-md shadow-2xl bg-base-100 p-8">
                <h2 className="text-3xl font-bold text-center mb-6 text-primary">Register Now</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="form-control">
                        <label className="label font-bold text-sm">Full Name</label>
                        <input {...register("name", { required: true })} type="text" placeholder="Your Name" className="input input-bordered focus:border-primary" />
                    </div>
                    <div className="form-control">
                        <label className="label font-bold text-sm">Photo URL</label>
                        <input {...register("photoURL", { required: true })} type="text" placeholder="https://image-link.com" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label font-bold text-sm">Email Address</label>
                        <input {...register("email", { required: true })} type="email" placeholder="email@example.com" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label font-bold text-sm">Password</label>
                        <input 
                            {...register("password", { 
                                required: true, 
                                minLength: 6,
                                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/
                            })} 
                            type="password" 
                            placeholder="******" 
                            className="input input-bordered" 
                        />
                        {errors.password && <span className="text-red-500 text-xs mt-1 font-medium">Add 1 capital letter & 1 special character</span>}
                    </div>
                    <button className="btn btn-primary w-full mt-4 text-white">REGISTER</button>
                </form>
                <p className="mt-6 text-center text-sm">
                    Already have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline">Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
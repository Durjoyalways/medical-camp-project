import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import axiosSecure from "../../api";

const ParticipantProfile = () => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        try {
            const res = await axiosSecure.patch(`/users/update/${user?.email}`, data);
            
            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    title: "Success!",
                    text: "Profile updated successfully!",
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false
                });
            } else {
                Swal.fire("Info", "No changes made to the profile.", "info");
            }
        } catch (error) {
            console.error("Update Error:", error);
            Swal.fire("Error", "Could not update profile. Please try again.", "error");
        }
    };

    return (
        <div className="max-w-2xl mx-auto my-10 bg-white p-10 rounded-2xl shadow-2xl border border-gray-100">
            <h2 className="text-3xl font-black mb-8 text-center text-gray-800">Manage Profile</h2>
            
            <div className="flex flex-col items-center mb-10">
                <div className="relative">
                    <img 
                        className="w-36 h-36 rounded-full border-4 border-primary p-1 object-cover shadow-lg" 
                        src={user?.photoURL || "https://i.ibb.co/0QZCv5C/user-placeholder.png"} 
                        alt="Profile" 
                    />
                </div>
                <div className="mt-4 text-center">
                    <p className="text-xl font-bold text-gray-700">{user?.displayName}</p>
                    <p className="text-gray-500 font-medium italic">{user?.email}</p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6">
                <div className="form-control">
                    <label className="label font-semibold">Full Name</label>
                    <input 
                        {...register("name")} 
                        defaultValue={user?.displayName} 
                        placeholder="Update your name" 
                        className="input input-bordered focus:border-primary transition-all" 
                    />
                </div>

                <div className="form-control">
                    <label className="label font-semibold">Photo URL</label>
                    <input 
                        {...register("photoURL")} 
                        defaultValue={user?.photoURL} 
                        placeholder="Profile picture link" 
                        className="input input-bordered focus:border-primary" 
                    />
                </div>

                <div className="form-control">
                    <label className="label font-semibold">Phone Number</label>
                    <input 
                        {...register("phone")} 
                        placeholder="Enter phone number" 
                        className="input input-bordered focus:border-primary" 
                    />
                </div>

                <button className="btn btn-primary w-full mt-4 text-white text-lg">
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default ParticipantProfile;
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";

const OrganizerProfile = () => {
    const { user, updateUserProfile } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        try {
            await updateUserProfile(data.name, data.photoURL);
            Swal.fire("Success!", "Profile updated successfully!", "success");
            setIsEditing(false);
        } catch (error) {
            Swal.fire("Error", error.message, "error");
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
            <h2 className="text-3xl font-bold mb-8 text-center text-primary">Organizer Profile</h2>
            
            <div className="flex flex-col items-center gap-6">
                <img src={user?.photoURL} alt="Profile" className="w-32 h-32 rounded-full border-4 border-primary object-cover" />
                
                {!isEditing ? (
                    <div className="text-center space-y-3 w-full">
                        <p className="text-xl font-semibold">Name: {user?.displayName}</p>
                        <p className="text-gray-600">Email: {user?.email}</p>
                        <button onClick={() => setIsEditing(true)} className="btn btn-primary mt-4 px-10">Update Profile</button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
                        <div className="form-control">
                            <label className="label">Full Name</label>
                            <input {...register("name")} defaultValue={user?.displayName} className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">Photo URL</label>
                            <input {...register("photoURL")} defaultValue={user?.photoURL} className="input input-bordered" required />
                        </div>
                        <div className="flex gap-4">
                            <button type="submit" className="btn btn-success flex-1 text-white">Save Changes</button>
                            <button type="button" onClick={() => setIsEditing(false)} className="btn btn-ghost flex-1 border">Cancel</button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default OrganizerProfile;
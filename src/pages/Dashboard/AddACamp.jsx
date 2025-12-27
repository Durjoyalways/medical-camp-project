import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axiosSecure from "../../api";

const AddACamp = () => {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        const campData = { 
            ...data, 
            fees: parseFloat(data.fees), 
            participantCount: 0 
        };
        
        try {
            const res = await axiosSecure.post('/camps', campData);
            if (res.data.insertedId) {
                Swal.fire("Success!", "Camp added successfully!", "success");
                reset();
            }
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Something went wrong!", "error");
        }
    };

    return (
        <div className="p-10 bg-white shadow-lg rounded-xl max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-primary">Add New Camp</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                    <label className="label font-semibold">Camp Name</label>
                    <input {...register("name")} className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label font-semibold">Image URL</label>
                    <input {...register("image")} className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label font-semibold">Camp Fees</label>
                    <input type="number" {...register("fees")} className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label font-semibold">Date & Time</label>
                    <input type="datetime-local" {...register("dateTime")} className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label font-semibold">Location</label>
                    <input {...register("location")} className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label font-semibold">Healthcare Professional</label>
                    <input {...register("healthcareProfessional")} className="input input-bordered" required />
                </div>
                <div className="form-control md:col-span-2">
                    <label className="label font-semibold">Description</label>
                    <textarea {...register("description")} className="textarea textarea-bordered h-24" required></textarea>
                </div>
                <button type="submit" className="btn btn-primary md:col-span-2 text-white">Add Camp</button>
            </form>
        </div>
    );
};

export default AddACamp;
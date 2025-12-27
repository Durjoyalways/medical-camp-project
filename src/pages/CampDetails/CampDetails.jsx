import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosSecure from "../../api";
import Swal from "sweetalert2";

const CampDetails = () => {
    const { id } = useParams();
    const [camp, setCamp] = useState({});
    const [loading, setLoading] = useState(true);

    // ১. ক্যাম্পের বিস্তারিত ডাটা লোড করা
    useEffect(() => {
        axiosSecure.get(`/camps/${id}`)
            .then(res => {
                setCamp(res.data);
                setLoading(false);
            });
    }, [id]);

    // ২. রেজিস্ট্রেশন সাবমিট করা
    const handleRegistration = async (e) => {
        e.preventDefault();
        const form = e.target;
        
        const registrationInfo = {
            campId: camp._id,
            campName: camp.name,
            campFees: camp.campFees,
            location: camp.location,
            participantName: form.participantName.value,
            participantEmail: form.participantEmail.value,
            phoneNumber: form.phone.value,
            gender: form.gender.value,
            emergencyContact: form.emergency.value,
            paymentStatus: "Unpaid", // ডিফল্ট স্ট্যাটাস
            confirmationStatus: "Pending" // ডিফল্ট স্ট্যাটাস
        };

        try {
            const res = await axiosSecure.post('/registered-camps', registrationInfo);
            if (res.data.insertedId) {
                Swal.fire("Success!", "You have registered successfully!", "success");
                document.getElementById('join_modal').close(); // মডাল বন্ধ করা
            }
        } catch (error) {
            Swal.fire("Error", "Registration failed. Try again.", "error");
        }
    };

    if (loading) return <div className="text-center py-20"><span className="loading loading-dots loading-lg"></span></div>;

    return (
        <div className="max-w-5xl mx-auto my-12 p-6 bg-base-100 shadow-2xl rounded-2xl border">
            <img src={camp.image} alt={camp.name} className="w-full h-96 object-cover rounded-xl mb-8" />
            
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-4xl font-bold text-primary mb-2">{camp.name}</h2>
                    <p className="text-xl text-gray-600 font-medium">Professional: {camp.professionalName}</p>
                </div>
                <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">${camp.campFees}</p>
                    <p className="text-sm text-gray-500">{camp.dateTime}</p>
                </div>
            </div>

            <p className="text-gray-700 leading-relaxed mb-8 text-lg">{camp.description}</p>

            {/* Join Camp Button - এটি ক্লিক করলে নিচের মডাল খুলবে */}
            <button 
                onClick={() => document.getElementById('join_modal').showModal()} 
                className="btn btn-primary btn-lg w-full text-white font-bold"
            >
                Join Camp
            </button>

            {/* --- Registration Modal Start --- */}
            <dialog id="join_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-2xl text-center mb-6">Register for {camp.name}</h3>
                    
                    <form onSubmit={handleRegistration} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" name="participantName" placeholder="Your Name" className="input input-bordered w-full" required />
                            <input type="email" name="participantEmail" placeholder="Your Email" className="input input-bordered w-full" required />
                        </div>
                        <input type="text" name="phone" placeholder="Phone Number" className="input input-bordered w-full" required />
                        
                        <div className="grid grid-cols-2 gap-4">
                            <select name="gender" className="select select-bordered w-full" required>
                                <option disabled selected>Gender</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select>
                            <input type="text" name="emergency" placeholder="Emergency Contact" className="input input-bordered w-full" required />
                        </div>

                        <div className="modal-action">
                            <button type="submit" className="btn btn-primary w-full text-white">Submit Registration</button>
                        </div>
                    </form>
                    
                    <button onClick={() => document.getElementById('join_modal').close()} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </div>
            </dialog>
            {/* --- Registration Modal End --- */}
        </div>
    );
};

export default CampDetails;
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosSecure from "../../api";
import Swal from "sweetalert2";

const CampDetails = () => {
    const { id } = useParams();
    const [camp, setCamp] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosSecure.get(`/camps/${id}`)
            .then(res => {
                setCamp(res.data);
                setLoading(false);
            });
    }, [id]);

    const handleRegistration = async (e) => {
        e.preventDefault();
        const form = e.target;
        
        const registrationInfo = {
            campId: camp._id,
            name: camp.name, // ডাটাবেজে 'name' আছে
            fees: camp.fees, // ১ নম্বর সংশোধন: 'campFees' এর বদলে 'fees' (আপনার ডাটাবেজ অনুযায়ী)
            location: camp.location,
            participantName: form.participantName.value,
            participantEmail: form.participantEmail.value,
            phoneNumber: form.phone.value,
            gender: form.gender.value,
            emergencyContact: form.emergency.value,
            paymentStatus: "Unpaid", 
            confirmationStatus: "Pending",
            dateTime: camp.dateTime 
        };

        try {
            const res = await axiosSecure.post('/registered-camps', registrationInfo);
            if (res.data.insertedId) {
                Swal.fire("Success!", "You have registered successfully!", "success");
                document.getElementById('join_modal').close();
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
                    {/* ২ নম্বর সংশোধন: ডাটাবেজে 'healthcareProfessional' নামে ফিল্ড আছে */}
                    <p className="text-xl text-gray-600 font-medium">Professional: {camp.healthcareProfessional}</p>
                </div>
                <div className="text-right">
                    {/* ৩ নম্বর সংশোধন: ডাটাবেজ অনুযায়ী 'fees' ব্যবহার করুন */}
                    <p className="text-2xl font-bold text-green-600">${camp.fees}</p>
                    <p className="text-sm text-gray-500">{new Date(camp.dateTime).toLocaleString()}</p>
                </div>
            </div>

            <p className="text-gray-700 leading-relaxed mb-8 text-lg">{camp.description}</p>

            <button 
                onClick={() => document.getElementById('join_modal').showModal()} 
                className="btn btn-primary btn-lg w-full text-white font-bold"
            >
                Join Camp
            </button>

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
                            <select name="gender" className="select select-bordered w-full" required defaultValue="">
                                <option value="" disabled>Gender</option>
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
        </div>
    );
};

export default CampDetails;
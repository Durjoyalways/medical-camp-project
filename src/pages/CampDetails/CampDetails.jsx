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
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    const handleRegistration = async (e) => {
        e.preventDefault();
        const form = e.target;
        
        const registrationInfo = {
            campId: camp._id,
            campName: camp.name,
            fees: camp.fees,
            location: camp.location,
            healthcareProfessional: camp.healthcareProfessional,
            participantName: form.participantName.value,
            participantEmail: form.participantEmail.value,
            phone: form.phone.value,
            gender: form.gender.value,
            emergencyContact: form.emergency.value,
            paymentStatus: "Unpaid", 
            confirmationStatus: "Pending"
        };

        try {
            const res = await axiosSecure.post('/registered-camps', registrationInfo);
            if (res.data.insertedId) {
                Swal.fire("Success!", "Registered successfully!", "success");
                document.getElementById('join_modal').close();
            }
        } catch (error) {
            Swal.fire("Error", "Registration failed.", "error");
        }
    };

    if (loading) return <div className="text-center py-20"><span className="loading loading-dots loading-lg"></span></div>;

    return (
        <div className="max-w-5xl mx-auto my-12 p-6 bg-base-100 shadow-2xl rounded-2xl border">
            <img src={camp.image} alt={camp.name} className="w-full h-[450px] object-cover rounded-xl mb-8" />
            
            <div className="flex flex-col md:flex-row justify-between mb-6">
                <div>
                    <h2 className="text-4xl font-bold text-primary mb-2">{camp.name}</h2>
                    <p className="text-xl text-gray-700">Expert: <span className="font-semibold">{camp.healthcareProfessional}</span></p>
                    <p className="text-lg text-gray-500 mt-1">Location: {camp.location}</p>
                </div>
                <div className="text-right mt-4 md:mt-0">
                    <p className="text-3xl font-bold text-green-600">${camp.fees}</p>
                    <p className="badge badge-secondary mt-2">Participants: {camp.participantCount}</p>
                </div>
            </div>

            <p className="text-gray-700 leading-relaxed mb-8 text-lg bg-gray-50 p-6 rounded-lg border-l-4 border-primary">
                {camp.description}
            </p>

            <button 
                onClick={() => document.getElementById('join_modal').showModal()} 
                className="btn btn-primary btn-lg w-full text-white"
            >
                Join Camp Now
            </button>

            {/* Registration Modal */}
            <dialog id="join_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box max-w-2xl">
                    <h3 className="font-bold text-2xl text-center mb-6">Register for {camp.name}</h3>
                    <form onSubmit={handleRegistration} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" name="participantName" placeholder="Full Name" className="input input-bordered w-full" required />
                        <input type="email" name="participantEmail" placeholder="Email" className="input input-bordered w-full" required />
                        <input type="text" name="phone" placeholder="Phone Number" className="input input-bordered w-full" required />
                        <select name="gender" className="select select-bordered w-full" required defaultValue="">
                            <option value="" disabled>Select Gender</option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </select>
                        <input type="text" name="emergency" placeholder="Emergency Contact" className="input input-bordered w-full col-span-full" required />
                        
                        <div className="modal-action col-span-full">
                            <button type="submit" className="btn btn-primary w-full">Submit Application</button>
                        </div>
                    </form>
                    <button onClick={() => document.getElementById('join_modal').close()} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </div>
            </dialog>
        </div>
    );
};

export default CampDetails;
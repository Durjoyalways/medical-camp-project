import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../api";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const RegisteredCamps = () => {
    const { user } = useContext(AuthContext);

    // ১. ডাটা ফেচিং (রুট আপডেট করা হয়েছে)
    const { data: registeredCamps = [], refetch, isLoading } = useQuery({
        queryKey: ['registeredcamps', user?.email], // কি-তে হাইফেন রাখা সমস্যা নেই
        queryFn: async () => {
            // ব্যাকেন্ড অনুযায়ী হাইফেন ছাড়া রুট: registeredcamps
            const res = await axiosSecure.get(`/registeredcamps/${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email
    });

    // ২. রেজিস্ট্রেশন ক্যানসেল ফাংশন (রুট আপডেট করা হয়েছে)
    const handleCancel = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This registration will be removed permanently!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, Cancel it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // ব্যাকেন্ড অনুযায়ী হাইফেন ছাড়া রুট
                    const res = await axiosSecure.delete(`/registeredcamps/${id}`);
                    if (res.data.deletedCount > 0) {
                        refetch();
                        Swal.fire("Cancelled!", "Registration removed.", "success");
                    }
                } catch (error) {
                    console.error("Delete error:", error);
                    Swal.fire("Error", "Could not cancel registration.", "error");
                }
            }
        });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center my-10">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 italic">My Registered Camps</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr className="bg-primary text-white text-sm uppercase tracking-wider">
                            <th className="rounded-tl-lg">Camp Name</th>
                            <th>Fees</th>
                            <th>Participant</th>
                            <th>Payment Status</th>
                            <th>Confirmation</th>
                            <th className="rounded-tr-lg text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registeredCamps.length > 0 ? (
                            registeredCamps.map(camp => (
                                <tr key={camp._id} className="hover:bg-blue-50 transition-colors border-b">
                                    <td className="font-semibold text-gray-700">
                                        {camp.campName || camp.name}
                                    </td>
                                    <td className="font-bold text-green-600">
                                        ${camp.fees || camp.campFees || "0"}
                                    </td>
                                    <td className="text-gray-600">
                                        {camp.participantName || user?.displayName}
                                    </td>
                                    <td>
                                        {camp.paymentStatus === 'Paid' ? (
                                            <span className="badge badge-success text-white font-medium p-3">Paid</span>
                                        ) : (
                                            <Link 
                                                to={`/dashboard/payment/${camp._id}`} 
                                                className="btn btn-xs btn-primary text-white px-4"
                                            >
                                                Pay
                                            </Link>
                                        )}
                                    </td>
                                    <td>
                                        <span className={`badge badge-outline font-semibold ${camp.confirmationStatus === 'Confirmed' ? 'text-green-600' : 'text-orange-500'}`}>
                                            {camp.confirmationStatus || 'Pending'}
                                        </span>
                                    </td>
                                    <td className="flex justify-center gap-2">
                                        <button 
                                            disabled={camp.paymentStatus === 'Paid'} 
                                            onClick={() => handleCancel(camp._id)}
                                            className="btn btn-xs btn-error text-white disabled:bg-gray-200 disabled:text-gray-400"
                                        >
                                            Cancel
                                        </button>
                                        
                                        {camp.paymentStatus === 'Paid' && (
                                            <button className="btn btn-xs btn-accent text-white">
                                                Feedback
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-10 text-gray-400 italic">
                                    You haven't registered for any camps yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RegisteredCamps;
import { useEffect, useState } from "react";
import axiosSecure from "../../api";
import Swal from "sweetalert2";

const ManageRegisteredCamps = () => {
    const [registrations, setRegistrations] = useState([]);

    const fetchRegistrations = async () => {
        try {
            const res = await axiosSecure.get('/registered-camps');
            setRegistrations(res.data);
        } catch (error) {
            console.error("Fetch Error:", error);
        }
    };

    useEffect(() => { fetchRegistrations(); }, []);

    const handleStatusUpdate = async (id) => {
        try {
            const res = await axiosSecure.patch(`/registered-camps/${id}`);
            if (res.data.modifiedCount > 0) {
                Swal.fire("Success", "Registration Confirmed!", "success");
                fetchRegistrations();
            }
        } catch (error) {
            Swal.fire("Error", "Failed to update.", "error");
            fetchRegistrations();
        }
    };

    const handleCancel = (id) => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Cancel!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/registered-camps/${id}`);
                    if (res.data.deletedCount > 0) {
                        Swal.fire("Deleted", "Record removed.", "success");
                        fetchRegistrations();
                    }
                } catch (error) {
                    Swal.fire("Error", "Failed to delete.", "error");
                    fetchRegistrations();
                }
            }
        });
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Manage Registered Camps</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead className="bg-gray-100 text-gray-600">
                        <tr>
                            <th>Participant</th>
                            <th>Camp</th>
                            <th>Fees</th>
                            <th>Payment</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registrations.map((reg) => (
                            <tr key={reg._id} className="hover:bg-gray-50">
                                <td className="font-medium">{reg.participantName}</td>
                                <td>{reg.campName}</td>
                                <td>${reg.campFees}</td>
                                <td>
                                    <span className={`badge ${reg.paymentStatus === 'Paid' ? 'badge-success' : 'badge-warning'}`}>
                                        {reg.paymentStatus}
                                    </span>
                                </td>
                                <td>
                                    <button 
                                        onClick={() => handleStatusUpdate(reg._id)}
                                        disabled={reg.paymentStatus === 'Unpaid' || reg.confirmationStatus === 'Confirmed'}
                                        className={`btn btn-xs ${reg.confirmationStatus === 'Confirmed' ? 'btn-success' : 'btn-primary'}`}
                                    >
                                        {reg.confirmationStatus || 'Pending'}
                                    </button>
                                </td>
                                <td>
                                    <button 
                                        onClick={() => handleCancel(reg._id)}
                                        disabled={reg.paymentStatus === 'Paid' && reg.confirmationStatus === 'Confirmed'}
                                        className="btn btn-xs btn-error text-white"
                                    >
                                        Cancel
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageRegisteredCamps;
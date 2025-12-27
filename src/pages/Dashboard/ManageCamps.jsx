import { useEffect, useState } from "react";
import axiosSecure from "../../api";
import { FaTrash, FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom"; // আপডেট বাটনের জন্য প্রয়োজন

const ManageCamps = () => {
    const [camps, setCamps] = useState([]);

    const loadCamps = async () => {
        try {
            const res = await axiosSecure.get('/camps');
            setCamps(res.data);
        } catch (error) {
            console.error("Error loading camps:", error);
        }
    };

    useEffect(() => {
        loadCamps();
    }, []);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This will delete the camp from Database!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/camps/${id}`);
                if (res.data.deletedCount > 0) {
                    Swal.fire("Deleted!", "Camp has been removed.", "success");
                    loadCamps(); 
                }
            }
        });
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">Manage All Camps</h2>
            <div className="overflow-x-auto">
                <table className="table w-full border-collapse">
                    <thead className="bg-blue-600 text-white text-center">
                        <tr>
                            <th>#</th>
                            <th>Camp Name</th>
                            <th>Date & Time</th>
                            <th>Location</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {camps.map((camp, index) => (
                            <tr key={camp._id} className="hover:bg-gray-50 border-b">
                                <td className="font-bold">{index + 1}</td>
                                <td className="font-semibold text-blue-700">{camp.name}</td>
                                <td>{camp.dateTime}</td>
                                <td>{camp.location}</td>
                                <td className="flex justify-center gap-4">
                                    {/* Update/Edit Button */}
                                    <Link to={`/dashboard/update-camp/${camp._id}`}>
                                        <button className="btn btn-sm btn-info text-white flex items-center gap-1">
                                            <FaEdit /> Edit
                                        </button>
                                    </Link>
                                    {/* Delete Button */}
                                    <button 
                                        onClick={() => handleDelete(camp._id)} 
                                        className="btn btn-sm btn-error text-white flex items-center gap-1"
                                    >
                                        <FaTrash /> Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {camps.length === 0 && (
                    <p className="text-center text-gray-500 mt-10 italic">No camps found in database.</p>
                )}
            </div>
        </div>
    );
};

export default ManageCamps;
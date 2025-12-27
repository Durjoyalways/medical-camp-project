import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosSecure from "../../api";

const AvailableCamps = () => {
    const [camps, setCamps] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCamps = async () => {
            try {
                const res = await axiosSecure.get('/camps');
                setCamps(res.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching camps:", error);
                setLoading(false);
            }
        };
        fetchCamps();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>;
    }

    return (
        <div className="max-w-7xl mx-auto py-12 px-4">
            <h2 className="text-4xl font-bold text-center mb-10 italic text-blue-800">Available Medical Camps</h2>
            
            <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-100">
                <table className="table w-full">
                    {/* Table Head */}
                    <thead className="bg-primary text-white text-lg">
                        <tr className="text-center">
                            <th>#</th>
                            <th>Camp Name</th>
                            <th>Date & Time</th>
                            <th>Location</th>
                            <th>Healthcare Professional</th>
                            <th>Fee</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {/* Table Body */}
                    <tbody className="text-center">
                        {camps.length > 0 ? (
                            camps.map((camp, index) => (
                                <tr key={camp._id} className="hover:bg-blue-50 transition-colors border-b">
                                    <td className="font-bold">{index + 1}</td>
                                    <td className="font-semibold text-gray-800">{camp.name}</td>
                                    <td>{camp.dateTime}</td>
                                    <td>{camp.location}</td>
                                    <td className="italic text-gray-600">{camp.professionalName}</td>
                                    <td className="font-bold text-green-600">
                                        {camp.campFees > 0 ? `$${camp.campFees}` : "Free"}
                                    </td>
                                    <td>
                                        <Link to={`/camp-details/${camp._id}`}>
                                            <button className="btn btn-sm btn-outline btn-primary px-5 hover:text-white">
                                                Details
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="py-20 text-gray-400 italic text-xl">
                                    No medical camps available right now.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AvailableCamps;
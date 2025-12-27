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
            <h2 className="text-4xl font-black text-center mb-10 text-blue-900 tracking-tight">
                Available Medical Camps
            </h2>
            
            <div className="overflow-x-auto bg-white rounded-2xl shadow-xl border border-gray-100">
                <table className="table w-full">
                    {/* Table Head */}
                    <thead className="bg-blue-600 text-white">
                        <tr className="text-center text-sm uppercase tracking-wider">
                            <th className="py-4">#</th>
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
                                <tr key={camp._id} className="hover:bg-blue-50 transition-all border-b border-gray-100">
                                    <td className="font-bold text-gray-500">{index + 1}</td>
                                    <td className="font-bold text-gray-800">{camp.name}</td>
                                    <td className="text-sm">
                                        {/* তারিখটি সুন্দরভাবে দেখানোর জন্য */}
                                        {new Date(camp.dateTime).toLocaleString([], {
                                            year: 'numeric', 
                                            month: 'short', 
                                            day: 'numeric', 
                                            hour: '2-digit', 
                                            minute: '2-digit'
                                        })}
                                    </td>
                                    <td>
                                        <div className="badge badge-ghost font-medium">{camp.location}</div>
                                    </td>
                                    <td className="text-gray-700 font-medium">
                                        {/* আপনার ডাটাবেজে এটি 'healthcareProfessional' নামে আছে */}
                                        {camp.healthcareProfessional}
                                    </td>
                                    <td className="font-black text-green-600">
                                        {/* আপনার ডাটাবেজে এটি 'fees' নামে আছে */}
                                        {camp.fees > 0 ? `$${camp.fees}` : <span className="text-blue-500">Free</span>}
                                    </td>
                                    <td>
                                        <Link to={`/camp-details/${camp._id}`}>
                                            <button className="btn btn-sm btn-primary rounded-full px-6 hover:shadow-lg transition-shadow text-white border-none bg-gradient-to-r from-blue-600 to-blue-500">
                                                Details
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="py-24 text-gray-400 italic text-xl">
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
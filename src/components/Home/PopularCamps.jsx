import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaUsers } from "react-icons/fa";
import axiosSecure from "../../api"; // আপনার axios instance এর পাথ চেক করে নিন

const PopularCamps = () => {
    const [camps, setCamps] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPopularCamps = async () => {
            try {
                // আমরা ব্যাকেন্ড থেকে সর্ট করা ডাটা নিয়ে আসব
                const res = await axiosSecure.get('/popular-camps');
                setCamps(res.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching popular camps:", error);
                setLoading(false);
            }
        };
        fetchPopularCamps();
    }, []);

    if (loading) {
        return <div className="text-center py-20"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
    }

    return (
        <div className="max-w-7xl mx-auto py-20 px-4">
            <h2 className="text-4xl font-bold text-center mb-4 italic">Popular Medical Camps</h2>
            <p className="text-center text-gray-500 mb-10">Most joined camps by our community</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                {camps.map(camp => (
                    <div key={camp._id} className="card bg-base-100 shadow-xl overflow-hidden border hover:shadow-2xl transition-shadow">
                        <figure className="h-56 relative">
                            <img src={camp.image} alt={camp.name} className="w-full h-full object-cover" />
                            <div className="absolute top-4 right-4 badge badge-primary p-3 font-bold">
                                {camp.campFees > 0 ? `৳ ${camp.campFees}` : "Free"}
                            </div>
                        </figure>
                        <div className="card-body">
                            <h3 className="card-title text-2xl font-bold text-gray-800">{camp.name}</h3>
                            <div className="flex justify-between items-center text-sm text-gray-500 mt-2">
                                <span>📅 {camp.dateTime}</span>
                                <span>📍 {camp.location}</span>
                            </div>
                            <p className="mt-2 font-medium text-gray-700">Healthcare: {camp.healthcareProfessionalName}</p>
                            
                            <div className="flex items-center gap-2 mt-2 text-primary font-bold bg-blue-50 w-fit px-3 py-1 rounded-full text-sm">
                                <FaUsers /> {camp.participantCount || 0} Registered
                            </div>
                            
                            <div className="card-actions mt-4">
                                <Link to={`/camp-details/${camp._id}`} className="btn btn-outline btn-primary w-full group">
                                    Details <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="text-center mt-12">
                <Link to="/available-camps" className="btn btn-primary px-10 rounded-full shadow-lg">
                    See All Camps
                </Link>
            </div>
        </div>
    );
};

export default PopularCamps;
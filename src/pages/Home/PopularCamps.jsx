import { useEffect, useState } from "react";
import axiosSecure from "../../api"; // আপনার স্ট্রাকচার অনুযায়ী পাথ
import { Link } from "react-router-dom";

const PopularCamps = () => {
    const [camps, setCamps] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosSecure.get('/popular-camps')
            .then(res => {
                setCamps(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching camps:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-center my-10"><span className="loading loading-spinner loading-lg"></span></div>;

    return (
        <div className="my-20 px-4">
            <h2 className="text-4xl font-bold text-center mb-10">Popular Medical Camps</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {camps.map(camp => (
                    <div key={camp._id} className="card bg-base-100 shadow-xl border overflow-hidden">
                        <figure><img src={camp.image} alt={camp.name} className="h-56 w-full object-cover" /></figure>
                        <div className="card-body">
                            <h2 className="card-title text-primary">{camp.name}</h2>
                            <p className="text-gray-600 font-semibold">Doctor: {camp.healthcareProfessional}</p>
                            <div className="flex justify-between items-center mt-2">
                                <span className="badge badge-outline p-3">Fee: ${camp.fees}</span>
                                <span className="text-sm font-medium">Joined: {camp.participantCount || 0}</span>
                            </div>
                            <div className="card-actions mt-4">
                                <Link to={`/camp-details/${camp._id}`} className="btn btn-primary btn-block">Details</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-center mt-10">
                <Link to="/available-camps" className="btn btn-outline btn-primary px-8">See All Camps</Link>
            </div>
        </div>
    );
};

export default PopularCamps;
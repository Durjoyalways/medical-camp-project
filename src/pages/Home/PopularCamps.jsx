import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaCalendarAlt, FaMapMarkerAlt, FaUserMd } from "react-icons/fa";

const PopularCamps = () => {
    const [camps, setCamps] = useState([]);

    // ডাটাবেজ থেকে সর্বোচ্চ পার্টিসিপেন্ট অনুযায়ী ৬টি ক্যাম্প নিয়ে আসা
    useEffect(() => {
        fetch('https://your-server-link.vercel.app/popular-camps') // আপনার ব্যাকেন্ড API লিঙ্ক
            .then(res => res.json())
            .then(data => setCamps(data));
    }, []);

    return (
        <section className="py-16 bg-white max-w-7xl mx-auto px-4">
            {/* সেকশন টাইটেল */}
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-800">Popular Medical Camps</h2>
                <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
                <p className="mt-4 text-gray-600">সবচেয়ে বেশি অংশগ্রহণকারী আমাদের সেরা ৬টি মেডিকেল ক্যাম্প</p>
            </div>

            {/* ক্যাম্প কার্ড গ্রিড */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {camps.slice(0, 6).map((camp) => (
                    <div key={camp._id} className="group card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
                        {/* ইমেজ সেকশন */}
                        <figure className="relative h-56 overflow-hidden">
                            <img 
                                src={camp.image} 
                                alt={camp.name} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                            />
                            <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full font-bold shadow-md">
                                ৳ {camp.fees === 0 ? "Free" : camp.fees}
                            </div>
                        </figure>

                        {/* ডিটেইলস সেকশন */}
                        <div className="card-body p-6">
                            <h3 className="card-title text-xl font-bold text-gray-800 truncate" title={camp.name}>
                                {camp.name}
                            </h3>
                            
                            <div className="space-y-3 mt-4 text-gray-600 text-sm">
                                <div className="flex items-center gap-2">
                                    <FaCalendarAlt className="text-primary" />
                                    <span>{camp.dateTime}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaMapMarkerAlt className="text-primary" />
                                    <span>{camp.location}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaUserMd className="text-primary" />
                                    <span className="font-medium">Lead: {camp.healthcareProfessional}</span>
                                </div>
                                <div className="flex items-center gap-2 font-bold text-gray-800">
                                    <FaUsers className="text-blue-500" />
                                    <span>Participants: {camp.participantCount}</span>
                                </div>
                            </div>

                            <div className="card-actions mt-6">
                                <Link 
                                    to={`/camp-details/${camp._id}`} 
                                    className="btn btn-primary w-full text-white font-bold rounded-lg border-none"
                                >
                                    Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* See All Camps বাটন */}
            <div className="text-center mt-12">
                <Link to="/available-camps">
                    <button className="btn btn-outline btn-primary px-10 rounded-full font-bold hover:scale-105 transition-transform">
                        See All Camps
                    </button>
                </Link>
            </div>
        </section>
    );
};

export default PopularCamps;
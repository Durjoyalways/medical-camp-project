import { Link } from "react-router-dom";
import { FaArrowRight, FaUsers } from "react-icons/fa";

const PopularCamps = () => {
    // সাধারণত এটি আপনি MongoDB থেকে ডাটা ফেচ করবেন
    const camps = [
        { id: 1, name: "Children's Vaccination Drive", image: "https://images.unsplash.com/photo-1632053003254-46328329668d?q=80&w=2070", price: 0, date: "25 Dec, 2025", location: "Dhaka", healthcareProfessional: "Dr. Sarah Khan", participantCount: 150 },
        { id: 2, name: "Cardiology Check-up", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070", price: 500, date: "10 Jan, 2026", location: "Chittagong", healthcareProfessional: "Dr. Ahmed Joy", participantCount: 85 }
    ];

    return (
        <div className="max-w-7xl mx-auto py-20 px-4">
            <h2 className="text-4xl font-bold text-center mb-4">Popular Medical Camps</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                {camps.map(camp => (
                    <div key={camp.id} className="card bg-base-100 shadow-xl overflow-hidden border">
                        <figure className="h-56 relative">
                            <img src={camp.image} alt={camp.name} className="w-full h-full object-cover" />
                            <div className="absolute top-4 right-4 badge badge-primary p-3">৳ {camp.price}</div>
                        </figure>
                        <div className="card-body">
                            <h3 className="card-title text-2xl font-bold">{camp.name}</h3>
                            <div className="flex justify-between items-center text-sm text-gray-500 mt-2">
                                <span>📅 {camp.date}</span>
                                <span>📍 {camp.location}</span>
                            </div>
                            <p className="mt-2 font-medium">Healthcare: {camp.healthcareProfessional}</p>
                            <div className="flex items-center gap-2 mt-2 text-primary font-bold">
                                <FaUsers /> {camp.participantCount} Registered
                            </div>
                            <div className="card-actions mt-4">
                                <Link to={`/camp-details/${camp.id}`} className="btn btn-outline btn-primary w-full">Details <FaArrowRight /></Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-center mt-12">
                <Link to="/available-camps" className="btn btn-primary px-10 rounded-full">See All Camps</Link>
            </div>
        </div>
    );
};
export default PopularCamps;
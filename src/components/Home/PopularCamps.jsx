import { Link } from "react-router-dom";

const PopularCamps = () => {
    // আপাতত ডামি ডাটা, পরে API থেকে আসবে
    const camps = [1, 2, 3, 4, 5, 6];

    return (
        <div className="py-20 px-4 max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Popular Medical Camps</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {camps.map(camp => (
                    <div key={camp} className="card bg-base-100 shadow-xl border border-gray-100 hover:scale-105 transition-transform">
                        <figure className="h-52 bg-gray-200">
                            <p className="text-gray-400">Camp Image</p>
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title text-primary font-bold text-2xl">Health Care Camp {camp}</h2>
                            <p className="text-gray-600">Location: Dhaka, Bangladesh</p>
                            <div className="flex justify-between items-center mt-4">
                                <span className="font-semibold text-lg">Fee: $50</span>
                                <Link to="/camp-details/1" className="btn btn-outline btn-primary btn-sm">Details</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-center mt-12">
                <Link to="/available-camps" className="btn btn-primary px-10">See All Camps</Link>
            </div>
        </div>
    );
};

export default PopularCamps;
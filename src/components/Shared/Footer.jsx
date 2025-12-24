import { Link } from "react-router-dom"; // এই লাইনটি মিসিং ছিল

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-4 italic">MediCamp</h2>
                    <p className="text-sm italic">
                        Providing quality healthcare through community-driven medical camps.
                    </p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                    <ul className="text-sm space-y-2">
                        {/* এখন এই Link ট্যাগগুলো কাজ করবে */}
                        <li><Link to="/" className="hover:text-primary">Home</Link></li>
                        <li><Link to="/available-camps" className="hover:text-primary">Available Camps</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
                    <p className="text-sm">Email: info@medicamp.com</p>
                    <p className="text-sm">Phone: +880 1234 567 890</p>
                </div>
            </div>
            <div className="border-t border-gray-800 py-6 text-center text-xs">
                <p>&copy; {new Date().getFullYear()} MediCamp. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
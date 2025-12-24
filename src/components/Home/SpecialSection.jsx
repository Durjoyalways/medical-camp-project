const SpecialSection = () => {
    return (
        <div className="relative py-24 bg-primary text-white text-center overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mt-16"></div>
            <div className="relative z-10 px-4">
                <h2 className="text-4xl md:text-5xl font-black mb-6">Become a Medical Volunteer</h2>
                <p className="text-xl max-w-2xl mx-auto opacity-90 mb-10">Join our network of healthcare professionals and volunteers to make a real difference in underserved communities.</p>
                <button className="btn btn-lg bg-white text-primary border-none hover:bg-gray-100 rounded-full px-12">Register Now</button>
            </div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mb-32"></div>
        </div>
    );
};
export default SpecialSection;
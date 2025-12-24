const Banner = () => {
    return (
        <div className="relative w-full h-[500px] bg-blue-600 flex items-center justify-center text-white overflow-hidden">
            <div className="absolute inset-0 opacity-30">
                <img src="https://i.ibb.co/hV7PqYV/medical-team.jpg" alt="Banner" className="w-full h-full object-cover" />
            </div>
            <div className="relative z-10 text-center px-4">
                <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">Saving Lives, One Camp at a Time</h1>
                <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">Explore our impactful success stories and see how your participation makes a difference in the community.</p>
                <button className="btn btn-primary mt-8 px-8 rounded-full">Explore Stories</button>
            </div>
        </div>
    );
};

export default Banner;
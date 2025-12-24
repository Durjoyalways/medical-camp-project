const Feedback = () => {
    const reviews = [
        { name: "Rahim Uddin", feedback: "The eye surgery camp was a blessing. I can see clearly now after 3 years!", rating: 5 },
        { name: "Fatima Akter", feedback: "Very well managed and the doctors were extremely professional.", rating: 5 }
    ];

    return (
        <div className="bg-base-200 py-20 px-4">
            <h2 className="text-4xl font-bold text-center mb-10">What People Say</h2>
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                {reviews.map((r, i) => (
                    <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border-l-4 border-primary">
                        <div className="text-yellow-400 mb-2">⭐⭐⭐⭐⭐</div>
                        <p className="italic text-gray-600 mb-4">"{r.feedback}"</p>
                        <h4 className="font-bold">- {r.name}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Feedback;
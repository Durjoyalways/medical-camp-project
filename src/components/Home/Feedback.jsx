const Feedback = () => {
    return (
        <div className="bg-gray-50 py-20 px-4 text-center">
            <h2 className="text-4xl font-bold mb-12">What Our Participants Say</h2>
            <div className="flex flex-wrap justify-center gap-6">
                {[1, 2].map(review => (
                    <div key={review} className="max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="avatar">
                                <div className="w-12 rounded-full ring ring-primary ring-offset-2">
                                    <img src="https://i.ibb.co/mR7099X/user.png" alt="user" />
                                </div>
                            </div>
                            <div className="text-left">
                                <h4 className="font-bold">John Doe</h4>
                                <p className="text-xs text-gray-500">2 days ago</p>
                            </div>
                        </div>
                        <p className="text-left text-gray-600 italic">"The medical camp was very well organized. The doctors were friendly and the registration process was smooth. Highly recommended!"</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Feedback;
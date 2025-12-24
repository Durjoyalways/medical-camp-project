const AvailableCamps = () => {
    return (
        <div className="max-w-7xl mx-auto py-12 px-4">
            <h2 className="text-4xl font-bold text-center mb-8 italic">Available Medical Camps</h2>
            <div className="overflow-x-auto">
                <table className="table w-full border border-gray-200">
                    <thead className="bg-primary text-white text-lg">
                        <tr>
                            <th>#</th>
                            <th>Camp Name</th>
                            <th>Date & Time</th>
                            <th>Location</th>
                            <th>Fee</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Free Dental Checkup</td>
                            <td>20 Dec, 2025 - 10:00 AM</td>
                            <td>Chittagong</td>
                            <td className="font-bold text-green-600">Free</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AvailableCamps;
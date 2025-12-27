import { useQuery } from "@tanstack/react-query";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import axiosSecure from "../../api";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const Analytics = () => {
    const { user } = useContext(AuthContext);

    const { data: stats = [] } = useQuery({
        queryKey: ['participant-stats', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/registered-camps/${user?.email}`);
            return res.data;
        }
    });

    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-primary">Lifetime Analytics</h2>
            <div style={{ width: '100%', height: 400 }}>
                <ResponsiveContainer>
                    <BarChart data={stats}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="campName" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="campFees" fill="#8884d8" barSize={50}>
                            {stats.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <p className="text-center mt-4 text-gray-500 italic">Visualization of fees across your registered camps.</p>
        </div>
    );
};

export default Analytics;
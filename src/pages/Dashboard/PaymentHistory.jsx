import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth"; 
import axiosSecure from "../../api"; 

const PaymentHistory = () => {
    const { user } = useAuth();

    const { data: payments = [], isLoading, isError } = useQuery({
        queryKey: ['payments', user?.email],
        enabled: !!user?.email, // ইমেইল পাওয়া গেলেই কেবল কোয়েরি চলবে
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment-history/${user?.email}`);
            return res.data;
        }
    });

    if (isLoading) return <div className="text-center p-10 font-bold">Loading transactions...</div>;
    
    if (isError) return <div className="text-center p-10 text-red-500">Failed to load history.</div>;

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6 italic">Payment History</h2>
            
            <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
                <table className="table w-full">
                    {/* Table Header */}
                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th>#</th>
                            <th>Amount</th>
                            <th>Transaction ID</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.length > 0 ? (
                            payments.map((payment, index) => (
                                <tr key={payment._id} className="hover:bg-gray-50 border-b transition-colors">
                                    <th>{index + 1}</th>
                                    <td className="font-bold text-green-600">${payment.price}</td>
                                    <td className="font-mono text-sm text-gray-600">{payment.transactionId}</td>
                                    <td>
                                        <span className="badge badge-success p-3 text-white">
                                            {payment.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center py-10 text-gray-500 font-medium">
                                    No transaction records found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;
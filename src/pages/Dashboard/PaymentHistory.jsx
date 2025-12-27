import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../api";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const PaymentHistory = () => {
    const { user } = useContext(AuthContext);
    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment-history/${user?.email}`);
            return res.data;
        }
    });

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Payment History</h2>
            <table className="table table-zebra w-full">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Camp Name</th>
                        <th>Fees</th>
                        <th>Transaction ID</th>
                        <th>Confirmation</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((p, i) => (
                        <tr key={p._id}>
                            <td>{i + 1}</td>
                            <td>{p.campName}</td>
                            <td>${p.price}</td>
                            <td className="text-blue-600 font-mono">{p.transactionId}</td>
                            <td><span className="badge badge-success">Paid</span></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PaymentHistory;
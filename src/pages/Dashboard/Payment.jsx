import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axiosSecure from "../../api";
import CheckoutForm from "./CheckoutForm";

// Stripe Promise (Ensure your .env has this key)
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
    const { id } = useParams();
    
    const { data: campData, isLoading, isError, error } = useQuery({
        queryKey: ['payment-camp', id],
        queryFn: async () => {
            try {
                // আপনার নতুন ব্যাকেন্ড অনুযায়ী হাইফেন ছাড়া রুট
                const res = await axiosSecure.get(`/registeredcamps/id/${id}`);
                return res.data;
            } catch (err) {
                console.error("Fetch Error:", err.response);
                throw err;
            }
        },
        enabled: !!id 
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (isError || !campData) {
        return (
            <div className="text-center p-10 bg-red-50 rounded-xl border border-red-200 mt-10 max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold text-red-600 mb-2">Payment Data Not Found!</h2>
                <p className="text-gray-600 font-mono text-sm">Target ID: {id}</p>
                <p className="text-red-400 mt-2">{error?.message}</p>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-2xl rounded-2xl border">
            <h2 className="text-3xl font-black text-center mb-10 text-gray-800 italic uppercase tracking-wider">Checkout</h2>

            <div className="grid md:grid-cols-2 gap-6 mb-10">
                <div className="p-6 bg-indigo-50 rounded-2xl border-b-4 border-indigo-500">
                    <p className="text-xs font-bold text-indigo-500 uppercase">Camp Name</p>
                    <h3 className="text-xl font-bold text-gray-700">{campData.name || campData.campName}</h3>
                </div>
                <div className="p-6 bg-emerald-50 rounded-2xl border-b-4 border-emerald-500 text-right">
                    <p className="text-xs font-bold text-emerald-500 uppercase">Total Fees</p>
                    <h3 className="text-3xl font-black text-emerald-600">${campData.fees}</h3>
                </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border shadow-inner">
                {/* Stripe Elements wrapping the CheckoutForm */}
                <Elements stripe={stripePromise}>
                    <CheckoutForm campData={campData} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;
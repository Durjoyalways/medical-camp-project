import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../api";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// Stripe Public Key 
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
    const { id } = useParams();

    const { data: campData, isLoading, isError } = useQuery({
        queryKey: ['payment-camp', id],
        queryFn: async () => {
            // আপনার ব্যাকেন্ডে রেজিস্টার্ড ক্যাম্পের তথ্য পেতে এই কলটি হচ্ছে
            const res = await axiosSecure.get(`/registeredcamps/id/${id}`);
            return res.data;
        }
    });

    if (isLoading) {
        return (
            <div className="flex flex-col justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg text-primary"></span>
                <p className="mt-4 text-blue-500 font-semibold animate-pulse">Connecting to Secure Server...</p>
            </div>
        );
    }
    
    if (isError || !campData) {
        return (
            <div className="p-10 text-center">
                <div className="text-red-500 text-2xl font-bold mb-2">Connection Failed!</div>
                <p className="text-gray-600">Could not fetch camp details. Please check your backend or try again later.</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-10 bg-white shadow-xl rounded-2xl mt-10 border border-gray-100">
            <h2 className="text-3xl font-extrabold mb-6 text-gray-800 border-b pb-4">
                <span className="text-primary italic">Checkout</span> Details
            </h2>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl mb-10 border border-blue-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="text-gray-500 text-sm uppercase tracking-wider font-bold">Camp Name</p>
                        <p className="text-xl font-semibold text-gray-800">{campData.name || campData.campName}</p>
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm uppercase tracking-wider font-bold">Total Fees</p>
                        <p className="text-3xl text-green-600 font-black">${campData.fees}</p>
                    </div>
                </div>
            </div>

            {/* Stripe Elements Provider */}
            <div className="p-6 border-2 border-dashed border-gray-200 rounded-2xl">
                <Elements stripe={stripePromise}>
                    {/* আমরা পুরো campData টি পাঠাচ্ছি যাতে CheckoutForm এ campData._id ব্যবহার করা যায় */}
                    <CheckoutForm campData={campData} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;
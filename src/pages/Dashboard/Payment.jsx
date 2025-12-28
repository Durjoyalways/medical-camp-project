import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../api";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// Stripe Public Key (Ensure this is in your .env)
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
    const { id } = useParams();

    const { data: campData, isLoading, isError } = useQuery({
        queryKey: ['payment-camp', id],
        queryFn: async () => {
            // আপনার ব্যাকেন্ড রুট অনুযায়ী কল
            const res = await axiosSecure.get(`/registeredcamps/id/${id}`);
            console.log("Server Connection Success! Data:", res.data);
            return res.data;
        }
    });

    if (isLoading) return <div className="p-10 text-center text-blue-500">Connecting to Server...</div>;
    
    if (isError || !campData) return <div className="p-10 text-center text-red-500">Connection Failed! Check Backend Console.</div>;

    return (
        <div className="max-w-4xl mx-auto p-10">
            <h2 className="text-3xl font-bold mb-5 italic border-b-2">Checkout Details</h2>
            <div className="bg-blue-50 p-5 rounded-xl mb-10 shadow-sm border border-blue-100">
                <p className="text-lg">Camp Name: <b>{campData.name || campData.campName}</b></p>
                <p className="text-2xl text-green-600 font-bold mt-2">Total Fees: ${campData.fees}</p>
            </div>

            {/* ডাটাটি CheckoutForm এ পাঠানো হচ্ছে */}
            <Elements stripe={stripePromise}>
                <CheckoutForm campData={campData} />
            </Elements>
        </div>
    );
};

export default Payment;
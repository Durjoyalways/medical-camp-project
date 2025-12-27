import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axiosSecure from "../../api";
import { AuthContext } from "../../providers/AuthProvider";

const CheckoutForm = ({ campData }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [clientSecret, setClientSecret] = useState("");
    const [processing, setProcessing] = useState(false);

    // ১. পেমেন্ট ইনটেন্ট তৈরি (Backend থেকে সিক্রেট আনা)
    useEffect(() => {
        if (campData?.fees > 0) {
            axiosSecure.post('/create-payment-intent', { price: campData.fees })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                });
        }
    }, [campData?.fees]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements || processing) return;

        const card = elements.getElement(CardElement);
        if (card === null) return;

        setProcessing(true);

        // ২. Stripe-এর মাধ্যমে পেমেন্ট কনফার্ম করা
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName || 'anonymous',
                    email: user?.email || 'unknown'
                }
            }
        });

        if (error) {
            setProcessing(false);
            Swal.fire("Error", error.message, "error");
        } else if (paymentIntent.status === 'succeeded') {
            // ৩. পেমেন্ট সফল হলে আপনার ব্যাকেন্ডে ডাটা সেভ করা
            const paymentDetails = {
                transactionId: paymentIntent.id,
                registrationId: campData._id,
                campId: campData.campId,
                participantEmail: user?.email,
                fees: campData.fees,
                date: new Date(),
                paymentStatus: 'Paid'
            };

            const res = await axiosSecure.post('/payments', paymentDetails);
            
            if (res.data.paymentResult.insertedId) {
                Swal.fire("Success!", `Payment Successful. ID: ${paymentIntent.id}`, "success");
                navigate('/dashboard/payment-history');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="p-3 border rounded-lg bg-white mb-5">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': { color: '#aab7c4' },
                            },
                            invalid: { color: '#9e2146' },
                        },
                    }}
                />
            </div>
            <button 
                type="submit" 
                disabled={!stripe || !clientSecret || processing}
                className="btn btn-primary w-full text-white font-bold"
            >
                {processing ? "Processing..." : `Pay $${campData.fees}`}
            </button>
        </form>
    );
};

export default CheckoutForm;
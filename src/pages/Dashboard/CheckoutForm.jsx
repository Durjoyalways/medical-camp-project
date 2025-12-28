import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axiosSecure from "../../api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ campData }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [clientSecret, setClientSecret] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const [processing, setProcessing] = useState(false);

    const price = campData?.fees || 0;

    useEffect(() => {
        if (price > 0) {
            axiosSecure.post("/create-payment-intent", { price })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                });
        }
    }, [price]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (card === null) return;

        setProcessing(true);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            Swal.fire("Error", error.message, "error");
            setProcessing(false);
            return;
        }

        // পেমেন্ট কনফার্ম করা
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                },
            },
        });

        if (confirmError) {
            Swal.fire("Error", confirmError.message, "error");
            setProcessing(false);
        } else {
            if (paymentIntent.status === 'succeeded') {
                setTransactionId(paymentIntent.id);

                // ডাটাবেসে সেভ করার জন্য পেমেন্ট অবজেক্ট
                const paymentInfo = {
                    email: user.email,
                    price: price,
                    transactionId: paymentIntent.id,
                    date: new Date(), // তারিখ সেভ করা হচ্ছে
                    registrationId: campData._id, // registeredCamps এর আইডি
                    campId: campData.campId, // অরিজিনাল ক্যাম্প আইডি
                    campName: campData.campName || campData.name,
                    status: 'Paid'
                };

                // ব্যাকেন্ডে ডাটা পাঠানো (এটি পেমেন্ট এবং স্ট্যাটাস আপডেট দুইটাই করবে)
                const res = await axiosSecure.post('/payments', paymentInfo);
                
                if (res.data.paymentResult.insertedId) {
                    Swal.fire({
                        icon: "success",
                        title: "Payment Successful!",
                        text: `Transaction ID: ${paymentIntent.id}`,
                    });
                    navigate('/dashboard/payment-history');
                }
                setProcessing(false);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md border">
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
            <button
                className="btn btn-primary btn-block mt-8 text-white"
                type="submit"
                disabled={!stripe || !clientSecret || processing}
            >
                {processing ? "Processing..." : `Pay $${price}`}
            </button>
            {transactionId && <p className="text-green-600 mt-4 text-center font-bold">Transaction Complete!</p>}
        </form>
    );
};

export default CheckoutForm;
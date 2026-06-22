"use client";

import { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();
  const user = session?.user;

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price: 1500 }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret) return;

    setLoading(true);

    const card = elements.getElement(CardElement);

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          email: user?.email,
        },
      },
    });

    if (result.error) {
      alert(result.error.message);
      setLoading(false);
      return;
    }

    console.log(result.paymentIntent.status);

    if (result.paymentIntent.status === "succeeded") {
      const premiumRes = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/users/premium/${user.email}`,
        {
          method: "PATCH",
        },
      );

      const premiumData = await premiumRes.json();

      console.log(premiumData);

      if (premiumData.modifiedCount > 0) {
        router.push("/payment-success");
      } else {
        alert("Payment success but premium update failed");
      }
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto border rounded-xl p-6"
    >
      <CardElement className="p-4 border rounded-lg" />

      <button
        disabled={!stripe || !clientSecret || loading}
        className="w-full bg-orange-500 text-white py-3 rounded-xl mt-5"
      >
        {loading ? "Processing..." : "Pay ৳1500"}
      </button>
    </form>
  );
}

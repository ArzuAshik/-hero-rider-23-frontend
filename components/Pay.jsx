import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "./Button";

export default function Pay({ user }) {
  const { vehicleType, email } = user;
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // payment handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: { email, name: user.name },
        },
      });

    // updating database after payment
    if (!confirmError && paymentIntent.status === "succeeded") {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch(`${baseURL}/update-payment-info`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            payment: paymentIntent.amount / 100,
            paymentID: paymentIntent.id,
          }),
        });
        const updateResult = await res.json();
        if (updateResult.success) {
          const user = JSON.parse(localStorage.getItem("user"));
          user.payment = paymentIntent.amount / 100;
          localStorage.setItem("user", JSON.stringify(user));
          setPaymentSuccess(paymentIntent.amount / 100);
          toast.success("Payment Successful.");
        }
      } catch (error) {
        toast.error("Something is Wrong.");
      }
    } else {
      toast.error("Something is Wrong.");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetch(`${baseURL}/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ vehicleType, email }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  if (paymentSuccess)
    return (
      <div>
        <h4>Paid: ${paymentSuccess}</h4>
      </div>
    );

  return (
    <div
      style={{
        maxWidth: 450,
        margin: "auto",
        boxShadow: "0px 5px 5px gray",
        padding: 16,
        borderRadius: 8,
      }}
    >
      <h3 style={{ textAlign: "center" }}>Your Payment Status is Unpaid.</h3>
      <p style={{ textAlign: "center" }}>
        Please Pay{" "}
        <span style={{ textTransform: "uppercase", fontWeight: "bold" }}>
          ${vehicleType === "car" ? 200 : 100}
        </span>{" "}
        to learn{" "}
        <span style={{ textTransform: "uppercase", fontWeight: "bold" }}>
          {vehicleType}
        </span>
      </p>
      <form onSubmit={handleSubmit} style={{ margin: "8px 0" }}>
        <CardElement />
        <div style={{ marginTop: 8 }}>
          <Button type="submit" disabled={!stripe || !clientSecret || loading}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

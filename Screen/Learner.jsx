import Pay from "@/components/Pay";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51J4nbqCGTM1umYl0bvwI8l4BHSMvlKFTOod82ROvWoNHrslcwHRK52oVCYBvK1Dg4wPYEurWWHUZOZ4N4fNLMBn900Nw60Bq4q"
);

export default function Learner({ user }) {
  const { payment } = user;

  return (
    <Elements stripe={stripePromise}>
      <div>
        <h2 style={{ textAlign: "center" }}>Rider Info</h2>
        {payment ? (
          <h4>Paid: ${payment}</h4>
        ) : (
          <Pay user={user} />
        )}
      </div>
    </Elements>
  );
}

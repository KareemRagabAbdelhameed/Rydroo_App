import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import useTripsId from "../hooks/useTripsId";
import api from "../config/axiosConfig";
import { Loader } from "lucide-react";
import { Button } from "../components/ui/Button";
import { toast } from "react-toastify";

export default function PaymentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const { data: trip, isLoading } = useTripsId(id);
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [seats, setSeats] = useState(1);
  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const res = await api.post("/payment", {
          tripId: id,
          seats
        });
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.log(err);
      }
    };

    createPaymentIntent();
  }, [id,seats]);

  if (isLoading || !clientSecret) return <Loader />;

  const handlePayment = async () => {
    if (!stripe || !elements) return;

    setLoading(true);
    const cardElement = elements?.getElement(CardElement);
    if (!cardElement) {
        return; // أو اعمل error message
      }
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement ,
        },
      }
    );

    if (error) {
      toast(error.message);
      setLoading(false);
    } else if (paymentIntent.status === "succeeded") {
      await api.patch(`/trips/${id}/book`, {
        seats,
        paymentIntentId: paymentIntent.id
      });
    
      navigate(`/payment/${id}/done`);
    }
  };

  return (
    <div className="min-h-screen bg-forthMainColor flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-md p-8 w-full max-w-xl">
        
        <h2 className="text-2xl font-bold mb-6 text-center">
          إتمام الحجز
        </h2>

        <div className="flex items-center justify-between mb-4">
  <span>عدد المقاعد</span>

  <div className="flex items-center gap-3">
    <button
      onClick={() => seats > 1 && setSeats(seats - 1)}
      className="px-3 py-1 bg-gray-200 rounded"
    >
      -
    </button>

    <span className="font-bold text-maincolor">{seats}</span>

    <button
      onClick={() =>
        seats < trip!.data.availableSeats && setSeats(seats + 1)
      }
      className="px-3 py-1 bg-gray-200 rounded"
    >
      +
    </button>
  </div>
</div>

        <div className="bg-gray-50 p-4 rounded-xl mb-6">
          <div className="flex justify-between">
            <span>{trip!.data.source} → {trip!.data.destination}</span>
            <span className="font-bold text-maincolor">
              {trip!.data.price  * seats} ج.م
            </span>
          </div>
        </div>

        <div className="border p-4 rounded-xl mb-6">
          <CardElement />
        </div>

        <Button
          onClick={handlePayment}
          disabled={loading}
          className="w-full py-5 text-lg"
        >
          {loading ? "جاري الدفع..." : "ادفع الآن"}
        </Button>
      </div>
    </div>
  );
}
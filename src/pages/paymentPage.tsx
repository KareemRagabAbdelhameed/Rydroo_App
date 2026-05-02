import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";

import useTripsId from "../hooks/useTripsId";
import api from "../config/axiosConfig";

import { Loader } from "lucide-react";
import { Button } from "../components/ui/Button";
import { toast } from "react-toastify";

export default function PaymentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const stripe = useStripe();
  const elements = useElements();

  const { data: trip, isLoading } =
    useTripsId(id);

  // جاية من TripDetails
  const selectedSeats: number[] =
    location.state?.selectedSeats || [];

  const [clientSecret, setClientSecret] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    if (
      !selectedSeats ||
      selectedSeats.length === 0
    ) {
      navigate(`/trips/${id}`);
      return;
    }

    const createPaymentIntent =
      async () => {
        try {
          const res =
            await api.post(
              "/payment",
              {
                tripId: id,
                selectedSeats,
              }
            );

          setClientSecret(
            res.data.clientSecret
          );
        } catch (err) {
          console.log(err);
          toast(
            "Failed to initialize payment"
          );
        }
      };

    createPaymentIntent();
  }, [
    id,
    selectedSeats,
    navigate,
  ]);

  if (
    isLoading ||
    !clientSecret
  )
    return <Loader />;

  const handlePayment =
    async () => {
      if (
        !stripe ||
        !elements
      )
        return;

      setLoading(true);

      const cardElement =
        elements.getElement(
          CardElement
        );

      if (!cardElement) {
        setLoading(false);
        return;
      }

      const {
        error,
        paymentIntent,
      } =
        await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: {
              card:
                cardElement,
            },
          }
        );

      if (error) {
        toast(
          error.message
        );

        setLoading(
          false
        );

        return;
      }

      if (
        paymentIntent?.status ===
        "succeeded"
      ) {
        try {
          await api.patch(
            `/trips/${id}/book`,
            {
              selectedSeats,
              paymentIntentId:
                paymentIntent.id,
            }
          );

          navigate(
            `/payment/${id}/done`
          );
        } catch (
          err: any
        ) {
          toast(
            err?.response
              ?.data
              ?.message ||
              "Booking failed"
          );

          setLoading(
            false
          );
        }
      }
    };

  const totalPrice =
    trip!.data.price *
    selectedSeats.length;

  return (
    <div className="min-h-screen bg-forthMainColor flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-md p-8 w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">
          إتمام الحجز
        </h2>

        {/* selected seats */}
        <div className="flex items-center justify-between mb-4">
          <span>
            المقاعد المختارة
          </span>

          <div className="flex gap-2 flex-wrap">
            {selectedSeats.map(
              (
                seat
              ) => (
                <span
                  key={
                    seat
                  }
                  className="px-3 py-1 bg-maincolor text-white rounded"
                >
                  {
                    seat
                  }
                </span>
              )
            )}
          </div>
        </div>

        {/* trip summary */}
        <div className="bg-gray-50 p-4 rounded-xl mb-6">
          <div className="flex justify-between">
            <span>
              {
                trip!.data
                  .source
              }{" "}
              →
              {
                trip!.data
                  .destination
              }
            </span>

            <span className="font-bold text-maincolor">
              {
                totalPrice
              }{" "}
              ج.م
            </span>
          </div>
        </div>

        {/* stripe */}
        <div className="border p-4 rounded-xl mb-6">
          <CardElement />
        </div>

        <Button
          onClick={
            handlePayment
          }
          disabled={
            loading
          }
          className="w-full py-5 text-lg"
        >
          {loading
            ? "جاري الدفع..."
            : "ادفع الآن"}
        </Button>
      </div>
    </div>
  );
}
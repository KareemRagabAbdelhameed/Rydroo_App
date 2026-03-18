import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { InferType } from "yup";

import useTripsId from "../../hooks/useTripsId";
import useUpdateTrip from "../../hooks/useUpdateTrip";
import { updateTripSchema } from "../../validation";
import { ArrowLeft } from "lucide-react";

type FormValues = InferType<typeof updateTripSchema>;

type CityKey = "suez" | "moneib" | "marg" | "ramses" | "salam" | "zagazig";

const fromCities: CityKey[] = ["suez"];
const toCities: CityKey[] = ["moneib", "marg", "ramses", "salam", "zagazig"];

const citiesAr: Record<CityKey, string> = {
  suez: "السويس",
  moneib: "المنيب",
  marg: "المرج",
  ramses: "رمسيس",
  salam: "السلام",
  zagazig: "الزقازيق",
};

const citiesEn: Record<CityKey, string> = {
  suez: "Suez",
  moneib: "AlMonieb",
  marg: "AlMarg",
  ramses: "Ramses",
  salam: "AlSalam",
  zagazig: "Zagazig",
};

// Mapping عكسي لتحويل قيمة الباك إلى key للفورم
const reverseCities: Record<string, CityKey> = {
  Suez: "suez",
  AlMonieb: "moneib",
  AlMarg: "marg",
  Ramses: "ramses",
  AlSalam: "salam",
  Zagazig: "zagazig",
};

const UpdateTrip = () => {
  const { id } = useParams();

  const { data, isLoading } = useTripsId(id);
  const trip = data?.data;

  const { mutate, isPending } = useUpdateTrip();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: "onChange",
  });

  // ✅ fill form with trip data
  useEffect(() => {
    if (trip) {
      reset({
        source: reverseCities[trip.source],
        destination: reverseCities[trip.destination],
        date: trip.date.split("T")[0],
        time: trip.time,
        price: trip.price,
        availableSeats: trip.availableSeats,
        driverProfile: trip.driverProfile._id,
      });
    }
  }, [trip, reset]);

  // ✅ submit
  const onSubmit = (formData: FormValues) => {
    if (!id) return;

    const payload = {
      source: {
        en: citiesEn[formData.source as CityKey],
        ar: citiesAr[formData.source as CityKey],
      },
      destination: {
        en: citiesEn[formData.destination as CityKey],
        ar: citiesAr[formData.destination as CityKey],
      },
      date: new Date(formData.date).toISOString(),
      time: formData.time,
      availableSeats: formData.availableSeats,
      price: formData.price,
      currency: "EGP",
      driverProfileId: formData.driverProfile,
    };

    mutate({
       id,
      tripData: payload,
    });
  };

  // ✅ loading skeleton
  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-3xl mx-auto">
        <Link to={"/admin/trips"}>
      <ArrowLeft className="w-10 h-10 mb-4 cursor-pointer" />
      </Link>
      <h2 className="text-xl font-bold mb-6">Update Trip</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4"
      >
        {/* Source */}
        <select {...register("source")} className="border p-2 rounded cursor-pointer">
          {fromCities.map((city) => (
            <option key={city} value={city}>
              {citiesEn[city]} - {citiesAr[city]}
            </option>
          ))}
        </select>

        {/* Destination */}
        <div>
          <select {...register("destination")} className="border p-2 rounded w-full cursor-pointer">
            <option value="">Select destination</option>
            {toCities.map((city) => (
              <option key={city} value={city}>
                {citiesEn[city]} - {citiesAr[city]}
              </option>
            ))}
          </select>
          <p className="text-red-500 text-sm">{errors.destination?.message}</p>
        </div>

        {/* Date */}
        <div>
          <input
            type="date"
            {...register("date")}
            className="border p-2 rounded w-full "
          />
          <p className="text-red-500 text-sm">{errors.date?.message}</p>
        </div>

        {/* Time */}
        <div>
          <input
            type="time"
            {...register("time")}
            className="border p-2 rounded w-full"
          />
          <p className="text-red-500 text-sm">{errors.time?.message}</p>
        </div>

        {/* Available Seats */}
        <div>
          <input
            type="number"
            {...register("availableSeats")}
            className="border p-2 rounded w-full"
            placeholder="Available Seats"
          />
          <p className="text-red-500 text-sm">{errors.availableSeats?.message}</p>
        </div>

        {/* Price */}
        <div>
          <input
            type="number"
            {...register("price")}
            className="border p-2 rounded w-full"
            placeholder="Price"
          />
          <p className="text-red-500 text-sm">{errors.price?.message}</p>
        </div>

        {/* Driver */}
        <div className="col-span-2">
          <select
            {...register("driverProfile")}
            className="border p-2 rounded w-full"
          >
            <option value="">Select Driver</option>
            {/* لو عندك hook للـ available drivers، هنا ممكن تعمل map */}
            <option value={trip?.driverProfile._id}>
              {trip?.driverProfile.user.firstName} {trip?.driverProfile.user.lastName}
            </option>
          </select>
          <p className="text-red-500 text-sm">{errors.driverProfile?.message}</p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!isValid || isPending}
          className={`col-span-2 py-2 rounded-lg text-white 
            ${!isValid ? "bg-gray-400" : "bg-orange-500 hover:bg-orange-600"}`}
        >
          {isPending ? "Updating..." : "Update Trip"}
        </button>
      </form>
    </div>
  );
};

export default UpdateTrip;
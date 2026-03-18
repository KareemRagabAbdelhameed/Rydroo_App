import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useAvailableDrivers from "../../hooks/useAvailableDrivers";
import { addTripSchema } from "../../validation";
import type { InferType } from "yup";
import useAddTrip from "../../hooks/useAddTrip";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

type FormValues = InferType<typeof addTripSchema>;

type CityKey = "suez" | "moneib" | "marg" | "ramses" | "salam" | "zagazig";

const fromCities: CityKey[] = ["suez"];
const toCities: CityKey[] = ["moneib", "marg", "ramses", "salam", "zagazig"];

const citiesAr = {
  suez: "السويس",
  moneib: "المنيب",
  marg: "المرج",
  ramses: "رمسيس",
  salam: "السلام",
  zagazig: "الزقازيق",
};

const citiesEn = {
  suez: "Suez",
  moneib: "AlMonieb",
  marg: "AlMarg",
  ramses: "Ramses",
  salam: "AlSalam",
  zagazig: "Zagazig",
};


const AddTrip = () => {

  const { data } = useAvailableDrivers();

  const {mutate,isPending} = useAddTrip();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: yupResolver(addTripSchema),
    mode: "onChange",
    defaultValues: {
      source: "suez",
    },
  });

  const onSubmit = (dataForm: FormValues) => {
    const payload = {
      source: {
        en: citiesEn[dataForm.source as CityKey],
        ar: citiesAr[dataForm.source as CityKey],
      },
      destination: {
        en: citiesEn[dataForm.destination as CityKey],
        ar: citiesAr[dataForm.destination as CityKey],
      },
      date: dataForm.date,
      time: dataForm.time,
      availableSeats: dataForm.availableSeats,
      price: dataForm.price,
      currency: "EGP",
      driverProfileId: dataForm.driverProfileId,
    };
  
    mutate(payload);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <Link to={"/admin/trips"}>
      <ArrowLeft className="w-10 h-10 mb-4 cursor-pointer" />
      </Link>
      <h2 className="text-xl font-bold mb-6">Add Trip</h2>

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
            className="border p-2 rounded w-full cursor-pointer"
          />
          <p className="text-red-500 text-sm">{errors.date?.message}</p>
        </div>

        {/* Time */}
        <div>
          <input
            type="time"
            {...register("time")}
            className="border p-2 rounded w-full cursor-pointer"
          />
          <p className="text-red-500 text-sm">{errors.time?.message}</p>
        </div>

        {/* Seats */}
        <div>
          <input
            type="number"
            {...register("availableSeats")}
            className="border p-2 rounded w-full cursor-pointer"
            placeholder="Available Seats"
          />
          <p className="text-red-500 text-sm">{errors.availableSeats?.message}</p>
        </div>

        {/* Price */}
        <div>
          <input
            type="number"
            {...register("price")}
            className="border p-2 rounded w-full cursor-pointer"
            placeholder="Price"
          />
          <p className="text-red-500 text-sm">{errors.price?.message}</p>
        </div>

        {/* Driver */}
        <div className="col-span-2">
          <select
            {...register("driverProfileId")}
            className="border p-2 rounded w-full cursor-pointer"
          >
            <option value="">Select Driver</option>

            {data?.map((driver) => (
              <option key={driver._id} value={driver._id}>
                {driver.user.firstName} {driver.user.lastName}
              </option>
            ))}
          </select>

          <p className="text-red-500 text-sm">
            {errors.driverProfileId?.message}
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!isValid}
          className={`col-span-2 py-2 rounded-lg text-white 
          ${!isValid ? "bg-gray-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600 cursor-pointer"}`}
        >
         {isPending ? "Adding..." : "Add Trip"}
        </button>

      </form>
    </div>
  );
};

export default AddTrip;
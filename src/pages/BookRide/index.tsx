import CarName from "./CarName"
import Destination from "./Destination"
import MapWrapper from "./MapWrapper"
import RideInfoSection from "./RideInfoSection"
import { useState } from "react"

const BookRide = () => {
  const [passengers, setPassengers] = useState<number>(1);
  return (
    <div>
      <MapWrapper />
      <CarName />
      <Destination
        passengers={passengers}
        setPassengers={setPassengers}
      />
 <RideInfoSection passengers={passengers} />    </div>
  )
}

export default BookRide

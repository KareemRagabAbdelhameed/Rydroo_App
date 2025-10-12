import CarName from "./CarName"
import Destination from "./destination"
import MapWrapper from "./MapWrapper"
import RideInfoSection from "./RideInfoSection"

const BookRide = () => {
  return (
    <div>
      <MapWrapper />
      <CarName />
      <Destination />
      <RideInfoSection />
    </div>
  )
}

export default BookRide

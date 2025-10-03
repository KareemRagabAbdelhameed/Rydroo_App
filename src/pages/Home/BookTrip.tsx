import carImage from "../../assets/images/car.png"
const BookTrip = () => {
  return (
    <div className="w-full">
      <div className="bg-maincolor px-4 py-16 my-6">
        <h1 className="text-5xl font-bold text-white">Book Your Trip</h1>
        
      </div>
      <img className="absolute top-[555px] left-[126px]" src={carImage} alt="Car For trip" />
    </div>
  )
}

export default BookTrip

import { CarTaxiFront } from "lucide-react"
import useTrips from "../../hooks/useTrips"
import { Link } from "react-router-dom";

const Trips = () => {
  
  
  const {data:tripsData , error , isLoading} = useTrips();
  
    const renderTripasData = tripsData?.length === 0 ? <p className="text-center text-lg">No Trips Exist</p>
    : tripsData?.map(({_id,availableSeats,date,day,destination,time})=> <Link to={`/trips/${_id}`}>
    <div className="mt-6 flex items-center gap-3">
    <span className="bg-forthMainColor w-[74px] h-[74px] rounded-full flex items-center justify-center">
<CarTaxiFront className="text-maincolor w-[28px] h-[28px]" />
</span>
      <div className="text-secondMainColor dark:text-white" key={_id}>
          <h1 className="text-xl font-semibold">{destination} Trip</h1>
          <p>There are {availableSeats} Seats Available</p>
      </div>
      <div className="text-secondMainColor dark:text-white">
          <p className="text-xl font-semibold">{time}</p>
          <p className="">{day}</p>
          <p className="">{date}</p>
      </div>
    </div>
    </Link>
    )
    if(error){
      return <p className="text-red-500">{error.message}</p>
    }
    if(isLoading){
      return <p>Loading...</p>
    }
  return (
    <div className='mb-28 w-[90%] mx-auto overflow-x-hidden'>
      <div className="flex justify-between space-y-4 dark:text-white">
        <h1 className="text-3xl font-bold">Trips</h1>
        <button className="underline">See all</button>
      </div>
      {renderTripasData}
    </div>
  )
}

export default Trips

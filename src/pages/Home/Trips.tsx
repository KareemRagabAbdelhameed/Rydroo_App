import { CarTaxiFront } from "lucide-react"
import { TripsData } from "../../mock/Data"

const Trips = () => {
    const renderTripasData = TripsData.length === 0 ? <p className="text-center text-lg">No Trips Exist</p>
    : TripsData.map(({title,seatsAvailable,time,day,date})=><div className="mt-6 flex items-center gap-3">
    <span className="bg-forthMainColor w-[74px] h-[74px] rounded-full flex items-center justify-center">
<CarTaxiFront className="text-maincolor w-[28px] h-[28px]" />
</span>
      <div className="text-secondMainColor dark:text-white">
          <h1 className="text-xl font-semibold">{title}</h1>
          <p>There are {seatsAvailable} Seats Available</p>
      </div>
      <div className="text-secondMainColor dark:text-white">
          <p className="text-xl font-semibold">{time}</p>
          <p className="">{day}</p>
          <p className="">{date}</p>
      </div>
    </div>
    )
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

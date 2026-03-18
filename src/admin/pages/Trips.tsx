import { Loader } from "lucide-react";
import useTrips from "../../hooks/useTrips";
import { Link } from "react-router-dom";
import useDeleteTrip from "../../hooks/useDeleteTrip";

const AdminTrips = () => {
  const {data:tripsData , error , isLoading} = useTrips();
  const {mutate:cancelTrip} = useDeleteTrip();

  if(error){
    return <p>error</p>
  }
  if(isLoading){
    return <Loader />
  }
    return (
      <>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Trips Management</h2>
  
          <Link to={"/admin/trips/add-trip"} className="bg-maincolor hover:bg-orange-600 text-white px-4 py-2 rounded-lg">
            + Add Trip
          </Link>
        </div>
  
        <table className="w-full text-left">
          <thead className="border-b">
            <tr>
              <th className="py-2">Source</th>
              <th>Destination</th>
              <th>Date</th>
              <th>Time</th>
              <th>Price</th>
              <th>Available Seats</th>
              <th>Driver</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
  
          <tbody>
            {tripsData?.length === 0 ? <p>no trips exist</p> : 
            tripsData?.map(({_id,source,destination,date,time,price,availableSeats,driverProfile})=>
              <tr className="border-b hover:bg-gray-50" key={_id}>
              
              
            <td className="py-3">{source}</td>
            <td>{destination}</td>
            <td>{date.split("T")[0]}</td>
            <td>{time}</td>
            <td>{price}</td>
            <td>{availableSeats}</td>
            <td>{driverProfile.user.firstName} {driverProfile.user.lastName}</td>
            <td>
              <span className="px-3 py-1 text-sm bg-green-100 text-green-600 rounded-full">
                Active
              </span>
            </td>
            <td className="space-x-2">
              <Link to={`/admin/trips/update-trip/${_id}`} className="text-blue-500">Edit</Link>
              <button onClick={()=>cancelTrip(_id)} className="text-red-500">Cancel</button>
            </td>
            
            
          </tr>
            )
            }
          </tbody>
        </table>
      </div>
      </>
    );
  };
  
  export default AdminTrips;
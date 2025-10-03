
const Position = () => {
  return (
    <div className="my-12 w-[90%] mx-auto">
      {/* from wher */}
      <div className="mb-10">
        
<form className="">
  <label htmlFor="cities" className="block mb-4 text-lg font-semibold text-gray-900 dark:text-white">Where Are You Now?</label>
  <select id="cities" className=" bg-forthMainColor border-forthMainColor text-gray-900 text-md block w-[170px] h-[48px] rounded-[40px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    <option selected>Choose your city</option>
    <option value="CA">Cairo</option>
    <option value="FU">Fayoum</option>
    <option value="GI">Giza</option>
    <option value="AL">Alexandria</option>
  </select>
</form>

      </div>
      {/* To Where */}
      <div>
      <div>
      <form className="">
  <label htmlFor="cities" className="block mb-4 text-lg font-semibold text-gray-900 dark:text-white">To Where?</label>
  <select id="cities" className=" bg-forthMainColor border-forthMainColor text-gray-900 text-md block w-[240px] h-[54px] rounded-[40px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    <option selected>Choose your destination</option>
    <option value="CA">Cairo</option>
    <option value="FU">Fayoum</option>
    <option value="GI">Giza</option>
    <option value="AL">Alexandria</option>
  </select>
</form>
      </div>
      </div>
    </div>
  )
}

export default Position

import { ArrowUpRight, QrCode } from "lucide-react"

const Header = () => {
  return (
    <div className="mb-6 w-[90%] mx-auto">
      <div className="bg-secondMainColor py-4 pl-6 pr-4 flex justify-between rounded-full text-white">
        <h1 className=" text-xl">Your SEAT CODE <br /> 1122 </h1>
        <div className="flex gap-4">
        <QrCode className="w-10 h-10" />
        <span className="w-10 h-10 rounded-full bg-maincolor pl-[10px] pt-[10px]">
        <ArrowUpRight className="w-5 h-5" />
        </span>
        </div>
      </div>
    </div>
  )
}

export default Header

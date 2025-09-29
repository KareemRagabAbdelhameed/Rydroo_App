interface IProps {
    text1 : string,
    text2 : string
}
const CircleShape = ({text1,text2}:IProps) => {
  return (
      <div className="relative h-[250px]">
        {/* Circle */}
        <div className="absolute top-[-465px] left-[-184px] w-[700px] h-[700px] bg-maincolor rounded-full"></div>

        {/* Text */}
        <h1 className="w-[214px] h-[110px] absolute top-24 left-9 sm:left-20 text-white text-3xl font-bold z-10">
          {text1} <br /> {text2}
        </h1>
      </div>
  )
}

export default CircleShape

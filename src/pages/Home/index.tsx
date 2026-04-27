import Navbar from "../../components/Navbar"
// import { Features } from "./Features"

import HeroSection from "./HeroSection"
import PriceSection from "./PriceSection"
import DestinationsSection from "./DestinationsSection"
// import { HowItWorks } from "./HowItWork"

const HomePage = () => {
  return (
    <div className="overflow-x-hidden">
      <Navbar/>
      <HeroSection />
      <PriceSection />
      <DestinationsSection />
       {/* <Features />
       <HowItWorks /> */}
    </div>
  )
}

export default HomePage

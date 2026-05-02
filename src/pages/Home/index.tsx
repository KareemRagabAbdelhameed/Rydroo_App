import Navbar from "../../components/Navbar"
// import { Features } from "./Features"

import HeroSection from "./HeroSection"
import PriceSection from "./PriceSection"
import SafetySection from "./SafetySection"
import SocialImpactSection from "./SocialImpactSection"
import RadioSection from "./RadioSection"
import DestinationsSection from "./DestinationsSection"
// import { HowItWorks } from "./HowItWork"

const HomePage = () => {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <PriceSection />
      <SafetySection />
      <SocialImpactSection />
      <DestinationsSection />
      <RadioSection />
      {/* <Features />
       <HowItWorks /> */}
    </div>
  )
}

export default HomePage

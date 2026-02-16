import Navbar from "../../components/Navbar"
import { Features } from "./Features"

import HeroSection from "./HeroSection"
import { HowItWorks } from "./HowItWork"

const HomePage = () => {
  return (
    <div className="overflow-x-hidden">
      <Navbar/>
      <HeroSection />
       <Features />
       <HowItWorks />
    </div>
  )
}

export default HomePage

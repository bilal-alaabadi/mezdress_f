import React from 'react'
import Banner from './Banner'
// import HeroSection from './HeroSection'
import TrendingProducts from '../shop/TrendingProducts'
// import DealsSection from './DealsSection'
// import PromoBanner from './PromoBanner'
import HeroSection from './HeroSection'

const Home = () => {
  return (
    <>
    <Banner/>
    <HeroSection/>
    <TrendingProducts/>
    {/* <PromoBanner/> */}
    </>
  )
} 

export default Home
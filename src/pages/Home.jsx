import React from 'react'
import HeroCarousel from '../components/HeroCarousel'
import Categories from "../components/Categories"
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <HeroCarousel/>
      <Categories/>
      <Footer/>
    </div>
  )
}

export default Home
import React from 'react'
import Sdata from './SData'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import sliderImg1 from '../assests/sliderImg1.jpg'
import sliderImg2 from '../assests/sliderImg2.jpg'
import sliderImg3 from '../assests/sliderImg3.jpg'
import sliderImg4 from '../assests/sliderImg4.jpg'
import './Donut.css'

const Donut = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    // appendDots: (dots) => {
    //   return <ul style={{ margin: '0px' }}>{dots}</ul>
    // }

  }


  return (
    <>
      <div className="slider-container">
        <Slider {...settings}>
          <div className='slide'>
            <img src={sliderImg1} alt="Slide 1"  />
          </div>
          <div className='slide'>
            <img src={sliderImg2} alt="Slide 2"/>
            {/* <div className="slider-text-overlay">
          </div> */}
          </div>
          <div className='slide'>
            <img src={sliderImg3} alt="Slide 3" />
          </div>
          <div className='slide'>
            <img src={sliderImg4} alt="Slide 4" />
          </div>
        </Slider>
      </div>
    </>
  )
}
export default Donut;   
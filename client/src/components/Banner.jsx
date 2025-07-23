import React, { useState } from 'react'
import Slider from "react-slick";


const Banner = () => {
    const [dotActive ,setDotActive]= useState(0)
    let settings = {
        dots: true,
        infinite: true,
        autoplay :true,
        speed: 800,
        beforeChange:(prev,next) =>{setDotActive(next)},
        slidesToShow: 1,
        slidesToScroll: 1,
        appendDots: dots => (
            <div
              style={{
                
                position : 'absolute',
                top : '70%',
                left : '45%',
                width :'207px',
                transform : "translate(-50%-50%)"
              }}
            >
              <ul style={{ width : '100%' ,display : 'flex', alignItems : 'center', justifyContent : 'space-between'}}> {dots} </ul>
            </div>
          ),
          customPaging: i => (
            <div
              style={
                i === dotActive ? {
                width: "30px",
                height : "30px",
                borderRadius : "50%",
                display : "flex",
                alignItems : 'center',
                justifyContent : 'center',
                background : 'black',
                padding : '8px 0',
                cursor : 'pointer',
                color: "white",
                border: "1px gray solid"
              } : 
              {
                width: "30px",
                height : "30px",
                borderRadius : "50%",
                display : "flex",
                alignItems : 'center',
                justifyContent : 'center',
                background : 'white',
                padding : '8px 0',
                cursor : 'pointer',
                color: "black",
                border: "1px gray solid"
              }
              }
            >
              {i + 1}
            </div>
          )
      
      };
  return (
    <div className='w-full'>
        <div className='w-full h-full relative'>
        <Slider {...settings}>
            <div>
                <img src="/src/assets/slider1.webp" alt="" />
            </div>
            <div>
                <img src="/src/assets/slider2.jpg" alt="" />
            </div>
            <div>
                <img src="/src/assets/slider3.jpg" alt="" />
            </div>
            <div>
                <img src="/src/assets/slider4.webp" alt="" />
            </div>
            {/* <div>
                <h3>5</h3>
            </div>
            <div>
                <h3>6</h3>
            </div> */}
        </Slider>
        </div>
    </div>
  )
}

export default Banner
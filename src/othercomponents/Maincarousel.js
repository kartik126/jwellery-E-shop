import React, { Component } from 'react'
import "./maincarousel.css"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel'
const options = {
  showThumbs: false,
  showStatus: false,
  infiniteLoop: true,
  onSwipeMove: true,
};
export class Maincarousel extends Component {
  render() {
    return (
      <div className='carousel-div'>
       <Carousel {...options}>
                <div>
                    <img src="/images/1.webp" />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src="/images/1.webp" />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src="/images/1.webp" />
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel>
      </div>
    )
  }
}

export default Maincarousel
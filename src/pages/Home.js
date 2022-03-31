import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import Maincarousel from '../othercomponents/Maincarousel'
export class Home extends Component {
  render() {
    return (
      <div className='home-main'>
        <Navbar/>
        <Maincarousel/>
      </div>
    )
  }
}

export default Home
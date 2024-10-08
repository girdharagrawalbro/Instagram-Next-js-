import React from 'react'
import Signup from '../components/Signup'
import ImgContainer from '../components/ImgContainer'
export const metadata = {
    title: "Instagram - Signup",
    description: "Generated by create next app",
  };
  
const page = () => {
    return (
        <div className="container d-flex justify-content-center gap-lg-5 align-items-center py-3">
            <ImgContainer />
            <Signup />
        </div>
    )
}

export default page
import React from 'react'
import Header from '../components/Header'

const About = () => {
  return (
    <>
      <Header />
      <div className='my-5 container'>
        <h2 className='text-center'>About</h2>
        <p className='mt-4'>
          Dragon Distance is a web application where users can find information
          about COVID case. Users can also alert other people in order to help
          reduce COVID case.
        </p>
        <p>
          Dragon Distance is built with a sole purpose to spread information
          about COVID so that people can be more cautious.
        </p>
      </div>
    </>
  )
}

export default About

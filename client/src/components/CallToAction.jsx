import { Button } from 'flowbite-react'
import React from 'react'

const CallToAction = () => {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
        <div className='flex-1 justify-center flex flex-col'>
            <h2 className='text-2xl'>
                Want to learn more about JavaScript?
            </h2>
            <p className='text-gray-500 my-2'>
                Checkout these resources with 100 JavaScript Projects
            </p>
            <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none'>
                <a href="https://www.100jsprojects.com" target='_blank' rel='noopener noreferrer'>
                100 JavaScript Projects
                </a>
            </Button>
        </div>
        <div className='p-7 flex-1'>
            <img src="https://img.freepik.com/free-vector/hand-drawn-web-developers_23-2148819604.jpg?t=st=1743422848~exp=1743426448~hmac=200f2ad5eb488bb03ada09752693b2a3de88a21d3dd6398f2871d905580bbbad&w=1380" />
        </div>
    </div>
  )
}

export default CallToAction
import React from 'react'
import CallToAction from '../components/CallToAction'

const About = () => {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-2xl mx-auto p-3 text-center'>
        <div>
          <h1 className='text-5xl font-semibold text-center my-7 text-gray-800 dark:text-gray-300'>
            About InspireHub's Blog
          </h1>
          <div className='text-md text-gray-600 flex flex-col gap-6 dark:text-gray-400'>
            <p>
              Welcome to InspireHub's Blog! This blog was created by Deepanshu Pandey
              as a personal project to share his thoughts and ideas with the
              world. Deepanshu is a passionate developer who loves to write about
              technology, coding, and everything in between.
            </p>
            <p>
              On this blog, you'll find weekly articles and tutorials on topics
              such as web development, software engineering, and programming
              languages. Deepanshu is always learning and exploring new
              technologies, so be sure to check back often for new content!
            </p>

            <p>
              We encourage you to leave comments on our posts and engage with
              other readers. You can like other people's comments and reply to
              them as well. We believe that a community of learners can help
              each other grow and improve.
            </p>
          </div>
        </div>
        <div className='mt-10'>
          <CallToAction />
        </div>
      </div>
    </div>
  )
}

export default About

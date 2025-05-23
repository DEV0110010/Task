import { Footer } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'
import {BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble} from 'react-icons/bs'

const FooterComponent = () => {
  return (
    <Footer container className='border border-t-8 border-teal-500'>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
          <div className='mt-5'>
          <Link to='/' className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'>
        <span className='px-2 py-1 rounded-lg text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 '>InspireHub</span>
        Blog
      </Link>
          </div>
          <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
            <div>
            <Footer.Title title='About' />
            <Footer.LinkGroup col>
              <Footer.Link 
              href='https://github.com/' 
              target='_blank' rel='noopener noreferrer'>
                MERN Projects
              </Footer.Link>
              <Footer.Link 
              href='/about' 
              target='_blank' rel='noopener noreferrer'>
                InspireHub's Blog
              </Footer.Link>
            </Footer.LinkGroup>
            </div>
            <div>
            <Footer.Title title='Follow us' />
            <Footer.LinkGroup col>
              <Footer.Link 
              href='https://github.com/' 
              target='_blank' rel='noopener noreferrer'>
                Github
              </Footer.Link>
              <Footer.Link 
              href='https://www.linkedin.com/in/deepanshu-pandey-316508254?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' 
              target='_blank' rel='noopener noreferrer'>
                LinkedIn
              </Footer.Link>
            </Footer.LinkGroup>
            </div>
            <div>
            <Footer.Title title='Legal' />
            <Footer.LinkGroup col>
              <Footer.Link 
              href='#' 
              target='_blank' rel='noopener noreferrer'>
                Privacy Policy
              </Footer.Link>
              <Footer.Link 
              href='#' 
              target='_blank' rel='noopener noreferrer'>
                Terms &amp; Conditions
              </Footer.Link>
            </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider/>
        <div className='w-full sm:flex sm:items-center sm:justify-between'>
          <Footer.Copyright href='#' by="InspireHub's Blog" year={new Date().getFullYear()}/>
          <div className='flex gap-6 sm:mt-0 mt-4 sm:justify-center'>
            <Footer.Icon href='#' icon={ BsFacebook }/>
            <Footer.Icon href='#' icon={ BsInstagram }/>
            <Footer.Icon href='#' icon={ BsTwitter }/>
            <Footer.Icon href='https://github.com/' icon={ BsGithub }/>
            <Footer.Icon href='#' icon={ BsDribbble }/>
          </div>
        </div>
      </div>
    </Footer>
  )
}

export default FooterComponent
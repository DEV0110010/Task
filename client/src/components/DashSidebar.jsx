import { Sidebar } from 'flowbite-react'
import { HiArrowSmRight, HiUser } from 'react-icons/hi'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

const DashSidebar = () => {
   const dispatch = useDispatch();
    const location = useLocation();
    const [tab, setTab] = useState('')
    useEffect(() => {
      const urlParams = new URLSearchParams(location.search)
      const tabFromUrl = urlParams.get('tab')
      if(tabFromUrl){
        setTab(tabFromUrl);
      }
    }, [location.search])
const handleSignout = async () => {
  try {
   const res = await fetch(`/api/user/signout`,{
    method: 'POST',
   });
   const data = res.json();
   if(!res.ok){
    console.log(error.message);
    
  }else{
   dispatch(signoutSuccess());
  }

  } catch (error) {
    console.log(error.message);
    
  }
}

  return (
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup>
                <Link to='/dashboard?tab=profile'>
                <Sidebar.Item active={tab==='profile'} icon={HiUser} label={'user'} labelColor='dark' as='div'>
                    Profile
                </Sidebar.Item>
                </Link>
                <Sidebar.Item onClick={handleSignout} className='cursor-pointer' icon={HiArrowSmRight} >
                    Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar
import React,{useContext} from "react";
import logo from '../assets/logo/logo1.jpeg'

import { FaArrowRight } from "react-icons/fa6";
import { FaBars } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

import { HashLink } from 'react-router-hash-link';

// import { UserContext } from '../UserContext';

const Nav = () => {

  // const {role} = useContext(UserContext);

  function handleMenu() {
    const navDialog = document.getElementById('nav-dialog');
    navDialog.classList.toggle('hidden');
  }


  return (
    <div className='border-b-2 bg-white  fixed top-0 z-20 w-full h-18'>
      <nav className="flex  items-center justify-between  p-1 px-4">
        <div className='flex items-center'>
          <a href='/' className='flex items-center gap-3'>
            <img className='bject-scale-down  h-14 ' src={logo} alt='a' />
            <span className='text-xl font-bold '>EcoEclipse</span>
          </a>
        </div>
        <div className='text-md  hidden md:flex lg:space-x-10 space-x-6'>
        <HashLink smooth to="/#formSection" className='font-semibold p-2 hover:text-lime-600 hover:bg-gray-100 rounded-lg'>Calculate</HashLink>
          <a href='/community' className='font-semibold p-2 hover:text-lime-600 hover:bg-gray-100 rounded-lg'>Community</a>
          <a href='/goals' className='font-semibold p-2 hover:text-lime-600 hover:bg-gray-100 rounded-lg'>Goals</a>
          <a href='/profile' className='font-semibold p-2 hover:text-lime-600 hover:bg-gray-100 rounded-lg'>Profile</a>
          <a href='/aboutus' className='font-semibold p-2 hover:text-lime-600 hover:bg-gray-100 rounded-lg'>AboutUs</a>
          <a href='/contactus' className='font-semibold p-2 hover:text-lime-600 hover:bg-gray-100 rounded-lg'>Contact</a>

        </div>

        <div className='text-md  hidden md:flex  space-x-12 px-4'>

          { !localStorage.getItem('token') ?
            <a href='/login' className='border-2 rounded-full p-1 px-3 bg-white transition ease-in-out delay-100 hover:border-lime-600 font-medium flex items-center '>
            Login<span className='ml-1'><FaArrowRight /></span>
          </a> :
          <a href='/logout' className='font-semibold p-2 hover:text-lime-600 hover:bg-gray-100 rounded-lg '>
            Logout
            </a>
          }
        </div>

        <button className='md:hidden text-2xl' onClick={handleMenu}>
          <FaBars />
        </button>

        <div id="nav-dialog" className='hidden md:hidden z-10 bg-white fixed inset-0 p-2'>
          <div id="nav-bar" className='flex justify-between'>
            <a href='/' className='flex items-center gap-3'>
              <img className='bject-scale-down  h-14 ' src={logo} alt='a' />
              <span className='text-xl font-bold '>EcoEclipse</span>
            </a>
            <button className=' text-2xl' onClick={handleMenu}>
              <IoClose />
            </button>
          </div>

          <div className='mt-6'>
          <HashLink smooth to="/#formSection" className='font-semibold block m-3 p-3 hover:text-lime-600 hover:bg-gray-100 rounded-lg'>Calculate</HashLink>
            {/* <a href='/#formSection' className='font-semibold block m-3 p-3 hover:text-lime-600 hover:bg-gray-100 rounded-lg'>Calculate</a> */}
            <a href='/community' className='font-semibold block m-3 p-3 hover:text-lime-600 hover:bg-gray-100 rounded-lg'>Community</a>
            <a href='/goals' className='font-semibold block m-3 p-3 hover:text-lime-600 hover:bg-gray-100 rounded-lg'>Goals</a>
            <a href='/profile' className='font-semibold block m-3 p-3 hover:text-lime-600 hover:bg-gray-100 rounded-lg'>Profile</a>
            <a href='/aboutus' className='font-semibold block m-3 p-3 hover:text-lime-600 hover:bg-gray-100 rounded-lg'>About Us</a>
            <a href='/contactus' className='font-semibold block m-3 p-3 hover:text-lime-600 hover:bg-gray-100 rounded-lg'>Contact</a>
            { !localStorage.getItem('token') ?
           <a href='/login' className='font-semibold block m-3 p-3 hover:text-lime-600 hover:bg-gray-100 rounded-lg'>Login</a>
           :
           <a href='/logout' className='font-semibold block m-3 p-3 hover:text-lime-600 hover:bg-gray-100 rounded-lg'>Logout</a>
          }
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Nav;
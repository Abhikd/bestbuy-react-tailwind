import React, {useState} from 'react';
import { AiOutlineMenu,  AiOutlineClose } from 'react-icons/ai';
import { BsFillCartFill } from 'react-icons/bs';
import {TbTruckDelivery} from 'react-icons/tb'
import {FaUserFriends } from 'react-icons/fa'
import {MdFavorite, MdHelp} from 'react-icons/md'
import { Link } from 'react-scroll';

const Navbar = () => {
const [nav, setNav] = useState(false);

  return (
    <div className='max-w-[1640px] mx-auto flex justify-between items-center p-4  bg-gray-50 sticky top-0 z-50'>
      {/* Left side */}
      <div className='flex items-center space-x-4'>
        <div onClick={()=> setNav(!nav)} className='cursor-pointer'>
          <AiOutlineMenu size={20} />
        </div>
        <Link to="home" spy={true} smooth={true} offset={-100} duration={2000}>
        <h1 className='text-2xl sm:text-3xl lg:text-4xl px-2 cursor-pointer'>
          Best <span className='font-bold'>Buy</span>
        </h1>
        </Link>
      </div>

     
      {/* Cart button */}
      <div className='flex space-x-3'>
      <Link to="cart" spy={true} smooth={true} offset={-100}   duration={2000}>
      <button className='bg-black text-white hidden md:flex items-center py-2 rounded-full'>
        <BsFillCartFill size={20} className='mr-2' /> Cart
      </button>
      </Link>

      <Link to="products" spy={true} smooth={true} offset={-100}  duration={2000}>
      <button className='bg-black text-white hidden md:flex items-center py-2 rounded-full'>
        Products
      </button>
      </Link>
      </div>

      {/* Mobile Menu */}
      {/* Overlay */}
      {nav ? <div className='bg-black/80 fixed w-full h-screen z-10 top-0 left-0'></div> : ''}
      

      {/* Side drawer menu */}
      <div className={nav ? 'fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300' : 'fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300' }>
        <AiOutlineClose
            onClick={()=> setNav(!nav)}
          size={30}
          className='absolute right-4 top-4 cursor-pointer'
        />
        <h2 className='text-2xl p-4'>
          Best <span className='font-bold'>Buy</span>
        </h2>
        <nav>
            <ul className='flex flex-col p-4 text-gray-800'>
                <li className='text-xl py-4 flex'><TbTruckDelivery size={25} className='mr-4' />Previous Orders</li>
                <li className='text-xl py-4 flex'><MdFavorite size={25} className='mr-4' /> Favorites</li>
                <li className='text-xl py-4 flex'><MdHelp size={25} className='mr-4' /> Help</li>
                <li className='text-xl py-4 flex'><FaUserFriends size={25} className='mr-4' /> Invite Friends</li>
            </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
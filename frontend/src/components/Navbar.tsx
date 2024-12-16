import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import { GoHome } from 'react-icons/go';
import {
	PiChartPieSliceLight,
	PiWalletLight,
	PiHandCoinsLight,
  PiBellLight,
  PiBasketLight,
  PiPlusSquareLight,
  PiCaretDownLight,
  PiListChecksBold,
	PiPlusSquare,
	PiBasket,
	PiBell,
	PiHandCoins,
	PiWallet,
	PiChartPieSlice,
} from 'react-icons/pi';
import Ellipse from "../assets/Ellipse 775.svg";
import Logo2 from "../assets/logo2.svg";


const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
		<nav className='bg-white shadow-md fixed z-50 w-full'>
			<div className='w-full px-3 xl:px-6 py-3 flex justify-between items-center'>
				{/* Logo and Search */}
				<div className='flex items-center space-x-4'>
					<div>
						<img className='w-10' src={Logo2} alt='' />
					</div>
					<div className='relative hidden sm:flex'>
						<FaSearch className='absolute top-3 left-3 text-gray-400' />
						<input
							type='text'
							placeholder='Search'
							className='pl-10 text-[#647995] pr-4 py-2 bg-[#F0F2F5] xl:w-[20rem]  lg:w-[12rem]  focus:outline-none'
						/>
					</div>
				</div>

				{/* Links for larger screens */}
				<div className='hidden lg:flex text-xs  font-medium text-greyText lg:space-x-3 xl:space-x-7 items-center'>
					<a href='#' className='items-center group hover:text-[#1D2433]'>
						<GoHome
							size={24}
							className='mx-auto mb-1 group-hover:text-[#1D2433] icon'
						/>
						<span className='text-greyText group-hover:text-[#1D2433]'>
							Home
						</span>
					</a>
					<a href='#' className='items-center group hover:text-[#1D2433]'>
						<PiChartPieSlice
							size={24}
							className='mx-auto mb-1 icon group-hover:text-[#1D2433]'
						/>
						<span className='text-greyText group-hover:text-[#1D2433]'>
							Dashboard
						</span>
					</a>
					<a href='#' className='items-center group hover:text-[#1D2433]'>
						<PiWallet
							size={24}
							className='mx-auto mb-1 icon group-hover:text-[#1D2433]'
						/>
						<span className='text-greyText group-hover:text-[#1D2433]'>
							Wallet
						</span>
					</a>
					<a href='#' className='items-center group text-[#1D2433]'>
						<PiListChecksBold
							size={24}
							className='mx-auto mb-1 text-[#1D2433]'
						/>
						<span className=''>Plan a trip</span>
					</a>
					<a href='#' className='items-center group hover:text-[#1D2433]'>
						<PiHandCoins
							size={24}
							className='mx-auto mb-1 icon group-hover:text-[#1D2433]'
						/>
						<span className='text-greyText group-hover:text-[#1D2433]'>
							Commission for life
						</span>
					</a>
					<a className='border-l border-[#98A2B3] ps-6' href='#'>
						<button className='bg-[#0D6EFD] text-white px-2 xl:px-4 py-2 rounded-sm hover:bg-blue-600'>
							Subscribe
						</button>
					</a>
					<a href='#' className='items-center group hover:text-[#1D2433]'>
						<PiBell
							size={24}
							className='mx-auto icon mb-1 group-hover:text-[#1D2433]'
						/>
						<span className='text-greyText group-hover:text-[#1D2433]'>
							Notification
						</span>
					</a>
					<a href='#' className='items-center group hover:text-[#1D2433]'>
						<PiBasket
							size={24}
							className='mx-auto mb-1 icon group-hover:text-[#1D2433]'
						/>
						<span className='text-greyText group-hover:text-[#1D2433]'>
							Carts
						</span>
					</a>
					<a href='#' className='items-center group hover:text-[#1D2433]'>
						<PiPlusSquare
							size={24}
							className='mx-auto mb-1 icon group-hover:text-[#1D2433]'
						/>
						<span className='text-greyText group-hover:text-[#1D2433]'>
							Create
						</span>
					</a>
					<div className='flex items-center space-x-1 group hover:text-[#1D2433] cursor-pointer'>
						<img src={Ellipse} alt='Profile' className='rounded-full w-8 h-8' />
						<PiCaretDownLight className='group-hover:text-[#1D2433] icon' />
					</div>
				</div>

				{/* Mobile Menu Button */}
				<div className='lg:hidden'>
					<button onClick={toggleMenu}>
						<HiMenu className='text-2xl text-gray-700' />
					</button>
				</div>
			</div>

			{/* Mobile Menu */}
			{isOpen && (
				<div className='lg:hidden z-50 bg-white border-t'>
					<div className='text-[#647995]  p-4 space-y-3'>
						<a href='#' className='flex items-center  hover:text-[#1D2433]'>
							<GoHome size={20} className='me-3' />
							Home
						</a>
						<a href='#' className='flex items-center  hover:text-[#1D2433]'>
							<PiChartPieSliceLight size={20} className='me-3' />
							Dashboard
						</a>
						<a href='#' className='flex items-center  hover:text-[#1D2433]'>
							<PiWalletLight size={20} className='me-3' />
							Wallet
						</a>

						<a href='#' className='flex items-center  text-[#1D2433]'>
							<PiListChecksBold size={20} className='me-3' />
							Plan a trip
						</a>
						<a href='#' className='flex items-center  hover:text-[#1D2433]'>
							<PiHandCoinsLight size={20} className='me-3' />
							Commission for life
						</a>
						
						<a href='#' className='flex items-center  hover:text-[#1D2433]'>
							<PiBellLight size={20} className='me-3' />
							Notification
						</a>
						<a href='#' className='flex items-center  hover:text-[#1D2433]'>
							<PiBasketLight size={20} className='me-3' />
							Carts
						</a>
						<a href='#' className='flex items-center  hover:text-[#1D2433]'>
							<PiPlusSquareLight size={20} className='me-3' />
							Create
						</a>
						<div className='flex items-center space-x-1  hover:text-[#1D2433] cursor-pointer'>
						<button className='w-full bg-[#0D6EFD]  text-white px-4 py-2 rounded-lg hover:bg-blue-600'>
							Subscribe
						</button>
						</div>
					</div>
				</div>
			)}
		</nav>
	);
};

export default Navbar;

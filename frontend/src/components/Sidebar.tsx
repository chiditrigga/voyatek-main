import React from 'react';
import { PiAirplaneTilt, PiBuildings, PiCaretUpDown, PiFirstAidKit, PiNewspaperClipping, PiPackage, PiRoadHorizonLight, PiStudent, PiSuitcaseRolling } from 'react-icons/pi';


const Sidebar: React.FC = () => {
  return (
		<div className='hidden text-xs xl:flex flex-col fixed top-24 left-0 h-[84.5vh]  w-64 ms-7 bg-white p-5'>
			<nav className='flex flex-col space-y-6 text-greyText text-sm px-3 py-5'>
				<div className='flex items-center space-x-4 cursor-pointer group hover:text-[#1D2433]'>
					<PiRoadHorizonLight
						className='icon group-hover:text-[#1D2433]'
						size={30}
					/>
					<span className=' font-medium group-hover:text-[#1D2433]'>
						Activities
					</span>
				</div>
				<div className='flex items-center space-x-4 cursor-pointer group hover:text-[#1D2433]'>
					<PiBuildings className='icon group-hover:text-[#1D2433]' size={30} />
					<span className=' font-medium group-hover:text-[#1D2433]'>
						Hotels
					</span>
				</div>
				<div className='flex items-center space-x-4 cursor-pointer group hover:text-[#1D2433]'>
					<PiAirplaneTilt
						className='icon group-hover:text-[#1D2433]'
						size={30}
					/>
					<span className=' font-medium group-hover:text-[#1D2433]'>
						Flights
					</span>
				</div>
				<div className='flex items-center space-x-4 cursor-pointer group hover:text-[#1D2433]'>
					<PiStudent className='icon group-hover:text-[#1D2433]' size={30} />
					<span className=' font-medium group-hover:text-[#1D2433]'>Study</span>
				</div>
				<div className='flex items-center space-x-4 cursor-pointer group hover:text-[#1D2433]'>
					<PiNewspaperClipping
						className='icon group-hover:text-[#1D2433]'
						size={30}
					/>
					<span className=' font-medium group-hover:text-[#1D2433]'>Visa</span>
				</div>
				<div className='flex items-center space-x-4 cursor-pointer group hover:text-[#1D2433]'>
					<PiSuitcaseRolling
						className='icon group-hover:text-[#1D2433]'
						size={30}
					/>
					<span className=' font-medium group-hover:text-[#1D2433]'>
						Immigration
					</span>
				</div>
				<div className='flex items-center space-x-4 cursor-pointer group hover:text-[#1D2433]'>
					<PiFirstAidKit
						className='icon group-hover:text-[#1D2433]'
						size={30}
					/>
					<span className=' font-medium group-hover:text-[#1D2433]'>
						Medical
					</span>
				</div>
				<div className='flex items-center space-x-4 cursor-pointer group hover:text-[#1D2433]'>
					<PiPackage className='icon group-hover:text-[#1D2433]' size={30} />
					<span className=' font-medium group-hover:text-[#1D2433]'>
						Vacation Packages
					</span>
				</div>
			</nav>

			{/* Account Section */}
			<div className='mt-10 bg-gray-100 p-2 py-3 rounded-lg flex items-center space-x-2'>
				<div className='bg-blueText p-4 text-white font-medium  rounded-sm'>
					GO
				</div>
				<span className='text-greyText font-semibold'>Personal Account</span>
				<div className='flex flex-col items-center'>
					<PiCaretUpDown
						className='icon hover:text-[#1D2433] cursor-pointer'
						size={20}
					/>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;

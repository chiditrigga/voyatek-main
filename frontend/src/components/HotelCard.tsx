import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';


import Pool from '../assets/Pool.svg';
import Bar from '../assets/Wine.svg';

import { PiBedFill, PiBuildings, PiCalendarBlankBold } from 'react-icons/pi';
import { LuMapPin } from 'react-icons/lu';
import { IoMdClose } from 'react-icons/io';

interface Hotel {
	property: any;
	reviewsStats: any;
	name?: string;
	primaryPhoto?: { small?: string };
	shortDescription?: string;
	representativePrice?: { chargeAmount?: number };
	checkinDate: string;
	checkoutDate: string;
}
interface ChildComponentProps {
	onButtonClick: () => void;
}

const HotelCard: React.FC<
	ChildComponentProps & { refreshTrigger: boolean }
> = ({ onButtonClick, refreshTrigger }) => {
	const [savedHotels, setSavedHotels] = useState<Hotel[]>([]);

	useEffect(() => {
		const hotels = localStorage.getItem('savedHotels');

		if (hotels) {
			const parsedHotels = JSON.parse(hotels);
			setSavedHotels(parsedHotels);
		}
	}, [refreshTrigger]);

	return (
		<div className='md:p-5 p-2 bg-[#344054] my-10  md:mx-3 rounded-md'>
			<div className='flex justify-between mb-5'>
				<div className='flex items-center'>
					<PiBuildings size={35} className='text-white' />
					<span className='ms-3 text-lg font-semibold text-white'>Hotels</span>
				</div>
				{savedHotels.length > 0 ? (
					<button
						onClick={onButtonClick}
						className='text-[#1D2433] bg-white px-4 py-2 rounded font-medium  text-sm hover:bg-[#F1F1F1]'>
						Add Hotel
					</button>
				) : (
					''
				)}
			</div>

			{savedHotels.length > 0 ? (
				savedHotels.map((hotel, index) => (
					<div className='md:flex gap-0 mb-4' key={index}>
						<div className='w-full p-4 border rounded-l-sm shadow-sm bg-gray-50'>
							<div className='md:flex md:flex-row'>
								<img
									src={hotel.property.photoUrls[0]}
									alt={hotel.name || 'Hotel'}
									className='md:max-w-56 w-full  rounded-md object-cover mb-4 md:mb-0'
								/>
								<div className='flex-1 '>
									<div className='flex ms-2 justify-between items-center'>
										<h4 className='md:text-lg text-base font-semibold text-black'>
											{hotel.property.name || 'Unnamed Hotel'}
										</h4>
										<div className='text-right text-[#1D2433] font-semibold'>
											<p className='text-2xl'>
												$
												{Math.floor(
													hotel.property.priceBreakdown.grossPrice.value || 0
												)}
											</p>
										</div>
									</div>
									<div className='hidden md:flex justify-between'>
										<p className='text-[#1D2433] ms-2 text-sm font-medium mb-2 md:max-w-[50%]'>
											18, Kenneth Agbakuru Street, Off Access Bank Admiralty
											Way, Lekki Phase1
										</p>
										<div className='me-0 text-end text-[#1D2433] ms-2 text-sm font-medium '>
											<span>Total Price: NGN 560,000</span> <br />
											<span>1 room x 10 nights incl. taxes</span>
										</div>
									</div>

									<div className='flex  items-center ms-2 md:space-x-2 text-greyText text-xs my-3 md:my-0 md:text-sm'>
										<LuMapPin className='text-[#0D6EFD]' />
										<span className='font-medium text-[#0D6EFD] cursor-pointer hover:text-[#0056b3]'>
											Show in map
										</span>

										<FaStar className='text-yellow-400 ml-4' />
										<span className=''>
											{hotel.reviewsStats?.combinedNumericStats.average ||
												'N/A'}{' '}
											({hotel.reviewsStats?.combinedNumericStats.total || '0'})
										</span>
										<span className='flex items-start space-x-2'>
											<PiBedFill size={20} />
											<span className='text-[#676E7E]'>King size room</span>
										</span>
									</div>

									<div className='border-y ps-2 border-[#E4E7EC] w-full text-lg text-[#647995] py-2 mt-2'>
										<div className='lg:flex justify-between pb-3 text-base  lg:text-base md:text-xs'>
											<div className='flex my-3 lg:my-0 gap-x-3'>
												<span>Facilities:</span>
												<span className='flex items-start space-x-2'>
													<img src={Pool} alt='calendar' className='w-5' />
													<span>Pool</span>
												</span>
												<span className='flex items-start space-x-2'>
													<img src={Bar} alt='calendar' className='w-5' />
													<span>Bar</span>
												</span>
											</div>
											<span className='flex text-sm text-greyText items-start space-x-2'>
												<PiCalendarBlankBold
													className='text-[#475367]'
													size={20}
												/>
												<span>Check In: 20-04-2024</span>
												<PiCalendarBlankBold
													className='text-[#475367]'
													size={20}
												/>
												<span>Check Out: 29-04-2024</span>
											</span>
										</div>
									</div>

									<div className='flex ms-2 text-sm justify-between bottom-0 font-medium text-[#0D6EFD] mt-5'>
										<div className='flex gap-x-2'>
											<a
												href='#'
												className='cursor-pointer me-5 text-[#0D6EFD] hover:text-[#0056b3]'>
												Hotel details
											</a>
											<a
												href='#'
												className='cursor-pointer text-[#0D6EFD] hover:text-[#0056b3]'>
												Price details
											</a>
										</div>
										<a
											href='#'
											className='cursor-pointer text-[#0D6EFD] hover:text-[#0056b3]'>
											Edit details
										</a>
									</div>
								</div>
							</div>
						</div>

						<div className='w-full md:w-10 bg-[#FBEAE9] py-2 md:py-0 rounded-b md:rounded-b-none flex justify-center items-center rounded-r-sm'>
							<IoMdClose className='w-6 h-6 cursor-pointer text-[#9E0A05] hover:text-[#FF5733]' />
						</div>
					</div>
				))
			) : (
				<div className='bg-white p-8 md:p-14 xl:p-24 flex flex-col justify-center items-center space-y-4'>
					<div>
						<PiBuildings size={40} />
					</div>
					<h3>No Request yet</h3>
					<button
						onClick={onButtonClick}
						className='text-white text-base bg-[#0D6EFD] px-4 py-2 rounded font-medium hover:bg-[#0d6dfdab]'>
						Add Hotels
					</button>
				</div>
			)}
		</div>
	);
};

export default HotelCard;

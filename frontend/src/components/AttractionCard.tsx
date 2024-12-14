import { useEffect, useState } from "react";
import { FaStar, FaRegClock } from 'react-icons/fa'
import ActiviteImage from '../assets/activities.png'
import { PiCaretCircleDownBold, PiCaretCircleUpBold, PiRoadHorizonLight } from "react-icons/pi";
import { LuMapPin } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";

interface ReviewsStats {
	combinedNumericStats?: {
		average?: number;
		total?: number;
	};
}
interface Attraction {
    reviewsStats: ReviewsStats | null;
    name?: string;
    primaryPhoto?: { small?: string };
    shortDescription?: string;
    representativePrice?: { chargeAmount?: number };
}
interface ChildComponentProps {
    onButtonClick: () => void;
  }

const AttractionCard: React.FC<ChildComponentProps & { refreshTrigger: boolean }> = ({ onButtonClick,refreshTrigger  }) => {

    const [savedAttractions, setSavedAttractions] = useState<Attraction[]>([]);
    
    useEffect(() => {
        const attractions = localStorage.getItem("savedAttractions");
 
        if (attractions) {
            const parsedAttractions = JSON.parse(attractions);
         
            setSavedAttractions(parsedAttractions);
        }
    }, [refreshTrigger]);

    return (
			<div className='md:p-5 p-2 bg-[#0054E4] my-10  md:mx-3 rounded-md'>
				<div className='flex justify-between mb-5'>
					<div className='flex items-center'>
						<img
							src={ActiviteImage}
							alt=''
							className='mr-4 w-6 h-6 object-contain'
						/>
						<span className='text-lg font-semibold text-white text-center'>
							Activities
						</span>
					</div>

					<div>
						{savedAttractions.length > 0 ? (
							<button
								onClick={onButtonClick}
								className='text-[#0D6EFD] text-sm bg-white px-4 py-2 rounded font-medium hover:bg-[#F1F1F1]'>
								Add Activitie
							</button>
						) : (
							''
						)}
					</div>
				</div>

				{savedAttractions.length > 0 ? (
					savedAttractions.map((attraction, index) => (
						<div className='md:flex gap-0 mb-4' key={index}>
							{/* Main attraction content */}
							<div className=' w-full  p-4 border rounded-l-md shadow-sm bg-gray-50'>
								<div className='flex flex-col sm:flex-row'>
									<img
										src={
											attraction.primaryPhoto?.small || '/fallback-image.png'
										}
										alt={attraction.name || 'Activity'}
										className='md:w-56  rounded-md object-cover mb-4 md:mb-0'
									/>

									<div className='flex-1 '>
										<div className='flex ms-3 justify-between items-center mb-0'>
											<h4 className='text-lg font-semibold text-black'>
												{attraction.name || 'Unnamed Attraction'}
											</h4>
											<div className='text-right  text-[#1D2433] font-semibold'>
												<p className='text-2xl '>
													$
													{attraction.representativePrice?.chargeAmount ||
														'N/A'}
												</p>
												<p className='text-sm  font-medium text-[#1D2433]'>
													10:30 AM on Mar 19
												</p>
											</div>
										</div>

										<p className='text-[#1D2433] ms-3 text-sm font-medium mb-2 md:max-w-[50%]'>
											{attraction.shortDescription ||
												'No description available.'}
										</p>

										<div className='flex items-center ms-3 space-x-2 text-gray-600 text-sm'>
											<LuMapPin className='text-blue-500' />
											<span className='font-medium cursor-pointer text-[#0D6EFD] text-md hover:text-[#0056b3]'>
												Directions
											</span>
											<FaStar className='text-yellow-400 ml-4' />
											<span className='text-md'>
											{attraction.reviewsStats?.combinedNumericStats?.average ?? 'N/A'}{' '}
(
{attraction.reviewsStats?.combinedNumericStats?.total ?? '0'}
)

											</span>
											<FaRegClock className='ml-4' />
											<span className='text-md'>1 Hour</span>
										</div>

										<div className='border-y border-[#E4E7EC] w-full text-lg text-[#647995] py-2 mt-2'>
											<div className='lg:flex justify-between pb-3'>
												<div className='md:flex text-base ms-3 md:gap-x-1 xl:gap-x-3'>
													<span>What's Included:</span>
													<span>Admission to the Empire State Building</span>
													<span className='text-[#0D6EFD] cursor-pointer hover:text-[#0056b3]'>
														See more
													</span>
												</div>
												<div className='font-medium md:flex text-sm'>
													<button className='bg-[#0A369D]  text-white px-2 py-1 rounded m-2 lg:m-0  font-normal hover:bg-[#3e77cc]'>
														Day 2
													</button>
													<div className='flex flex-row md:flex-col items-center ml-2'>
														<PiCaretCircleUpBold
															size={16}
															className='md:mb-1 cursor-pointer hover:text-[#1D2433]'
														/>
														<PiCaretCircleDownBold
															size={16}
															className='md:mt-1 hover:text-[#1D2433] cursor-pointer'
														/>
													</div>
												</div>
											</div>
										</div>

										<div className='flex ms-3 justify-between text-sm font-medium text-[#0D6EFD] mt-3'>
											<div className='flex gap-x-4'>
												<span className='cursor-pointer  hover:text-[#0056b3]'>
													Activity details
												</span>
												<span className='cursor-pointer  hover:text-[#0056b3]'>
													Price details
												</span>
											</div>
											<div>
												<span className='text-end  hover:text-[#0056b3] flex cursor-pointer'>
													Edit details
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* Red sidebar with centered back icon */}
							<div className='w-full  md:w-10 bg-[#FBEAE9] flex justify-center items-center rounded-r-md'>
								<IoMdClose className='w-6 h-6 cursor-pointer text-[#9E0A05] hover:text-[#FF5733]' />
							</div>
						</div>
					))
				) : (
					<div className='bg-white p-8 md:p-14 xl:p-24 flex flex-col justify-center items-center space-y-4'>
						<div>
							<PiRoadHorizonLight
								className='icon group-hover:text-[#1D2433]'
								size={40}
							/>
						</div>
						<h3>No Request yet</h3>
						<button
							onClick={onButtonClick}
							className='text-white bg-[#0D6EFD] font-medium text-base  px-4 py-2 rounded  hover:bg-[#0d6dfdab]'>
							Add Activitis
						</button>
					</div>
				)}
			</div>
		);
};


export default AttractionCard;

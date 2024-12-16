import React from 'react';

interface CardProps {
  title: string;
  description: string;
  buttonLabel: string;
  onButtonClick: () => void;
  bgColor: string;
  textColor: string;
  btcolor:string;
  btext:string;
}

const Card: React.FC<CardProps> = ({ title, description, buttonLabel, onButtonClick, bgColor, textColor,btcolor,btext }) => {
  return (
    <div className={`px-3 py-4 rounded-md ${bgColor} ${textColor} md:w-fit w-full lg:w-72`}>
      <h3 className="text-base font-semibold mb-2">{title}</h3>
      <p className="mb-4 font-normal text-sm">{description}</p>
      <button
        onClick={onButtonClick}
        className={`mt-5 w-full text-sm px-4 py-2 ${btcolor} ${btext} font-normal rounded hover:opacity-80`}
      >
        {buttonLabel}
      </button>
    </div>
  );
};

export default Card;

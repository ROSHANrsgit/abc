import React from "react";
import { Link } from "react-router-dom";

const Card = ({ image, title1, title2, buttonText, styleClass }) => {
  const lowerCaseTitle = title2.toLowerCase().split(" ").join("_");
  const url = `/home/${lowerCaseTitle}`;

  return (
    <Link to={url}>
      <div className="hover:bg-white bg-[#ffffff60]  border-2 border-white outfit-medium hover:border-2 hover:border-[#9DDE8B] p-8 rounded-lg shadow-lg flex flex-row lg:flex-col justify-center lg:justify-around items-center w-[300px] ">
        <div>
          <img
            src={image}
            alt={title1}
            className="w-20 h-20 lg:w-24 lg:h-24 lg:mr-0 mr-[96px]"
          />
        </div>
        <div className=" lg:text-center">
          <p className="text-[#9DDE8B] text-sm">{title1}</p>
          <h2 className="text-lg lg:text-2xl font-bold text-gray-800 -mt-[8px] whitespace-nowrap">
            {title2}
          </h2>
          <button className="bg-[#9DDE8B] text-white text-[14px] mt-[4px] lg:mt-[12px] py-[6px] rounded-sm px-2 lg:px-10 justify items-start hover:bg-[#40A578] focus:outline-none whitespace-nowrap">
            {buttonText}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default Card;

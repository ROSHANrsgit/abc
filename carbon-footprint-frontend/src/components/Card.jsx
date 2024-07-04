import React from "react";
import { Link } from "react-router-dom";

const Card = ({image, title1, title2, buttonText }) => {
  const lowerCaseTitle = title2.toLowerCase().split(" ").join("_");
  const url = `/home/${lowerCaseTitle}`;

  return (
    <Link to={url}>
      <div className="hover:bg-white hover:border-2 border-[#9DDE8B] p-5 rounded-lg shadow-lg flex flex-row lg:flex-col justify-center lg:justify-around items-center w-[300px]">
        <div>
          <img
            src={image}
            alt={title1}
            className="w-20 h-20 lg:w-24 lg:h-24 "
          />
        </div>
        <div className="ml-4 lg:text-center">
          <p className="text-[#9DDE8B]">{title1}</p>
          <h2 className="text-xl font-bold text-gray-800">{title2}</h2>
          <button className="bg-[#9DDE8B] text-white text-[14px] p-[7px] lg:py-2 rounded-md lg:px-4 hover:bg-[#40A578] focus:outline-none ">
            {buttonText}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default Card;

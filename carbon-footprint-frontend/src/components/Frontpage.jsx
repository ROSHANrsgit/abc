import React from "react";
import backgroundImage from "../assets/Images/background.svg";
const FrontPage = () => {
  return (
    <div
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className="bg-cover bg-center flex flex-col lg:flex-row items-center justify-center lg:justify-around h-screen "
    >
      <div className="text-left pl-12 lg:pl-0 mb-10 lg:mb-0 sm:pl-6">
        <h1 className="text-5xl font-extrabold text-[#40A578] text-left">
          Carbon Zero.Day,
        </h1>
        <h1 className="text-5xl font-extrabold text-[#9DDE8B] text-left">
          Every Day
        </h1>
      </div>
      <div className="bg-[#9DDE8B] p-8 w-[350px] sm:w-[390px]">
        <form className="space-y-4">
          <p className="text-white">
            Transform your climate impact by offsetting your carbon footprint
            with Carbon Zero Day.
          </p>
          <div>
            <input
              placeholder="Name*"
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#40A578] focus:border-[#40A578] sm:text-sm"
              required
            />
          </div>
          <div>
            <input
              placeholder="Email*"
              type="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#40A578] focus:border-[#40A578] sm:text-sm"
              required
            />
          </div>
          <div>
            <input
              placeholder="Mobile Number*"
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#40A578] focus:border-[#40A578] sm:text-sm"
              required
            />
          </div>
          <div>
            <input
              placeholder="Country*"
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#40A578] focus:border-[#40A578] sm:text-sm"
              required
            />
          </div>
          <div>
            <input
              placeholder="Address"
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#40A578] focus:border-[#40A578] sm:text-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#40A578] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#40A578]"
            >
              Calculate my emission!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FrontPage;

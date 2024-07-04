import React, { useState } from "react";
import backgroundImage from "../assets/Images/background.svg";
import { useLocation, useNavigate } from "react-router-dom";
import backarrow from "../assets/Images/backarrow.svg";

import {
  STANDARD_PAPER_EMISSION_FACTOR,
  RECYCLED_PAPER_EMISSION_FACTOR,
  PREMIUM_PAPER_EMISSION_FACTOR,
  DIGITAL_EMISSION_FACTOR,
  OFFSET_EMISSION_FACTOR,
  GLOSSY_LAM_EMISSION_FACTOR,
  MATTE_LAM_EMISSION_FACTOR,
  PLASTIC_PACK_EMISSION_FACTOR,
  CARDBOARD_PACK_EMISSION_FACTOR,
} from "../constants";

const PrintedcardForm = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get("name");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cardWeight: "",
    numberCards: "",
    paperType: "",
    printingMethod: "",
    LaminationType: "",
    PackingType: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    let total_weight =
      (parseFloat(formData.cardWeight) / 1000) *
      parseFloat(formData.numberCards);
    let totalEmissions = 0;

    if (formData.paperType === "standard") {
      totalEmissions += total_weight * STANDARD_PAPER_EMISSION_FACTOR;
    } else if (formData.paperType === "recycled") {
      totalEmissions += total_weight * RECYCLED_PAPER_EMISSION_FACTOR;
    } else if (formData.paperType === "premium") {
      totalEmissions += total_weight * PREMIUM_PAPER_EMISSION_FACTOR;
    }

    if (formData.printingMethod === "digital") {
      totalEmissions += total_weight * DIGITAL_EMISSION_FACTOR;
    } else if (formData.printingMethod === "offset") {
      totalEmissions += total_weight * OFFSET_EMISSION_FACTOR;
    }

    if (formData.LaminationType === "Glossy") {
      totalEmissions += total_weight * GLOSSY_LAM_EMISSION_FACTOR;
    } else if (formData.LaminationType === "Matte") {
      totalEmissions += total_weight * MATTE_LAM_EMISSION_FACTOR;
    }

    if (formData.PackingType === "Plastic") {
      totalEmissions += total_weight * PLASTIC_PACK_EMISSION_FACTOR;
    } else if (formData.PackingType === "Cardboard") {
      totalEmissions += total_weight * CARDBOARD_PACK_EMISSION_FACTOR;
    }

    navigate("/result", {
      state: { emit: totalEmissions, source: "PRINTED CARDS", username: name },
    });
  };
  const handleBackClick = () => {
    navigate("/home", { state: { username: name } });
  };
  return (
    <div
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className="bg-cover bg-center flex flex-col lg:flex-row items-center justify-center lg:justify-around min-h-fit h-screen"
    >
      <div className="rounded-lg p-8 w-full lg:ml-28 lg:mr-28 lg:mt-16 sm:mt-200">
        <div className="flex justify-between items-center">
          <h1 className="text-6xl font-bold text-left text-[#40A578] dark:text-gray-100 mb-[50px]">
            Printed Cards
          </h1>
          <img
            src={backarrow}
            alt="Back Arrow"
            className="h-10 w-10 cursor-pointer"
            onClick={handleBackClick}
          />
        </div>
        <form className="" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                Weight of a single card (g)
              </label>
              <input
                type="number"
                name="cardWeight"
                value={formData.cardWeight}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#9DDE8B] focus:border-[#9DDE8B] sm:text-sm"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                Number of cards printed
              </label>
              <input
                type="number"
                name="numberCards"
                value={formData.numberCards}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#9DDE8B] focus:border-[#9DDE8B] sm:text-sm"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                Paper type
              </label>
              <select
                name="paperType"
                value={formData.paperType}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#9DDE8B] focus:border-[#9DDE8B] sm:text-sm"
              >
                <option value="">Select a paper type</option>
                <option value="standard">Standard</option>
                <option value="recycled">Recycled</option>
                <option value="premium">Premium</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                Printing method
              </label>
              <select
                name="printingMethod"
                value={formData.printingMethod}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#9DDE8B] focus:border-[#9DDE8B] sm:text-sm"
              >
                <option value="">Select a printing method</option>
                <option value="digital">Digital</option>
                <option value="offset">Offset</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                Lamination type
              </label>
              <select
                name="LaminationType"
                value={formData.LaminationType}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#9DDE8B] focus:border-[#9DDE8B] sm:text-sm"
              >
                <option value="">Select a lamination type</option>
                <option value="Glossy">Glossy</option>
                <option value="Matte">Matte</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                Packaging type
              </label>
              <select
                name="PackingType"
                value={formData.PackingType}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#9DDE8B] focus:border-[#9DDE8B] sm:text-sm"
              >
                <option value="">Select packaging type</option>
                <option value="Plastic">Plastic</option>
                <option value="Cardboard">Cardboard</option>
              </select>
            </div>
          </div>
        </form>

        <div className="mt-10 mx-auto w-[250px]">
          <button
            onClick={handleSubmit}
            className="mx-auto w-full w-[250px] text-center py-2 px-4 bg-[#9DDE8B] text-white rounded-md hover:bg-[#40A578] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#40A578] "
          >
            Calculate my emission!
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrintedcardForm;

import React, { useState } from "react";
import backgroundImage from "../assets/Images/background.svg";
import { useLocation, useNavigate } from "react-router-dom";
import backarrow from "../assets/Images/backarrow.svg";

import {
  EMP_CAR_EMISSION_FACTOR,
  EMP_PUBLIC_TRANSPORT_EMISSION_FACTOR,
  ELECTRICITY_EMISSION_FACTOR,
  NATURAL_GAS_EMISSION_FACTOR,
  PETROL_EMISSION_FACTOR,
  DIESEL_EMISSION_FACTOR,
  GASOLINE_EMISSION_FACTOR,
  FLIGHT_TRAVEL_EMISSION_FACTOR,
  TRAIN_TRAVEL_EMISSION_FACTOR,
  WASTE_EMISSION_FACTOR,
  WATER_EMISSION_FACTOR,
} from "../constants";

const BusinessForm = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get("name");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    numberEmployee: "",
    employeeCar: "",
    employeePublic: "",
    electricityConsumption: "",
    naturalGas: "",
    petrolConsumption: "",
    dieselConsumption: "",
    gasolineConsumption: "",
    flightTravel: "",
    trainTravel: "",
    wasteProduced: "",
    waterUsed: "",
    // New state for dynamic input
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

    let totalEmissions = 0;
    totalEmissions =
      parseFloat(formData.employeeCar === "" ? 0 : formData.employeeCar) *
        EMP_CAR_EMISSION_FACTOR +
      parseFloat(formData.employeePublic === "" ? 0 : formData.employeePublic) *
        EMP_PUBLIC_TRANSPORT_EMISSION_FACTOR +
      parseFloat(
        formData.electricityConsumption === ""
          ? 0
          : formData.electricityConsumption
      ) *
        ELECTRICITY_EMISSION_FACTOR +
      parseFloat(formData.naturalGas === "" ? 0 : formData.naturalGas) *
        NATURAL_GAS_EMISSION_FACTOR +
      parseFloat(
        formData.petrolConsumption === "" ? 0 : formData.petrolConsumption
      ) *
        PETROL_EMISSION_FACTOR +
      parseFloat(
        formData.dieselConsumption === "" ? 0 : formData.dieselConsumption
      ) *
        DIESEL_EMISSION_FACTOR +
      parseFloat(
        formData.gasolineConsumption === "" ? 0 : formData.gasolineConsumption
      ) *
        GASOLINE_EMISSION_FACTOR +
      parseFloat(formData.flightTravel === "" ? 0 : formData.flightTravel) *
        FLIGHT_TRAVEL_EMISSION_FACTOR +
      parseFloat(formData.trainTravel === "" ? 0 : formData.trainTravel) *
        TRAIN_TRAVEL_EMISSION_FACTOR +
      parseFloat(formData.wasteProduced === "" ? 0 : formData.wasteProduced) *
        WASTE_EMISSION_FACTOR +
      parseFloat(formData.waterUsed === "" ? 0 : formData.waterUsed) *
        WATER_EMISSION_FACTOR;

    totalEmissions *= parseFloat(
      formData.numberEmployee === "" ? 1 : formData.numberEmployee
    );
    navigate("/result", {
      state: { emit: totalEmissions, source: "BUSINESS", username: name },
    });
  };
  const handleBackClick = () => {
    navigate("/home", { state: { username: name } });
  };
  return (
    <div
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className="bg-cover bg-center flex flex-col lg:flex-row items-center justify-center lg:justify-around md:h-screen"
    >
      <div className="rounded-lg p-8 w-full lg:mx-28 ">
        <div className="flex justify-between items-center">
          <h1 className="text-6xl font-bold text-left text-[#40A578] dark:text-gray-100 mb-12 mt-6 h-fit">
            Business
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
              <label
                htmlFor="numberEmployee"
                className="block text-sm font-medium text-gray-700 dark:text-gray-400"
              >
                Number of employees
              </label>
              <input
                type="number"
                id="numberEmployee"
                name="numberEmployee"
                value={formData.numberEmployee}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#9DDE8B] focus:border-[#9DDE8B] sm:text-sm"
              />
            </div>
            <div className="mb-8">
              <label
                htmlFor="employeeCar"
                className="block text-sm font-medium text-gray-700 dark:text-gray-400"
              >
                Employee commute distance by car (km)
              </label>
              <input
                id="employeeCar"
                name="employeeCar"
                value={formData.employeeCar}
                onChange={handleChange}
                type="number"
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#9DDE8B] focus:border-[#9DDE8B] sm:text-sm"
              />
            </div>
            <div className="mb-8">
              <label
                htmlFor="employeePublic"
                className="block text-sm font-medium text-gray-700 dark:text-gray-400"
              >
                Employee commute distance by public transport (km)
              </label>
              <input
                id="employeePublic"
                name="employeePublic"
                value={formData.employeePublic}
                onChange={handleChange}
                type="number"
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#9DDE8B] focus:border-[#9DDE8B] sm:text-sm"
              />
            </div>
            <div className="mb-8">
              <label
                htmlFor="electricityConsumption"
                className="block text-sm font-medium text-gray-700 dark:text-gray-400"
              >
                Electricity consumption (kWh)
              </label>
              <input
                id="electricityConsumption"
                name="electricityConsumption"
                value={formData.electricityConsumption}
                onChange={handleChange}
                type="number"
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#9DDE8B] focus:border-[#9DDE8B] sm:text-sm"
              />
            </div>
            <div className="mb-8">
              <label
                htmlFor="naturalGas"
                className="block text-sm font-medium text-gray-700 dark:text-gray-400"
              >
                Natural gas consumption (kg/m<sup>3</sup>)
              </label>
              <input
                id="naturalGas"
                name="naturalGas"
                value={formData.naturalGas}
                onChange={handleChange}
                type="number"
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#9DDE8B] focus:border-[#9DDE8B] sm:text-sm"
              />
            </div>
            <div className="mb-8">
              <label
                htmlFor="petrolConsumption"
                className="block text-sm font-medium text-gray-700 dark:text-gray-400"
              >
                Petrol consumption (litres)
              </label>
              <input
                id="petrolConsumption"
                name="petrolConsumption"
                value={formData.petrolConsumption}
                onChange={handleChange}
                type="number"
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#9DDE8B] focus:border-[#9DDE8B] sm:text-sm"
              />
            </div>
            <div className="mb-8">
              <label
                htmlFor="dieselConsumption"
                className="block text-sm font-medium text-gray-700 dark:text-gray-400"
              >
                Diesel consumption (litres)
              </label>
              <input
                id="dieselConsumption"
                name="dieselConsumption"
                value={formData.dieselConsumption}
                onChange={handleChange}
                type="number"
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#9DDE8B] focus:border-[#9DDE8B] sm:text-sm"
              />
            </div>
            <div className="mb-8">
              <label
                htmlFor="gasolineConsumption"
                className="block text-sm font-medium text-gray-700 dark:text-gray-400"
              >
                Gasoline consumption (litres)
              </label>
              <input
                id="gasolineConsumption"
                name="gasolineConsumption"
                value={formData.gasolineConsumption}
                onChange={handleChange}
                type="number"
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#9DDE8B] focus:border-[#9DDE8B] sm:text-sm"
              />
            </div>
            <div className="mb-8">
              <label
                htmlFor="flightTravel"
                className="block text-sm font-medium text-gray-700 dark:text-gray-400"
              >
                Flight travel distance (km)
              </label>
              <input
                id="flightTravel"
                name="flightTravel"
                value={formData.flightTravel}
                onChange={handleChange}
                type="number"
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#9DDE8B] focus:border-[#9DDE8B] sm:text-sm"
              />
            </div>
            <div className="mb-8">
              <label
                htmlFor="trainTravel"
                className="block text-sm font-medium text-gray-700 dark:text-gray-400"
              >
                Train travel distance (km)
              </label>
              <input
                id="trainTravel"
                name="trainTravel"
                value={formData.trainTravel}
                onChange={handleChange}
                type="number"
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#9DDE8B] focus:border-[#9DDE8B] sm:text-sm"
              />
            </div>
            <div className="mb-8">
              <label
                htmlFor="wasteProduced"
                className="block text-sm font-medium text-gray-700 dark:text-gray-400"
              >
                Waste generated (litres)
              </label>
              <input
                id="wasteProduced"
                name="wasteProduced"
                value={formData.wasteProduced}
                onChange={handleChange}
                type="number"
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#9DDE8B] focus:border-[#9DDE8B] sm:text-sm"
              />
            </div>
            <div className="mb-8">
              <label
                htmlFor="waterUsed"
                className="block text-sm font-medium text-gray-700 dark:text-gray-400"
              >
                Water used (litres)
              </label>
              <input
                id="waterUsed"
                name="waterUsed"
                value={formData.waterUsed}
                onChange={handleChange}
                type="number"
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#9DDE8B] focus:border-[#9DDE8B] sm:text-sm"
              />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="mt-4 w-96 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#9DDE8B] hover:bg-[#40A578] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9DDE8B]"
            >
              Calculate my emission!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BusinessForm;

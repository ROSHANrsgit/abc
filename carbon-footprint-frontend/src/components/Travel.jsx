import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import backgroundImage from "../assets/Images/background.svg";
import bike from "../assets/Images/bike.svg"; // Make sure to add your images to the src/images directory
import bus from "../assets/Images/bus.svg";
import car from "../assets/Images/car.svg";
import flight from "../assets/Images/flight.svg";
import scooter from "../assets/Images/scooter.svg";
import truck from "../assets/Images/truck.svg";
import backarrow from "../assets/Images/backarrow.svg";
import "../components/style.css";

import {
  PETROL_EMISSION_FACTOR,
  DIESEL_EMISSION_FACTOR,
  DOMESTIC_ECONOMY_EMISSION_FACTOR,
  DOMESTIC_BUSINESS_EMISSION_FACTOR,
  DOMESTIC_FIRST_EMISSION_FACTOR,
  INTER_ECONOMY_EMISSION_FACTOR,
  INTER_BUSINESS_EMISSION_FACTOR,
  INTER_FIRST_EMISSION_FACTOR,
} from "../constants";
const TravelForm = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get("name");
  const navigate = useNavigate();
  const [isDom, setIsDom] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  // const api_key = "Yd83oaTfReDdX/oi2hq2aQ==WZwYe2p1O3YFOgoY";
  const api_key = "ZepdfRL4w8O7jEe2uEcJXQ==NNaKoIbZVQNm4Z3k";
  let distance = 0;
  let totalEmissions = 0;
  async function logAirports(airport) {
    let url = "https://api.api-ninjas.com/v1/airports?";
    let airport_name = "";
    let iata = "";
    if (airport.length === 3) {
      url += `iata=${airport}`;
    } else {
      url += `name=${airport}`;
    }
    const response = await fetch(url, {
      headers: {
        "X-Api-Key": api_key, // Include the API key in the headers
      },
    });
    const data = await response.json();
    return data;
  }
  //logAirports();

  const [formData, setFormData] = useState({
    tripType: "",
    originName: "",
    destinationName: "",
    numberPassenger: "",
    cabinClass: "",
    ccVehicle: "",
    fuelVehicle: "",
    distCovered: "",
    ageVehicle: "",
    // New state for dynamic input
  });
  const resetFormData = () => {
    setFormData({
      tripType: "",
      originName: "",
      destinationName: "",
      numberPassenger: "",
      cabinClass: "",
      ccVehicle: "",
      fuelVehicle: "",
      distCovered: "",
      ageVehicle: "",
      // Reset any additional dynamic inputs here
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const vehicle_data = {
    Car: {
      cc_range: [1000, 1500, 2000],
      mileage: [20, 18, 15, 12],
      age_factor: [1.0, 1.1, 1.2, 1.3],
    },
    Bike: {
      cc_range: [150, 350],
      mileage: [50, 40, 30],
      age_factor: [1.0, 1.1, 1.2],
    },
    Scooter: {
      cc_range: [150],
      mileage: [60, 45],
      age_factor: [1.0, 1.1],
    },
    Bus: {
      cc_range: [5000],
      mileage: [5, 4],
      age_factor: [1.0, 1.2],
    },
    Truck: {
      cc_range: [5000],
      mileage: [8, 6],
      age_factor: [1.0, 1.2],
    },
  };
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    formData.ccVehicle = formData.ccVehicle === "" ? 0 : formData.ccVehicle;
    if (selectedOption !== "Flight") {
      const vehicle = vehicle_data[selectedOption];
      let index = -1;
      console.log(formData.ccVehicle, vehicle, selectedOption);
      if (formData.ccVehicle <= vehicle["cc_range"][0]) {
        index = 0;
      } else if (formData.ccVehicle > vehicle["cc_range"][0]) {
        for (let i = 1; i < vehicle["cc_range"].length; i++) {
          if (
            formData.ccVehicle >= vehicle["cc_range"][i - 1] &&
            formData.ccVehicle < vehicle["cc_range"][i]
          ) {
            index = i;
          }
        }
      }
      if (index == -1) {
        index = vehicle["cc_range"].length;
      }

      const vehicle_mileage = vehicle["mileage"][index];
      const vehicle_age_factor = vehicle["age_factor"][index];
      const fuel_consumption = formData.distCovered / vehicle_mileage;
      if (formData.fuelVehicle == "Petrol") {
        totalEmissions =
          fuel_consumption * PETROL_EMISSION_FACTOR * vehicle_age_factor;
      } else if (formData.fuelVehicle == "Diesel") {
        totalEmissions =
          fuel_consumption * DIESEL_EMISSION_FACTOR * vehicle_age_factor;
      } else {
        totalEmissions = fuel_consumption * vehicle_age_factor;
      }
    } else {
      const origin = formData.originName;
      const dest = formData.destinationName;
      if (!origin || !dest) {
        alert("Please enter both Origin Name/code and Destination Name/code");
        return;
      }
      setisLoading(true);
      const origin_data = await logAirports(origin);
      const dest_data = await logAirports(dest);
      setisLoading(false);
      const origin_coord = [origin_data[0].latitude, origin_data[0].longitude];
      const dest_coord = [dest_data[0].latitude, dest_data[0].longitude];
      const R = 6371; // Radius of the Earth in kilometers
      const dLat = deg2rad(dest_coord[0] - origin_coord[0]);
      const dLon = deg2rad(dest_coord[1] - origin_coord[1]);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(origin_coord[0])) *
          Math.cos(deg2rad(dest_coord[0])) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      distance = R * c; // Distance in kilometers

      origin_data[0].country === dest_data[0].country
        ? setIsDom(true)
        : setIsDom(false);

      if (isDom == true) {
        if (formData.cabinClass == "Economy") {
          totalEmissions = distance * DOMESTIC_ECONOMY_EMISSION_FACTOR;
        } else if (formData.cabinClass == "Business") {
          totalEmissions = distance * DOMESTIC_BUSINESS_EMISSION_FACTOR;
        } else if (formData.cabinClass == "First") {
          totalEmissions = distance * DOMESTIC_FIRST_EMISSION_FACTOR;
        }
      } else {
        if (formData.cabinClass == "Economy") {
          totalEmissions = distance * INTER_ECONOMY_EMISSION_FACTOR;
        } else if (formData.cabinClass == "Business") {
          totalEmissions = distance * INTER_BUSINESS_EMISSION_FACTOR;
        } else if (formData.cabinClass == "First") {
          totalEmissions = distance * INTER_FIRST_EMISSION_FACTOR;
        }
      }
      if (formData.tripType === "Round Trip") {
        totalEmissions *= 2;
      }
      totalEmissions *= parseFloat(
        formData.numberPassenger === "" ? 0 : formData.numberPassenger
      );
    }

    navigate("/result", {
      state: { emit: totalEmissions, source: "TRAVEL", username: name },
    });
  };
  // 360
  // cc_range: [150, 350],
  // mileage: [50, 40, 30],
  const handleBackClick = () => {
    navigate("/home", { state: { username: name } });
  };
  const vehicle = ["flight", "truck", "bus", "car", "bike", "scooter"];
  const [selectedOption, setSelectedOption] = useState("Truck");
  const handleClick = (vehicle) => {
    resetFormData();
    switch (vehicle) {
      case "flight":
        setSelectedOption("Flight");
        break;
      case "truck":
        setSelectedOption("Truck");
        break;
      case "bus":
        setSelectedOption("Bus");
        break;
      case "car":
        setSelectedOption("Car");
        break;
      case "bike":
        setSelectedOption("Bike");
        break;
      case "scooter":
        setSelectedOption("Scooter");
        break;
      default:
        setSelectedOption("Truck");
        break;
    }
  };
  const renderForm = () => {
    switch (selectedOption) {
      case "Flight":
        return (
          <div className="w-[360px] mx-auto md:w-[600px]">
            <div className="mb-4 lg:mb-8">
              <label className="block outfit-medium text-gray-700">
                Trip (Round Trip/One way)
              </label>
              <select
                id="tripType"
                name="tripType"
                value={formData.tripType}
                onChange={handleChange}
                className="mt-1 block outfit-medium w-full px-3 py-2 bg-white dark:bg-gray-700 border  dark:border-gray-600 rounded-sm   focus:outline-none  border-[#9DDE8B] focus:border-[#9DDE8B]"
              >
                9<option>Select a trip type</option>
                <option>Round Trip</option>
                <option>One Way</option>
              </select>
            </div>
            <div className="flex flex-row justify-center items-center gap-4">
              <div className="mb-4 lg:mb-8 w-[300px]">
                <label className="block outfit-medium text-gray-700">
                  Origin Airport (code or name)
                </label>
                <input
                  id="originName"
                  name="originName"
                  type="text"
                  value={formData.originName}
                  onChange={handleChange}
                  className="mt-1 block outfit-medium w-full px-3 py-2 bg-white dark:bg-gray-700 border  dark:border-gray-600 rounded-sm   focus:outline-none  border-[#9DDE8B] focus:border-[#9DDE8B]"
                />
              </div>
              <div className="mb-4 lg:mb-8 w-[300px]">
                <label className="block outfit-medium text-gray-x`700">
                  Destination Airport (code or name)
                </label>
                <input
                  id="destinationName"
                  name="destinationName"
                  type="text"
                  value={formData.destinationName}
                  onChange={handleChange}
                  className="mt-1 block outfit-medium w-full px-3 py-2 bg-white dark:bg-gray-700 border  dark:border-gray-600 rounded-sm   focus:outline-none  border-[#9DDE8B] focus:border-[#9DDE8B]"
                />
              </div>
            </div>
            <div className="mb-4 lg:mb-8">
              <label className="block outfit-medium text-gray-700">
                Cabin Class (Economy/Business/First)
              </label>
              <select
                id="cabinClass"
                name="cabinClass"
                type="text"
                value={formData.cabinClass}
                onChange={handleChange}
                className="mt-1 block outfit-medium w-full px-3 py-2 bg-white dark:bg-gray-700 border  dark:border-gray-600 rounded-sm   focus:outline-none  border-[#9DDE8B] focus:border-[#9DDE8B]"
              >
                <option>Select a cabin class</option>
                <option>Economy</option>
                <option>Business</option>
                <option>First</option>
              </select>
            </div>
            <div className="mb-4 lg:mb-8">
              <label className="block outfit-medium text-gray-700">
                Number of passengers
              </label>
              <input
                id="numberPassenger"
                name="numberPassenger"
                type="number"
                value={formData.numberPassenger}
                onChange={handleChange}
                className="mt-1 block w-full outfit-medium px-3 py-2 bg-white dark:bg-gray-700 border  dark:border-gray-600 rounded-sm   focus:outline-none  border-[#9DDE8B] focus:border-[#9DDE8B]"
              />
            </div>
          </div>
        );
      default:
        return (
          <div className="w-[360px] mx-auto md:w-[600px]">
            <div className="mb-4 lg:mb-8">
              <label className="block outfit-medium text-gray-700">
                CC of your {selectedOption}
              </label>
              <input
                id="ccVehicle"
                name="ccVehicle"
                type="number"
                value={formData.ccVehicle}
                onChange={handleChange}
                className="mt-1 block w-full outfit-medium px-3 py-2 bg-white dark:bg-gray-700 border  dark:border-gray-600 rounded-sm   focus:outline-none  border-[#9DDE8B] focus:border-[#9DDE8B]"
              />
            </div>
            <div className="mb-4 lg:mb-8">
              <label className="block outfit-medium text-gray-700">
                Fuel type
              </label>
              <select
                id="fuelVehicle"
                name="fuelVehicle"
                value={formData.fuelVehicle}
                onChange={handleChange}
                className="mt-1 block outfit-medium w-full px-3 py-2 bg-white outfit-normal dark:bg-gray-700 border  dark:border-gray-600 rounded-sm   focus:outline-none  border-[#9DDE8B] focus:border-[#9DDE8B]"
              >
                <option>Select a fuel type</option>
                <option>Petrol</option>
                <option>Diesel</option>
                <option>Electric</option>
              </select>
            </div>
            <div className="mb-4 lg:mb-8">
              <label className="block outfit-medium text-gray-700">
                Distance covered (km)
              </label>
              <input
                id="distCovered"
                name="distCovered"
                type="number"
                value={formData.distCovered}
                onChange={handleChange}
                className="mt-1 block outfit-medium w-full px-3 py-2 bg-white dark:bg-gray-700 border  dark:border-gray-600 rounded-sm   focus:outline-none  border-[#9DDE8B] focus:border-[#9DDE8B]"
              />
            </div>
            <div className="mb-4 lg:mb-8">
              <label className="block outfit-medium text-gray-700">
                Age of your vehicle (yrs)
              </label>
              <input
                id="ageVehicle"
                name="ageVehicle"
                type="number"
                value={formData.ageVehicle}
                onChange={handleChange}
                className="mt-1 block outfit-medium w-full px-3 py-2 bg-white dark:bg-gray-700 border  dark:border-gray-600 rounded-sm   focus:outline-none  border-[#9DDE8B] focus:border-[#9DDE8B]"
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className="bg-cover bg-center p-8 flex flex-col h-screen items-center justify-center"
    >
      <div>
        <div className="rounded-lg w-full">
          <div className="flex justify-between items-center mt-8">
            <h1 className="text-6xl outfit-bold text-left text-[#40A578] dark:text-gray-100 mb-8 mt-4 md:mt-32 xl:mt-8 h-fit">
              Travel
            </h1>
            <img
              src={backarrow}
              alt="Back Arrow"
              className="h-10 w-10 mb-8 mt-4 md:mt-32 xl:mt-8 h-fit cursor-pointer"
              onClick={handleBackClick}
            />
          </div>
        </div>
        <div className="flex flex-col xl:flex-row items-center xl:items-start xl:gap-24 justify-center">
          <div className="grid grid-cols-3 gap-8 p-4 md:gap-12 mb-4">
            {[flight, truck, bus, car, bike, scooter].map((option, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center md:p-[21px] bg-[#ffffff60] border-4 border-white shadow-lg w-[100px] md:w-[160px] hover:bg-white hover:border-2 hover:border-[#9DDE8B] rounded-sm cursor-pointer"
                onClick={() => handleClick(vehicle[index])}
              >
                <img src={option} alt={option} className="h-24 w-24" />
                <h1 className="text-center -mt-4 mb-2 outfit-medium text-xl">
                  {vehicle[index].toUpperCase()}
                </h1>
              </div>
            ))}
          </div>
          <div>{renderForm()}</div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className=" mx-auto outfit-medium md:mt-8 bg-[#9DDE8B] shadow-sm hover:bg-[#40A578] focus:outline-none focus:ring-2 focus:ring-offset-2  border-[#40A578] text-white px-4 py-2 rounded-sm w-[250px]"
          >
            {!isLoading ? "Calculate my emission!" : "Loading..."}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TravelForm;

import React, { useState } from "react";
import backgroundImage from "../assets/Images/background.svg";
import { useLocation, useNavigate } from "react-router-dom";
import backarrow from "../assets/Images/backarrow.svg";

import {
  ELECTRICITY_EMISSION_FACTOR,
  FURNITURE_EMISSION_FACTOR,
  WATER_EMISSION_FACTOR,
  GROCERY_EMISSION_FACTOR,
  CLOTHING_EMISSION_FACTOR,
  PHARMACEUTICALS_EMISSION_FACTOR,
  MEDIA_EMISSION_FACTOR,
  GADGETS_EMISSION_FACTOR,
  VEGAN_EMISSION_FACTOR,
  VEGETARIAN_EMISSION_FACTOR,
  NON_VEGETARIAN_EMISSION_FACTOR,
  PESCATARIAN_EMISSION_FACTOR,
  PROPANE_EMISSION_FACTOR,
  LPG_EMISSION_FACTOR,
  CNG_EMISSION_FACTOR,
  FIREWOOD_EMISSION_FACTOR,
  COAL_EMISSION_FACTOR,
  KEROSENE_EMISSION_FACTOR,
  BIOGAS_EMISSION_FACTOR,
  WASTE_EMISSION_FACTOR,
  GARDENING_EMISSION_FACTOR,
  HOME_MAINTENANCE_EMISSION_FACTOR,
  CLEANING_PRODUCTS_EMISSION_FACTOR,
  PERSONAL_CARE_EMISSION_FACTOR,
  ONLINE_SHOPPING_EMISSION_FACTOR,
  PET_CARE_EMISSION_FACTOR,
} from "../constants";

const Individual = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get("name");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    electricityUsage: "",
    furnitureWeight: "",
    waterUsage: "",
    groceryExpenditure: "",
    clothingExpenditure: "",
    pharmaceuticalsExpenditure: "",
    magazinesExpenditure: "",
    gadgetsExpenditure: "",
    wasteGenerated: "",

    gardeningCost: "",
    maintenanceCost: "",
    cleaningProductsCost: "",
    personalCareProductsCost: "",
    onlineShoppingCost: "",
    petCareCost: "",
    primaryFuelSource: "",
    dietType: "",
    fuelUsage: "", // New state for dynamic input
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

    let totalEmissions =
      parseFloat(
        formData.electricityUsage === "" ? 0 : formData.electricityUsage
      ) *
        ELECTRICITY_EMISSION_FACTOR +
      parseFloat(
        formData.furnitureWeight === "" ? 0 : formData.furnitureWeight
      ) *
        FURNITURE_EMISSION_FACTOR +
      parseFloat(formData.waterUsage === "" ? 0 : formData.waterUsage) *
        WATER_EMISSION_FACTOR +
      parseFloat(
        formData.groceryExpenditure === "" ? 0 : formData.groceryExpenditure
      ) *
        GROCERY_EMISSION_FACTOR +
      parseFloat(
        formData.clothingExpenditure === "" ? 0 : formData.clothingExpenditure
      ) *
        CLOTHING_EMISSION_FACTOR +
      parseFloat(
        formData.pharmaceuticalsExpenditure === ""
          ? 0
          : formData.pharmaceuticalsExpenditure / 1000
      ) *
        PHARMACEUTICALS_EMISSION_FACTOR +
      parseFloat(
        formData.magazinesExpenditure === "" ? 0 : formData.magazinesExpenditure
      ) *
        MEDIA_EMISSION_FACTOR +
      parseFloat(
        formData.gadgetsExpenditure === "" ? 0 : formData.gadgetsExpenditure
      ) *
        GADGETS_EMISSION_FACTOR +
      parseFloat(formData.wasteGenerated === "" ? 0 : formData.wasteGenerated) *
        WASTE_EMISSION_FACTOR +
      parseFloat(formData.gardeningCost === "" ? 0 : formData.gardeningCost) *
        GARDENING_EMISSION_FACTOR +
      parseFloat(
        formData.maintenanceCost === "" ? 0 : formData.maintenanceCost
      ) *
        HOME_MAINTENANCE_EMISSION_FACTOR +
      parseFloat(
        formData.cleaningProductsCost === "" ? 0 : formData.cleaningProductsCost
      ) *
        CLEANING_PRODUCTS_EMISSION_FACTOR +
      parseFloat(
        formData.personalCareProductsCost === ""
          ? 0
          : formData.personalCareProductsCost / 1000
      ) *
        PERSONAL_CARE_EMISSION_FACTOR +
      parseFloat(
        formData.onlineShoppingCost === ""
          ? 0
          : formData.onlineShoppingCost / 1000
      ) *
        ONLINE_SHOPPING_EMISSION_FACTOR +
      parseFloat(formData.petCareCost === "" ? 0 : formData.petCareCost) *
        PET_CARE_EMISSION_FACTOR;

    if (primaryFuelSource === "Propane") {
      totalEmissions += parseFloat(fuelUsage) * PROPANE_EMISSION_FACTOR;
    } else if (primaryFuelSource === "LPG") {
      totalEmissions += parseFloat(fuelUsage) * LPG_EMISSION_FACTOR;
    } else if (primaryFuelSource === "CNG") {
      totalEmissions += parseFloat(fuelUsage) * CNG_EMISSION_FACTOR;
    } else if (primaryFuelSource === "Firewood") {
      totalEmissions += parseFloat(fuelUsage) * FIREWOOD_EMISSION_FACTOR;
    } else if (primaryFuelSource === "Coal") {
      totalEmissions += parseFloat(fuelUsage) * COAL_EMISSION_FACTOR;
    } else if (primaryFuelSource === "Kerosene") {
      totalEmissions += parseFloat(fuelUsage) * KEROSENE_EMISSION_FACTOR;
    } else if (primaryFuelSource === "Biogas") {
      totalEmissions += parseFloat(fuelUsage) * BIOGAS_EMISSION_FACTOR;
    }

    if (dietType === "Vegan") {
      totalEmissions += VEGAN_EMISSION_FACTOR;
    } else if (dietType === "Vegetarian") {
      totalEmissions += VEGETARIAN_EMISSION_FACTOR;
    } else if (dietType === "Non-vegetarian") {
      totalEmissions += NON_VEGETARIAN_EMISSION_FACTOR;
    } else if (dietType === "Pescatarian") {
      totalEmissions += PESCATARIAN_EMISSION_FACTOR;
    }
    totalEmissions *= 12;

    navigate("/result", {
      state: { emit: totalEmissions, source: "INDIVIDUALS" },
    });
  };
  const handleBackClick = () => {
    navigate("/home");
  };

  return (
    <div
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className="bg-cover bg-center flex flex-col lg:flex-row items-center justify-center lg:justify-around h-fit md:h-screen"
    >
      <div className="rounded-lg p-8 w-full lg:ml-28 lg:mr-28">
        <div className="flex justify-between items-center">
          <h1 className="text-6xl font-bold pt-4 text-left text-[#40A578] dark:text-gray-100 mb-8">
            Individuals
          </h1>
          <img
            src={backarrow}
            alt="Back Arrow"
            className="h-10 w-10 cursor-pointer"
            onClick={handleBackClick}
          />
        </div>
        <form
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          onSubmit={handleSubmit}
        >
          {[
            {
              label: "Monthly Electricity Usage (kWh)",
              name: "electricityUsage",
            },
            {
              label: "Weight of your total Furniture (kg)",
              name: "furnitureWeight",
            },
            { label: "Monthly Water Usage (liters)", name: "waterUsage" },
            {
              label: "Quantity of monthly Grocery (kg)",
              name: "groceryExpenditure",
            },
            {
              label: "Weight of Cloths (kg)",
              name: "clothingExpenditure",
            },
            {
              label: "Quantity of Pharmaceuticals (g)",
              name: "pharmaceuticalsExpenditure",
            },
            {
              label: "Weight of Magazines and Books (kg)",
              name: "magazinesExpenditure",
            },
            {
              label: "Weight of Gadgets (kg)",
              name: "gadgetsExpenditure",
            },
            {
              label: "Waste Generated (kg)",
              name: "wasteGenerated",
            },

            {
              label: "Quantity of Gardening Materials (kg)",
              name: "gardeningCost",
            },
            {
              label: "Quantity of Home Maintenance Materials (kg)",
              name: "maintenanceCost",
            },
            {
              label: "Weight of Cleaning Products (kg)",
              name: "cleaningProductsCost",
            },
            {
              label: "Weight of Personal Care Products (g)",
              name: "personalCareProductsCost",
            },
            {
              label: " Weight of Online Shopping Packaging (g)",
              name: "onlineShoppingCost",
            },
            { label: "Weight of Pet Care Products (kg)", name: "petCareCost" },
          ].map((field) => (
            <div className="" key={field.name}>
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-700 dark:text-gray-400"
              >
                {field.label}
              </label>
              <input
                type="text"
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#9DDE8B] focus:border-[#9DDE8B] sm:text-sm"
                required
              />
            </div>
          ))}
          <div>
            <label
              htmlFor="primaryFuelSource"
              className="block text-sm font-medium text-gray-700 dark:text-gray-400"
            >
              Primary Fuel Source
            </label>
            <select
              id="primaryFuelSource"
              name="primaryFuelSource"
              value={formData.primaryFuelSource}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#9DDE8B] focus:border-[#9DDE8B] sm:text-sm"
              required
            >
              <option value="">Select a fuel source</option>
              <option value="Propane">Propane</option>
              <option value="LPG">LPG</option>
              <option value="CNG">CNG</option>
              <option value="Firewood">Firewood</option>
              <option value="Coal">Coal</option>
              <option value="Kerosene">Kerosene</option>
              <option value="Biogas">Biogas</option>
            </select>
          </div>
          {formData.primaryFuelSource && (
            <div>
              <label
                htmlFor="fuelUsage"
                className="block text-sm font-medium text-gray-700 dark:text-gray-400"
              >
                Monthly {formData.primaryFuelSource} Usage (liters)
              </label>
              <input
                type="text"
                id="fuelUsage"
                name="fuelUsage"
                value={formData.fuelUsage}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#9DDE8B] focus:border-[#9DDE8B] sm:text-sm"
                required
              />
            </div>
          )}
          <div>
            <label
              htmlFor="dietType"
              className="block text-sm font-medium text-gray-700 dark:text-gray-400"
            >
              Diet Type
            </label>
            <select
              id="dietType"
              name="dietType"
              value={formData.dietType}
              onChange={handleChange}
              className="mt-1 mb-16 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#9DDE8B] focus:border-[#9DDE8B] sm:text-sm"
              required
            >
              <option value="">Select a diet type</option>
              <option value="Vegan">Vegan</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Non-vegetarian">Non-vegetarian</option>
              <option value="Pescatarian">Pescatarian</option>
            </select>
          </div>
        </form>
        <div className="mx-auto w-[250px]">
          <button
            onClick={handleSubmit}
            className="w-full w-[250px] text-center py-2 px-4 bg-[#9DDE8B] text-white rounded-md hover:bg-[#40A578] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#40A578] "
          >
            Calculate my emission!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Individual;

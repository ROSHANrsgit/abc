import React from "react";
import Card from "./Card";
import { useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import backgroundImage from "../assets/Images/background.svg";
import individualImage from "../assets/Images/individual.svg"; // Make sure to add your images to the src/images directory
import businessImage from "../assets/Images/Business.svg";
import travelImage from "../assets/Images/Travel.svg";
import cardsImage from "../assets/Images/PrintedCards.svg";
import backarrow from "../assets/Images/backarrow.svg";
import { GlobalStateContext } from "../signupContext.jsx";
import "../components/style.css";

const MainPage = () => {
  const { formData } = useContext(GlobalStateContext);

  const location = useLocation();
  const cardsData = [
    {
      image: individualImage,
      title1: "OFFSET FOR",
      title2: "INDIVIDUAL",
      buttonText: "Calculate my emission!",
    },
    {
      image: businessImage,
      title1: "OFFSET FOR",
      title2: "BUSINESS",
      buttonText: "Calculate my emission!",
    },
    {
      image: travelImage,
      title1: "OFFSET FOR",
      title2: "TRAVEL",
      buttonText: "Calculate my emission!",
    },
    {
      image: cardsImage,
      title1: "OFFSET FOR",
      title2: "PRINTED CARDS",
      buttonText: "Calculate my emission!",
      styleClass: "outfit-medium",
    },
  ];

  return (
    <div
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className="bg-cover bg-center flex flex-col lg:flex-row items-center justify-center lg:justify-around h-screen pt-12 lg:pt-0"
    >
      <div className="lg:items-start">
        <div className="mb-14 text-5xl lg:text-6xl flex justify-between">
          <div>
            <h1 className="text-center outfit-bold text-[#40A578]">
              Learn to be a
            </h1>
            <h1 className="text-center outfit-bold text-[#9DDE8B]">
              Climate Hero
            </h1>
          </div>
          <div>
            <Link to="/">
              <img src={backarrow} alt="Back" className="w-10 h-10" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-auto">
          {cardsData.map((card, index) => (
            <Card
              name={formData.username}
              key={index}
              image={card.image}
              title1={card.title1}
              title2={card.title2}
              buttonText={card.buttonText}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;

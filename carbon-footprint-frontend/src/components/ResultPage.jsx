import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import backgroundImage from "../assets/Images/background.svg";
import individualImage from "../assets/Images/individual.svg"; // Make sure to add your images to the src/images directory
import businessImage from "../assets/Images/Business.svg";
import travelImage from "../assets/Images/Travel.svg";
import cardsImage from "../assets/Images/PrintedCards.svg";
import qr from "../assets/Images/qr.svg";
import infi from "../assets/Images/infibusiness.svg";
import img1 from "../assets/Images/img1.svg";
import img2 from "../assets/Images/img2.svg";
import SuccessPage from "./SuccessPage";
import axios from "axios";
import { GlobalStateContext } from "../signupContext.jsx";
import "../components/style.css";

//razorpay
import { setSettings, updateOptionsWithOrderId } from "../../utils/razorpay.js";
const EmissionsCard = () => {
  const { formData } = useContext(GlobalStateContext);
  console.log(formData.name);

  let img;
  let offs = 0;
  const location = useLocation();
  const today = new Date();
  const month = today.getMonth() + 1; // January is 0
  const year = today.getFullYear();

  const date = today.getDate();
  const hours = today.getHours();
  const minutes = today.getMinutes();

  const currentTime = `${year}.${month}.${date}  ${hours}:${minutes}`;
  location.state.emit = parseFloat(location.state.emit.toFixed(2));
  const progressname =
    location.state.emit <= 2000
      ? "Low"
      : location.state.emit <= 4000
      ? "Moderate"
      : "High";
  const progressbarwidth =
    location.state.emit <= 2000
      ? "30%"
      : location.state.emit <= 4000
      ? "60%"
      : "100%";
  const progressbarbackgroundColor =
    location.state.emit <= 2000
      ? "bg-[#9DDE8B]"
      : location.state.emit <= 4000
      ? "bg-amber-500"
      : "bg-red-500";
  if (location.state.source == "TRAVEL") {
    img = travelImage;
  } else if (location.state.source == "BUSINESS") {
    img = businessImage;
  } else if (location.state.source == "PRINTED CARDS") {
    img = cardsImage;
  } else if (location.state.source == "INDIVIDUALS") {
    img = individualImage;
  }
  let intense = 0;
  let perc = 0;

  perc = (parseFloat(location.state.emit) / 2000) * 100;
  console.log(perc);
  intense = parseFloat(perc) / 100;
  if (perc > 100) {
    perc = 100;
  }
  offs = 150 * (location.state.emit / 25);

  const [offset, setOffs] = useState(offs);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    const value = event.target.value;

    if (value === "50%") {
      setOffs(offs / 2); // Use original offs value here
    } else if (value === "100%") {
      setOffs(offs); // Use original offs value here
    } else if (value === "150%") {
      setOffs(offs * 1.5); // Use original offs value here
    } else if (value === "200%") {
      setOffs(offs * 2); // Use original offs value here
    }
  };
  console.log(location);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const handlePayment = async () => {
    const settings = setSettings(100);
    const response = await axios(settings);
    console.log(response.data);
    const orderId = response.data.id;
    const rzp1 = updateOptionsWithOrderId(
      orderId,
      setPaymentSuccess,
      offset,
      formData
    );
    rzp1.open();
  };
  const [selectedOption, setSelectedOption] = useState("100%"); //

  if (paymentSuccess) {
    return (
      <SuccessPage data={formData} emit={location.state.emit}></SuccessPage>
    );
  }

  if (location.state.source === "PRINTED CARDS") {
    return (
      <div
        style={{ backgroundImage: `url(${backgroundImage})` }}
        className="bg-cover bg-center flex justify-center items-center min-h-screen"
      >
        <div className="max-w-md lg:max-w-full mx-auto lg:mx-0 px-6 lg:p-4 rounded-lg ">
          <div className="mb-4">
            <h2 className="text-5xl outfit-bold mt-12 lg:mt-0 lg:mb-12 text-[#40A578]">
              Emissions
            </h2>
          </div>

          <div className="lg:flex lg:gap-8">
            <div className="lg:flex-1 bg-white p-[35px] lg:w-[500px] rounded-md mb-4 lg:mb-0 border-2 border-[#9DDE8B]">
              <div className="flex gap-8 items-center border-b-2 border-[#9DDE8B]">
                <img
                  className="w-28 h-28 lg:w-28 lg:h-28 ml-2"
                  src={img}
                  alt={location.state.source}
                />
                <div className="mb-4">
                  <h3 className="text-lg outfit-semibold">
                    {location.state.source}
                  </h3>
                  <p className="text-xs outfit-medium ">
                    Emission Calculated by
                  </p>
                  <p className="text-2xl outfit-bold text-[#40A578]">
                    {formData.name.toUpperCase()}
                  </p>
                  <p className="text-xs outfit-medium">Updated time:</p>
                  <p className="text-xs outfit-medium">{currentTime}</p>
                </div>
              </div>
              <div>
                <p className="text-xs mt-8 outfit-medium">Total Emissions</p>
                <div className="flex justify-between">
                  <div className="text-6xl outfit-medium ">
                    {location.state.emit.toLocaleString("en-IN", {
                      maximumFractionDigits: 0,
                    })}
                    <span className="text-xs outfit-medium">kg CO2e</span>
                  </div>
                  <p className="w-28 text-right text-xs outfit-medium">
                    It takes 40 trees one year to absorb 800kg of CO2e
                  </p>
                </div>
              </div>
              <div className="flex pt-4 gap-4 justify-between mt-[35px]">
                <div>
                  <p className="text-[10px] lg:text-xs outfit-medium">
                    Emissions Intensity
                  </p>
                  <div className="text-5xl text-left outfit-medium">
                    {intense.toFixed(2)}
                  </div>
                </div>
                <div className="lg:ml-4">
                  <p className="text-[10px] lg:text-xs outfit-medium">
                    Emissions Level
                  </p>
                  <div className="text-center mb-2">
                    <div className="text-left">
                      <div className="outfit-semibold text-2xl mb-[2px]">
                        {progressname}
                      </div>
                      <div className="w-28 lg:w-36 bg-gray-200 rounded-sm  mb-[2px]">
                        <div
                          className={`h-full text-xs p-1 rounded-sm ${progressbarbackgroundColor}`}
                          style={{ width: progressbarwidth }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] lg:text-xs outfit-medium">
                    Emissions Percentage
                  </p>
                  <div className="text-5xl text-center outfit-medium">
                    {perc.toFixed(0)}
                    {"%"}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:flex-1 bg-white p-[35px] lg:w-[500px] rounded-md lg:mb-0  border-2 border-[#9DDE8B] ">
              <p className="text-xs outfit-medium">Cost to Offset</p>
              <div className="mb-2 flex justify-between items-center border-b-2 border-[#9DDE8B] pb-4">
                <p className="text-2xl md:text-4xl outfit-bold">
                  {"₹"}
                  {offset.toLocaleString("en-IN", {
                    maximumFractionDigits: 0,
                  })}{" "}
                  {"INR"}
                </p>
                <div className="flex flex-around gap-4">
                  <select
                    className=" text-left outfit-medium bg-[#efefef] rounded "
                    onChange={handleSelectChange}
                  >
                    <option value="50%">50%</option>
                    <option value="100%" selected>
                      100%
                    </option>
                    <option value="150%">150%</option>
                    <option value="200%">200%</option>
                  </select>
                  <button
                    className="bg-[#9DDE8B] text-white outfit-medium px-3 lg:px-4 py-2 rounded-md hover:bg-[#40A578] focus:outline-none focus:ring-[#40A578] "
                    onClick={handlePayment}
                  >
                    Offset Now!
                  </button>
                </div>
              </div>

              <div className="flex gap-4 items-center mt-2 lg:mt-4">
                {/* Added QR Image */}
                <div className="flex flex-col ">
                  <p className="text-[12px] lg: text-[14px] outfit-medium">
                    Go Digital with{" "}
                    <a
                      href="https://www.infi.business "
                      className="text-[#40A578] outfit-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      www.infi.business
                    </a>
                  </p>
                  <img
                    className="w-60 h-20 lg:w-60 lg:h-24 -mt-4 lg:mt-0 "
                    src={infi}
                    alt="Infi Business"
                  />
                  <p className="text-[14px] outfit-medium leading-[1]">
                    You're fighting climate change by funding these projects
                  </p>
                  <div className="mt-2">
                    {/* Added Create your infibusiness card button */}
                    <button
                      className="mx-auto outfit-medium flex justify-center items-center bg-[#9DDE8B] h-12 lg:w-60 text-center text-white px-4 py-8 sm:py-2  rounded-md hover:bg-[#40A578] focus:outline-none focus:ring-[#40A578] text-sm "
                      onClick={() => {
                        window.open(
                          "https://docs.google.com/forms/d/e/1FAIpQLScticnp69X320x_bJYMi8tw1EQdygWkPUNaX4kt2nsbblojhw/viewform?pli=1",
                          "_blank",
                          "noopener,noreferrer"
                        );
                      }}
                    >
                      Create your InfiBusiness Card!
                    </button>
                  </div>
                </div>
                <img
                  className="w-40 h-40 lg:w-42 lg:h-42 mt-8"
                  src={qr}
                  alt="QR Code"
                />
                {/* Added Infi Image */}
              </div>

              <div className="text-left outfit-medium text-[14px] mt-8 lg:mt-4 leading-[1]">
                <p>To know more about carbon offsetting</p>
                <p>
                  call{" "}
                  <span className="text-[#40A578] outfit-medium">
                    +91 9778 411 911
                  </span>{" "}
                  or email{" "}
                  <a
                    href="mailto:merin@wegrowforest.org"
                    className="text-[#40A578] outfit-medium"
                  >
                    merin@wegrowforest.org
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{ backgroundImage: `url(${backgroundImage})` }}
        className="bg-cover bg-center flex justify-center items-center min-h-screen"
      >
        <div className="max-w-md lg:max-w-full mx-auto lg:mx-0 px-6 lg:p-4  rounded-lg ">
          <div className="mb-4">
            <h2 className="text-5xl outfit-bold lg:mb-12 text-[#40A578]">
              Emissions
            </h2>
          </div>
          <div className="lg:flex  lg:gap-8">
            <div className="lg:flex-1 bg-white p-[35px] lg:w-[500px] rounded-md mb-4 lg:mb-0 border-2 border-[#9DDE8B]">
              <div className="flex gap-8 items-center p-2 border-b-2 border-[#9DDE8B]">
                <img
                  className="w-28 h-28 lg:w-28 lg:h-28 ml-2"
                  src={img}
                  alt={location.state.source}
                />
                <div className="mb-4">
                  <h3 className="text-lg outfit-semibold ">
                    {location.state.source}
                  </h3>
                  <p className="text-xs outfit-medium mb-[4px]">
                    Emission Calculated by
                  </p>
                  <p className="text-2xl outfit-bold text-[#40A578]">
                    {formData.name.toUpperCase()}
                  </p>
                  <p className="text-xs outfit-medium">Updated time:</p>
                  <p className="text-xs outfit-medium ">{currentTime}</p>
                </div>
              </div>
              <div>
                <p className="text-xs mt-8 outfit-medium">Total Emissions</p>
                <div className="flex justify-between">
                  <div className="text-6xl outfit-medium">
                    {location.state.emit.toLocaleString("en-IN", {
                      maximumFractionDigits: 0,
                    })}
                    <span className="text-xs outfit-medium">kg CO2e</span>
                  </div>
                  <p className="w-28 text-right text-xs outfit-medium">
                    It takes 40 trees one year to absorb 800kg of CO2e
                  </p>
                </div>
              </div>
              <div className="flex pt-4 gap-4 justify-between mt-[35px]">
                <div>
                  <p className="text-[10px] lg:text-xs outfit-medium">
                    Emissions Intensity
                  </p>
                  <div className="text-5xl text-left outfit-medium">
                    {intense.toFixed(2)}
                  </div>
                </div>
                <div className="lg:ml-4">
                  <p className="text-[10px] lg:text-xs outfit-medium">
                    Emissions Level
                  </p>
                  <div className="text-center mb-2">
                    <div className="text-left">
                      <div className="outfit-semibold text-2xl mb-[2px]">
                        {progressname}
                      </div>
                      <div className="w-28 lg:w-36 bg-gray-200 rounded-sm  mb-[2px]">
                        <div
                          className={`h-full text-xs p-1 rounded-sm ${progressbarbackgroundColor}`}
                          style={{ width: progressbarwidth }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] lg:text-xs outfit-medium">
                    Emissions Percentage
                  </p>
                  <div className="text-5xl text-center outfit-medium">
                    {perc.toFixed(0)}
                    {"%"}
                  </div>
                </div>
              </div>
            </div>
            <div className=" lg:flex-1 bg-white p-[35px] lg:w-[500px] rounded-md border-2 border-[#9DDE8B]">
              <p className="text-xs outfit-medium">Cost to Offset</p>
              <div className="mb-2 flex justify-between items-center border-b-2 border-[#9DDE8B] pb-4">
                <p className="text-2xl lg:text-4xl outfit-bold">
                  {"₹"}
                  {offset.toLocaleString("en-IN", {
                    maximumFractionDigits: 0,
                  })}{" "}
                  {"INR"}
                </p>
                <div className="flex flex-around gap-4">
                  <select
                    className=" text-center border outfit-medium border-gray-300 hover:border-gray-400 rounded"
                    onChange={handleSelectChange}
                    value={selectedOption}
                  >
                    <option value="50%">50%</option>
                    <option value="100%">100%</option>
                    <option value="150%">150%</option>
                    <option value="200%">200%</option>
                  </select>
                  <button
                    className="bg-[#9DDE8B] outfit-medium text-white px-3 lg:px-4 py-2 rounded-md hover:bg-[#40A578] focus:outline-none focus:ring-[#40A578] "
                    onClick={handlePayment}
                  >
                    Offset Now!
                  </button>
                </div>
              </div>
              <div>
                <p className="text-[14px] text-left outfit-medium mt-4">
                  You're fighting climate change by funding these projects:
                </p>
                <div className="flex justify-center gap-4 lg:gap-4 mt-4">
                  <div className="bg-white outfit-medium rounded-lg ">
                    <div>
                      <a
                        href="https://www.wegrowforest.org/green-india-mission-2030/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="relative w-36 h-16 lg:w-[205px] lg:h-[110px] rounded-md mx-auto mb-[8px]">
                          <img
                            src={img2}
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover rounded-md"
                          />
                          <div className="absolute inset-0 border-2 border-[#9DDE8B]  hover:border-[#40A578] rounded-md"></div>
                        </div>
                        <p className="text-[15px] outfit-bold text-left text-[#40A578] leading-[1]">
                          <span>We Grow Forest Foundation</span>
                          <br />
                          <span>Green India Mission</span>
                        </p>
                      </a>
                    </div>
                    <p className="text-[14px] outfit-medium text-left mt-2 leading-[1]">
                      <span>Planting 10 Million Trees</span> <br />
                      <span>by 2030</span>
                    </p>
                  </div>
                  <div className="bg-white outfit-medium rounded-lg ">
                    <div>
                      <a
                        href="https://seaofchange.in/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="relative w-36 h-16 lg:w-[205px] lg:h-[110px] rounded-md mx-auto mb-[8px]">
                          <img
                            src={img1}
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover rounded-md"
                          />
                          <div className="absolute inset-0 border-2 border-[#9DDE8B]  hover:border-[#40A578] rounded-md"></div>
                        </div>
                        <p className="text-[15px] outfit-bold text-left text-[#40A578] leading-[1]">
                          <span>Clean Shoreline</span>
                          <br />
                          <span>The Sea of Change</span>
                        </p>
                      </a>
                    </div>
                    <p className="text-[14px] outfit-medium text-left mt-2 text-left leading-[1]">
                      <span>Protecting Our Seas from</span> <br />
                      <span>Plastic Pollution</span>
                    </p>
                  </div>
                </div>
                <div className="text-left outfit-medium text-[14px] mt-4 leading-[1]">
                  <p>To know more about carbon offsetting</p>
                  <p>
                    call{" "}
                    <span className="text-[#40A578] outfit-medium">
                      +91 9778 411 911
                    </span>{" "}
                    or email{" "}
                    <a
                      href="mailto:merin@wegrowforest.org"
                      className="text-[#40A578] outfit-medium"
                    >
                      merin@wegrowforest.org
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default EmissionsCard;

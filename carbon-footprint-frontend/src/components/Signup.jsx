import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/Images/background.svg";
import { GlobalStateContext } from "../signupContext";

export default function SignUp() {
  const { setFormData } = useContext(GlobalStateContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    // Update the global state with form data
    setFormData({ name, email, phone, country, address });
    // Add your form submission logic here (e.g., API call)
    console.log("Form submitted:", { name, email, phone, country, address });

    // Navigate to a different route after form submission
    navigate("/Home");
  };
  return (
    <div
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className="bg-cover bg-center flex flex-col lg:flex-row items-center justify-center lg:justify-around h-screen "
    >
      <div className="text-left pl-12 lg:pl-0 mb-10 lg:mb-0 sm:pl-6">
        <h1 className="text-5xl lg:text-7xl outfit-extrabold text-[#40A578] text-left">
          Carbon Zero.Day
        </h1>
        <h1 className="text-5xl lg:text-7xl outfit-extrabold text-[#9DDE8B] text-left">
          Every Day
        </h1>
      </div>
      <div
        className="bg-[#9DDE8B] p-8 w-[350px] sm:w-[390px]"
        onSubmit={handleSubmit}
      >
        <form className="space-y-4">
          <p className="text-white outfit-medium">
            Transform your climate impact by offsetting your carbon footprint
            with Carbon Zero Day.
          </p>
          <div>
            <input
              placeholder="Name*"
              id="name"
              type="text"
              value={name}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#40A578] focus:border-[#40A578] sm:text-sm"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <input
              placeholder="Email*"
              type="email"
              id="email"
              value={email}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#40A578] focus:border-[#40A578] sm:text-sm"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              placeholder="Mobile Number*"
              id="phone"
              type="number"
              value={phone}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#40A578] focus:border-[#40A578] sm:text-sm"
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              placeholder="Country*"
              id="country"
              type="text"
              value={country}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#40A578] focus:border-[#40A578] sm:text-sm"
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              placeholder="Address"
              id="address"
              type="text"
              value={address}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#40A578] focus:border-[#40A578] sm:text-sm"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#40A578] text-white rounded-md hover:bg-[#40A578] focus:outline-none focus:ring-2 focus:ring-[#40A578]"
            >
              Calculate my emission!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

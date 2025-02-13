import React from "react";
import { Link, NavLink } from "react-router-dom";
import image from "../assets/image.png"
import { useNavigate } from "react-router-dom";
import "../App.css";



const TicketSelection = ({formData, setFormData, initialState }) => {
 const navigate = useNavigate()

 const handleNext = () => {
    navigate('/AttendeeDetails')
 }

 const handleCancel = () => {
  setFormData(initialState)
 }
  return (
    <>

<div className="flex justify-between items-center bg-gray-800 py-2 px-4 border border-gray-600 rounded-2xl">
        <div>
          <Link to="/">
          <img src={image} alt="Logo" className="h-6"/>
          </Link>
        </div>

        <div className="hidden md:flex">
          <nav className="flex justify-around gap-8">
            <NavLink to="/" className="text-gray-400">Events</NavLink>
            <NavLink to="/" className="text-gray-400">My Tickets</NavLink>
            <NavLink to="/" className="text-gray-400"> About Page</NavLink>
          </nav>
        </div>

        <div className="bg-white py-2 px-3 rounded-md flex justify-center items-center">
            <button className="text-gray-500 text-xs">MY TICKETS <span></span></button>
        </div>
      </div>

      <main className=" grid place-items-center m-8">
        <div className="bg-gray-800 p-6 border border-gray-600 rounded-2xl shadow-lg">
          <div>
            <div className="mb-2 md:flex justify-between items-center gap-80">
              <h4 className="text-white text-lg mb-2">Ticket Selection</h4>
              <p className="text-white">Step 1/3</p>
            </div>
            <div className="bg-purple-500/20 h-1 rounded-full">
              <div className="bg-purple-500 h-full w-[50%]"></div>
            </div>
          </div>

          <div className="main-section text-center p-2 border border-gray-600 rounded-2xl mt-4 mb-6 bg-linear-to-br from-gray-600 to-gray-900">
            <h1 className="text-white text-2xl mb-2">Techember Fest "25</h1>
            <p className="text-gray-300 text-sm md:text-md">
              Join us for an unforgettable experience at
            </p>
            <p className="text-gray-300 text-xs md:text-sm"><span></span> Techember Fest "25</p>
            <p className="text-gray-300 text-xs md:text-sm">[Event Location] || March 15, 2025 | 7:00 PM</p>
          </div>

          <hr className="text-gray-600 mb-4" />

          <div className="text-gray-300 p-2 mb-6">
            <p className="mb-2 text-xs md:text-sm">Select Ticket Type:</p>
            <div className="bg-gray-900 p-4 border border-gray-600 rounded-2xl md:grid grid-cols-2 gap-2">
              {[
                { type: "REGULAR", price: "Free" },
                { type: "VIP", price: "$50" },
                { type: "VVIP", price:"$150" },
              ].map(({ type, price }) => (
                <div  className={`p-2 border mt-2 border-gray-600 rounded-2xl cursor-pointer ${
                    formData.ticketType === type ? "bg-blue-500" : "bg-gray-900"
                  }`}  key={type} onClick={() => setFormData({...formData, ticketType:type})}>
                <p className="flex justify-between">
                  {type}<span className="bg-gray-600 px-3 rounded-sm">{price}</span>
                </p>
                <p>20 Left</p>
                </div>
              ))}
            </div>

          </div>

          <div className="w-full mb-4">
            <p className="text-gray-300 mb-2 text-xs md:text-sm">Number of Tickets: {formData.tickets}</p>
            <select className="w-full border border-gray-600 rounded-md px-4 py-2 text-gray-300 focus:outline-0" onChange={(e) => setFormData({...formData, tickets:e.target.value})}>
              <option className="text-gray-300 bg-gray-800">1</option>
              <option className="text-gray-300 bg-gray-800">2</option>
              <option className="text-gray-300 bg-gray-800">3</option>
              <option className="text-gray-300 bg-gray-800">4</option>
              <option className="text-gray-300 bg-gray-800">5</option>
            </select>
          </div>
          {/* {errors.tickets && <p className="text-red-500 text-sm">{errors.tickets}</p>} */}

          <div className="w-full gap-4 flex flex-col md:flex-row-reverse justify-evenly items-center md:border border-gray-600 md:bg-gray-900 rounded-2xl">
            <button className="w-full md:w-auto border border-gray-600 py-2 px-12 rounded-md text-gray-300 font-medium cursor-pointer hover:bg-blue-500" onClick={handleNext}>
              Next
            </button>
            <button className=" hover:bg-blue-500 w-full md:w-auto border border-gray-600 py-2 px-12 rounded-md text-gray-300 font-medium cursor-pointer">
              Cancel
            </button>
          </div>
        </div>
      </main>
      
    </>
  );
};

export default TicketSelection;

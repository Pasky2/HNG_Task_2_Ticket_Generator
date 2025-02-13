import React, { useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import image from "../assets/image.png";
import ticket from "../assets/ticket.png";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "../App.css";

const Confirmation = ({ formData, setFormData, initialState }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const savedData = localStorage.getItem("ticketFormData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const pdfRef = useRef();

  const handleBack = () => {
    setFormData(initialState);
    navigate("/");
  };

  const downloadForm = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save("ticket.pdf");
    });
  };

  return (
    <>
      <div className="flex justify-between items-center bg-gray-800 py-2 px-4 border border-gray-600 rounded-2xl">
        <div>
          <Link to="/">
            <img src={image} alt="Logo" className="h-6" />
          </Link>
        </div>

        <div className="hidden md:flex">
          <nav className="flex justify-around gap-8">
            <NavLink to="/" className="text-gray-400">
              Events
            </NavLink>
            <NavLink to="/" className="text-gray-400">
              My Tickets
            </NavLink>
            <NavLink to="/" className="text-gray-400">
              {" "}
              About Page
            </NavLink>
          </nav>
        </div>

        <div className="bg-white py-2 px-3 rounded-md flex justify-center items-center ">
          <button className="text-gray-500 text-xs">
            MY TICKETS <span></span>
          </button>
        </div>
      </div>

      <main className=" grid place-items-center m-8">
        <div
          className="bg-transparent p-6 border border-gray-600 rounded-2xl shadow-lg "
          ref={pdfRef}
        >
          <div>
            <div className="mb-2 md:flex justify-between items-center gap-80">
              <h4 className="text-white text-lg mb-2">Ready</h4>
              <p className="text-white">Step 3/3</p>
            </div>
            <div className="bg-purple-500/20 h-1 rounded-full">
              <div className="bg-purple-500 h-full w-[100%]"></div>
            </div>
          </div>

          <div className="text-center mt-6">
            <h1 className="text-white text-2xl">Your Ticket is Booked!</h1>
            <p className="text-gray-300 text-sm">
              Check your email for a copy or you can{" "}
              <span className="text-white font-bold">download</span>
            </p>
          </div>

          <div className="bg-cover bg-no-repeat mt-6 p-4 ">
            
              
              <div className="border border-gray-600 p-4 rounded-2xl grid place-items-center ">
                <div className="text-center">
                  <h1 className="text-white text-2xl">Techember Fest "25</h1>
                  <p className="text-gray-300 text-sm">
                    ! 4 Rumens road, Ikoyi, Lagos
                  </p>
                  <p className="text-gray-300 text-sm">
                    March 15, 2025 | 7:00 PM
                  </p>
                </div>

                <div className="text-white border mt-4 rounded-2xl">
                  <img
                    src={formData.profilePic}
                    alt="Profile Picture"
                    className="object-cover h-36 w-36 rounded-2xl"
                  />
                </div>

                <div className=" mt-4">
                  <div className="border border-gray-600 rounded-2xl p-2 bg-gray-700">
                    <div className="grid grid-cols-2">
                      <div className="border-b border-gray-600 border-r p-1">
                        <p className="text-sm text-gray-500">
                          Enter your name:
                        </p>
                        <p className="font-medium text-gray-300 text-sm">
                          {formData.name}
                        </p>
                      </div>
                      <div className="border-b border-gray-600  p-1">
                        <p className="text-sm text-gray-500">
                          Enter your email:
                        </p>
                        <p className="font-medium text-gray-300 text-xs md:text-sm">
                          {formData.email}
                        </p>
                      </div>
                      <div className="border-b border-gray-600 border-r p-1">
                        <p className="text-sm text-gray-500">Ticket Type:</p>
                        <p className="font-medium text-gray-300 text-sm">
                          {formData.ticketType}
                        </p>
                      </div>
                      <div className="border-b border-gray-600  p-1">
                        <p className="text-sm text-gray-500">Tickets:</p>
                        <p className="font-medium text-gray-300 text-sm">
                          {formData.tickets}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-gray-500 mt-2">
                      Special requests?:
                    </p>
                    <p className="text-wrap font-medium text-gray-300 text-xs md:text-sm ">
                      {formData.details}
                    </p>
                  </div>
                </div>
              </div>
            </div>
         

          <div className="w-full gap-4 flex flex-col md:flex-row-reverse justify-evenly items-center">
            <button
              onClick={downloadForm}
              type="submit"
              className="bg-blue-500 w-full border border-gray-600 py-2 px-12 rounded-md text-gray-300 font-bold cursor-pointer text-sm"
            >
              Download
            </button>
            <button
              onClick={handleBack}
              className="hover:bg-blue-500 w-full border border-gray-600 py-2 px-12 rounded-md text-gray-300 font-bold cursor-pointer text-xs"
            >
              Book Another Ticket
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Confirmation;

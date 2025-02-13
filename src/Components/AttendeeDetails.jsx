import React from "react";
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import image from "../assets/image.png"
import upload from "../assets/upload.png"
import { Navigate, useNavigate } from "react-router-dom";
// import { FaLocations } from "react-icons"

const AttendeeDetails = ({formData, setFormData }) => {
  const Navigate = useNavigate()
  const [errors, setErrors] = useState({});
  const [ loading, setLoading] = useState(false)

  useEffect(() => {
    const savedData = localStorage.getItem("ticketFormData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("ticketFormData", JSON.stringify(formData));
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(validate())
    Navigate('/Confirmation')
  };

  const handleBack = () => {
    Navigate(-1)
  };

  const handleFileUpload = async(event) => {
    const file = event.target.files[0]

    if (!file) return

    setLoading(true)
    const data = new FormData()
    data.append('file', file)
    data.append('upload_preset', 'Ticket_Generator')
    data.append('cloud_name', 'dst52te1o')

    const res = await fetch('https://api.cloudinary.com/v1_1/dst52te1o/image/upload', {
      method: 'POST',
      body: data
    })

    const uploadImageUrl= await res.json()
    setFormData({ ...formData, profilePic: uploadImageUrl.url })
    console.log(uploadImageUrl.url)
    setLoading(false)
  }

  const validate = () => {
    let newErrors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    if (!formData.email.trim()){
      newErrors.email = "Email is required";    
    }else if (!regex.test(formData.email)) newErrors.email = "This is an invalid email address";
    if (!formData.details.trim()) newErrors.details = "Please fill in your details";
    if (!formData.profilePic.match(/^http?:\/\//)) newErrors.profilePic = "Invalid image URL";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
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
        <div className="bg-transparent p-6 border border-gray-600 rounded-2xl shadow-lg">
          <div>
            <div className="mb-2 md:flex justify-between items-center gap-80">
              <h4 className="text-white text-lg mb-2">Attendee Details</h4>
              <p className="text-white">Step 2/3</p>
            </div>
            <div className="bg-purple-500/20 h-1 rounded-full">
              <div className="bg-purple-500 h-full w-[70%]"></div>
            </div>
          </div>

          <div className="main-section text-gray-300 p-3 border border-gray-600 rounded-2xl mt-4 mb-6 bg-gray-900">
            <form onSubmit={handleSubmit}>
            <div className="border border-gray-600 rounded-md bg-gray-800 p-2 mb-4" >
                <label className="text-sm">Upload Profile Photo</label>
                <div className="bg-gray-900 rounded-sm grid place-items-center mt-2">
                  <div>
                  {errors.profilePic && <p className="text-red-500 text-xs">{errors.profilePic}</p>}
                  <div className="upload-icon">
                    {
                      loading ? "Uploading..." : <img src="" alt="Upload Icon" />
                    }
                  </div>
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png"
                    className="w-36 rounded-2xl bg-gray-600 text-center border border-gray-600 h-32"
                    onChange={handleFileUpload}
                  />
                  </div>
                </div>
              </div>
              

              <hr className="text-gray-600 mb-4" />

              <div className="mt-3">
                <label htmlFor="name" className="text-sm">
                  Enter your name
                </label>
                <input
                value={formData.name}
                  type="text"
                  name="name"
                  id="name"
                  className="border border-gray-600 w-full rounded-md py-1 px-2 bg-transparent focus:outline-0"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
              

              <div className="mt-3">
                <label htmlFor="email" className="text-sm">
                  Enter your email
                </label>
                <input
                value={formData.email}
                  type="email"
                  name="email"
                  id="email"
                  className="border border-gray-600 w-full rounded-md py-1 px-2 bg-transparent focus:outline-0"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}


              <div className="mt-3">
                <label htmlFor="details" className="text-sm">
                  About the project
                </label>
                <textarea
                  name=""
                  id=""
                  cols="3"
                  rows="3"
                  className="border border-gray-600 w-full rounded-md py-1 px-2 bg-transparent focus:outline-0"
                  onChange={(e) =>
                    setFormData({ ...formData, details: e.target.value })
                  }
                >
                </textarea>
              </div>
              {errors.details && <p className="text-red-500 text-xs">{errors.details}</p>}


              <div className="mt-3 w-full gap-4 flex flex-col md:flex-row-reverse justify-evenly items-center">
                <button type="submit" className="hover:bg-blue-500 w-full border border-gray-600 py-2 px-12 rounded-md text-gray-300 font-medium cursor-pointer text-sm">
                  Get My Free Ticket
                </button>
                <button className="hover:bg-blue-500 w-full border border-gray-600 py-2 px-12 rounded-md text-gray-300 font-medium cursor-pointer text-sm" onClick={handleBack}>
                  Back
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default AttendeeDetails;

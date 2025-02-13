import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AttendeeDetails from "./Components/AttendeeDetails";

import TicketSelection from "./Components/TicketSelection";
import Confirmation from "./Components/Confirmation";
import NoMatch from "./Components/NoMatch";

import "./App.css";


export default function App() {
  const initialState = {
    ticketType: "Regular",
    tickets: 1,
    name: "",
    email: "",
    details: "",
    profilePic: "",}

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Invalid email";
    // if (!formData.avatar.match(/^https?:\/\//)) newErrors.avatar = "Invalid image URL";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <Routes>
      <Route path="/" element={<TicketSelection formData={formData} setFormData={setFormData} initialState={initialState}/>} />

      <Route path="AttendeeDetails" element={<AttendeeDetails formData={formData} setFormData={setFormData} validate={validate} errors={errors}/>} />
      <Route path="Confirmation" element={<Confirmation formData={formData} setFormData={setFormData} initialState={initialState}/>} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}

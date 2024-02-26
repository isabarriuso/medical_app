import React, { useEffect } from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from './Components/Navbar/Navbar';
import Landing_Page from './Components/Landing_Page/Landing_Page';
import Sign_Up from './Components/Sign_Up/Sign_Up';
import Login from './Components/Login/Login';
import InstantConsultation from './Components/InstantConsultationBooking/InstantConsultation';  
import FindDoctorSearch from './Components/FindDoctorSearch/FindDoctorSearch';
import DoctorCard from './Components/DoctorCard/DoctorCard';
import AppointmentForm from './Components/AppointmentForm/AppointmentForm';
import Booking from './Components/Booking/Booking';

function App() {

  return (
    <div className="App">
        <BrowserRouter>
          <Navbar/>
              <Routes>
                <Route path="/" element={<Landing_Page/>}/>
                <Route path="/signup" element={<Sign_Up/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/instant-consultation" element={<InstantConsultation />} />
                <Route path="/find-doctor-search" element={<FindDoctorSearch />} />
                <Route path="/doc-card" element={<DoctorCard />} />
                <Route path="/appt-form" element={<AppointmentForm />} />
                <Route path="/booking" element={<Booking />} />
              </Routes>


        </BrowserRouter>
       
    </div>
  );
}

export default App;

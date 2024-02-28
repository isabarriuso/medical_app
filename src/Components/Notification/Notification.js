import React, { useEffect, useState } from 'react';
import { API_URL } from '../../config';

const Notification = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('email');
    const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
    
    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);

      // Fetch appointment data from API
      fetch(`${API_URL}/api/appt/user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add your authorization token if needed
          // 'Authorization': `Bearer ${yourAuthToken}`
          'email': storedUsername, // Include the user's email in the headers
        },
      })
      .then(response => response.json())
      .then(data => {
        // Assuming data is an array of appointments
        setAppointmentData(data);
      })
      .catch(error => {
        console.error('Error fetching appointment data:', error);
      });
    }

    if (storedDoctorData) {
      setDoctorData(storedDoctorData);
    }
  }, []);
  
  return (
    <div>
      {children}
      {isLoggedIn && appointmentData && (
        <>
          <div className="appointment-card">
            <div className="appointment-card__content">
              <h3 className="appointment-card__title">Appointment Details</h3>
              <p className="appointment-card__message">
                <strong>Doctor:</strong> {appointmentData.doctorName}<br/>
                <strong>Speciality:</strong> {appointmentData.doctorSpeciality}<br/>
                <strong>Name:</strong> {appointmentData.name}<br/>
                <strong>Phone:</strong> {appointmentData.phoneNumber}<br/>
                <strong>Date of Appointment:</strong> {appointmentData.dateAp}<br/>
                <strong>Time slot:</strong> {appointmentData.selectedSlot}<br/>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Notification;

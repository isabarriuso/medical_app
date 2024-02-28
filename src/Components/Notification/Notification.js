import React, { useEffect, useState } from 'react';

const Notification = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('email');
    const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
    const storedAppointmentData = JSON.parse(localStorage.getItem('appointmentData'));
    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }

    if (storedDoctorData) {
      setDoctorData(storedDoctorData);
    }

    if (storedAppointmentData) {
      setAppointmentData(storedAppointmentData);
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
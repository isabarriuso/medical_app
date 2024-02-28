// Reviews.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ReviewForm = () => {
    const [appointments, setAppointments] = useState([]);
    const [userAppointments, setUserAppointments] = useState([]);

  // Fetch appointments data for the logged-in user (You'll need to implement this)
  useEffect(() => {
    // Retrieve user appointments from local storage
    const storedAppointments = JSON.parse(localStorage.getItem('userAppointments')) || [];

    setUserAppointments(storedAppointments);
    setAppointments(userAppointments)
  }, []);

  return (
    <div>
      <h2>Your Appointments</h2>
      <ul>
        {appointments.map(appointment => (
          <li key={appointment.id}>
            <p>
              <strong>Doctor:</strong> {appointment.doctorName}<br />
              <strong>Specialty:</strong> {appointment.doctorSpecialty}<br />
              <strong>Date:</strong> {appointment.dateAp}<br />
            </p>
            <Link to={`/leave-review/${appointment.id}`}>
              <button>Leave a Review</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewForm;
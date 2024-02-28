import React, { useState , useEffect} from 'react'
import { API_URL } from '../../config';
import Notification from '../Notification/Notification';

const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit }) => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [dateAp, setDateAp] = useState('');
    const [slotAp, setSlotAp] = useState('');
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [formSubmitted, setFormSubmitted] = useState(false);
  
    useEffect(() => {
        // Use this effect to set formSubmitted to false when component mounts
        setFormSubmitted(false);
      }, []);
    
      const handleFormSubmit = async (e) => {
        e.preventDefault();
    
        // Create an object with the appointment data
        const appointmentData = {
          name,
          phoneNumber,
          dateAp,
          selectedSlot,
          doctorName,
          doctorSpeciality,
        };
    
        try {
          // Make a POST request to the /api/appt endpoint
          const response = await fetch(`${API_URL}/api/appt`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(appointmentData),
          });
    
          if (response.ok) {
            console.log('Appointment data stored successfully in the API.');
            // Optionally, update the UI or take further actions
    
            // Set formSubmitted to true
            setFormSubmitted(true);
          } else {
            console.error('Error storing appointment data in the API.');
            // Handle errors and provide feedback to the user
          }
        } catch (error) {
          console.error('Error during appointment submission:', error);
          // Handle errors and provide feedback to the user
        }
      };
  
    return (
        <>
      <form onSubmit={handleFormSubmit} className="appointment-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
            <label htmlFor="dateAp">Date of Appointment:</label>
            <input
                type="date"
                id="dateAp"
                value={dateAp}
                onChange={(e) => setDateAp(e.target.value)}
                required
            />
        </div>

        <div className="form-group">
            <label htmlFor="slotAp">Book Time Slot: </label>
            <select value={selectedSlot} className="custom-select" id="inputGroupSelect01" onChange={(e) => setSelectedSlot(e.target.value)}>
                <option defaultValue>Select a time slot</option>
                <option value="13:00" name="13:00">13:00</option>
                <option value="14:00" name="14:00">14:00</option>
                <option value="15:00" name="15:00">15:00</option>
                <option value="16:00" name="16:00">16:00</option>
                <option value="17:00" name="17:00">17:00</option>
            </select>
        </div>

        <button type="submit">Book Now</button>
      </form>
        {formSubmitted && <Notification />}
      </>
    );
  };

export default AppointmentForm

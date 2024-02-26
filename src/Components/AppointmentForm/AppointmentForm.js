import React, { useState } from 'react'

const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit }) => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [dateAp, setDateAp] = useState('');
    const [slotAp, setSlotAp] = useState('');
    const [selectedSlot, setSelectedSlot] = useState(null);
  
    const handleSlotSelection = (slot) => {
      setSelectedSlot(slot);
    };
  
    const handleFormSubmit = (e) => {
      e.preventDefault();
      onSubmit({ name, phoneNumber });
      setName('');
      setPhoneNumber('');
    };
  
    return (
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
            <select className="custom-select" id="inputGroupSelect01" onChange={(event) => setName(event.target.value)}>
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
    );
  };

export default AppointmentForm

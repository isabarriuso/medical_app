const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Appointment = require('../models/Appointment');

// Route to store a new appointment: POST: http://localhost:8181/api/appt
router.post('/', [
  body('name', "Name should not be empty").notEmpty(),
  body('phoneNumber', "Phone Number should not be empty").notEmpty(),
  body('dateAp', "Date of Appointment should not be empty").notEmpty(),
  body('selectedSlot', "Selected Slot should not be empty").notEmpty(),
  body('doctorName', "Doctor Name should not be empty").notEmpty(),
  body('doctorSpeciality', "Doctor Speciality should not be empty").notEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const {
      name,
      phoneNumber,
      dateAp,
      selectedSlot,
      doctorName,
      doctorSpeciality,
    } = req.body;

    const newAppointment = new Appointment({
      name,
      phoneNumber,
      dateAp,
      selectedSlot,
      doctorName,
      doctorSpeciality,
    });

    const savedAppointment = await newAppointment.save();
    res.json(savedAppointment);
  } catch (error) {
    console.error('Error storing appointment data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to update an existing appointment: PUT: http://localhost:8181/api/appt/:id
router.put('/:id', [
    body('name', "Name should not be empty").notEmpty(),
    body('phoneNumber', "Phone Number should not be empty").notEmpty(),
    body('dateAp', "Date of Appointment should not be empty").notEmpty(),
    body('selectedSlot', "Selected Slot should not be empty").notEmpty(),
    body('doctorName', "Doctor Name should not be empty").notEmpty(),
    body('doctorSpeciality', "Doctor Speciality should not be empty").notEmpty(),
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    try {
      const appointmentId = req.params.id;
      const {
        name,
        phoneNumber,
        dateAp,
        selectedSlot,
        doctorName,
        doctorSpeciality,
      } = req.body;
  
      const updatedAppointment = await Appointment.findByIdAndUpdate(
        appointmentId,
        {
          name,
          phoneNumber,
          dateAp,
          selectedSlot,
          doctorName,
          doctorSpeciality,
        },
        { new: true }
      );
  
      res.json(updatedAppointment);
    } catch (error) {
      console.error('Error updating appointment data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Route to get a specific appointment by ID: GET: http://localhost:8181/api/appt/:id
  router.get('/:id', async (req, res) => {
    try {
      const appointmentId = req.params.id;
      const appointment = await Appointment.findById(appointmentId);
  
      if (!appointment) {
        return res.status(404).json({ error: 'Appointment not found' });
      }
  
      res.json(appointment);
    } catch (error) {
      console.error('Error fetching appointment data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Route to delete an existing appointment: DELETE: http://localhost:8181/api/appt/:id
router.delete('/:id', async (req, res) => {
    try {
      const appointmentId = req.params.id;
  
      // Check if the appointment exists
      const existingAppointment = await Appointment.findById(appointmentId);
      if (!existingAppointment) {
        return res.status(404).json({ error: 'Appointment not found' });
      }
  
      // Delete the appointment
      await existingAppointment.remove();
  
      res.json({ message: 'Appointment deleted successfully' });
    } catch (error) {
      console.error('Error deleting appointment:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  module.exports = router;
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  dateAp: { type: Date, required: true },
  selectedSlot: { type: String, required: true },
  doctorName: { type: String, required: true },
  doctorSpeciality: { type: String, required: true },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;

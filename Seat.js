const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  seatNumber: String,
  isBooked: { type: Boolean, default: false },
  bookedBy: {type: String},
});

const Seat = mongoose.model('Seat', seatSchema);

module.exports = Seat;
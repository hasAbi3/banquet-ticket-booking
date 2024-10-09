const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    seatNumber : {type: String, required: true, unique: true},
    isBooked: {type: Boolean, default: false},
    bookedBy: {type: String},
    bookingDate: {type: Date, default:Date.now}
});

const Ticket = mongoose.model("Ticket", ticketSchema);
module.exports = Ticket;
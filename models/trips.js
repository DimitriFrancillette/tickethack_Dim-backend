const mongoose = require('mongoose');

const tripSchema = mongoose.Schema({
    departure: String,
    arrival: String,
    date: Date,
    price: Number,
    booking: { type: mongoose.Schema.Types.ObjectId, ref: 'bookings' }
});

const Trip = mongoose.model('trips', tripSchema);

module.exports = Trip;
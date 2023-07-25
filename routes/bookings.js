var express = require('express');
var router = express.Router();
const Booking = require('../models/bookings');

//enregistrement des voyages dans la collection pour booking
router.post("/", (req, res) => {

    const { tripId } = req.body;

    if (!tripId) {
        res.json({ result: false, error: "Missing id" });
        return;
    }

    Booking.findOne({ trip: tripId })
        .then(booking => {
            console.log(booking)
            if (booking === null) {

                const newBook = new Booking({
                    trip: tripId,
                    isBooked: false,
                });

                newBook.save().then(() => {
                    res.json({ result: true, message: "booking saved" })
                })
                return
            }
            res.json({ result: false, message: "booking already saved" });
        })
        .catch(err => {
            res.json({ error: "an error has occured", err });
        });
});

//suppression des voyages dans la collection pour booking
router.delete("/:tripId", (req, res) => {

    const { tripId } = req.params;

    if (!tripId) {
        res.json({ result: false, error: "Missing id" });
        return;
    }

    Booking.findOne({ trip: tripId })
        .then(booking => {
            if (booking === null) {
                res.json({ result: false, message: "no booking found" });
                return
            }

            Booking.deleteOne({trip: tripId})
            .then(booking =>{
                res.json({result: true, message: "booking deleted"});
            })
        })
        .catch(err => {
            res.json({ error: "an error has occured", err });
        });
});


//affichage des voyages sur la page cart
router.get("/", (req, res) => {
    Booking.find({isBooked: false}).populate('trip')
    .then(bookings => {
        console.log(bookings);
        if (!bookings[0]) {
            res.json({ result: false, message: 'No trip found.' });
            return;
        }
        res.json({result: true, bookings});
    })
    .catch(err => {
        res.json({ error: "an error has occured", err });
    });
});

//pour affichage dans la page Bookings, on passe le isBooked de false à true
router.patch("/:tripId", (req, res) => {

    const { tripId } = req.params;

    if (!tripId) {
        res.json({ result: false, error: "Missing id" });
        return;
    }

    Booking.findOneAndUpdate({ trip: tripId, isBooked: false}, {isBooked: true})
        .then(booking => {
            if (booking === null) {
                res.json({ result: false, message: "booking already Paid" });
                return;
            }
            res.json({ result: true, booking })
        })
        .catch(err => {
            res.json({ error: "an error has occured", err });
        });
});

//affichage des voyages sur la page bookings
router.get("/booked", (req, res) => {
    Booking.find({isBooked: true}).populate('trip')
    .then(bookings => {
        console.log(bookings);
        if (!bookings[0]) {
            res.json({ result: false, message: 'No trip found.' });
            return;
        }
        res.json({result: true, bookings});
    })
    .catch(err => {
        res.json({ error: "an error has occured", err });
    });
});



module.exports = router;
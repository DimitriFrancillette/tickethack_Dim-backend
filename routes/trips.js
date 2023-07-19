var express = require('express');
var router = express.Router();
const Trip = require('../models/trips');
const { checkBody } = require('../modules/checkBody');
var moment = require('moment'); // require

//récupère les trips en fonction du lieu de départ, d'arrivée et de la date
router.get("/trips/:departure/:arrival/:date", (req, res) => {
    
    const { departure, arrival, date } = req.params;
       
    if (departure === "" || arrival === "" || date === "") {
        res.json({ result: false, error: "Missing or empty fields" });
        return;
    }

    const day = moment(date).format();
    const nextDay = moment(date).add(1, 'day').format();

    Trip.find({ departure: { $regex: departure, $options: 'i' }, arrival: { $regex: arrival, $options: 'i' }, date: { $gte: day, $lt: nextDay } })
        .then(trips => {
            if (!trips[0]) {
                res.json({ result: false, message: 'No trip found.' });
                return;
            }
            res.json({ result: true, trips });
        })
        .catch(err => {
            res.json({ error: "invalid place or date", err });
        });

});

// récupère un trip en fonction de son id
router.get("/trip/:id", (req, res) => {
    const { id } = req.params

    Trip.findById(id).then(trip => {
        console.log(trip)
        if (trip != null) {
            res.json({ result: true, trip });
            return
        }
        res.json({result: false, message: 'No trip found for this id.'})
    })
        .catch(err => {
            res.json({ error: "invalid trip id", err });
        });

});



module.exports = router;
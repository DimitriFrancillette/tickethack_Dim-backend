var express = require('express');
var router = express.Router();
const Trip = require('../models/trips');
var moment = require('moment'); // require

//récupère les trips en fonction du lieu de départ, d'arrivée et de la date
router.get("/:departure/:arrival/:date", (req, res) => {

    const { departure, arrival, date } = req.params;
    console.log(req.params);
    if (departure === "" || arrival === "" || date === "") {
        res.json({ result: false, error: "No trip found" });
    } else {
        const day = moment(date).format();
        const nextDay = moment(date).add(1, 'day').format();
        Trip.find({ departure: { $regex: departure, $options: 'i' }, arrival: { $regex: arrival, $options: 'i' }, date: { $gte: day, $lt: nextDay } })
            .then(trips => {
                for (const trip of trips) {
                    console.log(trip.date);                    
                }
                res.json({ result: true, trips });
            })
            .catch(err => {
                res.json({ error: "invalid date", err });
            });
    }
});

// récupère un trip en fonction de son id
router.get("/:id", (req, res) => {
    const { id } = req.params

    Trip.findById(id).then(trip => {

        res.json({ result: true, trip });
    })

});



module.exports = router;
const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
router.use(morgan('common'));
const routine = require('./model');
const mongoose = require('mongoose');


//home page routing
router.get('/', (req, res) => {
    //res.sendFile(__dirname + '/public/index.html')
});

//profile page routing
router.get('/profile/:id', (req, res) => {
    //how to accomplish this with name of profile that has several workouts?
    console.log("this is the ID ", req.params.id, typeof (req.params.id));
    routine
        .findById(req.params.id)
        .then(function (profile) {
            console.log("this is routine", profile);
            res.json(profile.neaten())
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        "message": "Internal Error in profile"
                    })
                })
        })
});



//how do I make sure this posts to the correct profile?
router.post('/profile/:id', jsonParser, (req, res) => {
    //res.sendFile(__dirname + '/public/profile.html');
    const newRoutine = new routine({
        name: req.body.name,
        date: req.body.date,
        upper: [{
            Exercise: req.body.Exercise,
            Sets: req.body.Sets,
            Reps: req.body.Reps,
            Lbs: req.body.Lbs
        }],
        lower: [{
            Exercise: req.body.Exercise,
            Sets: req.body.Sets,
            Reps: req.body.Reps,
            Lbs: req.body.Lbs
        }]
    })
    newRoutine.save((error) => {
        if (error) {
            console.log(error);
        } else {
            console.log("successfully saved");
        }
    })
})

router.put('/profile/:id',(req, res)=>{
    if (req.params.id !== req.body.id){
        res.status(500).json({"message":"Wrong ID"});
    }
} )



//routines list for all membersø
router.get('/all-routines', (req, res) => {
    //res.sendFile(__dirname + '/public/routineList.html');
    routine
        .find()
        .then(fit => {
            res.json(fit.map(fittest => fittest.neaten()))
        })
        .catch(err => {
            res.status(500).json({
                error: "Unable to get all routines"
            })

        });
});

module.exports = router;
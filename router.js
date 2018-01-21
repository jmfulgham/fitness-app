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



//profile page
router.get('/profile/name/:username', (req, res) => {
    routine.find({
            username: req.params.username
        })
        .then(profile => {

            res.json(profile.map(list => list.neaten()))
        })
        .catch(err => {
            res.status(500).json({
                error: "Unable to get all routines"
            });

        });
});

router.post('/profile/name/:username', jsonParser, (req, res) => {
    var post = new routine({
        name: req.body.name,
        username: req.body.username,
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
    post.save(function (err, post) {
        if (err) {
            return next(err)
        }
        res.json(201, post)
    })
    // .then(newList=>{
    //     res.status(201).json(newList.neaten())
    // })
    //     .catch(error => {
    //         res.status(500).json({ message: "Error, didn't save" })
    //     });
})



//each workout page routing
router.get('/workout/:id', (req, res) => {
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



router.put('/workout/:id', jsonParser, (req, res) => {

    req.params.name = req.body.name || req.params.name;
    req.params.date = req.body.date || req.params.date;
    req.params.upper = req.body.upper || req.params.upper;
    req.params.lower = req.body.lower || req.params.lower

    let toUpdate = {}
    routine
        .findByIdAndUpdate(req.params.id, req.body, {
            $set: toUpdate
        })
        .then(updatedList => {
            res.status(204).end()
        })
        .catch(err => {
            res.status(500).json({
                message: "Server error"
            });
            console.log("Error ", err);
        });
});



router.delete('/workout/:id', (req, res) => {
    console.log("This is the request ", req);
    routine
        .findByIdAndRemove(req.params.id)
        .then(fitness => res.status(204).end())
        .catch(err => res.status(500).json({
            message: 'Internal server error'
        }));
});

////////////////////routines list for all members
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
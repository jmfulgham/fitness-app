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
 
});

//profile page
router.get('/profile/name/:username', (req, res) => {
    routine.find({
            username: req.params.username
        })
        .then(profile => {

            res.json(profile.map(list => list.neaten()))
            // const user = profile.map(list => list.neaten());
            // res.render('profile', { user: JSON.stringify(user) })
        })
        .catch(err => {
            res.status(500).json({
                error: "Unable to get all routines"
            });

        });
});

router.post('/profile/name/:username', jsonParser, (req, res) => {
    const { name, username, date, upper, lower } = req.body;
    const newRoutine = new routine({ name, username, date, upper, lower });

    newRoutine.save()
        .then(newRoutine => {
            res.status(201).json(newRoutine.neaten());

        })
        .catch(err => {
            res.status(500).json({
                error: 'Something went wrong'
            });
        });
});


//each workout page 
router.get('/workout/:id', (req, res) => {

    routine
        .findById(req.params.id)
        .then(function (profile) {
            res.json(profile.neaten())
                .catch(err => {
                    res.status(500).json({
                        "message": "Internal Error in profile"
                    });
                });
        });
});

router.put('/workout/:id', jsonParser, (req, res) => {

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
        });
});


router.delete('/workout/:id', (req, res) => {
    routine
        .findByIdAndRemove(req.params.id)
        .then(fitness => res.status(204).end())
        .catch(err => res.status(500).json({
            message: 'Internal server error'
        }));
});

//routines list for all members
router.get('/all-routines', (req, res) => {
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
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
    res.sendFile(__dirname + '/public/HTML/index.html');
});

//profile page
router.get('/profile/JSON/:username', (req, res) => {
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

router.get('/profile/name/:username', (req, res) => {
    res.sendFile(__dirname + '/public/HTML/profile.html');
})

router.get('/all-routines/', (req, res) => {
    res.sendFile(__dirname + '/public/HTML/routineList.html');
})
router.post('/profile/JSON/:username', jsonParser, (req, res) => {
    const {
        username,
        date,
        upper,
        lower
    } = req.body;

    const newRoutine = new routine({
        username,
        date,
        upper,
        lower
    })
    console.log(newRoutine);
    newRoutine.save()
        .then(newRoutine =>
            res.status(201).json(newRoutine.neaten())
        )
        .catch(err => {
            res.status(500).json({
                error: 'Something went wrong'
            });
        });
});


//each workout page 
router.get('/workout/JSON/:id', (req, res) => {

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

router.put('/workout/JSON/:id', jsonParser, (req, res) => {
    let toUpdate = req.body;
    routine
        .findByIdAndUpdate(req.params.id, toUpdate, {
            $set: toUpdate
        })
        .then(updatedList => {
            console.log("Updated", updatedList);
            res.send(updatedList).status(204);
        })
        .catch(err => {
            res.status(500).json({
                message: "Server error"
            });
        });
});


router.delete('/workout/JSON/:id', (req, res) => {
    routine
        .findByIdAndRemove(req.params.id)
        .then(fitness => res.status(204).end())
        .catch(err => res.status(500).json({
            message: 'Internal server error'
        }));
});




//routines list for all members
router.get('/all-routines/JSON', (req, res) => {
    routine
        .find()
        .then(fit => {
            res.json(fit.map(fittest => fittest.neaten()))
        })
        .catch(err => {
            res.status(500).json({
                error: "Unable to get all routines",
                Error: `${err}`
            })

        });
});

module.exports = router;
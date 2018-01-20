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
    //how to accomplish this with name of profile that has several workouts? Add a username?

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




//my id is per workout, NOT per profile. A profile may have multiple workouts
// So if I want to search by username, how do I do this?
//how do I set up static middleware in Mongoose so that I can GET profile/username ?
// how do I show all the workouts with the same username? Organized by date?

//will this solve my POST problem?

//will I need to do a PUT for profile/:id? I think this is best when I want to update a workout


//how do I make sure this posts to the correct profile?
router.post('/profile/:id', jsonParser, (req, res) => {
    
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
    if (!(req.params.id === req.body.id)){
        res.status(400).json({message:"Wrong ID"});
    }
    res.json({"message":"Successfully put!"});
} )

router.delete('/profile/:id',(req,res)=>{
    console.log("This is the request ", req);
    routine
    .findByIdAndRemove(req.params.id)
        .then(fitness => res.status(204).end())
        .catch(err => res.status(500).json({ message: 'Internal server error' }));
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
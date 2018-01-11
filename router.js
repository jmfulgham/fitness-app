const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
router.use(morgan('common'));
const {routine, profile} = require('./model');


//home page routing
router.get('/', (req,res)=>{
    routine
    .find((error, routine)=>{
        if (error){
            next(error);
        }
        else {console.log(routine)}
    })
    .then(routine =>{
        res.json({
            routine: routine.map(function(routine){
                return routine;
            })
        });
    })
    .catch(err=>{
        console.log("This error is ", err);
        res.status(500).json({message: "Internal Home Page error"});
    });
});

//profile page routing
router.get('/profile',(req,res)=>{
    res.sendFile(__dirname + '/public/profile.html');
   
});

module.exports= router;







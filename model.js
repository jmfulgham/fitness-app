const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const routineSchema= mongoose.Schema([{
    id: String,
    name: String,
    date: Date,
    upper : [{
        Exercise: String,
        Sets: Number,
        Reps: Number,
        Lbs: Number
    }], 
    //what needs to happen to ensure we can have more than one object?
    lower: [{
        Exercise: String,
        Sets: Number,
        Reps: Number,
        Lbs: Number
    }]

}])
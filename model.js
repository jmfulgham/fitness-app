const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const routineSchema = mongoose.Schema({
    name: String,
    username: String,
    date: Date,
    upper: [{
        Exercise: String,
        Sets: Number,
        Reps: Number,
        Lbs: Number
    }],
  
    lower: [{
        Exercise: String,
        Sets: Number,
        Reps: Number,
        Lbs: Number
    }]
})
const workoutSchema = mongoose.Schema([{
    Exercise: String,
    Sets: Number,
    Reps: Number,
    Lbs: Number
}]);

routineSchema.methods.neaten = function () {
    return {
        id: this._id,
        username: this.username,
        name: this.name,
        date: this.date,
        upper: this.upper,
        lower: this.lower
    }
}
workoutSchema.methods.neaten= function (){
    return {
        id: this._id,
        Exercise: this.Exercise,
        Sets: this.Sets,
        Reps: this.Reps,
        Lbs: this.Lbs
    }
}

const routine = mongoose.model('routine', routineSchema, 'routine');
const workout = mongoose.model('workout', workoutSchema, 'routine')
module.exports = routine;
module.exports= workout;
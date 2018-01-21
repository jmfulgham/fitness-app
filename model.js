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

const routine = mongoose.model('routine', routineSchema, 'routine');
module.exports = routine;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const routineSchema= mongoose.Schema({
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
})

routineSchema.methods.neaten = function(){
    return{
        id: this._id,
        name: this.name,
        date: this.date,
        upper: this.upper,
        lower: this.lower
    }
}

const routine= mongoose.model('routine', routineSchema);
module.exports = routine;
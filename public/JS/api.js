'use strict';



//user enters date into client
//user hit submit button
//server recieves the username from the URL
//need the name
//server recieves the date in the POST request
//server saves username with corresponding date entry

let date = "";

function getWorkoutDate() {
    date = date + $("input[name='date']").val();
    return date;
}

let bodyPart = "";

function getBodyPart() {
    bodyPart = bodyPart + $("select[name='upper-or-lower']").val();
    return bodyPart;
}

let exercise = "";
let reps = "";
let sets = "";
let lbs = "";

function getExercise() {
    exercise = exercise + $("input[name='exercise']").val();
    reps = reps + $("input[name='reps']").val();
    sets = sets + $("input[name='sets']").val();
    lbs = lbs + $("input[name='lbs']").val();
    let workout =  {
        "Exercise": exercise,
        "Sets": sets,
        "Reps": reps,
        "Lbs": lbs
    };
    return workout;
}
// "username" : "${username}","${bodyPart}":[{
// "${workoutDetails}"
//                 }]

function formReset() {
    $("input[name='date']").empty()
    //$("select[name='upper-or-lower']").empty()
    $("input[name='exercise']").empty();
    $("input[name='reps']").empty();
    $("input[name='sets']").empty();
    $("input[name='lbs']").empty();

};

function postInfo() {
    $('#submit').on('click', event => {
        event.preventDefault();
        formReset();
        let dates = JSON.stringify(getWorkoutDate());
        let bodyParts = JSON.stringify(getBodyPart());
        let workoutDetails = JSON.stringify(getExercise());
        console.log("le date ", dates, "le body ", bodyParts, "le work ", workoutDetails);
        let username = JSON.stringify(window.location.pathname.split("/")[3]);
        console.log("clicked", username);
        $.ajax({
            type: "POST",
            url: `http://localhost:9000/profile/JSON/${username}`,
            data: `{
            "username" : ${username},
                "date" : ${dates},
                ${bodyParts}: [ ${workoutDetails}
            ]
            }`,
            dataType: "json",
            headers: {
                "Content-Type": "application/json"
            },
            success: function () {
                $(".create").append(`<section class="col-4"><h4>Workout Saved</h4></section>`);
                location.reload();
            
                
            },
            error: function (req) {
                console.log(req.body);
                alert("Error saving workout");

            }
        })
    })
}


function displayNewWorkout(dates, bodyParts, workoutDetails){
    $(".list").append(`<section class="col-4"><h4>${dates}</h4><h5>${bodyParts}</h5>
    <ul><li>${workoutDetails}</li></section>`);
}


function addEditButton(){

}

$(document).ready(function () {
    postInfo()
})
'use strict';

// let nestedUpper = {
//     "upper": {
//         "Exercise": "Benchpress",
//         "Sets": 4,
//         "Reps": 10,
//         "Lbs": 150
//     }};

// let nestedUpperArray= {
//     "upper": [{
//         "Exercise": "Benchpress",
//         "Sets": 4,
//         "Reps": 10,
//         "Lbs": 150
//     },

//     {
//         "Exercise": "Chest Fly",
//         "Sets": 3,
//         "Reps": 12,
//         "Lbs": 120
//     },

//     {
//         "Exercise": "Shoulder Press",
//         "Sets": 4,
//         "Reps": 10,
//         "Lbs": 100
//     }
//     ]
// }
//     "Exercise": "Benchpress",
//     "Sets": 4,
//     "Reps": 10,
//     "Lbs": 150
// }}


// let upper = {
//     "Exercise": "Benchpress",
//     "Sets": 4,
//     "Reps": 10,
//     "Lbs": 150
// };


// let upperArray = [{
//         "Exercise": "Benchpress",
//         "Sets": 4,
//         "Reps": 10,
//         "Lbs": 150
//     },

//     {
//         "Exercise": "Chest Fly",
//         "Sets": 3,
//         "Reps": 12,
//         "Lbs": 120
//     },

//     {
//         "Exercise": "Shoulder Press",
//         "Sets": 4,
//         "Reps": 10,
//         "Lbs": 100
//     }
// ];

// let lower = {
//     "Exercise": "Goblet Squats",
//     "Sets": 3,
//     "Reps": 15,
//     "Lbs": 35
// };

// let lowerArray = [{
//     "Exercise": "Goblet Squats",
//     "Sets": 3,
//     "Reps": 15,
//     "Lbs": 35
// }, {
//     "Exercise": "Backwards Lunges",
//     "Sets": 3,
//     "Reps": 15,
//     "Lbs": 65
// }, {
//     "Exercise": "Hang Snatches",
//     "Sets": 5,
//     "Reps": 3,
//     "Lbs": 105
// }];


// let fullOneProfile = {
//     "name": "Willy Warm-Up",
//     "username": "ww404",
//     "date": "1.10.18",
//     "upper": [{
//         "Exercise": "Benchpress",
//         "Sets": 4,
//         "Reps": 10,
//         "Lbs": 150
//     },

//     {
//         "Exercise": "Chest Fly",
//         "Sets": 3,
//         "Reps": 12,
//         "Lbs": 120
//     },

//     {
//         "Exercise": "Shoulder Press",
//         "Sets": 4,
//         "Reps": 10,
//         "Lbs": 100
//     }
//     ],
//     "lower": [{
//         "Exercise": "Goblet Squats",
//         "Sets": 3,
//         "Reps": 15,
//         "Lbs": 35
//     }, {
//         "Exercise": "Backwards Lunges",
//         "Sets": 3,
//         "Reps": 15,
//         "Lbs": 65
//     }, {
//         "Exercise": "Hang Snatches",
//         "Sets": 5,
//         "Reps": 3,
//         "Lbs": 105
//     }]
// };

// let arrayOfUppers = [{
//     "date": "01.28.18",
//         "upper": [{
//                 "Exercise": "Benchpress",
//                 "Sets": 4,
//                 "Reps": 10,
//                 "Lbs": 150
//             },
//             {
//                 "Exercise": "Chest Fly",
//                 "Sets": 3,
//                 "Reps": 12,
//                 "Lbs": 120
//             },
//             {
//                 "Exercise": "Shoulder Press",
//                 "Sets": 4,
//                 "Reps": 10,
//                 "Lbs": 100
//             }
//         ]
//     },
//     {
//         "date": "01.22.18",
//         "upper": [{
//                 "Exercise": "Military Press",
//                 "Sets": 4,
//                 "Reps": 10,
//                 "Lbs": 150
//             },
//             {
//                 "Exercise": "Power Cleans",
//                 "Sets": 3,
//                 "Reps": 12,
//                 "Lbs": 120
//             },
//             {
//                 "Exercise": "Crunches",
//                 "Sets": 4,
//                 "Reps": 10,
//                 "Lbs": 100
//             }
//         ]
//     }, {
//         "date": "01.19.18",
//         "upper": [{
//             "Exercise": "Shoulder Fly",
//             "Sets": 4,
//             "Reps": 10,
//             "Lbs": 150
//         },
//         {
//             "Exercise": "Push Press",
//             "Sets": 3,
//             "Reps": 12,
//             "Lbs": 120
//         }
//         ]
//     }
// ];


let workoutDate = "";
let upperWorkout = "";
let lowerWorkout = "";

function getAllRoutines() {
    $.ajax({
        type: "GET",
        url: `http://localhost:9000/all-routines/JSON/`,
        dataType: 'json',
        headers: {
            "Content-Type": "application/json"
        },
        success: function (list) {
            handleNames(list)
        }
    })
}

function getProfile(username) {
    $ajax({
        type: "GET",
        url: `localhost:9000/profile/names/${username}`,
        dataType: 'json',
        headers: {
            "Content-Type": "application/json"
        },
        success: function (list) {
            return list
        }
    })
}


function getProfile(username) {
    $.ajax({
        type: "GET",
        url: `http://localhost:9000/profile/JSON/${username}`,
        dataType: 'json',
        headers: {
            "Content-Type": "application/json"
        },
        success: function (profilesList) {
            displayOriginalObject(profilesList);
        }
    })
}

//routines API
function handleNames(list) {
    let newList = removeDupes(list);
    newList.map(function (shortList) {
        let name = shortList.name;
        let username = shortList.username;
        $(".row").append(`<section class="section col-3 shadow">
        <h3>${name}</h3> <button type="submit"><a href="/profile/name/${username}" target="blank">
        View My Profile</a></button></section>`);

    })
}

function removeDupes(list) {
    let dupes = [];
    let arr = list.filter(function (oldList) {
        if (dupes.indexOf(oldList.name) == -1) {
            dupes.push(oldList.name);
            return true;
        }
        return false;
    });
    return arr;
}

//// profile API
// let oneDate="";
// function showOneDate(date){
//     oneDate += `<div class="full col-3"><h3>${date}</h3>`;
//     return oneDate;
// }






function showOneDate(date) {
    let newDate = date.toString();
    console.log(newDate);
    //expect a string
    return `<h3>${date}</h3>`;
    //checked
}


function showOneUpperWorkout(upper) {
    //expect either an object or undefined
    let upperWorkout = "";

    if (upper === undefined) {
        upperWorkout = upperWorkout + "<h4> No upper body workout </h4>";
        //checked
    } else {

        upperWorkout += `
      <section class="upper">
        <h4>Upper</h4>
           <h5>${upper.Exercise}</h5>
           <ul>
             <li>Sets: ${upper.Sets}</li>
             <li>Reps: ${upper.Reps}</li>
             <li>Lbs: ${upper.Lbs}</li>
           </ul>
      </section>`;
    }

    //checked

    return upperWorkout;

}

function showAllUpperWorkout(uppers) {
    let result = ''
    uppers.forEach(function (item) {
        result = result + showOneUpperWorkout(item); //here its being return and ok now what?
    })

    return result;
    //checked
}


function showOneLowerWorkout(lower) {
    //expect either an object or undefined
    let lowerWorkout = "";

    if (lower == undefined) {
        lowerWorkout = lowerWorkout + "<h4> No lower body workout </h4>";
        //checked
    } else {

        lowerWorkout += `
      <section class="lower">
        <h4>Lower</h4>
           <h5>${lower.Exercise}</h5>
           <ul>
             <li>Sets: ${lower.Sets}</li>
             <li>Reps: ${lower.Reps}</li>
             <li>Lbs: ${lower.Lbs}</li>
           </ul>
      </section>`;
    }

    //checked

    return lowerWorkout;

}

function showAllLowerWorkout(lowers) {
    let result = ''
    lowers.forEach(function (item) {
        result = result + showOneLowerWorkout(item); //here its being return and ok now what?
    })

    return result;
    //checked
}

function displayOriginalObject(originalObject) {
    originalObject.forEach(function (item) {
        let htmlDate = showOneDate(item.date); //return a date 
        let htmlUpperWorkout = showAllUpperWorkout(item.upper);
        let htmlLowerWorkout = showAllLowerWorkout(item.lower);
        let result = htmlDate + htmlUpperWorkout + htmlLowerWorkout;
        $('.list').append(`<section class="col-4">${result}</section>`);
    })

}

function postNewWorkout(username) {
    let bodyPart = $('#upper-or-lower');
    let exercise = $('#exercise');
    let sets = $('#sets');
    let reps = $('#reps');
    let lbs = $('#lbs');
    let additionalWorkout = {
        Exercise: exercise.val(),
        Sets: sets.val(),
        Reps: reps.val(),
        Lbs: lbs.val()
    }
    $('button').on('click', event => {
        event.preventDefault();
        $.ajax({
            type: "POST",
            url: `http://localhost:9000/profile/JSON/${username}`,
            data: additionalWorkout,
            dataType: "json",
            headers: {
                "Content-Type": "application/json"
            },
            success: function (newWorkout) {
                $('.create').append(`<section class="col-4"><h4>Workout Saved</h4></section>`);
            },
            error: function () {
                alert("Error saving workout");
            }
        })
    })
}
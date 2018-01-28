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
            createFullWorkout(profilesList);
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
        //return username;
    })
}

function removeDupes(list) {
    let dupes = [];
    let arr = list.filter(function (oldList) {
        // If it is not a duplicate, return true
        if (dupes.indexOf(oldList.name) == -1) {
            dupes.push(oldList.name);
            return true;
        }
        return false;
    });
    return arr;
}

//// profile API
function showDateandSections(array) {
    array.map(function (dates) {
        let theDate= dates.date;
        $('.list').append(`<div class="full col-3"><h3>${theDate}</h3>
        <section class= "upper"><h4>Upper</h4></section><section class= "lower"><h4>Lower</h4></section>
      </div>`)
    })
}

function showOneUpperWorkout(upper) {
    if (upper === undefined) {
        return $(".full").append("<h4> No upper body workout </h4>");
    }
    $(".upper").append(`<ul>${upper.Exercise}</ul><li>Sets: ${upper.Sets}</li>
            <li>Reps: ${upper.Reps}</li><li>Lbs: ${upper.Lbs}</li>`);
}

function showUpperWorkout(upperArray) {
    upperArray.forEach(function (upperBody) {
        showOneUpperWorkout(upperBody)
    })
}

//create function to access upper in an object
//then create a function to access upper in an array of objects

function showOneUpperObj(nestedUpper) {
    //upper is inside an object
    //access upper in object using dot notation
    let upper = nestedUpper.upper;
    showOneUpperWorkout(upper);
}

//upper is now inside of an object, with its own array
function showUpperObj(nestedUpperArray) {
    let upper = nestedUpperArray.upper;
    showUpperWorkout(upper);
}

//now create a function to access upper in an array of upper objects

function showUpperFromArrayObj(arrayOfUppers) {
    //upper is inside an object

    arrayOfUppers.forEach((listOfUppers)=>{
        showUpperObj(listOfUppers);
    })
}

//now, we need to create lower,
//then we need to sort with dates




function showOneLowerWorkout(lower) {
    if (lower === undefined) {
        return $(".full").append("<h4> No lower body workout </h4>");
    }
    $(".lower").append(`<ul>${lower.Exercise}</ul><li>Sets: ${lower.Sets}</li>
            <li>Reps: ${lower.Reps}</li><li>Lbs: ${lower.Lbs}</li>`);
}

function showLowerWorkout(lowerArray) {
    lowerArray.forEach(function (lowerBody) {
        showOneLowerWorkout(lowerBody)
    })
}


function showOneLowerObj(nestedLower) {
    //Lower is inside an object
    //access Lower in object using dot notation
    let lower = nestedLower.lower;
    showOneLowerWorkout(lower);
}

//lower is now inside of an object, with its own array
function showLowerObj(nestedLowerArray) {
    let lower = nestedLowerArray.lower;
    showLowerWorkout(lower);
}

//now create a function to access lower in an array of lower objects

function showLowerFromArrayObj(arrayOfLowers) {
    //Lower is inside an object

    arrayOfLowers.forEach((listOfLowers) => {
        showLowerObj(listOfLowers);
    })
}


function createFullWorkout(profilesList) {
    showDateandSections(profilesList);
    showUpperFromArrayObj(profilesList);
    showLowerFromArrayObj(profilesList);
}


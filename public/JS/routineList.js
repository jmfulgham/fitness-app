'use strict';
//////// API REQUESTS //////////
function getAllRoutines() {
    $.ajax({
        type: "GET",
        url: `http://localhost:9000/all-routines/JSON/`,
        dataType: 'json',
        headers: {
            "Content-Type": "application/json"
        },
        success: function (list) {
            showNames(list)
        }
    })
}


function showNames(list) {
    let newList = removeDupes(list);
    newList.map(function (shortList) {
        let name = shortList.name;
        return $(".row").append(`<section class="section col-3 shadow">
        <h3>${name}</h3> <button type="submit">View My Profile</button>
    </section>`);
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

function showUpperWorkout(upper) {
    $(".new-profile").append(`<section class="workout"><h5>Upper Body</h5>`);
    upper.forEach(function (upperBody) {
        if (upperBody === undefined) {
            return $(".workout").append("<h4> No upper body workout </h4>")
        }
        $(".workout").append(`<ul>${upperBody.Exercise}</ul><li>Sets: ${upperBody.Sets}</li>
            <li>Reps: ${upperBody.Reps}</li><li>Lbs: ${upperBody.Lbs}</li>`);
    })
}

function showLowerWorkout(workouts) {
    let lower = workouts.lower;
    console.log("Lower ", lower);
    $(".workout").append(`<h5>Lower Body<h5>`);
    lower.forEach(function (lowerBody) {
        if (lowerBody === undefined) {
            return $(".lower").append("<h4> No lower body workout </h4>")
        }
        $(".workout").append(`<ul>${lowerBody.Exercise}</ul><li>Sets: ${lowerBody.Sets}</li>
            <li>Reps: ${lowerBody.Reps}</li><li>Lbs: ${lowerBody.Lbs}</li>`);
    })
}
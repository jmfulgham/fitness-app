//pull the username from /profile/name/:username
//sent the username to my API request
//create API request for profile/JSON/:username
//return API data to front end
//separate data by date to front end
//create small cards with each workout listed by date

function getProfileName(username){
    $.ajax({
        type: "GET",
        url: `http://localhost:9000/profile/name/${username}`,
        dataType: 'json',
        headers: {
            "Content-Type": "application/json"
        },
        success: function (theName) {
            console.log("the name", theName);
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
        success: function (secondList) {
            console.log(secondList);
        }
    })
}

function createSections(fullWorkout){
    console.log("full ", fullWorkout);
    $('.list').append(`<div class="full"><h3>${fullWorkout.date}</h3><section class="upper"></section><section class=
    "lower"></section</div>`)
}


function showUpperWorkout(upper) {
    console.log(upper);
    upper.forEach(function (upperBody) {
        createSections(upperBody);
        $(".upper").append();
        if (upperBody === undefined) {
            return $(".upper").append("<h4> No upper body workout </h4>");
        }
        $(".upper").append(`<h5>Upper Body</h5><ul>${upperBody.Exercise}</ul><li>Sets: ${upperBody.Sets}</li>
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
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
            handleNames(list)
        }
    })
}

//pull the username from /profile/name/:username
//sent the username to my API request
//create API request for profile/JSON/:username
//return API data to front end
//separate data by date to front end
//create small cards with each workout listed by date

function getProfile(username) {
    $.ajax({
        type: "GET",
        url: `http://localhost:9000/profile/JSON/${username}`,
        dataType: 'json',
        headers: {
            "Content-Type": "application/json"
        },
        success: function (userProfile) {
            createSections(userProfile);
        }
    })
}



function createSections(fullWorkout) {
    console.log("full ", fullWorkout);
    $('.list').append(`<div class="full"><h3>${fullWorkout.date}</h3><section class="upper"></section><section class=
    "lower"></section</div>`)
}


function handleNames(list) {
    let newList = removeDupes(list);
    newList.map(function (shortList) {
        let name = shortList.name;
        let username= shortList.username;
        $(".row").append(`<section class="section col-3 shadow">
        <h3>${name}</h3> <button type="submit"><a href="/profile/name/${username}" target="blank">
        View My Profile</a></button></section>`);
    clickButton(username);
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

function clickButton(username){
    $('button').on('click', event=>{
                event.preventDefault();
                getProfile(username);
            });
        } //how do I get button to actually open another window? in handleNames() I returned the username but then 
        //couldn't get the data I needed for the routines.
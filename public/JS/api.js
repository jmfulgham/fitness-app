'use strict';

//request all profiles URL with username
//get request of URL with username
//get all workouts with username
//find in database with username
//get all workouts separated by date
//organize upper and lower by date
//section workouts by date
//show each workout by date in its own section

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


//get all routines page
// separate users into sections by user name
//when clicked, profile page with routines appears
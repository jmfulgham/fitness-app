'use strict';
function getAllRoutines() {
    $.ajax({
        type: "GET",
        url: `https://fierce-springs-45667.herokuapp.com/all-routines/JSON/`,
        dataType: 'json',
        headers: {
            "Content-Type": "application/json"
        },
        success: function (list) {
            handleNames(list)
        }
    })
}

//routines API
function handleNames(list) {
    let newList = removeDupes(list);
    newList.map(function (shortList) {
        let username = shortList.username;
        $(".row").append(`<section class="section col-2 shadow">
        <h3>${username}</h3><button onclick="window.location.href = '/profile/name/${username}';">
        View My Workouts</button></section>`);

    })
}

function removeDupes(list) {
    let dupes = [];
    let arr = list.filter(function (oldList) {
        if (dupes.indexOf(oldList.username) == -1) {
            dupes.push(oldList.username);
            return true;
        }
        return false;
    });
    return arr;
}
'use strict';



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



//routines API
function handleNames(list) {
    let newList = removeDupes(list);
    newList.map(function (shortList) {
        let name = shortList.name;
        let username = shortList.username;
        $(".row").append(`<section class="section col-3 shadow">
        <h3>${name}</h3><button onclick="window.location.href = '/profile/name/${username}';">
        View My Profile</button></section>`);
        
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




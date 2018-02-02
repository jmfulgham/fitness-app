'use strict';

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


function getJSONProfile(username) {
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


function showOneDate(date) {
    let newDate = date.toString();
    return `<h3>${date}</h3>`;
}


function showOneUpperWorkout(upper) {
    let upperWorkout = "";

    if (upper === undefined) {
        upperWorkout = upperWorkout + "<h4> No upper body workout </h4>";
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

    return upperWorkout;
}

function showAllUpperWorkout(uppers) {
    let result = ''
    uppers.forEach(function (item) {
        result = result + showOneUpperWorkout(item); 
    })

    return result;
}


function showOneLowerWorkout(lower) {
    let lowerWorkout = "";

    if (lower == undefined) {
        lowerWorkout = lowerWorkout + "<h4> No lower body workout </h4>";
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


    return lowerWorkout;

}

function showAllLowerWorkout(lowers) {
    let result = ''
    lowers.forEach(function (item) {
        result = result + showOneLowerWorkout(item); 
    })

    return result;
    //checked
}

function displayOriginalObject(originalObject) {
    originalObject.forEach(function (item) {
        let htmlDate = showOneDate(item.date); 
        let htmlUpperWorkout = showAllUpperWorkout(item.upper);
        let htmlLowerWorkout = showAllLowerWorkout(item.lower);
        let result = htmlDate + htmlUpperWorkout + htmlLowerWorkout;
        $('.list').append(`<section class="col-4">${result}</section>`);
    })

}


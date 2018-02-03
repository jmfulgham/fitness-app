'use strict';

let workoutDate = "";
let upperWorkout = "";
let lowerWorkout = "";


function showOneDate(date) {

    return `<h3>${date}</h3>`;
}


function showOneUpperWorkout(upper, setColumn) {
    let upperWorkout = "";
    if (upper === undefined) {
        upperWorkout = upperWorkout + "<h4> No upper body workout </h4>";
    } else {
        upperWorkout += `
            <section class="upper">
            <h4>Upper</h4>
            <h5class="${setColumn}">${upper.Exercise}</h5>
            <ul>
                <li class="${setColumn}">Sets: ${upper.Sets}</li>
                <li class="${setColumn}">Reps: ${upper.Reps}</li>
                <li class="${setColumn}">Lbs: ${upper.Lbs}</li>
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
        <h4 contenteditable="true">Lower</h4>
           <h5 contenteditable="true">${lower.Exercise}</h5>
           <ul>
             <li class="sets">Sets: ${lower.Sets}</li>
             <li contenteditable="true">Reps: ${lower.Reps}</li>
             <li contenteditable="true">Lbs: ${lower.Lbs}</li>
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
}



function displayOriginalObject(originalObject) {
    originalObject.forEach(function (item, index) {
        let htmlDate = showOneDate(item.date);
        let htmlUpperWorkout = showAllUpperWorkout(item.upper, `setColumn${index}`);
        let htmlLowerWorkout = showAllLowerWorkout(item.lower);
        // let buttons = addEditButton();
        // console.log(buttons);
        let result = htmlDate + htmlUpperWorkout + htmlLowerWorkout;
        $('.list').append(`<section class="col-4">${result}<button type="button" value="edit" class="edit${index}">Edit</button>
        <button type="button" value="delete" id="delete">Delete</button></section>`);
        handleEdit(`.edit${index}`, `.setColumn${index}`);
    })
    
}


// function handleDelete(id) {
//     //retrieve the ID of this workout
//     //send DELETE request
//     //display "Delete Successful" message when done
//     $ajax({
//         type: "DELETE",
//         url: `localhost:9000/workout/JSON/${id}`,
//         dataType: 'json',
//         headers: {
//             "Content-Type": "application/json"
//         },
//         success: function (list) {
//             return list
//         }
//     })
// }

function handleEdit(classButton, classSetColumn) {
    console.log('edit')
    $(classButton).on('click', event => {
        console.log("clicked");
        var isEditable = $(classSetColumn).is('.editable');
        $(classSetColumn).prop('contenteditable', !isEditable);
        $(classSetColumn).toggleClass('editable');
        console.log(isEditable);
        console.log(classSetColumn);
    })

}

// $(handleEdit())


function getProfile(username) {
    $.ajax({
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
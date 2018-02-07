'use strict';

let workoutDate = "";
let upperWorkout = "";
let lowerWorkout = "";
let id;


//////////////////////////////////      API requests

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


function handleDelete(id, del) {
    // console.log("ready to delete");
    $(del).on("click", event => {
        console.log("You clicked delete", id);
        $.ajax({
            method: "DELETE",
            url: `http://localhost:9000/workout/JSON/${id}`,
            dataType: 'json',
            headers: {
                "Content-Type": "application/json"
            },
            success: function () {
                $(".create").append(`<section class="col-4"><h4>Workout Deleted</h4></section>`);
                location.reload();
            },
            error: function () {
                alert("Error")
            }
        })

    })
}

// function handlePut(id, updatedWorkout, classSetColumn) {
//     // console.log("ready to delete");
//     $(classSetColumn).on("click", event => {
//         console.log("You clicked delete", id);
//         $.ajax({
//             type: "PUT",
//             url: `http://localhost:9000/workout/JSON/${id}`,
//             data: `{
//             "username" : ${username},
//                 "date" : ${dates},
//                 ${bodyParts}: [ ${workoutDetails}]
//             }`,
//             dataType: "json",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             success: function () {
//                 $(".create").append(`<section class="col-4"><h4>Workout Saved</h4></section>`);
//                 location.reload();
//             },
//             error: function (req) {
//                 console.log(req.body);
//                 alert("Error saving workout");

//         }
//         })

//     })
// }

//////////////////////////////////



function showOneDate(date) {
    return `<h3>${moment(date).format("MMM Do YY")}</h3>`;
}

function showOneUpperWorkout(upper, setColumn) {
    // console.log(setColumn);
    let upperWorkout = "";
    if (upper === undefined|| null) {
        upperWorkout = upperWorkout + "<h4> No upper body workout </h4>";
    } else {
        upperWorkout += `
            <section class="upper">
            <h4>Upper</h4>
            <h5 class = "${setColumn}">${upper.Exercise}</h5>
            <ul>
                <li class="${setColumn}">Sets: ${upper.Sets}</li>
                <li class="${setColumn}">Reps: ${upper.Reps}</li>
                <li class="${setColumn}">Lbs: ${upper.Lbs}</li>
            </ul>
        </section>`;
    }

    return upperWorkout;
}

function showAllUpperWorkout(uppers, setColumn) {
    let result = ''
    uppers.forEach(function (item) {
        result = result + showOneUpperWorkout(item, setColumn);
    })
    return result;
}


function showOneLowerWorkout(lower, setColumn) {
    let lowerWorkout = "";

    if (lower == undefined) {
        lowerWorkout = lowerWorkout + "<h4> No lower body workout </h4>";
    } else {
        lowerWorkout += `
      <section class="lower">
        <h4 contenteditable="true">Lower</h4>
           <h5 class = "${setColumn}">${lower.Exercise}</h5>
           <ul>
             <li class = "${setColumn}">Sets: ${lower.Sets}</li>
             <li class = "${setColumn}">Reps: ${lower.Reps}</li>
             <li class = "${setColumn}">Lbs: ${lower.Lbs}</li>
           </ul>
      </section>`;
    }
    return lowerWorkout;

}

function showAllLowerWorkout(lowers, setColumn) {
    let result = ''
    lowers.forEach(function (item) {
        result = result + showOneLowerWorkout(item, setColumn);
    })

    return result;
}

function displayOriginalObject(originalObject) {
    let edit;
    let setColumn;
    let del;
    // console.log("Here is the original object: ", JSON.stringify(originalObject));
    // console.log("Here is the ids?: ", originalObject.map(i => i.id));
    originalObject.forEach(function (item, index) {
        let htmlDate = showOneDate(item.date);
        let htmlUpperWorkout = showAllUpperWorkout(item.upper, `setColumn${index}`);
        let htmlLowerWorkout = showAllLowerWorkout(item.lower, `setColumn${index}`);
        let result = htmlDate + htmlUpperWorkout + htmlLowerWorkout;
        $('.list').append(`<section class="col-4">${result}<button type="button" value="edit" class="edit${index}">Edit</button>
        <button type="button" value="delete" class="delete${index}">Delete</button></section>`);
        edit = `.edit${index}`;
        setColumn = `.setColumn${index}`;
        del = `.delete${index}` 
        handleEdit(edit, setColumn);
        handleDelete(item.id, del);
    })

}

function handleEdit(classButton, classSetColumn) {
    // console.log('edit')
    $(classButton).on('click', event => {
        // console.log("clicked");
        let isEditable = $(classSetColumn).is('.editable');
        $(classSetColumn).prop('contenteditable', !isEditable);
        $(classSetColumn).toggleClass('editable');
        // console.log(isEditable);
        // console.log(classSetColumn);
        isEditable ? $(classButton).text('Edit') : $(classButton).text('Save');
        handleSave(classSetColumn);
    })

}


//need to send a PUT request
//how? Pulling info from text fields (not HTML input fields) using jQuery- .text()
//may need to set variables for data to make it easier to send
//PUT feeds to '/workout/JSON/:id'
//

//fields allow me to edit
//button changes to save
//after we click save, need to submit PUT request with workout ID

//how to submit PUT request- with AJAX request
//pull data from input fields like 
//    $('div').prop('contenteditable',!isEditable).toggleClass('editable')
// isEditable ? $('button').text('Edit') : $('button').html('<div onClick="ajaxRequestToserverfunction()">Save</div>')
// })

//first create a click function that stores the values from the new text fields
//then create function that creates the PUT ajax request, with the ID

function handleSave(classSetColumn){
    // console.log("button ",classButton, "column ", classSetColumn);
    let newExercise = $("h5" + classSetColumn).text();
    let firstChild = $("ul li:nth-child(1)" + classSetColumn ).text();
    let secondChild = $("ul li:nth-child(2)" + classSetColumn).text();
    let thirdChild = $("ul li:nth-child(3)" + classSetColumn).text();
    let testObj = {};
    testObj= "Exercise" + ": " + newExercise +","+  firstChild +"," + secondChild +","+ thirdChild;
    console.log(testObj);
//object is ALMOST in JSON format
//need " " around every key value 
//tried JSON.stringify but only sets to one large string. 
//once I figure out how to finish formatting the object to a JSON object, then I will pass the final object to the handlePUT request
}



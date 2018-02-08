'use strict';

//check setColumn to make everything editable
//make sure we can edit upper and lower
// then feed all to PUT request

let workoutDate = "";
let upperWorkout = "";
let lowerWorkout = "";
let id;
let newObject;


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
//check Event Handlers
function handlePut(id, newObject, newPart , classButton) {
     console.log("ready to put", id, newObject, classButton, newPart);
     let bodyPart= JSON.stringify(newPart);
     let replacementWorkout= JSON.stringify(newObject);
    $(classButton).on("click", event => {
        console.log("You put ", id);
        $.ajax({
            type: "PUT",
            url: `http://localhost:9000/workout/JSON/${id}`,
            data: `{ 
                ${bodyPart} :[
                     ${replacementWorkout}
                ]
            }`,
            dataType: "json",
            headers: {
                "Content-Type": "application/json"
            },
            success: function () {
                $(".create").append(`<section class="col-4"><h4>Workout Edited</h4></section>`);
                // location.reload();
            },
            error: function (err, req) {
                console.log("err", err, req.body);
                alert("Error editing workout");

            }
        })

    })
}

//////////////////////////////////

function showOneDate(date, setColumn) {
    return `<h3 class=${setColumn}">${moment(date).format("MMM Do YY")}</h3>`;
}

function showOneUpperWorkout(upper, setColumn) {
    // console.log(setColumn);
    let upperWorkout = "";
    if (upper === undefined || null) {
        upperWorkout = upperWorkout + "<h4> No upper body workout </h4>";
    } else {
        upperWorkout += `
            <section class="upper">
            <h4 class = "${setColumn}">Upper</h4>
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
        <h4 class = "${setColumn}">Lower</h4>
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
    originalObject.forEach(function (item, index) {
        let htmlDate = showOneDate(item.date, `setColumn${index}`);
        let htmlUpperWorkout = showAllUpperWorkout(item.upper, `setColumn${index}`);
        let htmlLowerWorkout = showAllLowerWorkout(item.lower, `setColumn${index}`);
        let result = htmlDate + htmlUpperWorkout + htmlLowerWorkout;
        $('.list').append(`<section class="col-4">${result}<button type="button" value="edit" class="edit${index}">Edit</button>
        <button type="button" value="delete" class="delete${index}">Delete</button></section>`);
        edit = `.edit${index}`;
        setColumn = `.setColumn${index}`;
        del = `.delete${index}`;
        handleEdit(edit, setColumn, item.id);
        handleDelete(item.id, del);  
    })

}


function handleEdit(classButton, classSetColumn, id) {
    $(classButton).on('click', event => {
        let isEditable = $(classSetColumn).is('.editable');
        $(classSetColumn).prop('contenteditable', !isEditable);
        $(classSetColumn).toggleClass('editable');
        isEditable ? $(classButton).text('Edit') : $(classButton).text('Save');
        handleSave(classSetColumn, classButton, id);
        
    })
    
}


function handleSave(classSetColumn, classButton, id) {
    let newPart = $("h4" + classSetColumn).text();
    let newExercise = $("h5" + classSetColumn).text();
    let firstChild = $("ul li:nth-child(1)" + classSetColumn).text();
    let secondChild = $("ul li:nth-child(2)" + classSetColumn).text();
    let thirdChild = $("ul li:nth-child(3)" + classSetColumn).text();
    convertToObj(newExercise, firstChild, secondChild, thirdChild);
    handlePut(id, newObject, newPart, classButton);//s we want PUT to happen after "save" has been triggered
}

//figure out the best place to put handlePut so that it gets all the variables  
//it needs without being called too many times 
//and check if the PUT function
//needs to be changed so that instead of the 
//classButton being the trigger, it's the "save" toggle. classButton may not need to be an argument
//but ID is a concern
//hopefully "save" can eliminate this fear


function convertToObj(newExercise, firstChild, secondChild, thirdChild) {
    const re = /\d/;
    let sets;
    let reps;
    let lbs;
    sets = firstChild.match(re)[0];
    reps = secondChild.match(re)[0];
    let reps2 = secondChild.match(re)["input"];
    let reps3 = reps2.slice(6);
    lbs = thirdChild.match(re)[0]; 
    let lbs2 = thirdChild.match(re)["input"];
    let lbs3 = lbs2.slice(5);
    
   
    sets = parseInt(sets, 10);
    reps = parseInt(reps3, 10);
    lbs = parseInt(lbs3, 10);
   
     newObject = {
        "Exercise": newExercise,
        Sets: sets,
        Reps: reps,
        Lbs: lbs}
    return newObject;
}
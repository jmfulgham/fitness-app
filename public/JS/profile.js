'use strict';

let workoutDate = "";
let upperWorkout = "";
let lowerWorkout = "";
let id;
let newObject;
let newPart;
let classButtonSave;
let globalUsername;
//////////////////////////////////      API requests

// function getProfile(username) {

//     $.ajax({
//         type: "GET",
//         url: `https://fierce-springs-45667.herokuapp.com/profile/names/${username}`,
//         dataType: 'json',
//         headers: {
//             "Content-Type": "application/json"
//         },
//         success: function (list) {
//             return list
//         }
//     })
// }


function getJSONProfile(username) {
    globalUsername = username;
    console.log("gu ", globalUsername);
    $.ajax({
        type: "GET",
        url: `https://fierce-springs-45667.herokuapp.com/profile/JSON/${username}`,
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
    $(del).on("click", event => {
        $.ajax({
            method: "DELETE",
            url: `https://fierce-springs-45667.herokuapp.com/workout/JSON/${id}`,
            dataType: 'json',
            headers: {
                "Content-Type": "application/json"
            },
            success: function () {
                $.toast("It's been deleted.");  

                $(event.target).parent().remove();
                
            },
            error: function () {
                alert("Error")
            }
        
        })
            
    })
       
}

function handlePut(id, classButtonSave, newObject, newPart) {
    let parts = newPart.toLowerCase();
    let bodyPart = JSON.stringify(parts);
    let replacementWorkout = JSON.stringify(newObject);
    $.ajax({
        method: "PUT",
        url: `https://fierce-springs-45667.herokuapp.com/workout/JSON/${id}`,
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
            $.toast("Workout Saved.")
        },
        error: function (err, req) {
            console.log("err", err, req);
            alert("Error editing workout");

        }
    })
}

//////////////////////////////////

function showOneDate(date, setColumn) {
    return `<h3 class=${setColumn}">${moment(date).add(1,'day').format("MMM Do YY")}</h3>`;
}

function showOneUpperWorkout(upper, setColumn) {
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
        $('.list').append(`<section class="col-4" aria-live="polite">${result}<button type="button" value="edit" class="edit${index}">Edit</button>
        <button type="button" value="delete" class="delete${index}">Delete</button></section>`);
        edit = `.edit${index}`;
        setColumn = `.setColumn${index}`;
        del = `.delete${index}`;
        handleButton(edit, setColumn, item.id);
        let save = edit + '.save';
        handleDelete(item.id, del);
    })

}

function toggleEditSave(classButton, classSetColumn, id) {
    let isEditable = $(classSetColumn).is('.editable');
    $(classSetColumn).prop('contenteditable', !isEditable);
    $(classSetColumn).toggleClass('editable');
    isEditable ? $(classButton).text('Edit') : $(classButton).text('Save');
    $(classButton).toggleClass('save');
}

function handleButton(classButton, classSetColumn, id) {
    $(classButton).on('click', event => {
        if ($(event.target).text() === "Save") {
            handleSave(classButton, classSetColumn, id);
        }
        toggleEditSave(classButton, classSetColumn, id);

    })

}

function handleSave(classButton, classSetColumn, id) {
    classButtonSave = classButton;
    newPart = $("h4" + classSetColumn).text();
    let newExercise = $("h5" + classSetColumn).text();
    if (newExercise === "") {
        $(".create").append(`<section class="col-4" aria-live="polite"><h4>Please enter an Exercise</h4></section>`);
        return ;
    }
    let firstChild = $("ul li:nth-child(1)" + classSetColumn).text();
    let secondChild = $("ul li:nth-child(2)" + classSetColumn).text();
    let thirdChild = $("ul li:nth-child(3)" + classSetColumn).text();
        convertToObj(id, newExercise, firstChild, secondChild, thirdChild);

}

function convertToObj(id, newExercise, firstChild, secondChild, thirdChild) {
    const re = /\d/;
    let sets;
    let reps;
    let lbs;
    if (firstChild.match(re) && secondChild.match(re) && thirdChild.match(re)) {
        sets = firstChild.match(re)[0];
        reps = secondChild.match(re)[0];
        lbs = thirdChild.match(re)[0];
    } else {
        $(".create").append(`<section class="col-4" aria-live="polite"><h4>Please enter a number</h4></section>`);
        return;
    }

    let reps2 = secondChild.match(re)["input"].slice(5);
    let lbs2 = thirdChild.match(re)["input"].slice(5);

    sets = parseInt(sets, 10);
    reps = parseInt(reps2, 10);
    lbs = parseInt(lbs2, 10);
    newObject = {
        "Exercise": newExercise,
        Sets: sets,
        Reps: reps,
        Lbs: lbs
    }
    handlePut(id, classButtonSave, newObject, newPart)
}
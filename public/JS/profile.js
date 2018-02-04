'use strict';

let workoutDate = "";
let upperWorkout = "";
let lowerWorkout = "";
let id;

function storeId (id){
    let _id = id["id"];
}
function showOneDate(date) {
    return `<h3>${date}</h3>`;
}


function showOneUpperWorkout(upper, setColumn) {
    console.log(setColumn);
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
    originalObject.forEach(function (item, index) {
        let htmlDate = showOneDate(item.date);
        let htmlUpperWorkout = showAllUpperWorkout(item.upper, `setColumn${index}`);
        let htmlLowerWorkout = showAllLowerWorkout(item.lower, `setColumn${index}`);
        // let buttons = addEditButton();
        // console.log(buttons);
        let result = htmlDate + htmlUpperWorkout + htmlLowerWorkout;
        $('.list').append(`<section class="col-4">${result}<button type="button" value="edit" class="edit${index}">Edit</button>
        <button type="button" value="delete" class="delete${index}">Delete</button></section>`);
        edit = `.edit${index}`;
        setColumn = `.setColumn${index}`;
        del = `.delete${index}`;
        //console.log(`.setColumn${index}`);
        handleEdit(edit, setColumn);
        handleDelete(id, del);
    })

}

function handleEdit(classButton, classSetColumn) {
    console.log('edit')
    $(classButton).on('click', event => {
        console.log("clicked");
        let isEditable = $(classSetColumn).is('.editable');
        $(classSetColumn).prop('contenteditable', !isEditable);
        $(classSetColumn).toggleClass('editable');
        console.log(isEditable);
        console.log(classSetColumn);
        isEditable ? $(classButton).text('Edit') : $(classButton).text('Save')
    })

}



function handleDelete(id, del) {
    console.log("ready to delete");
    $(del).on("click", event=>{
        console.log("You clicked delete" , id);
        $.ajax({
            method: "DELETE",
            url: `http://localhost:9000/workout/JSON/${id}`,
            dataType: 'json',
            headers: {
                "Content-Type": "application/json"
            },
            success: function () {
                alert("Delete successfull");
            },
            error: function () {
                alert("Error")
            }
        })

    })
    //retrieve the ID of this workout
    //is this a get request?
    //how do I send ID from all-routines?

    //send DELETE request
    //display "Delete Successful" message when done
    
}




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
            getObjId(profilesList);
            
        }
    })
}

//getjsonprofile
//gives me every workout under each specific profile
//each workout has an ID that's not stored or displayed
//get id from every workout in json list without having to display it on the front end
//store information
//delete request on click



function getObjId(arrOb){
    arrOb.forEach(function(obj){
        id= obj.id;
        return id;
    })
}
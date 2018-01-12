var mockRoutines = {
    "exercise_routine": [
        {
            "id": "39u5tenkfr94535",
            "name": "Willy Warm-Up",
            "date": "1.10.18",
            "exercises": [{

                "Upper Body": [
                    {
                        "Exercise": "Benchpress",
                        "Sets": 4,
                        "Reps": 10,
                        "Lbs": 150
                    },

                    {
                        "Exercise": "Chest Fly",
                        "Sets": 3,
                        "Reps": 12,
                        "Lbs": 120
                    },

                    {
                        "Exercise": "Shoulder Press",
                        "Sets": 4,
                        "Reps": 10,
                        "Lbs": 100
                    }
                ],
                "Lower Body":[
                    {
                        "Exercise":"Goblet Squats",
                        "Sets":3,
                        "Reps": 15,
                        "Lbs": 35
                    },
                    {
                        "Exercise": "Backwards Lunges",
                        "Sets": 3,
                        "Reps": 15,
                        "Lbs": 65
                    },
                    {
                        "Exercise": "Hang Snatches",
                        "Sets": 5,
                        "Reps": 3,
                        "Lbs": 105
                    }
                ]

            }]

        },
        {
            "id": "39u5txnkfr66595",
            "name": "Linda Legs",
            "date": "1.08.18",
            "exercises": [{
                "Lower Body": [
                    {
                        "Exercise": "Sumo Squats",
                        "Sets": 4,
                        "Reps": 10,
                        "Lbs": 160
                    },

                    {
                        "Exercise": "Roman Deadlifts",
                        "Sets": 3,
                        "Reps": 10,
                        "Lbs": 180
                    },

                    {
                        "Exercise": "Laying Hamstring Curls",
                        "Sets": 4,
                        "Reps": 10,
                        "Lbs": 160
                    }
                ]
            }]
        }
    ]
}
//get routine
function getRoutine(){
    //get name, date, and exercise list
    return mockRoutines
}
//display routine with HTML formatting
function displayRoutine(){

    let list= mockRoutines.exercise_routine;
//loop for name
    for (i = 0; i < list.length; i++) {
        console.log(list[i].name, list[i].date, list[i].exercises);
    }
}


//get and display routine with formatting

getRoutine();
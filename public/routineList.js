$(document).ready(function () {

    'use strict';
    var mockRoutines = [{
            "id": "39u5tenkfr94535",
            "name": "Willy Warm-Up",
            "date": "1.10.18",
            "upper": [{
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
            "lower": [{
                    "Exercise": "Goblet Squats",
                    "Sets": 3,
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

        },


        {
            "id": "39u5txnkfr66595",
            "name": "Linda Legs",
            "date": "1.08.18",
            "lower": [{
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

        }
    ]


    function handleNameAndDate(profile) {
        for (let i = 0; i < profile.length; i++) {
            $('.row').append(`<section class="col-4 new-profile">
                <h4>${profile[i].name}</h4>
                <h6>${profile[i].date}</h6></section>`);
        }
    }


    function handleUpperBody(upperBod) {
        if (upperBod === undefined) {
            $('.new-profile').append(`<p> No upper body workout created</p>`);
        }
            for (let i = 0; i < upperBod.length; i++) {
                $('.new-profile').append(`<ul>Upper Body</ul>
                <li>Exercise: ${upperBod[i].upper[i].Exercise}</li>
                <li>Sets:${upperBod[i].upper[i].Sets}</li>
                <li>Reps:${upperBod[i].upper[i].Reps}</li>
                <li>Lbs:${upperBod[i].upper[i].Lbs}</li>`)
            }
        }
    

    function handleLowerBody(low) {
        if (low == undefined) {
            $('.new-profile').append(`<p> No lower body workout created</p>`);
        }
        for (let i = 0; i < low.length; i++) {
            $('.new-profile').append(`<ul>Lower Body</ul>
                <li>Exercise: ${low[i].lower[i].Exercise}</li>
                <li>Sets:${low[i].lower[i].Sets}</li>
                <li>Reps:${low[i].lower[i].Reps}</li>
                <li>Lbs:${low[i].lower[i].Lbs}</li>`)
        }
    }
    function handleAllWorkouts(routine){
        handleNameAndDate(routine);
        handleUpperBody(routine);
        handleLowerBody(routine);
    }

    //handleNameAndDate(mockRoutines);
    //handleUpperBody(mockRoutines);
    //handleLowerBody(mockRoutines);
handleAllWorkouts(mockRoutines);

})
$(document).ready(function () {

    'use strict';

    var mockProfile = [{
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
        }, {
            "Exercise": "Backwards Lunges",
            "Sets": 3,
            "Reps": 15,
            "Lbs": 65
        }, {
            "Exercise": "Hang Snatches",
            "Sets": 5,
            "Reps": 3,
            "Lbs": 105
        }]
    },
        {
            "name": "Linda Legs",
            "date": "1.01.18",
            "upper": [
                {
                }
            ],
            "lower": [
                {
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
        }    
    ]


    function showNameAndDate(profile) {
        let name = profile.name;
        let date = profile.date;
        return `<section class="col-3 new-profile"><h4>${name}</h4><h6>${date}</h6>
            </section>`;
    }

    function showUpperWorkout(upper) {
        $(".new-profile").append(`<section class="workout"><h5>Upper Body</h5>`);
        upper.forEach(function (upperBody) {
            if (upperBody === undefined) {
                return $(".workout").append("<h4> No upper body workout </h4>")
            }
            $(".workout").append(`<ul>${upperBody.Exercise}</ul><li>Sets: ${upperBody.Sets}</li>
            <li>Reps: ${upperBody.Reps}</li><li>Lbs: ${upperBody.Lbs}</li>`);
        })
    }

    function showLowerWorkout(workouts) {
        let lower = workouts.lower;
        console.log("Lower ", lower);
        $(".workout").append(`<h5>Lower Body<h5>`);
        lower.forEach(function (lowerBody) {
            if (lowerBody === undefined) {
                return $(".lower").append("<h4> No lower body workout </h4>")
            }
            $(".workout").append(`<ul>${lowerBody.Exercise}</ul><li>Sets: ${lowerBody.Sets}</li>
            <li>Reps: ${lowerBody.Reps}</li><li>Lbs: ${lowerBody.Lbs}</li>`);
        })
    }
    

    showNameAndDate(mockProfile);

})
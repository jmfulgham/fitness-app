const express = require('express');
const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);
const {
    app,
    runServer,
    closeServer
} = require('../server.js');

describe('Testing CRUD', function () {
    before(function () {
        return runServer();
    });

    after(function () {
        return closeServer();
    });


    it('the index(home) page HTML shows up', function () {
        return chai.request(app)
            .get('/')
            .then(function (res) {
                res.should.have.status(200);
            });
    });

    it('the profile page shows up', function () {
        return chai.request(app)
            .get('/profile/JSON/leggy_linda01')
            .then(function (profileResponse) {
                profileResponse.should.have.status(200);
                profileResponse.should.be.json;
                profileResponse.should.be.an('object');
            });
    });



    it('should create a new routine on POST', () => {
        const newRoutine = {
            "name": "Willy Warm-Up",
            "username": "ww404",
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
        }
        return chai.request(app)
            .post('/profile/JSON/ww404').send(newRoutine)
            .then((res) => {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.an('object');
                res.body.should.include.keys('name', 'username', 'date', 'upper', 'lower');
            });
    });

    //deleting a workout
    it('should delete a workout on DELETE', function () {
        let newID;
        return chai.request(app)
            .get('/all-routines/JSON')
        newID = res.body[0].id;
        return chai.request(app)
            .get(`/workout/JSON/${newID}`)
            .then(() => {
                chai.request(app)
                    .delete(`/workout/JSON/${newId}`)
                    .then(response => {
                        response.should.have.status(204);
                    })
            })
            .catch(err => {
                console.log(err);
            });
    })


    it('should update a workout on PUT', function () {
        return chai.request(app)
                .put('/workout/JSON/5a63fcc5d456d2482a799f72')
                .send({
                    
                    "uppper": [{
                        "Exercise": "Upright Row",
                        "Sets": 2,
                        "Reps": 12,
                        "Lbs": 140
                    }]
                })
                .then((res) => {
                    res.should.have.status(204);
                })
        .catch(err => {
            console.log(err);
        })
})

    it('the all-routines page should show up and populate correctly', function () {
        return chai.request(app)
            .get('/all-routines/JSON')
            .then(function (routinesResponse) {
                routinesResponse.should.have.status(200);
                routinesResponse.should.be.json;
                routinesResponse.should.be.an('object');
            })
            .catch(err => {
                console.log(err);
            });
    })
})
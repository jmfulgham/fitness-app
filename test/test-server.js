const express= require('express');
const mocha= require('mocha');
const chai= require('chai');
const chaiHttp= require ('chai-http');
chai.should();
chai.use(chaiHttp);
const {app, runServer, closeServer}= require('../server.js');

describe ('Index page', function(){
    it ('the index(home) page HTML shows up', function(){
        return chai.request(app)
        .get('/')
        .then(function(response){
            response.should.have.status(200);
        });
    });
});

describe('Profile Page', function(){
    it('the profile page shows up', function(){
        return chai.request(app)
        .get('/profile')
        .then(function(profileResponse){
            profileResponse.should.have.status(200);
        });
    });
});

describe('All Routines page', function(){
    it('the all-routines page should show up and populate correctly', function(){
        return chai.request(app)
        .get('/all-routines')
        .then(function(routinesResponse){
            routinesResponse.should.have.status(200);
        });
    });
});
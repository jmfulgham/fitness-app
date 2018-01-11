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
            console.log("This is the profile response !!! ", profileResponse);
            profileResponse.should.have.status(200);
        });
    });
});
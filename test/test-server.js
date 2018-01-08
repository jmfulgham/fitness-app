const express= require('express');
const mocha= require('mocha');
const chai= require('chai');
const chaiHttp= require ('chai-http');
chai.should();
chai.use(chaiHttp);
const app= require('../server.js');

describe ('Index page', function(){
    it ('the index page HTML shows up', function(){
        return chai.request(app)
        .get('/')
        .then(function(response){
            response.should.have.status(200);
        });
    });
});
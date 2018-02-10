'use strict';
//app setup
const express = require('express');
const mongoose = require('mongoose');
const router= require('./router');
const app = express();
const morgan = require('morgan');
mongoose.Promise = global.Promise;
const cors = require('cors');
app.use(cors());

//more app set up
app.use(express.static('public'));

app.use('/', router);
app.use('/profile',router);
app.use(morgan('common'));

//templating engine set up 

//enivornment setup
const { PORT, DATABASE_URL } = require('./config');


//server running
let server;
function runServer(databaseUrl= DATABASE_URL, port=PORT){
    return new Promise ((resolve,reject)=>{
        mongoose.connect(databaseUrl, err=>{
            if (err){
                return reject(err);
            }
            server = app.listen(port, ()=>{
                console.log(`Your app is listening on port ${port}`);
                resolve()
            })
            .on('error', err=>{
                mongoose.disconnect();
                reject(err);
                console.log(err);
            });
        });
    });
}

function closeServer(){
    return new Promise((resolve,reject)=>{
        console.log('Closing server');
        server.close(err => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}

if (require.main === module) {
    runServer().catch(err => console.error(err));
};


module.exports = { app, runServer, closeServer }
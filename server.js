'use strict';
//app setup
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const morgan = require('morgan');
mongoose.Promise = global.Promise;

//more app set up
app.use(express.static('public'));
app.listen(process.env.PORT || 8080);
app.use('/', router);
app.use(morgan('common'));
//enivornment setup
const { PORT, DATABASE_URL } = require('./config');


//server running
function runServer(databaseUrl= DATABASE_URL, port=PORT){
    return new Promise ((resolve,reject)=>{
        mongoose.connect(databaseUrl, {useMongoClient: true}, err=>{
            if (err){
                return reject(err);
            }
            server = app.listening(port, ()=>{
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
                // so we don't also call `resolve()`
                return;
            }
            resolve();
        });
    });
}





if (require.main === module) {
    //   this means we're starting the server from the command line.
    runServer().catch(err => console.error(err));
};


module.exports = { app, runServer, closeServer }
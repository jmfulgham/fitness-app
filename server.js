const express = require('express');
const mongoose = require('mongoose');
const mocha = require('mocha');
const app = express();
const morgan = require('morgan');
app.use(express.static('public'));
app.listen(process.env.PORT || 8080);
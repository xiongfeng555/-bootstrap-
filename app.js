var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var router = require('./router.js');

app.engine('html', require('express-art-template'));
app.set('view engine', 'html');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public/', express.static('./public/'));
app.use('/node_modules', express.static('./node_modules/'));
// parse application/json
app.use(bodyParser.json());
app.use(router);
app.listen(3000, function() {
    console.log('server is running');
});
'use strict';

var express = require('express');
var http = require('http');

require('./server/config/sequelize');

var app = express();
var server = http.createServer(app);

var config = require('./server/config/env/index');

require('./server/config/express')(app);
require('./server/routes/user')(app);

server.listen(config.port, function(){
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});


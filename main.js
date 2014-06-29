var express = require('express');
var Resource = require('express-resource');

var config = require('./config');
var manager = require('./manager');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(__dirname + '/public'));

var servers = require('./routes/servers');

app.resource('api/missions', require('./routes/missions'));
app.resource('api/mods', require('./routes/mods'));
var serversResource = app.resource('api/servers', servers);
app.resource('api/settings', require('./routes/settings'));

app.get('/api/servers/:server/start', servers.start);
app.get('/api/servers/:server/stop', servers.stop);

app.get('/', function (req, res){
  res.sendfile(__dirname + '/public/index.html');
});

io.on('connection', function (socket) {
  socket.emit('servers', manager.getServers());
});

manager.on('servers', function() {
  io.emit('servers', manager.getServers());
});

server.listen(3000);

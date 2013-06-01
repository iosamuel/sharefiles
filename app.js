var express = require('express'),
	app = express(),
	http = require('http'),
	server = http.createServer(app).listen(8080),
	io = require('socket.io').listen(server),
	fs = require('fs'),
	routes = require('./routes');

app.configure(function(){
	app.set('view engine', 'ejs');
	app.set('views', __dirname+'/views');
	app.use('/static', express.static(__dirname+'/public'));
	app.use(express.bodyParser());
});

app.get('/', routes.index);
app.post('/', function(req, res){
	fs.readFile(req.files.imagen.path, function(err, data){
		var newPath = __dirname+'/public/archivos/'+req.files.imagen.name;
		fs.writeFile(newPath, data, function(){
			io.sockets.emit('nuevo archivo', req.files.imagen.name);
		});
	});
});

io.sockets.on('connection', function(socket){
	socket.on('archivo', function(archivo){
		fs.writeFile(__dirname+'/'+archivo.nombre, new Buffer(archivo.archivo, ''), function(err){
			if (err) return console.log(err);
			console.log('guardado');
		});
	});
});
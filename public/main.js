var socket = io.connect();

socket.on('nuevo archivo', function(path){
	var li = document.createElement('li');
	li.innerHTML = '<a href="/static/archivos/'+path+'">'+path+'</a>';
	document.getElementById('imagenes').appendChild(li);
});

function dragstop(e){
	e.preventDefault();
	e.stopPropagation();
}
document.addEventListener('dragenter', dragstop);
document.addEventListener('dragover', dragstop);
document.addEventListener('drop', function(e){
	dragstop(e);

	var file = e.dataTransfer.files[0];
	var form = new FormData();
	form.append('imagen', file);
	xhr = new XMLHttpRequest();
	xhr.open('POST', '/');
	xhr.send(form);
});
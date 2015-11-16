function setWidth() {
	document.getElementById("containter").style.width = string( (screen.width / 3) * 2) + 'px';
}

setWidth();

document.body.onresize = function (){
	setWidth();
}

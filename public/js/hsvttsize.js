function setWidth() {
	document.getElementById("containter").style.width = (screen.width / 3) * 2;
}

setWidth();

document.body.onresize = function (){
	setWidth();
}

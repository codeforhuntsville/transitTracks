function setWidth() {
    document.getElementById('containter').style.width = ((screen.width / 3) * 2).toString() + 'px';
}

setWidth();

document.body.onresize = function () {
    setWidth();
};

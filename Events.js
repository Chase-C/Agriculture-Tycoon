document.onmousedown = function(evt)
{
    evt = evt || event;
    var x = evt.pageX - $('canvas').offset().left;
    var y = evt.pageY - $('canvas').offset().top;

    engine.mouseDown(x, y);
}

document.onmouseup = function(evt)
{
    evt = evt || event;
    var x = evt.pageX - $('canvas').offset().left;
    var y = evt.pageY - $('canvas').offset().top;

    engine.mouseUp(x, y);
}

document.onmousemove = function(evt)
{
	evt = evt || event;
	var x = evt.pageX - $('canvas').offset().left;
    var y = evt.pageY - $('canvas').offset().top;
	
	engine.mouseMove(x, y);
}

document.addEventListener('keydown', function(event) {
    engine.keyPress(event.keyCode) ;
});

document.oncontextmenu = function(evt) { stopEvent(evt); }

function stopEvent(event){
    if(event.preventDefault != undefined)
        event.preventDefault();
    if(event.stopPropagation != undefined)
        event.stopPropagation();
}

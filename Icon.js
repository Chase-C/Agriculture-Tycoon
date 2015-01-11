//Image for use in menus, not overworld
var Icon = function(x, y, id)
{
    this.x = x || 0;
    this.y = y || 0;
	this.elem = $("#"+id)[0]
}

Icon.prototype =
{
    draw: function(canvas)
    {
        canvas.drawImage(this.elem, this.x, this.y);
    }
}

function createIcon(x, y, id)
{
    return new Icon(x, y, id);
}

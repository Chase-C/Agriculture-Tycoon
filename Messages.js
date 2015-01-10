var Messages = function(x, y, w, h, num_divs)
{
    this.x = x || 0;
    this.y = y || 0;
    this.w = w || 0;
    this.h = h || 0;
    this.divs = num_divs;

    this.posts  = [];
}

Messages.prototype =
{
    add: function(msg)
    {
        if (msg != null || '') {
            this.posts.push(msg);
        }
    },

    draw: function(canvas)
    {
        canvas.fillStyle   = 'white';
        canvas.strokeStyle = 'black';

        canvas.fillRect  (this.x, this.y, this.w, this.h);
        canvas.strokeRect(this.x, this.y, this.w, this.h);

        canvas.font         = '14px sans-serif';
        canvas.textBaseline = 'middle';
        canvas.textAlign    = 'left';
        canvas.fillStyle    = 'black';

        var padding         = 5;
        for (var i = 0; i < 5 &&  this.posts.length > i; i++) {
            canvas.fillText(this.posts[i], this.x + padding, this.y * (i+1) + (this.h / 2));
        }
    }
}

var Slider = function(x, y, w, h, min, max, def, step, cb)
{
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.min  = min;
    this.max  = max;
    this.def  = def;
    this.val  = def;
    this.step = step;

    this.numSteps = (max - min) / step;
    this.stepNum  = (def - min) / step;
    this.sliderW  = Math.min(Math.max(256 / this.numSteps, 32), 64);
    this.stepW    = (this.w - this.sliderW) / this.numSteps;
    this.sliderX  = this.x + (this.stepNum * this.stepW);

    console.log(this.stepW, this.sliderX);

    this.callback = cb;
    this.clicked  = false;
    this.mouseX   = 0;
}

Slider.prototype =
{
    mouseDown: function(mx, my)
    {
        if (mx > this.sliderX && mx < this.sliderX + this.sliderW &&
            my > this.y       && my < this.y + this.h) {
            this.clicked = true;
            this.mouseX = mx;
        }
    },

    mouseUp: function(mx, my)
    {
        if (this.clicked) {
            var step     = this.nearestStep(this.sliderX);
            this.stepNum = (step - this.min) / this.step;
            this.sliderX = this.xFromStep(step);
            this.clicked = false;

            if (this.callback) {
                this.callback(this.val);
            }
        }
    },

    mouseMove: function(mx, my)
    {
        if (this.clicked) {
            var dx        = mx - this.mouseX;
            this.sliderX += dx;
            if (this.sliderX < this.x) {
                this.sliderX = this.x;
            } else if (this.sliderX + this.sliderW > this.x + this.w) {
                this.sliderX = this.x + this.w - this.sliderW;
            } else {
                this.mouseX   = mx;
            }

            this.stepNum = this.nearestStep(this.sliderX);
            this.val     = this.min + (this.stepNum * this.step);

            if (this.callback) {
                this.callback(this.val);
            }
        }
    },

    nearestStep: function(x)
    {
        return Math.round((x - this.x) / this.stepW);
    },

    xFromStep: function(step)
    {
        return this.x + (step * this.stepW);
    },

    draw: function(canvas)
    {
        canvas.fillStyle   = 'white';
        canvas.strokeStyle = 'black';

        canvas.beginPath();
        canvas.moveTo(this.x, this.y + (this.h / 2));
        canvas.lineTo(this.x + this.w, this.y + (this.h / 2));
        canvas.stroke();

        canvas.fillRect  (this.sliderX, this.y, this.sliderW, this.h);
        canvas.strokeRect(this.sliderX, this.y, this.sliderW, this.h);

        if (this.clicked) {
            canvas.strokeStyle = '#444444';
            canvas.strokeRect(this.sliderX + 1, this.y + 1, this.sliderW - 2, this.h - 2);
        }
    }
}

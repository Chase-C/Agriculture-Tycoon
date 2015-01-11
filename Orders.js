var Order = function()
{
	init: function(){
		var x = Math.random();
		this.order = true;
		this.stack = new Array();
		this.venues = new Array("The Salad Palace", "Swav Mart", "The Health Nut", "Farmer's Market");
		this.produce = new Array("Lettuce", "Apples", "Strawberries", "Brussel Sprouts", "Artichokes");
		
		for(int v=0;v<this.venues.length;v++){
			for(int p=0;p<this.produce.length;p++){
				this.stack.push([this.venues[v], this.produce[p], Math.floor(100*Math.random())]);
			}
		}
		
		var i = 0;
		while(i < this.stack.length){ 
			console.log(stack.valueOf(this.stack.length - i));
			if(this.order){
				i++;
			}
		}
	},

	shiftStackElement: function(order){
		return this.stack.push(stack.shift());//Used to put number in back of stack after order is done.
	}
}

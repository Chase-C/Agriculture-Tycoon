var Orders = {
	init: function(){
		var x = Math.random();
		this.order = true;
		this.stack = new Array();
		this.venues = new Array("The Salad Palace", "Swav Mart", "The Health Nut", "Farmer's Market");
		this.produce = new Array("Lettuce", "Apples", "Strawberries", "Brussel Sprouts", "Artichokes");
		
		this.stack.push([this.venues[3], this.produce[4], x]);
		this.stack.push([this.venues[3], this.produce[3], x]);
		this.stack.push([this.venues[3], this.produce[2], x]);
		this.stack.push([this.venues[3], this.produce[1], x]);       
		this.stack.push([this.venues[3], this.produce[0], x]);
		
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
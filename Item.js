function Item(price, maxUses, PE){
	this.price = price
	this.maxUses = maxUses;
	this.uses = 0;
	this.PE = PE;
	this.held = false;
	this.use = function(){
		this.uses--;
		if(this.uses===0) this.held = false;
	}
	this.obtain = function(){ //do not call this outside Farm.addTool()!!!
		this.held = true;
		this.uses = this.maxUses;
	}
}
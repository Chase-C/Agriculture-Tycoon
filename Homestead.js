//just temporary until we figure out time
var day = 0;

function Acre(){
	this.blank=1;
	this.lettuce=0;
	this.apples=0;
	this.strawberries=0;
	this.brussel=0;
	this.artichokes=0;
	this.tilled=0;
	this.planted=0;
	this.ripe=0;
	this.ruined=0;
	this.fertile=0;
	this.GMO=0;

	this.state= Array(this.tilled,this.planted , this.ripe, this.ruined, this.fertile );
	this.growthRate=1.0;
	//protection percent
	this.pestRepel=1.0;
	this.GMO=0;
}

var row1 = new Array(new Acre(),new Acre(), new Acre(), new Acre(), new Acre(), new Acre(), new Acre(), new Acre());
var row2 = new Array(new Acre(),new Acre(), new Acre(), new Acre(), new Acre(), new Acre(), new Acre(), new Acre());
var row3 = new Array(new Acre(),new Acre(), new Acre(), new Acre(), new Acre(), new Acre(), new Acre(), new Acre());
var Land = new Array(row1, row2, row3);

var FarmMove= function(move,  target){
	//till by shov
	console.log(move==1);
	console.log(engine.farm.tools.shovel.held);
	console.log(target.blank);
	if(move == 1 && engine.farm.tools.shovel.held && target.blank){
		console.log('sup');
		day = day - 6;
		target.tilled = 1;
		target.blank = 0;
		engine.farm.tools.shovel.use();
	}else
	
	if(move == 2 && engine.farm.tools.tractor.held && target.blank == 1){
	  day = day - 2;
	  target.tilled = 1;
	  target.blank = 0;
	  engine.farm.tools.tractor.uses();
	 }else

	//plant seeds
	if(move == 3  && target.tilled == 1 && Water - 200 > 0){
		day = day - 2;
		target.tilled = 0;
		target.planted = 1;
		target.lettuce = 1;
		engine.farm.water -= 200;
		target.pestRepel = .4;


	}else

	//plant seeds
	if(move == 4  && target.tilled == 1 && Water - 200 > 0){
	 day = day - 2;
		target.tilled = 0;
		target.planted = 1;
		target.apples = 1;
		engine.farm.water -= 200;
		target.pestRepel = .5;
	}else

	//plant seeds
	if(move == 5  && target.tilled == 1 && Water - 100 > 0){
	 day = day - 2;
		target.tilled = 0;
		target.planted = 1;
		target.strawberries = 1;
		engine.farm.water -= 100;
		target.pestRepel = .3;
	}else

	//plant seeds
	if(move == 6  && target.tilled == 1 && Water - 100 > 0){
	 day = day - 2;
		target.tilled = 0;
		target.planted = 1;
		target.brussel = 1;
		engine.farm.water -= 100;
		target.pestRepel = .4;
	}else

	//plant seeds
	if(move == 7  && target.tilled == 1   && Water - 100 > 0){
	 day = day - 2;
		target.tilled = 0;
		target.planted = 1;
		target.artichokes = 1;
		engine.farm.water -= 100;
		target.pestRepel = .5;
	}else


	//pesticides
	if(move == 8 && target.planted){
	  day = day - 2;
	   target.pestRepel = pestRepel + .1;
	}else

	//organic
	if(move == 9 && target.fertile == 0 ){
		day = day - 4;
		target.fertile = 1;
		target.growthRate = 1.3;
	}else
	
	//non organic fertilizer
	if(move == 9 && target.fertile == 0 ){
		day = day - 4;
		target.fertile = 1;
		target.GMO = 1;
		target.growthRate = 1.5;

	}else
	//harvest
	if(move == 10 && target.ripe == 1){
	   day = day - 3;
	   target.ripe = 0;
	   var harvest = 0;
		var crop = Array( target.lettuce, target.apples, target.strawberries, target.brusselsprouts, target.artichokes);
		for(var i = 0; i < crop.length; i++){
			if(target.crop[i] == 1){
				harvest = i;
				break;
			}
		}

		target.blank=1;
		target.lettuce=0;
		target.apples=0;
		target.strawberries=0;
		target.brussel=0;
		target.artichokes=0;
		target.tilled=0;
		target.planted=0;
		target.ripe=0;
		target.ruined=0;
		target.fertile=0;
		target.GMO=0;
		target.growthRate=1.0;
		target.pestRepel=1.0;
		target.GMO=0;
	}
	//dont know product array
	//produce[Harvest] = produce[harvest] + 1;
}
//Daily Update







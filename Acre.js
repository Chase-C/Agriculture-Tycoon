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
var createBuyMenu = function(menus, farm){
	var elements = [new Text("Frankie's Farmer Emporium", 16, 16, 18)];
		/*
		new Text("Shovel: $"+farm.tools.shovel.price, 16, 68, 14),
		new Text("Tractor: $"+farm.tools.tractor.price, 16, 68+64, 14),
		new Text("Helping Hand: $"+farm.tools.helpingHand.price, 16, 68+2*64, 14),
		new Text("Tire: $"+farm.tools.tire.price, 16, 68+3*64, 14),
	];*/
	return new Menu(200, 122, 600, 400, elements);
}
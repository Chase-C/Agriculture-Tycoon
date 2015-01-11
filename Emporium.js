//units in dollars unless marked otherwise
//OF: organic fertilizer; CF: chemical fertilizer
//GS: grocery store; R: restaurant; FM: farmer's market
var Seeds = {
    name:             ['lettuce', 'apple', 'strawberry', 'brussel', 'artichoke'],
    price:            [50,        90,       100,            70,                150], 
    seedMakes:        [50,        70,       30,             60,                40], //x's
    growTime:         [2,         2,        4,              7,                 10],
    timeCost:         [2,         3,        4,              5,                 6], //hours
    timeCostOF:       [3,         4,        5,              6,                 7], //hours
    timeCostCF:       [1,         2,        3,              4,                 5], //hours
    groceryPrice:     [225,       260,      120,            150,               290],
    restaurantPrice:  [215,       250,      140,            135,               300],
    marketPrice:      [220,       275,      170,            140,               325],
    quickMoney:       [33.33,     60,       66.67,          46.67,             100],
    waterConsumption: [200,       200,      100,            100,               100], //water units
    GSOFProduce:      [350,       330,      310,            320,               400],
    GSCFProduce:      [275,       270,      240,            230,               310],
    ROFProduce:       [330,       310,      320,            300,               450],
    RCFProduce:       [270,       265,      250,            210,               305],
    FMOFProduce:      [340,       320,      350,            310,               430],
    FMCFProduce:      [260,       275,      245,            220,               300],
    spoilPercent:     [.10,       .05,      0.15,           .10,               .10]
};

var waterPrice = 0.25; //$ per unit
var pesticidePrice = 50;
var OFPrice = 100;
var CFPrice = 50;

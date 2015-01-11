var selectSound = new Audio("audio/select.wav");
selectSound.addEventListener('ended', function(){
	this.currentTime = 0;
});

var soundtrack = new Audio("audio/soundtrack.mp3");
soundtrack.addEventListener('ended', function(){
	this.currentTime = 0;
	this.play();
});
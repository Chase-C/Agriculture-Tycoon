var selectSound = new Audio("audio/select.wav");
selectSound.addEventListener('ended', function(e){
	this.currentTime = 0;
});
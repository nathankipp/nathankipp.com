$(function() {

	setTimeout(function() {
		$(".main-container").animate({
			"top": "50%",
			"margin-top": "-100px"
		}, 1000);
	}, 500);
	setTimeout(function() {
		$(".half").animate({
			"opacity": 0.7
		}, 1000);
	}, 750);

	
});
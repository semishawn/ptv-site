$(window).scroll(function() {
	if ($(document).scrollTop() > 100)
		$(".nav-content").addClass("shrink");
	else
		$(".nav-content").removeClass("shrink");
});
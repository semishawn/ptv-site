// Scroll to top on page load
window.scrollTo(0, 0);

// On scroll past 100px, shrink nav
$(window).scroll(function() {
	if ($(window).scrollTop() > 100)
		$(".nav").addClass("shrink");
	else
		$(".nav").removeClass("shrink");
});
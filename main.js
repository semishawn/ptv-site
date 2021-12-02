window.scrollTo(0, 0);

$(window).scroll(function() {
	if ($(window).scrollTop() > 100)
		$(".nav").addClass("shrink");
	else
		$(".nav").removeClass("shrink");
});

/* $(window).scroll(function() {  
	if ($(window).scrollTop() >= $(".header").offset().top)
		$(".header").addClass('sticky');
	else
		$(".header").removeClass('sticky');
}); */
// Scroll to top on page load
$("main").scrollTop(0);



// On scroll past 100px, shrink nav
$("main").scroll(function() {
	if ($(this).scrollTop() > 0)
		$("body").addClass("shrink-logo");
	else {
		$("body").removeClass("shrink-logo");
		$("body").removeClass("show-nav");
	}
});



// Animate overlay text disappearing
var target = $(".overlay-text");
var targetHeight = target.outerHeight();

$("main").scroll(function() {
    var scrollPercent = (targetHeight - $("main").scrollY) / targetHeight;
    if (scrollPercent >= 0) target.css("opacity", scrollPercent);
});



/* Toggle nav on logo button click */
$(".logo-btn").click(function() {
	$("body").toggleClass("show-nav");
});



// Animate scroll on link click
$(".section-link").click(function(e) {
	e.preventDefault();

	var page = $(this).attr("href");

	$("main").animate({
		scrollTop: $(page).offset().top
	}, 1000);
});



// Create element for each member
members.forEach(function(member) {
	var firstName = member.name.split(" ")[0].toLowerCase();
	var lastLetter = member.name.split(" ")[1].charAt(0).toLowerCase();
	var fileName = firstName + "-" + lastLetter;

	$(".member-container").append(`
		<div class="member-pic">
			<img src="img/members/${fileName}.webp">
			<div class="member-caption">
				<div class="member-name">${member.name}</div>
				<div class="member-title">${member.title}</div>
				<div class="member-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
			</div>
		</div>
	`);
});
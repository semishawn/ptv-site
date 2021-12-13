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
$("main").scroll(function() {
	var scrollPercent = 1 - ($(this).scrollTop() / $(".video-container").outerHeight());
	$(".overlay-text").css("opacity", scrollPercent);
});



/* Toggle nav on logo button click */
$(".logo-btn").click(function() {
	$("body").toggleClass("show-nav");
});



// Animate scroll on link click
$(".section-link").click(function(e) {
	e.preventDefault();

	/* var page = $(this).attr("href");
	var offset = $(page).position().top;

	$("main").animate({
		scrollTop: offset
	}, 1000); */
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



// Create element for each video
$.getJSON(apiUrl, function(data) {
	videos = data.items;

	videos.forEach(function(video) {
		var title = video.snippet.title;
		var id = video.id.videoId;
	
		var lowerTitle = title.toLowerCase();
		if (lowerTitle.includes("news")) {
			type = "pmn";
			icon = "far fa-newspaper";
		}
		else if (lowerTitle.includes("profile")) {
			type = "profile"
			icon = "fas fa-users";
		}
		else if (lowerTitle.includes("short film")) {
			type = "short-film"
			icon = "fas fa-film";
		}
		else if (sports.some(sport => lowerTitle.includes(sport))) {
			type = "sports"
			icon = "fas fa-table-tennis";
		}
		else {
			type = "misc";
			icon = "fas fa-camera-retro";
		}
	
		var randRotate = Math.ceil(Math.random() * 3) * (Math.round(Math.random()) ? 1 : -1);
	
		$("main").append(`
			<div class="video ${type}" style="transform: rotate(${randRotate}deg)">
				<iframe src="https://www.youtube.com/embed/${id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
				<div class="video-title-container">
					<i class="${icon}"></i>
					<div class="video-title">${title}</div>
				</div>
			</div>
		`);

		$(".pmn").first().appendTo(".work-category-wrapper[work-type=\"pmn\"] .recent-video");
		$(".profile").first().appendTo(".work-category-wrapper[work-type=\"profiles\"] .recent-video");
		$(".sports").first().appendTo(".work-category-wrapper[work-type=\"sports\"] .recent-video");

		$("main > .video").remove();
	});
});
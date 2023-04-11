// Function to make given element highest z-index of specified selectors
$.fn.maxZ = function(selector) {
	var topZ = 0;

	$(selector).each(function() {
		var thisZ = parseInt($(this).css('z-index'));
		if (thisZ > topZ) topZ = thisZ;
	});

	$(this).css('z-index', topZ + 1);
}

// Open page on window click
$(document).on("click", ".content-window:not(.open)", function() {
	$(this).maxZ(".content-window");
	$(this).addClass("open");
	$(this).find(".content").scrollTop(0);
	$(".nav").addClass("nav-hide");
});



// Close page on close button click
$(".close-btn").click(function(e) {
	e.stopPropagation();
	$(this).closest(".content-window").removeClass("open");
	$(".nav").removeClass("nav-hide");
});



// Create element on team page for each member
members.forEach(function(member) {
	var firstName = member.name.split(" ")[0].toLowerCase();
	var lastName = member.name.split(" ")[1].toLowerCase();
	var lastLetter = lastName.charAt(0);
	var fileName = firstName + "-" + lastLetter;

	$(".team-pics-container").append(`
		<div class="member-pic">
			<img src="img/members/${fileName}.webp">
			<div class="member-caption">
				<div class="member-name">
					<span>${firstName}</span>
					<span>${lastName}</span>
				</div>
				<div class="member-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
				<div class="member-grade">${member.grade}</div>
			</div>
		</div>
	`);
});



// Function to generate custom video element
function createVideo(type, id, icon, title) {
	var rotateDegree = 3;
	var randRotate = Math.ceil(Math.random() * rotateDegree) * (Math.round(Math.random()) ? 1 : -1);
	
	var newVideo = $(`
		<div class="video ${type}-video" style="transform: rotate(${randRotate}deg)">
			<iframe src="https://www.youtube.com/embed/${id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
			<div class="video-title-container">
				<i class="${icon}"></i>
				<div class="video-title">${title}</div>
			</div>
		</div>
	`);

	return newVideo;
}



// API workaround
$.get(apiUrl, function(xhr) {
	// Parse API data
	var data = JSON.parse(xhr);



	// Recent uploads
	var recentUploads = data[0];

	recentUploads.forEach(function(video) {
		var id = video.id;
		var title = video.title;
	
		if (title.toLowerCase().includes("news")) {
			type = "pmn";
			icon = "far fa-newspaper";
		}
		else if (sportsTerms.some(sport => title.toLowerCase().includes(sport))) {
			type = "sports"
			icon = "fas fa-table-tennis";
		}
		else if (title.toLowerCase().includes("short film")) {
			type = "short-film"
			icon = "fas fa-film";
		}
		else {
			if (!title.toLowerCase().includes("profile")) {
				type = "misc";
				icon = "fas fa-camera-retro";
			}
		}
	
		var styledVideo = createVideo(type, id, icon, title);

		$("#work .content").append(styledVideo);
	});

	$(".pmn-video:lt(6)").prependTo(".pmn-container");
	$(".sports-video:lt(6)").prependTo(".sports-container");
	$(".misc-video:lt(6)").prependTo(".misc-container");

	$(".content > .video").remove();



	// Parkland Profiles
	var profilesPlaylist = data[1];

	profilesPlaylist.forEach(function(video) {
		var type = "profile"
		var id = video.id;
		var icon = "fas fa-users";
		var title = video.title;
	
		var styledVideo = createVideo(type, id, icon, title);

		$(".profiles-container").prepend(styledVideo);
	});



	// Display site when API finishes loading
	$(".video-container").css("visibility", "visible");
});



// Generate gallery element for each picture
gallery.forEach(function(pic) {
	var img = `<img class="gallery-pic" src="img/gallery/${pic.title}.webp">`;
	$(".gallery-pic-container").append(img);
});



// Contact form functionality (right now it just clears all fields)
$(".submit-btn").click(function() {
	$(".contact-input").val("");
});
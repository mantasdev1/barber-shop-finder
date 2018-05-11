var map;
var start = {lat: 52.1936, lng: -2.223981};

function loadMap() {
	var mapOptions = {
		zoom: 16,
		center: start,
		mapTypeControl: false,
		navigationalControl: false,
		disableDefaultUI: true
	}

	map = new google.maps.Map(document.getElementById("map"), mapOptions);
	places = new google.maps.places.PlacesService(map);

	$("#map").css("height", $(window).innerHeight());
}

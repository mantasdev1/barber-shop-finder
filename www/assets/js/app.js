var map;
var places;
var infowindow;
var start = {lat: 52.1936, lng: -2.223981};

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  frequency: 1000,
  maximumAge: 5000
};

function getLocation() {
  navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

function onSuccess(position) {
  start = {lat: position.coords.latitude, lng: position.coords.longitude};
	loadMap();
	console.log("Your GEO location is: " + position.coords.latitude + "," + position.coords.longitude);
}

function onError(error) {
  loadMap();
  console.log('code: ' + error.code + 'n' + 'message: ' + error.message + 'n');
}

function loadMap() {
	var mapOptions = {
		zoom: 16,
		center: start,
		mapTypeControl: false,
		navigationalControl: false,
		disableDefaultUI: true
	}

	map = new google.maps.Map(document.getElementById("map"), mapOptions);

	infowindow = new google.maps.InfoWindow();
	places = new google.maps.places.PlacesService(map);

	places.nearbySearch({
	  location: start,
	  radius: 1000,
	  type: ['hair_care']
	}, callback);

	var marker = new google.maps.Marker({
		position: start,
		animation: google.maps.Animation.BOUNCE
	});
	marker.setMap(map);

	$("#map").css("height", $(window).innerHeight());
}

function callback(results, status) {
	if (status === google.maps.places.PlacesServiceStatus.OK) {
	  for (var i = 0; i < results.length; i++) {
		createMarker(results[i]);
	  }
	}
}

function createMarker(place) {
	var placeLoc = place.geometry.location;
	var marker = new google.maps.Marker({
	  map: map,
	  position: place.geometry.location
	});

	var request = { reference: place.reference };
    places.getDetails(request, function(details, status) {
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(details.name + "<br />" + details.formatted_address + "<br>" + details.formatted_phone_number);
        infowindow.open(map, this);
      });
    });
}
var map;
var places;
var infowindow;
var start = {lat: 52.1936, lng: -2.223981};
var mapLoaded = false;
var watch;
var userMarker;
var locationChecker;
var markers = [];

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  frequency: 1000,
  maximumAge: 5000
};

function getLocation() {
  navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
}

function onSuccess(position) {
  start = {lat: position.coords.latitude, lng: position.coords.longitude};

  if (!mapLoaded) {
    loadMap();
  }

  if (locationChecker) {
    clearInterval(locationChecker);
  }

  watch = navigate.geolocation.watchPosition(function(location) {
    userMarker.setPosition({lat: location.coords.latitude, lng: location.coords.longitude});
  });

  if (userMarker) {
    userMarker.setPosition({lat: position.coords.latitude, lng: position.coords.longitude});

    for (var i = 0; i < markers.length; i ++) {
      markers[i].setMap(null);
    }

    places.nearbySearch({
      location: start,
      radius: 1000,
      type: ['hair_care']
    }, callback);
  }

	console.log("Your GEO location is: " + position.coords.latitude + "," + position.coords.longitude);
}

function onError(error) {
  if (!mapLoaded) {
    loadMap();
  }

  if (!locationChecker) {
    locationChecker = setInterval(function() {
      getLocation();
    }, 1000);
  }

  console.log('code: ' + error.code + 'n' + 'message: ' + error.message + 'n');
}

function loadMap() {
  mapLoaded = true;

	var mapOptions = {
		zoom: 16,
		center: start,
		mapTypeControl: false,
		navigationalControl: false,
		disableDefaultUI: true
	}

	map = new google.maps.Map(document.getElementById("map"), mapOptions);
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

  userMarker = marker;

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

  var infowindow = new google.maps.InfoWindow({
    content: place.name
  });

  google.maps.event.addListener(marker, 'click', function() {
    updateInfo(infowindow, place);
    infowindow.open(map, marker);
  });

  markers.push(marker);
}

function updateInfo(infowindow, place) {
  var options = {
    key: "AIzaSyC3lbd9ZMPSA-BDnvRVNPpHkd93uVA9B_4",
    placeId: place.place_id
  }

  places.getDetails(options, function(details, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      infowindow.setContent(details.name + "<br />" + details.formatted_address + "<br>" + details.formatted_phone_number);
    }
  });
}
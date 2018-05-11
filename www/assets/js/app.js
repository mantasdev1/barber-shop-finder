var map;
var places;
var start = {lat: 52.1936, lng: -2.223981};

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
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
  places = new google.maps.places.PlacesService(map);

  var marker = new google.maps.Marker({
    position: start,
    animation: google.maps.Animation.BOUNCE
  });

  marker.setMap(map);

  $("#map").css("height", $(window).innerHeight());
}
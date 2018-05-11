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

navigator.geolocation.getCurrentPosition(onSuccess, onError);
var onSuccess = function(position) {
    alert('Latitude: '          + position.coords.latitude          + 'n' +
          'Longitude: '         + position.coords.longitude         + 'n' +
          'Altitude: '          + position.coords.altitude          + 'n' +
          'Accuracy: '          + position.coords.accuracy          + 'n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + 'n' +
          'Heading: '           + position.coords.heading           + 'n' +
          'Speed: '             + position.coords.speed             + 'n' +
          'Timestamp: '         + position.timestamp                + 'n');
};
function onError(error) {
    alert('code: '    + error.code    + 'n' +
          'message: ' + error.message + 'n');
}
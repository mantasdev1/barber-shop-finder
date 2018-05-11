var map;
var start = {lat: 0, lng: 0};
navigator.geolocation.getCurrentPosition(onSuccess, onError);

function onSuccess(position) {
	start = {lat: position.coords.latitude, lng: position.coords.longitude};
	alert(start);
}

function onError(error) {
alert('code: ' + error.code + 'n' +
'message: ' + error.message + 'n');
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

	$("#map").css("height", $(window).innerHeight());
	
	var marker = new google.maps.Marker({
          center: start,
          map: map,
          title: 'Hello World!'
     });
}
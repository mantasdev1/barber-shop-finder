var map;
var start;

function loadMap() {
	
	 navigator.geolocation.getCurrentPosition(onSuccess, onError);
		var onSuccess = function(position) {
		start = {lat: position.coords.latitude, lng: position.coords.longitude};
		};
		
		function onError(error) {
			alert('code: '    + error.code    + 'n' +
				  'message: ' + error.message + 'n');
		}
	
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
          position: start,
          map: map,
          title: 'Hello World!'
     });
}
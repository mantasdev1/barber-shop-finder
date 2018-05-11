var map;
var start = {lat: 52.1936, lng: -2.223981};

navigator.geolocation.getCurrentPosition(win, fail);

function loadMap() {
    var win = function(position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        var myLatlng = new google.maps.LatLng(lat, long);

        var mapOptions = {
		zoom: 16,
		center: start,
		mapTypeControl: false,
		navigationalControl: false,
		disableDefaultUI: true
	}
        map_element = document.getElementById("map");
        map = new google.maps.Map(map_element, myOptions);
		places = new google.maps.places.PlacesService(map);
		$("#map").css("height", $(window).innerHeight());
    };

    var fail = function(e) {
        $.mobile.hidePageLoadingMsg();
        alert('Can\'t retrieve position.\nError: ' + e);
    };

    watchID = navigator.geolocation.getCurrentPosition(win, fail);
} 

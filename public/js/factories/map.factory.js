app.factory('Map',function(){
	function initializeMap() {
	  console.log("INIT MAP")
	  var mapOptions = {
	    zoom: 12,
	    center: new google.maps.LatLng(40.7127, -74.0059)//,
	    //styles: [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}]

	  };

	  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions)
	  return map

	}

	function addStationsToMap(map,stations){
		if(!stations) stations = app.bike_data

		var bounds = new google.maps.LatLngBounds()
		stations.forEach(function(station){
		  var point = new google.maps.LatLng(station.lat,station.lon);
		  
		  var marker = new google.maps.Marker({
		      position: point,
		      map: map,
		      title: station.stationName

		  });
		  bounds.extend(marker.position)
		  map.fitBounds(bounds)



		})
	}

	return {
		map: initializeMap,
		addStations: addStationsToMap
	}

	//google.maps.event.addDomListener(window, 'load', initializeMap);
})
app.factory('Map',function(){
	
	function initializeMap() {
	  var mapOptions = {
	    zoom: 12,
	    center: new google.maps.LatLng(40.7127, -74.0059)//,
	    //styles: [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}]

	  };
	  var mapCanvas = document.getElementById('map')
	  var map = new google.maps.Map(mapCanvas, mapOptions)
	  return map
	}

	function addStationsToMap(map,stations){
		//if(!stations) stations = app.bike_data

		var bounds = new google.maps.LatLngBounds()
		stations.forEach(function(station){
		  var point = new google.maps.LatLng(station.lat,station.lon);
		  
		  var marker = new google.maps.Marker({
		      position: point,
		      icon: {
		      path: google.maps.SymbolPath.CIRCLE,
		      strokeColor: 'red',
		      scale: 2
		   	  },
		      map: map,
		      title: station.stationName

		  });
		  bounds.extend(marker.position)
		  map.fitBounds(bounds)



		})
	}


	function createStationMarkers(map,stations){
		if(!stations) stations = app.bike_data
		
		var bounds = new google.maps.LatLngBounds()

		var markers = []

		stations.forEach(function(station,i){
		  
		  var marker = {
		      latitude: station.lat,
		      longitude: station.lon,
		      title: station.stationName,
		      fit:true,
		      id: i
		  }

		  var ltlng = new google.maps.LatLng(marker.latitude,marker.longitude)
		  bounds.extend(ltlng)
		  markers.push(marker)
		})
		// debugger
		// map.control.getGMap().fitBounds(bounds)
		return markers
	}

	return {
		map: initializeMap,
		addStations: addStationsToMap,
		createStationMarkers: createStationMarkers
	}

	//google.maps.event.addDomListener(window, 'load', initializeMap);
})
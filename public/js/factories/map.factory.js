app.factory('Map',function(Station){


	
	var Map = {
		map: initializeMap,
		markers: [],
		currentInfoWindow: undefined,
		updateMap: updateMap,
		addStations: addStationsToMap,
		clear: clear,

		// createStationMarkers: createStationMarkers
	}
	//var markers = [], openWindow

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

	function updateMap(scope){
		if(!scope.map)
			scope.map = initializeMap()

		clear()
		addStationsToMap(scope.map,Station.getStations())
	}

	function addStationsToMap(map,stations){

		var bounds = new google.maps.LatLngBounds()

		
		stations.forEach(function(station){
			var point = new google.maps.LatLng(station.lat,station.lon);

			var infoWindowContent = '<div id="content">'+
	      '<div id="siteNotice">'+
	      '</div>'+
	      '<h5 id="firstHeading" class="firstHeading">'+ station.stationName + '</h5>'+
	      '<div id="bodyContent">'+
	    	'<p>Available Bikes: ' + station.availableBikes + '</p>' +
	    	'<p>Available Docks: ' + station.availableDocks + '</p>' +
	      '</div>'+
	      '</div>';

			var infoWindow = new google.maps.InfoWindow({
			  	content: infoWindowContent
			  })

		  
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


		  if(stations.length<=10)
		  	marker.icon = null

		  Map.markers.push(
		  	{
		  		marker:marker,
		  		infoWindow:infoWindow
		  	})

		  google.maps.event.addListener(marker,'click',function(){
		  	if(Map.openWindow)
		  		Map.openWindow.close()
		  	Map.openWindow = infoWindow
		  	infoWindow.open(map,marker)
		  })

		  bounds.extend(marker.position)
		  map.fitBounds(bounds)
		  //map.setZoom(map.getZoom() + 1);


		})

	}

	function clear (){
		Map.markers.forEach(function(marker){
			marker.marker.setMap(null)
		})
		Map.markers = []
	}



	return Map
	
})
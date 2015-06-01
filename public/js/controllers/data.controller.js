app.controller('DataCtrl', function ($scope,$state,Map,Station,nearbyStations){
	
	Station.setStations(nearbyStations.data)
	$scope.stations = nearbyStations.data

	Map.updateMap($scope)
	console.log("map markers",Map.markers)

	$scope.openMarker = function (i){
		
		var markers = Map.markers
		if(i<markers.length){
			var infoWindow = markers[i].infoWindow
			var marker = markers[i].marker
			if(Map.openWindow)
			  	Map.openWindow.close()
			debugger

		  	Map.openWindow = infoWindow
		  	infoWindow.open($scope.map,marker)
		}
	}


	
})
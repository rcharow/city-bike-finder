app.controller('SearchCtrl',function ($scope,$state,Station,Map,stations){
		$scope.stations = stations.data
		Station.setStations(stations.data)

		Map.updateMap($scope)

	$scope.findNearbyStations = function(){
		var location = {
			streetAddress1: $scope.streetAddress1, 
			city: $scope.city ? $scope.city : $scope.currentCity,
			defaultCity: Station.getCurrentCity(),
			zipCode: $scope.zipCode
		}

		Station.setCurrentLocation(location)
		$state.go('find-bike.station-results')

	}
})
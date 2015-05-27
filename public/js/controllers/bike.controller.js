app.controller('BikeCtrl', function ($scope,$route,$routeParams,$location,Template,Map,Station,stations) {

	$scope.stations = stations.data

	$scope.map = {}

	$scope.mapSetup = {
		center:{latitude:40.7127, longitude:-74.0059},
		zoom: 12
	}

	$scope.stationMarkers = []
	$scope.templates = Template

	$scope.$on('$viewContentLoaded', function(){

		$scope.currentCity = $routeParams.city
		$scope.stationMarkers = Map.createStationMarkers($scope.map,$scope.stations)
		// debugger

	})

	

	$scope.findNearbyStations = function(){
	
		console.log("NEARBY")
		var location = {
			streetAddress1: $scope.streetAddress1, 
			city: $scope.city ? $scope.city : $scope.currentCity,
			zipCode: $scope.zipCode
		}

		Station.setCurrentLocation(location)

		// Station.nearbyStations(location)
		// .then(function(result){
		// 	console.dir("NEARBY RESULT",result)
		// 	$scope.allStations = result.data
		// }),
		// function(error){
		// 	console.log("ERROR in nearby bikes")
		// }

		$location.path("/bike-results")

	}

})
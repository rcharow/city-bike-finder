app.controller('BikeCtrl', function ($scope,$route,$routeParams,$location,Template,Map,Station,stations) {

	$scope.stations = stations.data

	$scope.templates = Template

	$scope.$on('$viewContentLoaded', function(){

		$scope.currentCity = $routeParams.city
		$scope.map = undefined
	 	$scope.map = Map.map()
		debugger

		Map.addStations($scope.map,$scope.stations)
	 	// Station.bikeFeedData($scope.currentCity)
	 	// .then(function(result){
	 	// 	$scope.allStations = result.data
	 	// 	Map.addStations($scope.map,$scope.allStations)
	 	// },
	 	// function(error){
	 	// 	console.log("ERROR in bike controller",error)
	 	// })

	})

	

	$scope.findNearbyStations = function(){
		// action="/find_bikes/nearby_stations"
		//$scope.map = Map.map()
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
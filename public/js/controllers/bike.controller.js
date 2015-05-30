app.controller('BikeCtrl', function ($scope,$route,$routeParams,$location,$state,Template,Map,Station,stations,loadChildState) {

	$scope.stations = stations.data
	console.log('stations',$scope.stations)

	$scope.templates = Template

	$scope.$on('$viewContentLoaded', function(){
		$scope.map = Map.map()
		Map.addStations($scope.map,$scope.stations)
		loadChildState()

	})

	$scope.findNearbyStations = function(){
	
		console.log("NEARBY")
		var location = {
			streetAddress1: $scope.streetAddress1, 
			city: $scope.city ? $scope.city : $scope.currentCity,
			defaultCity: Station.getCurrentCity(),
			zipCode: $scope.zipCode
		}
		console.log('location',location)
		Station.setCurrentLocation(location)

		$state.go('find-bike.station-results')

		// Station.nearbyStations(location)
		// .then(function(result){
		// 	console.dir("NEARBY RESULT",result)
		// 	$scope.allStations = result.data
		// }),
		// function(error){
		// 	console.log("ERROR in nearby bikes")
		// }

		//$location.path("/bike-results")

	}

})
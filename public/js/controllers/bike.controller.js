app.controller('BikeCtrl', function ($scope,$routeParams,$location,Template,Map,Station) {

	$scope.templates = Template

	$scope.$on('$viewContentLoaded', function(){
		$scope.currentCity = $routeParams.city
	 	$scope.map = Map.map()

	 	Station.bikeFeedData($scope.currentCity)
	 	.then(function(result){
	 		$scope.allStations = result.data._result
	 		Map.addStations($scope.map,$scope.allStations)
	 	},
	 	function(error){
	 		console.log("ERROR in bike controller",error)
	 	})

	})

	$scope.findNearbyStations = function(){
		// action="/find_bikes/nearby_stations"
		$scope.map = Map.map()
		debugger
		var location = {
			streetAddress1: $scope.streetAddress1, 
			city: $scope.city ? $scope.city : $scope.currentCity,
			zipCode: $scope.zipCode
		}

		Station.nearbyStations(location)
		.then(function(result){
			console.dir("NEARBY RESULT",result)
		}),
		function(error){
			console.log("ERROR in nearby bikes")
		}

		$location.path("/bike-results")

	}

})
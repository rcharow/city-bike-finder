app.controller('MapCtrl', function($scope,Map,Station){
	$scope.$on('$viewContentLoaded', function(){
		debugger
		$scope.map = Map.map()
		Map.addStations($scope.map,$scope.stations)
		loadChildState()

	})
})
app.controller('BikeCtrl', function ($scope,$route,$routeParams,$location,$state,Template,Map,Station,stations) {

	$scope.templates = Template

	if(!$scope.map){
		$scope.map = Map.map()
	}

	if($state.$current.name === 'find-bike')
		loadSearchForm()
	

	function loadSearchForm(){
		$state.go('find-bike.all-stations')
	}

	

})
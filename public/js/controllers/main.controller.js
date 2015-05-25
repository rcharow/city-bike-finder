app.controller('MainCtrl', function ($scope,$route,$routeParams,Template) {

  	$scope.$route = $route;
    $scope.$routeParams = $routeParams;

	$scope.cities = [{name:'New York, NY',abbr:"NYC"}]
	$scope.templates = Template

	
})
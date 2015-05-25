app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '../templates/city.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/find-bike/:city', {
        templateUrl: '../templates/find-bike.html',
        controller: 'BikeCtrl',
        controllerAs: 'main'
      })
      .when('/bike-results', {
        templateUrl: '../templates/bike-results.html',
        controller: 'BikeCtrl',
        controllerAs: 'main'
      })
      . otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode(true);
}])
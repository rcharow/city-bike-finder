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
        resolve: {
          stations: function(Station, $route) {
            
            return Station.bikeFeedData($route.current.params.city)
          }
        },
        controllerAs: 'main'
      })
      .when('/bike-results', {
        templateUrl: '../templates/bike-results.html',
        controller: 'BikeCtrl',
        controllerAs: 'main',
        resolve: {
          stations: function(Station,$route) {
            debugger
            return Station.nearbyStations(Station.getCurrentLocation())
          }
        }
      })
      . otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode(true);
}])
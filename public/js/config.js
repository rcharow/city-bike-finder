app.config(function($stateProvider,$routeProvider){
    $stateProvider.state('home',{
      url: '',
      templateUrl: '../templates/city.html'//,
      //controller: 'MainCtrl'
    })

    $stateProvider.state('find-bike',{
      url: '/find-bike/:city',
      templateUrl: '../templates/find-bike.html',
      controller: 'BikeCtrl',
      resolve: {
          stations: function(Station, $route, $stateParams,$state) {
            Station.setCurrentCity($stateParams.city)
            return Station.bikeFeedData($stateParams.city)
          }
        }
    })

    $stateProvider.state('find-bike.all-stations',{
      url: '/all-stations',
      templateUrl: '../templates/find-bike-form.html',
      controller: 'SearchCtrl',
      resolve: {
          stations: function(Station, $route, $stateParams,$state) {
            Station.setCurrentCity($stateParams.city)
            return Station.bikeFeedData($stateParams.city)
          }
        }
    })

    $stateProvider.state('find-bike.station-results',{
      url: '/bike-results',
      templateUrl: '../templates/bike-results.html',
      controller: 'DataCtrl',
      resolve: {
          nearbyStations: function(Station) {
            return Station.nearbyStations(Station.getCurrentLocation())
          }
        }
    })

    //$routeProvider.otherwise('/')
  }
)
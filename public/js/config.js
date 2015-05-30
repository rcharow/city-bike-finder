// app.config(['$routeProvider', '$locationProvider',
//   function($routeProvider, $locationProvider) {
//     $routeProvider
//       .when('/', {
//         templateUrl: '../templates/city.html',
//         controller: 'MainCtrl',
//         controllerAs: 'main'
//       })
//       .when('/find-bike/:city', {
//         templateUrl: '../templates/find-bike.html',
//         controller: 'BikeCtrl',
//         resolve: {
//           stations: function(Station, $route) {
            
//             return Station.bikeFeedData($route.current.params.city)
//           }
//         },
//         controllerAs: 'main'
//       })
//       .when('/bike-results', {
//         templateUrl: '../templates/bike-results.html',
//         controller: 'BikeCtrl',
//         controllerAs: 'main',
//         resolve: {
//           stations: function(Station,$route) {
//             debugger
//             return Station.nearbyStations(Station.getCurrentLocation())
//           }
//         }
//       })
//       .otherwise({
//             redirectTo: '/'
//         });

//     $locationProvider.html5Mode(true);
// }])

app.config(function($stateProvider,$routeProvider){
    $stateProvider.state('home',{
      url: '',
      templateUrl: '../templates/city.html',
      controller: 'MainCtrl'
    })

    $stateProvider.state('find-bike',{
      url: '/find-bike/:city',
      templateUrl: '../templates/find-bike.html',
      controller: 'BikeCtrl',
      resolve: {
          stations: function(Station, $route, $stateParams,$state) {
            console.log('stations find-bike')
            Station.setCurrentCity($stateParams.city)
            return Station.bikeFeedData($stateParams.city)
          },
          loadChildState: function($state){
             return function(){
              $state.go('find-bike.all-stations')
             }
          }
        }
    })

    $stateProvider.state('find-bike.all-stations',{
      url: '/all-stations',
      templateUrl: '../templates/find-bike-form.html',
      controller: 'BikeCtrl'
    })

    $stateProvider.state('find-bike.station-results',{
      url: '/bike-results',
      templateUrl: '../templates/bike-results.html',
      controller: 'BikeCtrl',
        resolve: {
          stations: function(Station,$route) {
            console.log('stations nearby')
            return Station.nearbyStations(Station.getCurrentLocation())
          },
          loadChildState: function($state){
             return function(){
              $state.go('find-bike.station-results')
             }
          }
        }
    })

    //$routeProvider.otherwise('/')
  }
)
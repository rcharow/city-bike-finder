app.factory('Station',function($http){
	var currentLocation

	function setCurrentLocation(location){
		currentLocation = location
	}

	function getCurrentLocation(){
		return currentLocation
	}

	function getBikeFeedData(cityCode){

		return $http.get('/stations/'+cityCode)
		  .success(function(data, status, headers, config) {
			    return data.result
		  })
		  .error(function(data, status, headers, config) {
			    return  "Error: " + status
		  });
	}

	function getNearbyStations(location){
		return $http.post("stations/nearby_stations",location)
			.success(function (data,status,headers,config) {
					return data.result
			})
			.error(function(data,status,headers,config){
					return "Error: " + status
			})
	}

	return {
		bikeFeedData: getBikeFeedData,
		nearbyStations: getNearbyStations,
		setCurrentLocation: setCurrentLocation,
		getCurrentLocation: getCurrentLocation
	}

})
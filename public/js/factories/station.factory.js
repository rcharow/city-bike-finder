app.factory('Station',function($http){
	var currentCity
	var currentLocation
	var stations

	function setCurrentCity(city){
		currentCity = city
	}

	function getCurrentCity(){
		return currentCity
	}

	function setCurrentLocation(location){
		currentLocation = location
	}

	function getCurrentLocation(){
		return currentLocation
	}

	function setStations (currentStations) {
		stations = currentStations
	}

	function getStations (){
		return stations
	}

	function getBikeFeedData(cityCode){

		return $http.get('/stations/'+cityCode)
		  .success(function (data, status, headers, config) {
			    return data.result
		  })
		  .error(function(data, status, headers, config) {
			    return  "Error: " + status
		  });
	}

	function getNearbyStations(location){
		console.log('getting nearby stations')
		return $http.post("stations/nearby_stations",location)
			.success(function (data,status,headers,config) {
				console.log("nearby result",data)
				return data
			})
			.error(function(data,status,headers,config){
					return "Error: " + status
			})
	}

	return {
		bikeFeedData: getBikeFeedData,
		nearbyStations: getNearbyStations,
		setCurrentCity: setCurrentCity,
		getCurrentCity: getCurrentCity,
		setCurrentLocation: setCurrentLocation,
		getCurrentLocation: getCurrentLocation,
		setStations: setStations,
		getStations: getStations
	}

})
app.factory('Station',function($http){
	
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
		nearbyStations: getNearbyStations
	}

})
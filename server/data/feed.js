var axios = require('axios');
var stationParser = require('./parser')

var bikeData;


var cityBikeFeeds = {
		NYC: { url: 'http://www.citibikenyc.com/stations/json' }
	}

var getBikeFeed = function(cityCode){
	return axios.get(cityBikeFeeds[cityCode].url)
	.then(function (response) {
		return stationParser[cityCode](response.data)
		//console.log("DATA: ",data)
		//return data
	  })
	.catch(function (response) {
	    console.log(response)
	  })

}


var getStationNames = function(){
	if(!bikeData)
		return {err: "No data loaded", data: {}}

	return bikeData.map(function(station){
		return station.stationName;
	})
	.sort(function(a,b){
		if(a>b) return 1;
		if(a<b) return -1;
		return 0;
	})

}

module.exports = {
	getBikeFeed: getBikeFeed, 
	getStationNames: getStationNames
}

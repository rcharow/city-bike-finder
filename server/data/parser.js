
function nycParser(data){
	debugger
	return data.stationBeanList.map(function(station){
		var s =  {
			stationName: station.stationName,
			lat: station.latitude,
			lon: station.longitude,
			stationStatus: station.statusValue,
			totalDocks: station.totalDocks,
			availableDocks: station.availableDocks,
			availableBikes: station.availableBikes,
			stAddress1: station.stAddress
		}
		return s
	})
}

module.exports = {
	NYC: nycParser
}
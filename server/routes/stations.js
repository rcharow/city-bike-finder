var express = require('express')
var router = express.Router()
var bike_data = require('../data/feed')
var geocoder = require('geocoder')
var geodist = require('geodist')

var allStations

function getNearbyStations(lat,lon){
	var stations = getStationsAndDistanceToCoord(lat,lon)
	console.log("STATIONS",stations)
	return stations.slice(0,5)
}

function getStationsAndDistanceToCoord(lat,lon){
	console.log("TYPE:", typeof allStations)
	return allStations.map(function(s){
		s.distance = geodist({lat: lat, lon: lon}, {lat: s.lat, lon: s.lon},{exact:true})
		return s
	})
	.sort(function(a,b){return a.distance-b.distance})
}

router.get('/', function(req, res, next) {
	console.log("GET BIKES")
	//res.render('find_bikes', {stations: bike_data.getStationNames(), allData: bike_data});
});

router.get('/:city',function(req,res,next){
	var data =  bike_data.getBikeFeed(req.params.city)
	data.then(function(){
		allStations = data._result
		res.send(data._result)
	})
})

router.post('/nearby_stations',function(req, res, next){
	var address, nearbyStations, location
	console.log("BODY",req.body)
	address = req.body.streetAddress1 + " " + req.body.city + " " + req.body.zipCode
	console.log('ADDRESS',address)
	var data = geocoder.geocode(address,function(err,data){
		if(err)
			console.log("Geocode error")
		location = data.results[0].geometry.location
		console.log("LOCATION:",location)
		nearbyStations = getNearbyStations(location.lat,location.lng)
		res.send(nearbyStations)
	})

	// data.then(function(){
	// 	res.send(data)
	// })
})

module.exports = router;
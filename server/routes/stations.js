var express = require('express')
var router = express.Router()
var bike_data = require('../data/feed')
var geocoder = require('geocoder')
var geodist = require('geodist')

var allStations

function createAddress(addressReq){
	var address = []
	if(addressReq.streetAddress1)
		address.push(addressReq.streetAddress1)
	if(addressReq.city)
		address.push(addressReq.city)
	else
		address.push(addressReq.defaultCity)
	if(addressReq.zipCode)
		address.push(addressReq.zipCode)
	return address
}

function getNearbyStations(lat,lon){
	var stations = getStationsAndDistanceToCoord(lat,lon)

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

	address = createAddress(req.body)
	
	var data = geocoder.geocode(address,function(err,data){
		if(err){
			console.log("Geocode error")
			res.status(500)
		}else{
			if(data.results.length){
				location = data.results[0].geometry.location
				nearbyStations = getNearbyStations(location.lat,location.lng)
				console.log('nearby',nearbyStations)
				res.send(nearbyStations)
			}else{
				res.send([])
			}
		}
	})

	// data.then(function(){
	// 	res.send(data)
	// })
})

module.exports = router;
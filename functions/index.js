const functions = require('firebase-functions')
const {geocodeRequest} = require('./geocode')
const {restaurantsRequest} = require('./restaurants')
const {Client} = require('@googlemaps/google-maps-services-js')

const client = new Client({})
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.geocode = functions.https.onRequest((request, response) => {
  geocodeRequest(request, response, client)
})

exports.restaurants = functions.https.onRequest((request, response) => {
  restaurantsRequest(request, response, client)
})

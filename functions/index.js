const functions = require('firebase-functions')
const {geocodeRequest} = require('./geocode')
const {restaurantsRequest} = require('./restaurants')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.geocode = functions.https.onRequest((request, response) => {
  geocodeRequest(request, response)
})

exports.restaurants = functions.https.onRequest((request, response) => {
  restaurantsRequest(request, response)
})

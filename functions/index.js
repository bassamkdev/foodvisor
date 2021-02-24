const functions = require('firebase-functions')
const {geocodeRequest} = require('./geocode')
const {restaurantsRequest} = require('./restaurants')
const {payRequest} = require('./pay')
const {Client} = require('@googlemaps/google-maps-services-js')
const stripeClient = require('stripe')(functions.config().stripe.key)
const googleClient = new Client({})
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.geocode = functions.https.onRequest((request, response) => {
  geocodeRequest(request, response, googleClient)
})

exports.restaurants = functions.https.onRequest((request, response) => {
  restaurantsRequest(request, response, googleClient)
})

exports.pay = functions.https.onRequest((request, response) => {
  payRequest(request, response, stripeClient)
})

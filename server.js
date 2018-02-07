var mdns = require('mdns-js')
var axios = require('axios')
var browser = mdns.createBrowser(mdns.tcp('http'))
let sonoff = {}

browser.on('ready', function () {
  browser.discover()
})

browser.on('update', function (data) {
  if (data.host.includes('sonoff')) {
    sonoff.ip = data.addresses
    sonoff.host = data.host
    console.log(sonoff)
    toggle()
  }
})

function toggle () {
  axios.get(`http://${sonoff.ip}/cm?cmnd=Power%20TOGGLE`)
  .then(function (response) {
    console.log(response)
  })
  .catch(function (error) {
    console.log(error)
  })
}

function power (query) {
 // QUery must be on/off
  axios.get(`http://${sonoff.ip}/cm?cmnd=Power%20${query}`)
  .then(function (response) {
    console.log(response)
  })
  .catch(function (error) {
    console.log(error)
  })
}

function 
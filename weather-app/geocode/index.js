const request = require('request');

const config = require('../../config');

function geocodeAddress(address) {
  return new Promise((resolve, reject) => {
    address = encodeURIComponent(address);
    request({
      url: `${config.get('googleMaps:path')}?address=${address}&key=${config.get('googleMaps:key')}`,
      json: true
    }, (err, res, body) => {
      if (err) {
        reject('Unable to connect to Google service');
      } else if (body.status === 'ZERO_RESULTS') {
        reject('Unable to find that address');
      } else if (body.status === 'OK') {
        let results = body.results[0];
        resolve({
          address: results.formatted_address,
          lat: results.geometry.location.lat,
          lng: results.geometry.location.lng
        });
      }
    });
  });
}

module.exports = {
  geocodeAddress
};
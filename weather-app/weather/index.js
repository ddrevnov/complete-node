const request = require('request');
const config = require('../../config');

function getWeather(lat, lng) {
  return new Promise((resolve, reject) => {
    request({
      url: `${config.get('weather:path')}/${config.get('weather:key')}/${lat},${lng}`,
      json: true
    }, (err, res, body) => {
      if (!err && res.statusCode === 200) {
        resolve({
          temperature: body.currently.temperature,
          apparentTemperature: body.currently.apparentTemperature
        });
      } else {
        reject('Unable to fetch weather');
      }
    });
  });
}

module.exports = {
  getWeather
};
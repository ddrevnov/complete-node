const request = require('request');
const config = require('../../config');

function getWeather(lat, lng, cb) {
  request({
    url: `${config.get('weather:path')}/${config.get('weather:key')}/${lat},${lng}`,
    json: true
  }, (err, res, body) => {
    if (!err && res.statusCode === 200) {
      cb(null, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    } else {
      cb('Unable to fetch weather');
    }
  });
}

module.exports = {
  getWeather
};
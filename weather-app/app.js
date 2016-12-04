const yargs = require('yargs');

const geocode = require('./geocode');
const weather = require('./weather');

const argv = yargs
  .options({
    address: {
      demand: true,
      alias: 'a',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

geocode.geocodeAddress(argv.address, function (err, res) {
  if (err) {
    console.log(err);
  } else {
    weather.getWeather(res.lat, res.lng, function (err, weather) {
      if (err) {
        console.error(err);
      } else {
        console.log(`Weather in ${res.address} is ${weather.temperature}`);
      }
    });
  }
});


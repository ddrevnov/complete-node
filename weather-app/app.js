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

geocode.geocodeAddress(argv.address)
  .then(res => {
    console.log(`Weather in ${res.address}`);
    return weather.getWeather(res.lat, res.lng);
  })
  .then(weather => {
    console.log(`Weather is ${weather.temperature}`);
  })
  .catch(err => {
    console.log(err);
  });


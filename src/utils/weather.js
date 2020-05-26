const request = require("postman-request");
const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=6456b2e782ada34c2a76c1fbfb98dc57&query=${latitude},${longitude}&units=m`;

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to weather app", undefined);
    } else if (body.error) {
      callback("unable to find location", undefined);
    } else {
      const content = body.current;
      const time = body.location;
      callback(
        undefined,
        `[${time.localtime}] The weather is currently ${content.weather_descriptions}, It is currently ${content.temperature} degrees out. It feels like ${content.feelslike} degrees`
      );
    }
  });
};

module.exports = forecast;

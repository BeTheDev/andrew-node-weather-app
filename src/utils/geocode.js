const request = require("postman-request");

// const mapbox =
//   "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiY3lvbmdjaG9pIiwiYSI6ImNrYWZqMW9rdTB4OHUyeGxkamVhYng1aWIifQ.o4EO6ZvABJ6SruRCyYJtnA&limit=1";

// request({ url: mapbox, json: true }, (error, response) => {
//   if (error) {
//     console.log("unable to connect to geomap");
//   } else if (response.body.features.length === 0) {
//     console.log("unable to find location");
//   } else {
//     const latitude = response.body.features[0].center[1];
//     const logitude = response.body.features[0].center[0];
//     console.log(latitude, logitude);
//   }
// });

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiY3lvbmdjaG9pIiwiYSI6ImNrYWZqMW9rdTB4OHUyeGxkamVhYng1aWIifQ.o4EO6ZvABJ6SruRCyYJtnA&";

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to location services", undefined);
    } else if (body.features.length === 0) {
      callback("unable to find location. Try serch again", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longtitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;

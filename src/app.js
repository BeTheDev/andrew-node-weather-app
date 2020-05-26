const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();
const geocode = require("./utils/geocode");
const weather = require("./utils/weather");

const port = process.env.PORT || 3000;
// define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public/");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");
//setup handlebars engine and views location
app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialPath);
//setup static directory
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "fran",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "this is help text",
    title: "Help",
    name: "fran",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "fran",
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide search term",
    });
  }
  res.send({
    product: [],
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "provide address",
    });
  }
  geocode(req.query.address, (error, { latitude, longtitude, location }) => {
    if (error) {
      return res.send({ error });
    }
    weather(latitude, longtitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send([
        {
          forecast: forecastData,
          location,
          adress: req.query.address,
        },
      ]);
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Help article not found",
    name: "fran",
    errorMessage: "Help article not found",
  });
});

//404 page
app.get("*", (req, res) => {
  res.render("404", {
    title: "Page not found",
    name: "fran",
    errorMessage: "Page not found",
  });
});

app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});

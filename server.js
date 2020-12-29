const express = require("express");
const nunjucks = require("nunjucks");
const bodyParser = require("body-parser");
const db = require("./database");
const axios = require("axios");

require("dotenv").config();

const app = express();

const API_KEY = process.env.API_KEY;
const apiBaseTemplate = "http://www.omdbapi.com/?apikey=" + API_KEY + "&type=movie";
let movieSearchResults;
let movieData;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

nunjucks.configure("views",{
  autoescape: true,
  express: app
});

app.get("/", function (req, res, next) {
  try{
    // let data = {message: 'nunjucks!!!!'}
    // return res.render('index.html', { title: data.message, sub: 'Using nunjucks' });
    return res.render('index.html');
  } catch(err) {
    return next(err);
  }
});


app.post("/", async function(req, res, next){
  try{
    const query = req.body.movieList;
  const url = apiBaseTemplate + "&s=" + query;

   const response = await axios.get(url);

   movieSearchResults = response.data.Search;

   res.redirect("/results");
  } catch(err) {
    return next(err);

  }  
});

app.get("/results", async function (req, res, next) {
  console.log(movieSearchResults);
  // console.log(random);  
  // let data = {message: "hello there!"};
  return res.render('results.html', { movies: movieSearchResults });
  // res.send(movieSearchResults);

});

app.get("/results/:Title", async function (req, res) {
  const requestedTitle = req.params.Title;
  const url = apiBaseTemplate + "&t=" + requestedTitle;

  movieData = await axios.get(url);

  let titleResult, thumbsUp, thumbsDown;


  return res.render('movieDetails.html', { movieData });

  
});

// app.post("/", function(req, res){
//   console.log(req.body);
//   let one = 'working!!!!';
//   res.send(one);
// });


/** 404 handler */

app.use(function(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;

  // pass the error to the next piece of middleware
  return next(err);
});

/** general error handler */

app.use((err, req, res, next) => {
  res.status(err.status || 500);

  return res.render("error.html", { err });
});


app.listen(3000, function () {
  console.log("Server started on port 3000");
});

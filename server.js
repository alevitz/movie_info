const express = require("express");
const nunjucks = require("nunjucks");
const bodyParser = require("body-parser");
const db = require("./database");
const axios = require("axios");

require("dotenv").config();

const app = express();

const API_KEY = process.env.API_KEY;
const apiBaseTemplate = "https://api.themoviedb.org/3/search/movie?language=en-US&include_adult=false&api_key=" + API_KEY;
let movieSearchResults;
let movieData;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

nunjucks.configure("views", {
  autoescape: true,
  express: app
});

app.get("/", function (req, res, next) {
  try {   
    return res.render('index.html');
  } catch (err) {
    return next(err);
  }
});



app.post("/", async function (req, res, next) {
  try {
    const query = req.body.movieList;
    const url = apiBaseTemplate + "&query=" + query;

    const response = await axios.get(url);

    movieSearchResults = response.data.results;

    res.redirect("/results");
  } catch (err) {
    return next(err);
  }
});

app.get("/results", async function (req, res, next) {
  try {
    return res.render('results.html', { movies: movieSearchResults });
  } catch (err) {
    return next(err);
  }
});

app.get("/results/:Title", async function (req, res, next) {
  try {
    const requestedTitle = req.params.Title;
    const url = apiBaseTemplate + "&t=" + requestedTitle;

    movieData = await axios.get(url);

    console.log(movieData.data);

    let titleResult, thumbsUp, thumbsDown;

    const result = await db.promise().query(
    `SELECT movie_title, release_year, thumbs_up, thumbs_down
    FROM movie
    WHERE movie_title="${movieData.data.Title}"
    AND release_year="${movieData.data.Year}"`);

    titleResult = result[0];
    if (titleResult.length) {
      thumbsUp = result[0][0].thumbs_up;
      thumbsDown = result[0][0].thumbs_down;
    } else {
      thumbsUp = 0;
      thumbsDown = 0;
    }

    return res.render('movieDetails.html', { movieData, thumbsUp, thumbsDown });
  } catch (err) {
    return next(err);
  }
});

app.post("/updatevote", async function (req, res, next) {
  const { movie_title, release_year, thumbs_up, thumbs_down } = req.body;
  
  try {
    const result = await db.promise().query(
    `SELECT movie_title, release_year
    FROM movie
    WHERE movie_title="${movie_title}"
    AND release_year="${release_year}"`);

    titleResult = result[0];
    if (titleResult.length) {
      await db.promise().query(
     `UPDATE movie
      SET ${thumbs_up || thumbs_down} = ${thumbs_up || thumbs_down} + 1
      WHERE movie_title = "${movie_title}"
      AND release_year="${release_year}"`
      );

      res.send(`movie already in db, updated ${thumbs_up || thumbs_down} up!`);

    } else {
      await db.promise().query(`INSERT INTO MOVIE (movie_title, release_year) VALUES('${movie_title}', '${+release_year}')`);
      await db.promise().query(
        `UPDATE movie
        SET ${thumbs_up || thumbs_down} = ${thumbs_up || thumbs_down} + 1
        WHERE movie_title = "${movie_title}"
        AND release_year="${release_year}"`
      );
      res.send(`movie added to db, updated ${thumbs_up || thumbs_down} up!`);
    }
  } catch (err) {
    return next(err);
  }
});

app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;

  return next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  return res.render("error.html", { err });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});


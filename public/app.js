let thumbsUpButton = $('#thumbsUpButton');
let thumbsDownButton = $('#thumbsDownButton');
let thumbsUpCount = $('#thumbsUpCount');
let thumbsDownCount = $('#thumbsDownCount');
let movie_title;
let release_date;

if(thumbsUpButton[0]){  
  movie_title = $('#movie_title')[0].innerHTML;
  release_date = $('#release_date')[0].innerHTML;
};

thumbsUpButton.click( async function() {

  let count = +thumbsUpCount[0].innerHTML;

  count += 1;
  thumbsUpCount[0].innerHTML = count;

  let thumbs_up = "thumbs_up";

  let response = await axios.post("/updatevote", {thumbs_up, movie_title, release_date});
  
});

thumbsDownButton.click( async function() {
  
  let count = +thumbsDownCount[0].innerHTML;

  count += 1;
  thumbsDownCount[0].innerHTML = count;
  
  let thumbs_down = "thumbs_down";

  let response = await axios.post("/updatevote", {thumbs_down, movie_title, release_date});
  
});
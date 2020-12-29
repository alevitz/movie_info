// let counter = $('#count');
let thumbsUpButton = $('#thumbsUpButton');
let thumbsDownButton = $('#thumbsDownButton');
let thumbsUpCount = $('#thumbsUpCount');
let thumbsDownCount = $('#thumbsDownCount');
let movie_title;
let release_year;


if(thumbsUpButton[0]){  
  movie_title = $('#movie_title')[0].innerHTML;
  release_year = $('#release_year')[0].innerHTML;
};

// counter.click( async function() {
//   console.log(+counter[0].innerHTML);
//   let count = +counter[0].innerHTML;

//   count += 1;
//   counter[0].innerHTML = count;
//   // let count = (evt.target.innerHTML);
//   console.log(count);
//   // count++;

//   // console.log(count);

//   let response = await axios.post("/", {count: count});

//   console.log(response);
  
// });

thumbsUpButton.click( async function() {
  console.log(+thumbsUpCount[0].innerHTML);
  let count = +thumbsUpCount[0].innerHTML;

  count += 1;
  thumbsUpCount[0].innerHTML = count;
  console.log(count);

  let thumbs_up = "thumbs_up";

  let response = await axios.post("/updatevote", {thumbs_up, movie_title, release_year});

  console.log(response);
  // let count = (evt.target.innerHTML);
  // count++;

  // console.log(count);

  // let response = await axios.post("/", {count: count});

  // console.log(response);
  
});

thumbsDownButton.click( async function() {
  console.log(+thumbsDownCount[0].innerHTML);
  let count = +thumbsDownCount[0].innerHTML;

  count += 1;
  thumbsDownCount[0].innerHTML = count;
  console.log(count);

  let thumbs_down = "thumbs_down";

  let response = await axios.post("/updatevote", {thumbs_down, movie_title, release_year});

  console.log(response);
  // let count = (evt.target.innerHTML);
  // count++;

  // console.log(count);

  // let response = await axios.post("/", {count: count});

  // console.log(response);
  
});
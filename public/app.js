let counter = $('#count');
let thumbsUpButton = $('#thumbsUpButton');
let thumbsDownButton = $('#thumbsDownButton');
let thumbsUpCount = $('#thumbsUpCount');
let thumbsDownCount = $('#thumbsDownCount');

counter.click( async function() {
  console.log(+counter[0].innerHTML);
  let count = +counter[0].innerHTML;

  count += 1;
  counter[0].innerHTML = count;
  // let count = (evt.target.innerHTML);
  console.log(count);
  // count++;

  // console.log(count);

  let response = await axios.post("/", {count: count});

  console.log(response);
  
});

thumbsUpButton.click( async function() {
  console.log(+thumbsUpCount[0].innerHTML);
  let count = +thumbsUpCount[0].innerHTML;

  count += 1;
  thumbsUpCount[0].innerHTML = count;
  console.log(count);




  // let count = (evt.target.innerHTML);
  // count++;

  // console.log(count);

  // let response = await axios.post("/", {count: count});

  // console.log(response);
  
});
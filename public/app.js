let counter = $('#count');

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

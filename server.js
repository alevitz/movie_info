const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", function (req, res) {
 
  return res.sendFile(__dirname + '/index.html');
});

app.post("/", function(req, res){
  console.log(req.body);
  let one = 'working!!!!';
  res.send(one);
});


app.listen(3000, function () {
  console.log("Server started on port 3000");
});

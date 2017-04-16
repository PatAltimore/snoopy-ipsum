var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var novel = { "novel" : [
  { section : "It was a dark and stormy night."},
  { section : "Suddenly, a shot rang out! A door slammed. The maid screamed."},
  { section : "Suddenly, a pirate ship appeared on the horizon!"},
  { section : "While millions of people were starving, the king lived in luxury."},
  { section : "Meanwhile, on a small farm in Kansas, a boy was growing up."},
  { section : "A light snow was falling, and the little girl with the tattered shawl had not sold a violet all day."},
  { section : "At that very moment, a young intern at City Hospital was making an important discovery. The mysterious patient in Room 213 had finally awakened. She moaned softly."},
  { section : "Could it be that she was the sister of the boy in Kansas who loved the girl with the tattered shawl who was the daughter of the maid who had escaped from the pirates?"},
  { section : "The intern frowned."},
  { section : "\"Stampede!\" the foreman shouted, and forty thousand head of cattle thundered down on the tiny camp. The two men rolled on the ground grappling beneath the murderous hooves. A left and a right. A left. Another left and right. An uppercut to the jaw. The fight was over. And so the ranch was saved."},
  { section : "The young intern sat by himself in one corner of the coffee shop. He had learned about medicine, but more importantly, he had learned something about life."}
]};

app.use(express.static(path.join(__dirname, 'static')));
app.use(bodyParser.json());

app.get('/api/beta/novel', function(req, res) {
  res.json(novel);
});

app.get('/api/beta/section/:howmany', function(req, res) {
  var content=[novel.novel[0]]; // Always start with "It was a dark and stormy night."
  var range = novel.novel.length-1;

  // Randomly choose sections from the novel for the requested number of sessions
  if (req.params.howmany > 1)
  {
    for (count=0;count<req.params.howmany; count++) {
      var index = Math.floor((Math.random() * range) + 1);
      content.push(novel.novel[index]);
    }
  }

  res.json(content);
});


app.listen(process.env.PORT || 8080, function () {
  console.log('Snoopy bot listening on port 8080.')
})
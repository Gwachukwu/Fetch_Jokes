const request = require("request");
const fs = require("fs");

const searchTerm = process.argv[2];
console.log(searchTerm);
const options = {
  url: `https://icanhazdadjoke.com/search?term=${searchTerm}`,
  headers: {
    "User-Agent": "request",
    Accept: "application/json",
  },
};
request(options, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    const jokes = JSON.parse(body).results;
    sendJokeToFile(jokes);
  } else {
    console.log("Error", error);
  }
});

function sendJokeToFile(jokes) {
  if (jokes.length !== 0) {
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    const joke = randomJoke.joke;
    fs.appendFile("jokes.txt", joke + "\n", function (err) {
      if (err) throw err;
      console.log("Added a random joke");
    });
  } else {
    console.log("No joke matches this term");
  }
}

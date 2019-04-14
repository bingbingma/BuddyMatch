// this file requires the friends.js file which has the array object for the existing friends
let friends = require("../data/friends");

//Routing for the api routes

//this app function is exported so that require("./app/routing/apiRoutes")(app); will work in the server.js
module.exports = function(app) {
  //app.get route will return json format of the friends file object (the list of friends)
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  //app.post route will return calculate the best match of the friends file object
  app.post("/api/friends", function(req, res) {
    let startingDiff = 10000;
    let incrementDiff = 0;
    let bestMatch;
    //first for loop [i] represents which friend is being compared
    for (let i = 0; i < friends.length; i++) {
      //nested for loop the let j tracks which question is being compared
      for (let j = 0; j < 10; j++) {
        //the Difference counts up with each question, which takes the abs value of the diff between req.body and friends[i]
        incrementDiff += Math.abs(req.body.scores[j] - friends[i].scores[j]);
      }
      //logs the counting up of the friend with the diff
      console.log(i + " " + incrementDiff);
      // if the diff from this loop is smaller than the startingDiff (set to be a large figure), then starting Diff becomes the smaller number
      if (incrementDiff < startingDiff) {
        startingDiff = incrementDiff;
        bestMatch = friends[i];
      }
      incrementDiff = 0;
    }
    //req.body is pushed to the friend array obj
    friends.push(req.body);
    //the result is returned in a json format for usage later to show the best match?
    res.json(bestMatch);
  });
};

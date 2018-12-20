// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on friends
// ===============================================================================

var friendArray = require("../data/friends");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {

  // A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.

  app.get("/api/friends", function (req, res) {

    res.json(friendArray);
  });



  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function (req, res) {

    console.log("app.post")
    // A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic. 
    var scoreUser = req.body.scores;
    console.log(req.body);
    console.log(scoreUser);
    console.log(friendArray.length)
    var arrayDifs = [];
    var bestMatch = [];
    for (var i = 0; i < friendArray.length; i++) {
      var scoreFriends = friendArray[i].scores;
      console.log("scoreFirends ", scoreFriends);
      var dif = 0;
      for (var j = 0; j < friendArray[i].scores.length; j++) {
        dif += Math.abs(scoreUser[j] - friendArray[i].scores[j]);
      }
      if (bestMatch = []){
        bestMatch = [friendArray[i].name, friendArray[i].photo, dif]
      }
      else if (dif < bestMatch[2]){
        bestMatch = [friendArray[i].name, friendArray[i].photo, dif]
      }

      console.log(bestMatch)
    }
    console.log(bestMatch);
    console.log("the best match is: ", bestMatch[0])
    friendArray.push(req.body);

    //here return data for the modal
    res.json(bestMatch);
  });

  //------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  app.post("/api/clear", function(req, res) {
    // Empty out the arrays of data
    friendArray.length = [];

    res.json({ ok: true });
  });
};

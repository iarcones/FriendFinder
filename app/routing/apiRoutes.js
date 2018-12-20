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

  // ---------------------------------------------------------------------------

  app.post("/api/friends", function (req, res) {

    // A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic. 

    var scoreUser = req.body.scores;

    var bestMatch = [];
    for (var i = 0; i < friendArray.length; i++) {
      
      var dif = 0;
      for (var j = 0; j < friendArray[i].scores.length; j++) {
        dif += Math.abs(scoreUser[j] - friendArray[i].scores[j]);
      }

      if (bestMatch.length === 0) {
        bestMatch = [friendArray[i].name, friendArray[i].photo, dif];
      }
      else if (dif < bestMatch[2]) {
      
        bestMatch = [friendArray[i].name, friendArray[i].photo, dif];
        
      }
    }

    friendArray.push(req.body);

    //here return the data for the modal
    res.json(bestMatch);
  });


//------------------------------------------
// I added this below code so you could clear out the table while working with the functionality.
// Don"t worry about it!

  app.post("/api/clear", function (req, res) {
    // Empty out the arrays of data
    friendArray.length = [];

    res.json({ ok: true });
  });
};

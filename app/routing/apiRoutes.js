// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on friends
// ===============================================================================

var friendArray = require("../data/friends");

module.exports = function (app) {

  // A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.

  app.get("/api/friends", function (req, res) {

    res.json(friendArray);
  });

  // ---------------------------------------------------------------------------

  app.post("/api/friends", function (req, res) {

    // A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic. 

    var scoreUser = req.body.scores;

    var bestMatch = [ "", "", 51 ];

    for (var i = 0; i < friendArray.length; i++) {

      var diff = 0;
      for (var j = 0; j < friendArray[ i ].scores.length; j++) {
        diff += Math.abs(scoreUser[ j ] - friendArray[ i ].scores[ j ]);
      }

      if (diff < bestMatch[ 2 ]) {
        bestMatch = [ friendArray[ i ].name, friendArray[ i ].photo, diff ];
      }
      console.log(friendArray[i].name, diff)
    }

    friendArray.push(req.body);
    console.log(friendArray)

    res.json(bestMatch);
  });;


  app.post("/api/clear", function (req, res) {
    // Empty out the arrays of data
    friendArray.length = [];

    res.json({ ok: true });
  });
};

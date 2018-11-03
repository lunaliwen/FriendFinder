// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information
// ===============================================================================

var friendData = require("../data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

    app.get("/api/friends", function (req, res) {
        res.json(friendData);
    });

    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a reservation request... this data is then sent to the server...
    // Then the server saves the data to the friendData array)
    // ---------------------------------------------------------------------------

    app.post("/api/friends", function (req, res) {

        // req.body is available since we're using the body parsing middleware
        friendData.push(req.body);
        // res.json(true);

        console.log(req.body);

        var totalDifference = [];

        var minDIfference;

        var matchedFriend;

        var currentUser = friendData[friendData.length - 1];

        for (var i = 0; i < friendData.length - 1; i++) {
            var difference = 0;
            for (var j = 0; j < 10; j++) {

                
                difference += Math.abs(parseInt(currentUser.scores[j]) - friendData[i].scores[j]);
            }

            totalDifference.push(difference);

            console.log(totalDifference);
        }
        minDifference = Math.min(...totalDifference);

        console.log(minDIfference);

        for (var z = 0; z < friendData.length - 1; z++) {
            if (totalDifference[z] == minDifference) {
                matchedFriend = friendData[z];

                res.json(matchedFriend); 
                console.log(matchedFriend); 
            }
            
        }
    

    });
};

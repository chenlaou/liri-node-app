// LIRI USED TO SEARCH SONGS, CONCERTS AND MOVIES
// APIs USED SPOTIFY, BANDS IN TOWN, OMDB

console.log("******WELCOME TO LIRI*******");
// code to read and set any environment variables with the dotenv package:
// Dotenv is a zero-dependency module that loads environment variables from 
// a .env file into process.env
require("dotenv").config();

// required to import the keys.js file and store it in a variable.
var keys = require("./keys.js");
var fs = require("fs");
var request = require("request");

// Access your keys information
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

// Variables for user input
var userOption = process.argv[2]; 
var inputParameter = process.argv[3];

//Execute function
UserInputs(userOption, inputParameter);

//FUNCTIONS
function UserInputs (userOption, inputParameter){
    switch (userOption) {
    case 'concert-this':
        showConcertInfo(inputParameter);
        break;
    case 'spotify-this-song':
        showSongInfo(inputParameter);
        break;
    case 'movie-this':
        showMovieInfo(inputParameter);
        break;
    case 'do-what-it-says':
        showSomeInfo();
        break;
    default: 
        console.log("Invalid Option. Please type any of the following options: \nconcert-this \nspotify-this-song \nmovie-this \ndo-what-it-says")
    }
}

//Funtion for Concert Info: Bands in Town  // node liri.js concert-this leon bridges
function showConcertInfo(inputParameter){
    var queryUrl = "https://rest.bandsintown.com/artists/" + inputParameter + "/events?app_id=codingbootcamp";
    request(queryUrl, function(error, response, body) {
    // If the request is successful
    if (!error && response.statusCode === 200) {
        var concerts = JSON.parse(body);
        for (var i = 0; i < concerts.length; i++) {  
             console.log("Venue " + (i) + ":" + " "  + concerts[i].venue.name);
            console.log("Location: " +  concerts[i].venue.city);
            console.log("Date of the Event: " +  concerts[i].datetime);
            console.log("-----------------------------------------------------------");
        }
    } else{
      console.log('Error occurred.');
    }
});}

//Funtion for Music Info: Spotify
function showSongInfo(inputParameter) {
    if (inputParameter === undefined) {
        inputParameter = "The Sign"; //default Song
    }
    spotify.search(
        {
            type: "track",
            query: inputParameter
        },
        function (err, data) {
            if (err) {
                console.log("Error occurred: " + err);
                return;
            }
            var songs = data.tracks.items;

            for (var i = 0; i < songs.length; i++) {
                console.log("Artist #" + (i) + ":" + " " + songs[i].artists[0].name);                
                console.log("Song name: " + songs[i].name);
                console.log("Preview: " + songs[i].preview_url);
               console.log("Album: " + songs[i].album.name);
               console.log("-----------------------------------------");  
                
             }
        }
    );
};

//Funtion for Movie Info: OMDB
function showMovieInfo(inputParameter){
    if (inputParameter === undefined) {
        inputParameter = "Mr. Nobody"
        console.log("-----------------------");
        console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
        console.log("It's on Netflix!");
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + inputParameter + "&y=&plot=short&apikey=trilogy";
    request(queryUrl, function(error, response, body) {
    // If the request is successful
    if (!error && response.statusCode === 200) {
        var movies = JSON.parse(body); 
        console.log("------------------------------------------------");  
        console.log("Title: " + movies.Title);
        console.log("Release Year: " + movies.Year);
        console.log("IMDB Rating: " + movies.imdbRating);
        console.log("Rating (Rotten Tomatoes): " + getRottenTomatoesRatingValue(movies));
        console.log("Country of Production: " + movies.Country);
        console.log("Language: " + movies.Language);
        console.log("Plot: " + movies.Plot);
        console.log("Actors: " + movies.Actors);
        console.log("------------------------------------------------");  
    } else{
      console.log('Error occurred.');
    }

});}

//function to get proper Rotten Tomatoes Rating
function getRottenTomatoesRatingObject (data) {
    return data.Ratings.find(function (item) {
       return item.Source === "Rotten Tomatoes";
    });
  }
  
  function getRottenTomatoesRatingValue (data) {
    return getRottenTomatoesRatingObject(data).Value;
  }

//function for reading out of random.txt file  
function showSomeInfo(){
	fs.readFile('random.txt', 'utf8', function(err, data){
		if (err){ 
			return console.log(err);
		}
        var dataArr = data.split(',');
        UserInputs(dataArr[0], dataArr[1]);
	});
}


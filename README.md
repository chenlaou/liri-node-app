# **LIRI APP**  
### CREATED BY CHENLA OU [APRIL 2019]

## ABOUT LIRI
LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data. For this app we will be using APIs from multiple sources including Bands in Town, OMDB, and Spotify.

The  `Commands` are:

   * `concert-this`

   * `spotify-this-song`

   * `movie-this`

   * `do-what-it-says`

- - -
## **HOW TO USE LIRI COMMANDS**

1. Open your terminal.
2. Navigate to the folder that contains the `liri.js` file.
3. Run one of the commands listed above.

---

## **COMMAND EXAMPLES:** (`input and output`)
    
#1. Using the `concert-this` command to display concert info from the Bands in town API.    

    (input)  node liri.js concert-this Leon Bridges
![Results](/images/concert.PNG)

---

#2. Using the `spotify-this-song` command to display song info from the Spotify API.    

    (input)  node liri.js spotify-this-song river
`(output) shown below:`
![Results](/images/spotify.PNG)

---
 
#3. Using the `movie-this` command to display movie info from the OMDB API.    

    (input)  node liri.js movie-this-song wackness
`(output) shown below:`
![Results](/images/movie.PNG)

---

#4. Using the `do-what-it-says` command LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.    

    (input)  node liri.js do-what-it-says
 `(random.txt) shown below:`
 ![Results](/images/randomtxt.PNG)

`(output) shown below:`
![Results](/images/dowhatitsays.PNG)
 
 

- - -

## TECHNOLOGIES USED
* Node JS
* Javascript
* Bands in Town API
* Spotify API
* OMDB API
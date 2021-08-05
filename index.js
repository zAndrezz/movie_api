// Initializing Express
const express = require("express"),
    uuid = require("uuid"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override");

const app = express();

// Serving documentation
app.use("/documentation.html", express.static("public"));

// Logging Middleware
const morgan = require("morgan");
app.use(morgan("common"));

// Error Handling Middleware

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(bodyParser.json());
app.use(methodOverride());

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

let movies = [{
        id: 1,
        title: "Beetlejuice",
        genres: "Comedy",
        director: "Tim Burton",
        actors: "Alec Baldwin, Geena Davis, Annie McEnroe, Maurice Page",
        posterUrl: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTUwODE3MDE0MV5BMl5BanBnXkFtZTgwNTk1MjI4MzE@._V1_SX300.jpg",
    },
    {
        id: 2,
        title: "The Cotton Club",
        genres: "Crime",
        director: "Francis Ford Coppola",
        actors: "Richard Gere, Gregory Hines, Diane Lane, Lonette McKee",
        posterUrl: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTU5ODAyNzA4OV5BMl5BanBnXkFtZTcwNzYwNTIzNA@@._V1_SX300.jpg",
    },
    {
        id: 3,
        title: "The Shawshank Redemption",
        genres: "Crime",
        director: "Frank Darabont",
        actors: "Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler",
        posterUrl: "https://images-na.ssl-images-amazon.com/images/M/MV5BODU4MjU4NjIwNl5BMl5BanBnXkFtZTgwMDU2MjEyMDE@._V1_SX300.jpg",
    },
    {
        id: 4,
        title: "Crocodile Dundee",
        genres: "Comedy",
        director: "Peter Faiman",
        actors: "Paul Hogan, Linda Kozlowski, John Meillon, David Gulpilil",
        posterUrl: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTg0MTU1MTg4NF5BMl5BanBnXkFtZTgwMDgzNzYxMTE@._V1_SX300.jpg",
    },
    {
        id: 5,
        title: "Valkyrie",
        genres: "Drama",
        director: "Bryan Singer",
        actors: "Tom Cruise, Kenneth Branagh, Bill Nighy, Tom Wilkinson",
        posterUrl: "http://ia.media-imdb.com/images/M/MV5BMTg3Njc2ODEyN15BMl5BanBnXkFtZTcwNTAwMzc3NA@@._V1_SX300.jpg",
    },
    {
        id: 6,
        title: "Ratatouille",
        genres: "Comedy",
        director: "Brad Bird, Jan Pinkava",
        actors: "Patton Oswalt, Ian Holm, Lou Romano, Brian Dennehy",
        posterUrl: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTMzODU0NTkxMF5BMl5BanBnXkFtZTcwMjQ4MzMzMw@@._V1_SX300.jpg",
    },
    {
        id: 7,
        title: "City of God",
        genres: "Crime",
        director: "Fernando Meirelles, Kátia Lund",
        actors: "Alexandre Rodrigues, Leandro Firmino, Phellipe Haagensen, Douglas Silva",
        posterUrl: "https://images-na.ssl-images-amazon.com/images/M/MV5BMjA4ODQ3ODkzNV5BMl5BanBnXkFtZTYwOTc4NDI3._V1_SX300.jpg",
    },
    {
        id: 8,
        title: "Memento",
        genres: "Mystery",
        director: "Christopher Nolan",
        actors: "Guy Pearce, Carrie-Anne Moss, Joe Pantoliano, Mark Boone Junior",
        posterUrl: "https://images-na.ssl-images-amazon.com/images/M/MV5BNThiYjM3MzktMDg3Yy00ZWQ3LTk3YWEtN2M0YmNmNWEwYTE3XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    },
    {
        id: 9,
        title: "The Intouchables",
        genres: "Drama",
        director: "Olivier Nakache, Eric Toledano",
        actors: "François Cluzet, Omar Sy, Anne Le Ny, Audrey Fleurot",
        posterUrl: "http://ia.media-imdb.com/images/M/MV5BMTYxNDA3MDQwNl5BMl5BanBnXkFtZTcwNTU4Mzc1Nw@@._V1_SX300.jpg",
    },
];

// GET: Returns all movies
app.get("/movies", (req, res) => {
    res.json(movies);
});

// GET: Returns a single movie by title
app.get("/movies/:title", (req, res) => {
    const title = movies.find((m) => m.title === req.params.title);
    if (!title) {
        res.status(404).send("Movie not found!");
    } else {
        res.json(title);
    }
});

//a search query returning data about a genre or author by name//
app.get("/genres/:genre", (req, res) => {
    const genre = movies.find((genre) => genre.genres === req.params.genres);
    if (!genre) {
        res.status(404).send("genre not found!");
    } else {
        res.json(genre);
    }
});

app.listen(8080, () => {
    console.log("Your app is listening on port 8080.");
});
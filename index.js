const express = require('express'),
    app = express();

uuid = require('uuid')

app.use('/documentation.html', express.static('public'));

//morgan logger//
morgan = require('morgan');

app.use(morgan('common'));

app.get('/movies', (req, res) => {
    res.json(movies);
});

app.get('/', (req, res) => {
    res.send('Welcome to my app!');
});


app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});

//error handling//

const bodyParser = require('body-parser'),
    methodOverride = require('method-override');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(methodOverride());

app.use((err, req, res, next) => {
    // logic
});

let movies = [{

        "id": 1,
        "title": "Beetlejuice",
        "genres": [
            "Comedy",
            "Fantasy"
        ],
        "director": "Tim Burton",
        "actors": "Alec Baldwin, Geena Davis, Annie McEnroe, Maurice Page",
        "posterUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTUwODE3MDE0MV5BMl5BanBnXkFtZTgwNTk1MjI4MzE@._V1_SX300.jpg"
    },
    {
        "id": 2,
        "title": "The Cotton Club",
        "genres": [
            "Crime",
            "Drama",
            "Music"
        ],
        "director": "Francis Ford Coppola",
        "actors": "Richard Gere, Gregory Hines, Diane Lane, Lonette McKee",
        "posterUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTU5ODAyNzA4OV5BMl5BanBnXkFtZTcwNzYwNTIzNA@@._V1_SX300.jpg"
    },
    {
        "id": 3,
        "title": "The Shawshank Redemption",
        "genres": [
            "Crime",
            "Drama"
        ],
        "director": "Frank Darabont",
        "actors": "Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler",
        "posterUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BODU4MjU4NjIwNl5BMl5BanBnXkFtZTgwMDU2MjEyMDE@._V1_SX300.jpg"
    },
    {
        "id": 4,
        "title": "Crocodile Dundee",
        "genres": [
            "Adventure",
            "Comedy"
        ],
        "director": "Peter Faiman",
        "actors": "Paul Hogan, Linda Kozlowski, John Meillon, David Gulpilil",
        "posterUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTg0MTU1MTg4NF5BMl5BanBnXkFtZTgwMDgzNzYxMTE@._V1_SX300.jpg"
    },
    {
        "id": 5,
        "title": "Valkyrie",
        "genres": [
            "Drama",
            "History",
            "Thriller"
        ],
        "director": "Bryan Singer",
        "actors": "Tom Cruise, Kenneth Branagh, Bill Nighy, Tom Wilkinson",
        "posterUrl": "http://ia.media-imdb.com/images/M/MV5BMTg3Njc2ODEyN15BMl5BanBnXkFtZTcwNTAwMzc3NA@@._V1_SX300.jpg"
    },
    {
        "id": 6,
        "title": "Ratatouille",
        "genres": [
            "Animation",
            "Comedy",
            "Family"
        ],
        "director": "Brad Bird, Jan Pinkava",
        "actors": "Patton Oswalt, Ian Holm, Lou Romano, Brian Dennehy",
        "posterUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTMzODU0NTkxMF5BMl5BanBnXkFtZTcwMjQ4MzMzMw@@._V1_SX300.jpg"
    },
    {
        "id": 7,
        "title": "City of God",
        "genres": [
            "Crime",
            "Drama"
        ],
        "director": "Fernando Meirelles, Kátia Lund",
        "actors": "Alexandre Rodrigues, Leandro Firmino, Phellipe Haagensen, Douglas Silva",
        "posterUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BMjA4ODQ3ODkzNV5BMl5BanBnXkFtZTYwOTc4NDI3._V1_SX300.jpg"
    },
    {
        "id": 8,
        "title": "Memento",
        "genres": [
            "Mystery",
            "Thriller"
        ],
        "director": "Christopher Nolan",
        "actors": "Guy Pearce, Carrie-Anne Moss, Joe Pantoliano, Mark Boone Junior",
        "posterUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BNThiYjM3MzktMDg3Yy00ZWQ3LTk3YWEtN2M0YmNmNWEwYTE3XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
    },
    {
        "id": 9,
        "title": "The Intouchables",
        "genres": [
            "Biography",
            "Comedy",
            "Drama"
        ],
        "director": "Olivier Nakache, Eric Toledano",
        "actors": "François Cluzet, Omar Sy, Anne Le Ny, Audrey Fleurot",
        "posterUrl": "http://ia.media-imdb.com/images/M/MV5BMTYxNDA3MDQwNl5BMl5BanBnXkFtZTcwNTU4Mzc1Nw@@._V1_SX300.jpg"
    },


];




// Gets the data about a single movie, by title

app.get('/movies/:title', (req, res) => {
    res.json(movies.find((title) => { return movie.title === req.params.title }));
});

// Adds data for a new movie to our list of movies
app.post('/movies', (req, res) => {
    let newMovies = req.body;

    if (!newMovies.title) {
        const message = 'Missing title in request body';
        res.status(400).send(message);
    } else {
        newMovies.id = uuid.v4();
        movies.push(newmovies);
        res.status(201).send(newMovies);
    }
});

// Deletes a movie from our list by ID
app.delete('/movies/:id', (req, res) => {
    let movie = movies.find((movie) => { return movie.id === req.params.id });

    if (movie) {
        movies = movies.filter((obj) => { return obj.id !== req.params.id });
        res.status(201).send('movie ' + req.params.id + ' was deleted.');
    }
});
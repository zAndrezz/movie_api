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

let movies = [{}];

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
app.get("/movies/genres/:genre", (req, res) => {
    message =
        "A JSON object containing data of all movies with genre '" +
        req.params.genre +
        "'";
    res.status(201).send(message);
});

app.get("/movies/directors/:director", (req, res) => {
    message =
        "a JSON object holding all movies assigned to a specific  director.'" +
        req.params.director +
        "'";
    res.status(201).send(message);
});

// Allow new users to register
app.post("/:users", (req, res) => {
    let newUser = req.params.username;

    message = "	New user " + newUser + " has registered. Welcome!";
    res.status(201).send(message);
});

// Allow users to update their user info (username)
app.put("/:users", (req, res) => {
    let newUsername = req.params.users;
    message = "Your new username is " + newUsername;
    res.status(201).send(message);
});

//Return a list of user's favorite movies
app.get("/username/favorites", (req, res) => {
    message = "A JSON object containing data of all favorited movies";
    res.status(201).send(message);
});

//Allow users to add a movie to their list of favorites
app.post("/username/favorites/:title", (req, res) => {
    message = "	Movie " + req.params.title + " was added to your favorites";
    res.status(201).send(message);
});

// Allow users to remove a movie from their list of favorites
app.delete("/username/favorites/:title", (req, res) => {
    message =
        "	Movie " + req.params.title + " was removed from your list of favorites";
    res.status(201).send(message);
});

//Allow existing users to deregister
app.delete("/username", (req, res) => {
    let deleteUser = req.body;
    message =
        "Your email '" +
        deleteUser.email +
        "' and username '" +
        deleteUser.username +
        "' have been removed from our records";
    res.status(201).send(message);
});

app.listen(8080, () => {
    console.log("Your app is listening on port 8080.");
});

//movies.forEach(function(movie) {
// console.log(movie.genre);
//});
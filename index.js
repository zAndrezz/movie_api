const express = require("express"),
    morgan = require("morgan"),
    path = require("path"),
    bodyParser = require("body-parser"),
    uuid = require("uuid");

const mongoose = require("mongoose");
const Models = require("./models.js");
const app = express();

const Movies = Models.Movie;
const Users = Models.User;

console.log(mongoose.connection.readyState); //logs 0
mongoose.connection.on("connecting", () => {
    console.log("connecting");
    console.log(mongoose.connection.readyState); //logs 2
});
mongoose.connection.on("connected", () => {
    console.log("connected");
    console.log(mongoose.connection.readyState); //logs 1
});
mongoose.connection.on("disconnecting", () => {
    console.log("disconnecting");
    console.log(mongoose.connection.readyState); // logs 3
});
mongoose.connection.on("disconnected", () => {
    console.log("disconnected");
    console.log(mongoose.connection.readyState); //logs 0
});
mongoose.connect(process.env.CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on("error", (err) => {
    console.log(err);
});

app.use(bodyParser.json());
app.use(morgan("common"));
app.use(express.static("public"));

//cors
const cors = require("cors");
app.use(cors());
const { check, validationResult } = require("express-validator");
let auth = require("./auth")(app);
const passport = require("passport");
require("./passport");

//GET Documentation
app.get("/documentation", (req, res) => {
    res.sendFile("public/documentation.html", { root: __dirname });
});

// GET requests
app.get("/", (req, res) => {
    res.send("Welcome to my Movie Database");
});

/**
 * Get all movies
 * @method GET
 * @param {string} endpoint - endpoint to fetch movies. "url/movies"
 * @returns {object} - returns the movie object
  * @requires authentication JWT
 */

app.get(
    "/movies",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Movies.find()
            .then((movies) => {
                res.status(201).json(movies);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send("Error: " + err);
            });
    }
);
/**
 * Get movies by title
 * @method GET
 * @param {string} endpoint - endpoint - fetch movies by title
 * @param {string} Title - is used to get specific movie "url/movies/:title"
 * @returns {object} - returns the movie with specific title
 * @requires authentication JWT
 */

app.get(
    "/movies/:Title",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Movies.findOne({
                Title: req.params.Title,
            })
            .then((movie) => {
                res.json(movie);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send("Error: " + err);
            });
    }
);

/**
 * Get all genres
 * @method GET
 * @param {string} endpoint - endpoint to fetch genres. "url/genres"
 * @returns {object} - returns the genre object
 * @requires authentication JWT
 */
app.get(
    "/genre",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Movies.distinct("Genre")
            .then((movies) => {
                res.status(200).json(movies);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send("Error: " + err);
            });
    }
);

/**
 * Get genre by name
 * @method GET
 * @param {string} endpoint - endpoint - fetch genre by name
 * @param {string} Name - is used to get specific genre "url/genres/:Name"
 * @returns {object} - returns a specific genre
 * @requires authentication JWT
 */
app.get(
    "/genre/:Name",
    passport.authenticate("jwt", { session: false }),

    (req, res) => {
        Movies.findOne({ "Genre.Name": req.params.Name })
            .then((movie) => {
                res.json(movie.Genre);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send("Error: " + err);
            });
    }
);

/**
 * Get all directors
 * @method GET
 * @param {string} endpoint - endpoint to fetch directors. "url/directors"
 * @returns {object} - returns the directors object
 */
app.get(
    "/directors",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Movies.distinct("Director")
            .then((movies) => {
                res.status(200).json(movies);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send("Error:" + err);
            });
    }
);

/**
 * Get director by name
 * @method GET
 * @param {string} endpoint - endpoint - fetch director by name
 * @param {string} Name - is used to get specific director "url/directors/:Name"
 * @returns {object} - returns a specific director
 */
app.get(
    "/directors/:Name",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Movies.findOne({ "Director.Name": req.params.Name })
            .then((movie) => {
                res.json(movie.Director);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send("Error: " + err);
            });
    }
);

// Get Users
app.get(
    "/users",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Users.find()
            .then((users) => {
                res.status(201).json(users);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send("Error: " + err);
            });
    }
);

/**
 * Get user by username
 * @method GET
 * @param {string} endpoint - endpoint - fetch user by username
 * @param {string} Username - is used to get specific user "url/users/:Username"
 * @returns {object} - returns a specific user
 * @requires authentication JWT
 */
app.get(
    "/users/:Username",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Users.findOne({
                Username: req.params.Username,
            })
            .then((user) => {
                res.json(user);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send("Error: " + err);
            });
    }
);
//add user

/**
 * Add user
 * @method POST
 * @param {string} endpoint - endpoint to add user. "url/users"
 * @param {string} Username - choosen by user
 * @param {string} Password - user's password
 * @param {string} Email - user's e-mail adress
 * @param {string} Birthday - user's birthday
 * @returns {object} - new user
 * @requires auth no authentication - public
 */

app.post(
    "/users", [
        check("Username", "Username is required").isLength({ min: 5 }),
        check(
            "Username",
            "Username contains non alphanumeric characters - not allowed."
        ).isAlphanumeric(),
        check("Password", "Password is required").not().isEmpty(),
        check("Email", "Email does not appear to be valid").isEmail(),
    ],

    (req, res) => {
        // check the validation object for errors
        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        let hashedPassword = Users.hashPassword(req.body.Password);
        Users.findOne({
                Username: req.body.Username, // <= Search to see if a user with the requested username already exists
            })
            .then((user) => {
                if (user) {
                    //If the user is found, send a response that it already exists
                    return res.status(400).send(req.body.Username + "already exists");
                } else {
                    Users.create({
                            Username: req.body.Username,
                            Password: hashedPassword,
                            Email: req.body.Email,
                            Birthday: req.body.Birthday,
                        })
                        .then((user) => {
                            res.status(201).json(user);
                        })
                        .catch((error) => {
                            console.error(error);
                            res.status(500).send("Error: " + error);
                        });
                }
            })
            .catch((error) => {
                console.error(error);
                res.status(500).send("Error: " + error);
            });
    }
);

// Update a user's username

/**
  * Update user by username
  * @method PUT
  * @param {string} endpoint - endpoint to add user. "url/users/:Usename"
  * @param {string} Username - required
  * @param {string} Password - user's new password
  * @param {string} Email - user's new e-mail adress
  * @param {string} Birthday - user's new birthday
  * @returns {string} - returns success/error message
  * @requires authentication JWT
  */

app.put(
    "/users/:Username",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Users.findOneAndUpdate({
                Username: req.params.Username,
            }, {
                $set: {
                    Username: req.body.Username,
                    Password: req.body.Password,
                    Email: req.body.Email,
                    Birthday: req.body.Birthday,
                },
            }, {
                new: true,
            },
            // This line makes sure that the updated document is returned
            (err, updatedUser) => {
                if (err) {
                    console.error(err);
                    res.status(500).send("Error: " + err);
                } else {
                    res.json(updatedUser);
                }
            }
        );
    }
);

// Add a movie to a user's list of favorites

/**
 * Add movie to favorites
 * @method POST
 * @param {string} endpoint - endpoint to add movies to favorites
 * @param {string} Title, Username - both are required
 * @returns {string} - returns success/error message
 * @requires authentication JWT
 */

app.post(
    "/users/:Username/movies/:MovieID",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Users.findOneAndUpdate({
                Username: req.params.Username,
            }, {
                $push: { FavoriteMovies: req.params.MovieID },
            }, {
                new: true,
            },
            // This line makes sure that the updated document is returned
            (err, updatedUser) => {
                if (err) {
                    console.error(err);
                    res.status(500).send("Error: " + err);
                } else {
                    res.json(updatedUser);
                }
            }
        );
    }
);

//delete movie from users favorite list

/**
 * Delete movie from favorites
 * @method DELETE
 * @param {string} endpoint - endpoint to remove movies from favorites
 * @param {string} Title Username - both are required
 * @returns {string} - returns success/error message
 * @requires authentication JWT
 */

app.delete(
    "/users/:Username/removeFromFav/:MovieID",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Users.findOneAndUpdate({
                Username: req.params.Username,
            }, {
                $pull: {
                    FavoriteMovies: req.params.MovieID,
                },
            }, {
                new: true, //This line makes sure that the updated Document is returned
            },
            (err, updatedUser) => {
                if (err) {
                    console.error(err);
                    res.status(500).send("Error: " + err);
                } else {
                    res.json(updatedUser);
                }
            }
        );
    }
);

// Delete a user 
/**
  * Delete user by username
  * @method DELETE
  * @param {string} endpoint - endpoint - delete user by username
  * @param {string} Username - is used to delete specific user "url/users/:Username"
  * @returns {string} success/error message
  * @requires authentication JWT
  */

app.delete(
    "/users/:Username",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Users.findOneAndRemove({ Username: req.params.Username })
            .then((user) => {
                if (!user) {
                    res.status(400).send(req.params.Username + " was not found");
                } else {
                    res.status(200).send(req.params.Username + " was deleted.");
                }
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send("Error: " + err);
            });
    }
);

// Error-handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

const port = process.env.PORT || 8080;
app.listen(port, "0.0.0.0", () => {
    console.log("Listening on Port " + port);
});
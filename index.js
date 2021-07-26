const express = require('express');
const app = express();

app.use('/documentation.html', express.static('public'));

//morgan logger//
morgan = require('morgan');

app.use(morgan('common'));

app.get('/movies', (req, res) => {
    res.json(topBooks);
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
const express = require('express');
const app = express();

app.use('/documentation.html', express.static('public'));
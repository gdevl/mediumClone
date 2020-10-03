const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

/************************************************/








/************************************************/
const port = 4000
app.listen(port, () => `Listening on port ${port}...`);
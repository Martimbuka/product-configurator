const express = require('express');
const appRoute = require('./routes/route.js');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Routes
app.use('/', appRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
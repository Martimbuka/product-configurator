const express = require('express');
const appRoute = require('./routes/route.js');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Routes
app.use('/', appRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
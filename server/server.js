const express = require('express');
const app = express();

app.use((req, res, next) => {
    console.log(`${new Date()} - ${req.method} request for ${req.url}`);

    next();
});

app.use(express.static('../client'));

app.listen(81, () => {
    console.log('Listening on 81');
});
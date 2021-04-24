const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const todosRoutes = require('./Backend/routes/todosRoutes');
const userRoutes = require('./Backend/routes/usersRoutes');

const port = process.env.PORT || 3000;

const app = express();

const config = require('./Backend/config/database');

mongoose.connect(config.database).then(() => {
    console.log('CONNECTED ************');
}).catch(() => {
    console.log('ERROR ', + error);
});

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader(
        "Access-Control-Allow-Origin", "*",
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS",
    );
    next();
});

app.use(todosRoutes);
app.use(userRoutes);

app.set("port", port);
app.listen(port, () => {
    console.log("Server started listening on " + port);
})
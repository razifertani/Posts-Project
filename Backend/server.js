const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const todosRoutes = require('./routes/todosRoutes');
const userRoutes = require('./routes/usersRoutes');

const port = process.env.PORT || 3000;

const app = express();

const config = require('./config/database');

mongoose.connect(config.database).then(() => {
    console.log('CONNECTED ************');
}).catch(() => {
    console.log('ERROR ', + error);
});

app.use(bodyParser.json());
app.use("/", express.static(path.join(__dirname, "angular-frontend")));

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

app.use('/api/todos', todosRoutes);
app.use('/api/user', userRoutes);
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "angular-frontend", "index.html"));
});

app.set("port", port);
app.listen(port, () => {
    console.log("Server started listening on " + port);
})
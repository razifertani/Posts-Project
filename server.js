const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const todosRoutes = require('./Backend/routes/todos');

const port = process.env.PORT || 3000;

const app = express();

const config = require('./Backend/config/database');

mongoose.connect(config.database).then(() => {
    console.log('CONNECTED ************');
}).catch(() => {
    console.log('ERROR ', + error);
});

app.use(cors());
app.use(bodyParser.json());

app.use(todosRoutes);

app.set("port", port);
app.listen(port, () => {
    console.log("Server started listening on " + port);
})
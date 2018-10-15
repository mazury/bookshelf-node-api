const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');

const winston = require('winston');
const CONFIG = require('./config.json');

const logger = require('./utils/logger');
const db = require('./utils/db')(logger, CONFIG.db.uri);

const port = process.env.PORT || CONFIG.api.port;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan('combined', { stream: logger.stream }));

const routes = require('./routes/routes')(app);


app.use((err, req, res, next) => {
    res.status(err.code || 500);

    res.send(err.message);
});

app.listen(port, () => {
    logger.info(`listening on port ${CONFIG.api.port}`);
});

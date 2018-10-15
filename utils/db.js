const mongoose = require('mongoose');

async function connectToDb (logger, uri) {
    try {
        const connection = await mongoose.connect(uri);
        logger.info(`Successfully connected to ${uri} MongoDB cluster`);
    } catch (err) {
        logger.error(err);
    }
}

module.exports = connectToDb;

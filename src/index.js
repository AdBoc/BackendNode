const config = require('./config');
const routing = require('./api');

const expressService = require('./services/express');
const mongoService= require('./services/mongoose');

const app = expressService(routing, config.http);
const db = mongoService(config.mongoDb);

module.exports ={
    app,
    db
}
const mongoose = require('mongoose');

const createDatabase = ({host, options}) => {
    for(const [key,value] of Object.entries(options)){
        mongoose.set(key,value);
    }
    mongoose.connect(host);
    const connection = mongoose.connection;
    
    connection.once('open', () => {
        console.log('connection to database: ESTABLISHED');
    });
    return mongoose;
}

module.exports = createDatabase;
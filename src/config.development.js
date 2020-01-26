module.exports = {
    http: {
        port: 9000,
        //ip: '127.0.0.1',
    },
    mongoDb: {
        host: 'mongodb://localhost/tasks',
        options: {
            debug: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            //useFindAndModify: true
        }
    } 
}

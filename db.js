const db  = require('mongoose');

db.Promise = global.Promise;

//mongodb+srv://jbSmarData:4XBjRN6Ku-B4%40p3@cluster0.6pif9.mongodb.net/test

async function connect(url){
    await db.connect(url, {
        useNewUrlParser: true,
    });

    console.log('[db] Conectada con éxito');
}

module.exports = connect;

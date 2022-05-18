const admin = require('firebase-admin');
const config = require('../utils/config');

//JSON.parse(config);

admin.initializeApp({
    credential: admin.credential.cert(config)
});

const db = admin.firestore();

module.exports = db;
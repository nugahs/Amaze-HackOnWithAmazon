const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require('../test-1bede-firebase-adminsdk-zv4wf-6a8950e55a.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://test-1bede-default-rtdb.firebaseio.com/'  // Replace with your database URL
});

module.exports = admin.database()
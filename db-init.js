const { db } = require('./database.js');
require('./models/cities.js');

const force = process.argv.includes('--force') || process.argv.includes('-f');

db.sync({ force }).then(async () => {
    console.log('Database synced.');

    db.close();
}).catch(console.error);
const sqlite3 = require('sqlite3').verbose();
const db_file_loc = './db/db2.db'

const db = new sqlite3.Database(db_file_loc, (err) => {
    if (err) {
        console.log(`Failed to connect to ${db_file_loc}`);
    }
    else {
        console.log(`Successfully connected to ${db_file_loc}`);
    }
})

// create another query which selects only salary larger than 30,000

db.serialize(() => {
    db.each(`SELECT * FROM COMPANY`, (err, row) => {
        if (err) {
            console.log(`ERROR: ${err}`);
        }
        else {
            console.log(row)
        }
    })
})


db.close(err => {
    if (err) {
        console.log(err.message);
    }
    else {
        console.log('Database connection closed!');
    }
})
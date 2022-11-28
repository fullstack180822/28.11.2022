const sqlite3 = require('sqlite3').verbose();
const db_file_loc = './db/db1.db'

function open_db() {
 return new sqlite3.Database(db_file_loc, (err) => {
    if (err) {
        console.log(`Failed to connect to ${db_file_loc}`);
    }
    else {
        console.log(`Successfully connected to ${db_file_loc}`);
    }
})
}

function insert(db) {
    const data = [7, 'DAN', 18, 'MEXICO', 32000]
    const sql_insert = `INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY)
                        VALUES (?, ?, ? ,?, ? );`
    db.run(sql_insert, data, err => {
        if (err) {
            console.log(`ERROR: ${err}`);
        }
        else {
            console.log(`INSERTED ${data}`);
        }
    })
}

function select_all(db) {
    db.serialize(() => {
        console.log(`SELECT * FROM COMPANY`)
        db.each(`SELECT * FROM COMPANY`, (err, row) => {
            if (err) {
                console.log(`ERROR: ${err}`);
            }
            else {
                console.log(row)
            }
        })
    })
}

function select_over_30k(db) {
    
// create another query which selects only salary larger than 30,000
db.serialize(() => {
    console.log(`==========================================================`);
    console.log(`SELECT * FROM COMPANY WHERE SALARY > 30,000`)
    db.each(`SELECT * FROM COMPANY WHERE SALARY > 30000`, (err, row) => {
        if (err) {
            console.log(`ERROR: ${err}`);
        }
        else {
            console.log(row)
        }
    })
})
}

function close_db(db) {
    db.close(err => {
        if (err) {
            console.log(err.message);
        }
        else {
            console.log('Database connection closed!');
        }
    })
}

const db = open_db()
select_all(db)
setTimeout(() => select_over_30k(db), 500)
setTimeout(() => close_db(db), 800);

//-- INSERT
//-- UPDATE (db.run)
//-- DELETE (db.run)






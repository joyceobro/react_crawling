const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('../db/chinook.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the chinook database.');
})

// close the database connection

//db.run(`DROP TABLE select_news;`);
db.run('CREATE TABLE select_news(id integer primary key, select_title TEXT not null, select_link TEXT unique)',
    err => {
        if (err) {
            return console.error(err.message);
        }
        console.log("Successful creation of the 'select_news' table!");
    });

const getData = (query) => {

    // let stmt = db.prepare(query);
    // let res = stmt.all()
    // return res

    return new Promise((resolve, reject) => {

        db.all(query, [], (err, arg) => {
            console.log(query)
            console.log("------")
            if (err) reject(err);
            else {
                console.log(arg)
                resolve(arg);
            }
        });
    });
}

// db.close((err) => {
//     if (err) {
//         return console.error(err.message);
//     }
//     console.log('Close the database connection.');
// });


module.exports = { db, getData };

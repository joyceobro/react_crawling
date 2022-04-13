const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require('../model/db');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send({ test: "this is test!!" });
})

app.post("/db_input", function (req, res) {
    console.log(req.body.length);
    var body = req.body;
    k = req.body.length;
    // for (var i = 0; i < k; i++) {
    //     db.select_news.create({
    //         select_title: body[i][0],
    //         select_link: body[i][1]
    //     }).then(function (result) {
    //         console.log("입력")
    //     })

    // }

    for (var i = 0; i < k; i++) {
        let title = body[i][0].replace(/\'/g, '"') //특수문자 이스케이프 전구역
        db.run(`INSERT INTO select_news(select_title, select_link) VALUES( '[${title}]', '[${body[i][1]}]')`,
            (err) => {
                if (err) {
                    console.error(err.message);
                }
                console.log('insert item');
            })

    }
    let sql = `SELECT * FROM select_news`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            console.log(row);
        });
    });
    db.close();
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
})
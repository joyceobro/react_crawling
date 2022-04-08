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
    for (var i = 0; i < k; i++) {
        db.select_news.create({
            select_title: body[i][0],
            select_link: body[i][1]
        }).then(function (result) {
            console.log("입력")
        })

    }
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
})
require("dotenv").config();

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Lauramaxim22$",
    database: "elevate_web"
});

db.connect((err) => {
    if (err) {
        console.log("Database error:", err);
    } else {
        console.log("MySQL Connected 😭");
    }
});

app.post("/contact", (req, res) => {

    const { name, email, phone, service, budget, message } = req.body;

    const sql = `
        INSERT INTO messages
        (name, email, phone, service, budget, message)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [name, email, phone, service, budget, message],
        (err, result) => {

            if (err) {
                console.log(err);
                res.status(500).send("Error");
            } else {
                res.send("Message saved successfully 😭");
            }
        }
    );
});

app.listen(3000, () => {
    console.log("Server running on port 3000 😭");
});
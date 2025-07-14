require("dotenv").config();
const express = require("express");
const {Sequelize} = require("sequelize");

const app = express();
const port = process.env.PORT || 3000;

const sequelize = new Sequelize(process.env.DB_URL,{
    dialect:"sqlite",
    storage: "./database.sqlite",
    logging: false
});

sequelize
    .sync()
    .then(()=> {
        console.log("Database connected");
    })
    .catch((err) => {
        console.log(err);  
    })


app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


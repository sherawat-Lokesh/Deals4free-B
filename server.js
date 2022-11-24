const express = require("express");
const cors = require("cors");
const knex = require("knex");
// const moongose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

app.use(cors());
app.use(bodyParser.json());

//connecting to mongodb database
// const moongoseUrl =
//   "mongodb+srv://sherawat-Lokesh:hApddrZuNCu5Qh2@cluster0.c9znsxm.mongodb.net/?retryWrites=true&w=majority";

// moongose
//   .connect(moongoseUrl, { useNewUrlParser: true })
//   .then((res) => console.log(res));

//connecting to psql(postgresql) for fetching home page card components
const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: 5432,
    user: "postgres",
    password: "12345@Temp",
    database: "deals4_database",
  },
});
//home page response
app.get("/", (req, res) => {
  db.select("*")
    .from("cardcomponent")
    .then((data) => {
      return res.json(data);
    });
});

//article page
let file = "";
app.post("/article", (req, res) => {
  try {
    const { fileName } = req.body;
    if (fileName === undefined) {
      return res.status(404).json("file not found");
    }


    res.sendFile(path.join(__dirname, `./htmlFiles/${fileName}`));
  } catch (err) {
    res.json("Something went wrong!");
  }
});

app.listen(process.env.PORT || 8000, () => console.log("server working"));

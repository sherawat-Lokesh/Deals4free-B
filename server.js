import * as dotenv from 'dotenv'
import bodyParser from "body-parser";
import express  from "express";
import cors from 'cors';
import knex from 'knex';
import  path from "path";
// const path =require('path')
const __dirname = path.resolve();


dotenv.config()
const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use(express.static(path.join(__dirname, './')));

//connecting to psql(postgresql) for fetching home page card components
const db = knex({
      client: "pg",
  connection: {
        host:process.env.HOST,
        user:process.env.DATABASE,
        password:process.env.PASSWORD,
        database:process.env.DATABASE,

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
app.post("/article", (req, res) => {
  try {
    const { fileName } = req.body;
    console.log(fileName)
      if(fileName !==null)res.sendFile(path.join(__dirname,`./htmlFiles/${fileName}`));

  }catch (err) {
          res.json("Something went wrong!");
          console.log(err)
  }
});

app.listen(process.env.PORT || 8000, () => console.log("server working",8000));

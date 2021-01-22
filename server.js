import express from "express";
import mongoose from "mongoose";
import Cards from "./dbCards.js";
import Cors from "cors";

// App config
const app = express();
const port = process.env.PORT || 8001;
const connection_url = "mongodb+srv://admin:vS13JzpK5eLEtrMb@cluster0.7zd9n.mongodb.net/tinderdb?retryWrites=true&w=majority";

// Middlewares
app.use(express.json());
app.use(Cors());


// DB config
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
.then(() => console.log( 'Database Connected' ))
.catch(err => console.log( err + " Something wrong with mongoose" ));

// API endpoints
app.get("/", (req, res) => {
  res.status(200).send("Hello programmers");
});

app.post("/tinder/cards", (req, res) => {
  const dbCard = req.body;

  Cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
      console.log("somethings not right");
    } else {
      res.status(201).send(data);
    }
  })
});

app.get("/tinder/cards", (req, res) => {
  Cards.find((err, data) => {
    if (err) {
      res.status(500).send(err);
      console.log("Cannot get");
    } else {
      res.status(200).send(data);
    }
  });
});

// Listener
app.listen(port, () => console.log(`listening on port ${port}`));
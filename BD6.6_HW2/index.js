let express = require("express");
let app = express();
let cors = require("cors");
let port = 3000;

app.use(cors());
app.use(express.json());

let { getAllGames, getGameById } = require("./controllers/index.js");

//Exercise 1: Retrieve All Games.
app.get("/games", async (req, res) => {
  let games = getAllGames();
  res.status(200).json({ games });
});

//Exercise 2: Retrieve Game by ID.
app.get("/games/details/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  let game = getGameById(id);
  res.status(200).json({ game });
});

module.exports = {
  app,
  port,
};

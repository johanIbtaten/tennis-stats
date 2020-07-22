const express = require("express");
let dataPlayers = require("./data/headtohead.json");
playersArr = dataPlayers.players;

// Compare function
function GetSortOrder(prop) {
  return function (a, b) {
    if (a[prop] > b[prop]) {
      return 1;
    } else if (a[prop] < b[prop]) {
      return -1;
    }
    return 0;
  };
}

let app = express(); // création de l'objet représentant notre application express
let port = 8080;

app.get("/", (req, res) => {
  res.send([...playersArr].sort(GetSortOrder("id")));
});

app.listen(port, () => {
  // ecoute du serveur sur le port 8080
  console.log("le serveur fonctionne");
});

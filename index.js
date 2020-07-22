const express = require("express");
let dataPlayers = require("./data/headtohead.json");
playersArr = dataPlayers.players;

function getSortOrder(prop) {
  return function (a, b) {
    if (a[prop] > b[prop]) {
      return 1;
    } else if (a[prop] < b[prop]) {
      return -1;
    }
    return 0;
  };
}

function filterById(jsonObject, id) {
  return jsonObject.filter(function (jsonObject) {
    return jsonObject["id"] == id;
  })[0];
}

let app = express();
let port = 8080;

app.get("/", (req, res) => {
  res.send([...playersArr].sort(getSortOrder("id")));
});

app.get("/:id", async (req, res) => {
  const id = req.params.id;
  let selectedObject = filterById(playersArr, id);
  if (selectedObject) {
    res.send(selectedObject);
  } else {
    res.sendStatus(404);
  }
});

app.listen(port, () => {
  console.log("le serveur fonctionne");
});

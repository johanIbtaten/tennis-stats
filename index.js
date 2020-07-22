const express = require("express");
const fetch = require("node-fetch");

var playersArr = [];

let url = "https://alivebyacadomia.github.io/headtohead.json";
let settings = { method: "Get" };

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

app.use(function (req, res, next) {
  console.log("Fetch");

  fetch(url, settings)
    .then((res) => res.json())
    .then((json) => {
      playersArr = json.players;
    })
    .catch((err) => {
      res.send(err);
    });
  next();
});

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

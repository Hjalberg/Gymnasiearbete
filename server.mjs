import express from "express";
import WebSocket from 'ws';
import * as fs from "fs";
import { start } from "repl";
const app = express();
const port = 3000;

var latestMsg = {};
var boatname ={};
app.set('view engine', 'ejs');

app.use(express.static('public'))

function startSocket() {
  console.log("startat?")

  const socket = new WebSocket("wss://stream.aisstream.io/v0/stream")
  socket.onopen = function () {
  let subscriptionMessage = {
      Apikey: "6f0199978a68bf87338123b8943a4864a29a64d6",
      BoundingBoxes: [[[-90, -180], [90, 180]]],
      FiltersShipMMSI: ["265599950", "265599940", "265553970", "265509950", "265177000"], // Atlantica, Gratitude, Gratia, Vestra, Stena_Danica
      FilterMessageTypes: ["PositionReport","StandardClassBPositionReport"], // Behövs för annars får jag static osv men bör fungera i med standard normal och standard B
  }
  socket.send(JSON.stringify(subscriptionMessage));
  };
  console.log("startat")
  socket.onmessage = function (event) {
      let aisMessage = JSON.parse(event.data)
      console.log("you have message!")
      sortering(aisMessage)
  }
}

function sortering (aisMessage) {
  let boatname;
  console.log(aisMessage)
  if (aisMessage.MetaData.MMSI == 265599950) {
    console.log("Atlantica")
    boatname = "Atlantica"
  }
  else if (aisMessage.MetaData.MMSI == 265599940){
    console.log("Gratitude")
    boatname = "Gratitude"
  }
  else if (aisMessage.MetaData.MMSI == 265553970){
    console.log("Gratia")
    boatname = "Gratia"
  }
  else if (aisMessage.MetaData.MMSI == 265509950){
    console.log("Vestra")
    boatname = "Vestra"
  }
  else if (aisMessage.MetaData.MMSI == 265177000){
    console.log("Stena_Danica")
    boatname = "Stena_Danica"
  }
  else {
    console.log("Okänd båt")
  }

  latestMsg[boatname] = aisMessage
  
}

startSocket();

app.get('/', (req, res) => {
    res.render('start');
});
app.get("/test", function(req,res){
  res.send(latestMsg);
})
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//För att starta "npm run start"
//För att stänga av ctrl + c
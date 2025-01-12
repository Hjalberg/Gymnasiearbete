import express from "express";
import WebSocket from 'ws';
import * as fs from "fs";
import { start } from "repl";
const app = express();
const port = 3000;
var latestMsg = {};
app.set('view engine', 'ejs');
app.use(express.static('public'))
// Vi sätter några variabler som vi behöver använda senare i koden.

function startSocket() {
  const socket = new WebSocket("wss://stream.aisstream.io/v0/stream") // Definerar våran webbsocket permanent.
  socket.onopen = function () { 
  let subscriptionMessage = { //Skapar vårat medelanade som vi skickar genom webbsocket och berättar för APIn vad vi vill ha och innom vilka ramar vi vill ha det.
      Apikey: "6f0199978a68bf87338123b8943a4864a29a64d6",
      BoundingBoxes: [[[-90, -180], [90, 180]]], // Vilka områden vi vill söka på.
      FiltersShipMMSI: ["265599950", "265599940", "265553970", "265509950", "265177000"], // Atlantica, Gratitude, Gratia, Vestra, Stena_Danica
      FilterMessageTypes: ["PositionReport","StandardClassBPositionReport"], // Behövs för annars får jag static osv men bör fungera i med standard normal och standard B
  }
  socket.send(JSON.stringify(subscriptionMessage)); // Skickar vårat medelandet till APIn servern.
  };
  console.log("startat") // Bekräftar i severloggen att serven har startat och har skickat iväg API medelandet.
  socket.onmessage = function (event) { // Gör så att ifall ett medelande från seven motags så sparas det.
      let aisMessage = JSON.parse(event.data) // sparat medelandet som aismessage.
      sortering(aisMessage) // startar ett till program som sorterar medelelandet.
  }
}

function sortering (aisMessage) {
  let boatname; //skapar variabeln boatname.
  console.log(aisMessage) //Loggar ais medelandet som den precis fick.
  if (aisMessage.MetaData.MMSI == 265599950) { // Ifall båten har denna identifikations kod så är det atlantica osv.
    console.log("Atlantica") //Loggar att det är atlantica.
    boatname = "Atlantica" // sätter atlantica som dennas båts namn.
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

  latestMsg[boatname] = aisMessage // Lägger båten och hela medelandet som den fick och döper den och lääger den i en lista.
  
}

startSocket(); // startar hela saken.

app.get('/', (req, res) => { // Öppnar en lokal port.
    res.render('start'); // skapar en koppling till start.ejs.
});
app.get("/test", function(req,res){ // öppnar en lokal port.
  res.send(latestMsg); // skickar senaste informationen till start.ejs
})
app.listen(port, () => { // låter programet vissas på port 3000
  console.log(`Server is running on port ${port}`);
});

//För att starta "npm run start"
//För att stänga av ctrl + c
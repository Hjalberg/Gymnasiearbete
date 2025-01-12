var map
var Sailing_boat_icon_R = L.icon({ // Bestämmer hur en båt icon ser ut.
    iconUrl: 'Båt höger.png',

    iconSize:     [90, 90],
    iconAnchor:   [45, 45],
    popupAnchor:  [0, 0]
});
var Sailing_boat_icon_L = L.icon({ // Bestämmer hur en båt icon ser ut.
    iconUrl: 'Båt vänster.png',

    iconSize:     [90, 90],
    iconAnchor:   [45, 45],
    popupAnchor:  [0, 0]
});

document.addEventListener("DOMContentLoaded", async function(){ //Ladar in kartan.
    map = L.map('map').setView([57.687, 11.89], 10); // Bestämmer var kartan startar.

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { // visar hur kartan ska se ut.
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    let data = await getData(); // Väntar på att ta emot datan från frontend och sparar det som data.
    console.log(data) // loggar datan i webbsidas logg.
    try {setMarket_Atlantica(await data);} // Försöker sätta ut en kart martkör.
        catch (error) {console.error(error);} // ifall den inte kan sätta ut en markör så brättar den vad som gick fel.
    try {setMarket_Gratitude(await data);}
        catch (error) {console.error(error);}
    try {setMarket_Gratia(await data);}
        catch (error) {console.error(error);}
    try {setMarket_Vestra(await data);}
        catch (error) {console.error(error);}
    try {setMarket_Stena_Danica(await data);}
        catch (error) {console.error(error);}
});

function setMarket_Atlantica(data){ // Skapar funktioen som sätter ut en kart markör.
    Message_MessageType=data.Atlantica.MessageType // Ser vilken typ av medelande det är så att rätt typ av data väg används.
    if (data.Atlantica.Message[Message_MessageType].Cog <= 179.9){ // ifall fartygets vinkel är mindre än 179.9 grader så väljer den båt bilden som pekar åt höger.
        Icon_symbol=Sailing_boat_icon_R
    }
    else if (data.Atlantica.Message[Message_MessageType].Cog > 179.9){ // ifall fartygets vinkel är större än 179.9 grader så väljer den båt bilden som pekar åt vänster.
        Icon_symbol=Sailing_boat_icon_L
    }
    Icon_Message="<b>Atlantica</b><br>Kurs: "+data.Atlantica.Message[Message_MessageType].Cog+"º<br>Hastighet: "+data.Atlantica.Message[Message_MessageType].Sog+" kn<br>Senast uppdaterad: "+ data.Atlantica.MetaData.time_utc // skapar ett medelande som används och tar information från datan vilket används för att fylla texten.
    var marker = L.marker([data.Atlantica.MetaData.latitude, data.Atlantica.MetaData.longitude], {icon: Icon_symbol}).addTo(map) // skapar kart symbolen med bilden som är valt.
    marker.bindPopup(Icon_Message); // skapar texten som ska stå med i markören.
}
function setMarket_Gratitude(data){ // samma som innan
    Message_MessageType=data.Gratitude.MessageType
    if (data.Gratitude.Message[Message_MessageType].Cog <= 179.9){
        Icon_symbol=Sailing_boat_icon_R
    }
    else if (data.Gratitude.Message[Message_MessageType].Cog > 179.9){
        Icon_symbol=Sailing_boat_icon_L
    }
    Icon_Message="<b>Gratitude</b><br>Kurs: "+data.Gratitude.Message[Message_MessageType].Cog+"º<br>Hastighet: "+data.Gratitude.Message[Message_MessageType].Sog+" kn<br>Senast uppdaterad: "+ data.Gratitude.MetaData.time_utc
    var marker = L.marker([data.Gratitude.MetaData.latitude, data.Gratitude.MetaData.longitude], {icon: Icon_symbol}).addTo(map)
    marker.bindPopup(Icon_Message);
}
function setMarket_Gratia(data){ // samma som innan
    Message_MessageType=data.Gratia.MessageType
    if (data.Gratia.Message[Message_MessageType].Cog <= 179.9){
        Icon_symbol=Sailing_boat_icon_R
    }
    else if (data.Gratia.Message[Message_MessageType].Cog > 179.9){
        Icon_symbol=Sailing_boat_icon_L
    }
    Icon_Message="<b>Gratia</b><br>Kurs: "+data.Gratia.Message[Message_MessageType].Cog+"º<br>Hastighet: "+data.Gratia.Message[Message_MessageType].Sog+" kn<br>Senast uppdaterad: "+ data.Gratia.MetaData.time_utc
    var marker = L.marker([data.Gratia.MetaData.latitude, data.Gratia.MetaData.longitude], {icon: Icon_symbol}).addTo(map)
    marker.bindPopup(Icon_Message);
}
function setMarket_Vestra(data){ // samma som innan bara utan special bild
    Message_MessageType=data.Vestra.MessageType
    Icon_Message="<b>Vestra</b><br>Kurs: "+data.Vestra.Message[Message_MessageType].Cog+"º<br>Hastighet: "+data.Vestra.Message[Message_MessageType].Sog+" kn<br>Senast uppdaterad: "+ data.Vestra.MetaData.time_utc
    var marker = L.marker([data.Vestra.MetaData.latitude, data.Vestra.MetaData.longitude]).addTo(map)
    marker.bindPopup(Icon_Message);
}
function setMarket_Stena_Danica(data){ // samma som innan bara utan special bild
    Message_MessageType=data.Stena_Danica.MessageType
    Icon_Message="<b>Stena Dancia</b><br>Kurs: "+data.Stena_Danica.Message[Message_MessageType].Cog+"º<br>Hastighet: "+data.Stena_Danica.Message[Message_MessageType].Sog+" kn<br>Senast uppdaterad: "+ data.Stena_Danica.MetaData.time_utc
    var marker = L.marker([data.Stena_Danica.MetaData.latitude, data.Stena_Danica.MetaData.longitude]).addTo(map)
    marker.bindPopup(Icon_Message);
}
var map
var Boat_icon_R = L.icon({
    iconUrl: 'Båt höger.png',

    iconSize:     [90, 90], // size of the icon
    iconAnchor:   [45, 45], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});
var Boat_icon_L = L.icon({
    iconUrl: 'Båt vänster.png',

    iconSize:     [90, 90], // size of the icon
    iconAnchor:   [45, 45], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});

document.addEventListener("DOMContentLoaded", async function(){
    map = L.map('map').setView([57.687, 11.89], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    let data = await getData();
    console.log(data)
    try {setMarket_Atlantica(await data);}
        catch (error) {console.error(error);}
    try {setMarket_Gratitude(await data);}
        catch (error) {console.error(error);}
    try {setMarket_Gratia(await data);}
        catch (error) {console.error(error);}
    try {setMarket_Vestra(await data);}
        catch (error) {console.error(error);}
    try {setMarket_Stena_Danica(await data);}
        catch (error) {console.error(error);}
});

function setMarket_Atlantica(data){
    Message_MessageType=data.Atlantica.MessageType
    Icon_Message="<b>Atlantica</b><br>Kurs: "+data.Atlantica.Message[Message_MessageType].Cog+"º<br>Hastighet: "+data.Atlantica.Message[Message_MessageType].Sog+" kn<br>Senast uppdaterad: "+ data.Atlantica.MetaData.time_utc
    var marker = L.marker([data.Atlantica.MetaData.latitude, data.Atlantica.MetaData.longitude]).addTo(map)
    marker.bindPopup(Icon_Message).openPopup();
}
function setMarket_Gratitude(data){    
    Message_MessageType=data.Gratitude.MessageType
    Icon_Message="<b>Gratitude</b><br>Kurs: "+data.Gratitude.Message[Message_MessageType].Cog+"º<br>Hastighet: "+data.Gratitude.Message[Message_MessageType].Sog+" kn<br>Senast uppdaterad: "+ data.Gratitude.MetaData.time_utc
    var marker = L.marker([data.Gratitude.MetaData.latitude, data.Gratitude.MetaData.longitude]).addTo(map)
    marker.bindPopup(Icon_Message).openPopup();
}
function setMarket_Gratia(data){
    Message_MessageType=data.Gratia.MessageType
    if (data.Gratia.Message[Message_MessageType].Cog <= 179.9){
        Icon_symbol=Boat_icon_R
    }
    else if (data.Gratia.Message[Message_MessageType].Cog > 180){
        Icon_symbol=Boat_icon_L
    }
    Icon_Message="<b>Gratia</b><br>Kurs: "+data.Gratia.Message[Message_MessageType].Cog+"º<br>Hastighet: "+data.Gratia.Message[Message_MessageType].Sog+" kn<br>Senast uppdaterad: "+ data.Gratia.MetaData.time_utc
    var marker = L.marker([data.Gratia.MetaData.latitude, data.Gratia.MetaData.longitude], {icon: Icon_symbol}).addTo(map)
    marker.bindPopup(Icon_Message).openPopup();
}
function setMarket_Vestra(data){
    Message_MessageType=data.Vestra.MessageType
    Icon_Message="<b>Vestra</b><br>Kurs: "+data.Vestra.Message[Message_MessageType].Cog+"º<br>Hastighet: "+data.Vestra.Message[Message_MessageType].Sog+" kn<br>Senast uppdaterad: "+ data.Vestra.MetaData.time_utc
    var marker = L.marker([data.Vestra.MetaData.latitude, data.Vestra.MetaData.longitude]).addTo(map)
    marker.bindPopup(Icon_Message).openPopup();
}
function setMarket_Stena_Danica(data){
    Message_MessageType=data.Stena_Danica.MessageType
    Icon_Message="<b>Stena Dancia</b><br>Kurs: "+data.Stena_Danica.Message[Message_MessageType].Cog+"º<br>Hastighet: "+data.Stena_Danica.Message[Message_MessageType].Sog+" kn<br>Senast uppdaterad: "+ data.Stena_Danica.MetaData.time_utc
    var marker = L.marker([data.Stena_Danica.MetaData.latitude, data.Stena_Danica.MetaData.longitude]).addTo(map)
    marker.bindPopup(Icon_Message).openPopup();
}
var data = "";
//ALT TVÅ.
// SÄTT UPP EN TIMAD EVENT SOM KOLLAR OM DET FINNS NY DATA PÅ SERVERN.
async function getData() {
    let response = await fetch("/test");
    let data = await response.json();
    return data
}

// SÄTTA UPP EN FRONT-END WEBSOCKET STRÖM
// IF MESSAGE = UPDATE PAGE

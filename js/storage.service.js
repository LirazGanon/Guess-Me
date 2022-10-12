'use strict'

let req = new XMLHttpRequest();

req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
        console.log(JSON.parse(req.responseText).record);
        gQuestsTree = JSON.parse(req.responseText).record;
        gCurrQuest = gQuestsTree
    }

};

req.open("GET", "https://api.jsonbin.io/v3/b/6346563365b57a31e6937523/latest", true);
req.send();

function saveToStorage(key, val) {
    req.open("PUT", "https://api.jsonbin.io/v3/b/6346563365b57a31e6937523", true);
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("X-Master-Key", "$2b$10$YNeBmLMlZltse.0oWPXc6uE5/VqZr57sUe0LgfppjoLUqOo1itzE.");
    req.send(JSON.stringify(val));
}

function loadFromStorage(key) {
    return gRes
}

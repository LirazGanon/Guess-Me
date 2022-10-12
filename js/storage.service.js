'use strict'

let req = new XMLHttpRequest();

req.open("GET", "https://api.jsonbin.io/v3/b/6346563365b57a31e6937523/latest", true);
req.send();

req.open("PUT", "https://api.jsonbin.io/v3/b/6346563365b57a31e6937523", true);
req.setRequestHeader("Content-Type", "application/json");
req.setRequestHeader("X-Master-Key", "$2b$10$YNeBmLMlZltse.0oWPXc6uE5/VqZr57sUe0LgfppjoLUqOo1itzE.");
req.send('{"name": "Hello World"}');

function saveToStorage(key, val) {
    req.open("PUT", "https://api.jsonbin.io/v3/b/6346563365b57a31e6937523", true);
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("X-Master-Key", "$2b$10$YNeBmLMlZltse.0oWPXc6uE5/VqZr57sUe0LgfppjoLUqOo1itzE.");
    req.send(JSON.stringify(val));
}

function loadFromStorage(key) {
    req.open("GET", "https://api.jsonbin.io/v3/b/6346563365b57a31e6937523/latest", true);
    req.send();
    var res
    req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE) {
            console.log(JSON.parse(req.responseText).record);
            res =JSON.parse(req.responseText).record;
        }
    };
    return res
}
var express = require("express");
var app = express();
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');
var FileType = require('file-type');
const got = require('got');

app.use(bodyParser.json());
app.use(serveStatic('public', { 'index': ['default.html', 'default.htm'] }));

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

var botOrder = undefined;

app.post("/removeduplicatewords", function (req, res) {

    var palabras = req.body.palabras;
    var arrayPalabras = palabras.split(",");
    var arraySinRepe = Array.from(new Set(arrayPalabras));

    res.send(JSON.stringify(arraySinRepe));

});


app.post("/detectfiletype", function (req, res) {

    var url = req.body.url;

    (async () => {
        const stream = got.stream(url);

        res.send(await FileType.fromStream(stream));
        //=> {ext: 'jpg', mime: 'image/jpeg'}
    })();

});

app.get("/botorder/:order", function (req, res) {

    if (botOrder != undefined) {
        res.send("KILLMATRIX");
    }
    else {
        res.send("NONE");
    }
});

app.post("/botorder/:order", function (req, res) {

    botOrder = req.params.order;
    res.send("OK");

});

app.listen(8000);
const fs = require("fs");
const axios = require("axios");
const keyFile = require("../key.js");
const utils = require("./utils");

let key = keyFile;
let mode = "transit";
let units = "metric";

// let data = JSON.parse(contents).results;
let content = fs.readFileSync('./data/coords.csv', 'utf8');
let coordsArray = content.split("|");

let quarterArrays = [];

for(let i = 0; i < coordsArray.length; i += 4) {
    quarterArrays.push([
        coordsArray[i],
        coordsArray[i + 1],
        coordsArray[i + 2],
        coordsArray[i + 3]
    ]);
}

let origins = content;
// Matrix with rows with objects
/*
Row Object {
    key: Int32 { crc16(origin) + crc16(destination) }
    origin: "", // element from query_response.origins and query_response.destination
    destination: "",
    ...
}
*/
let matrix = [];

let dataProcessing = (res) => {

    let extendedRows = []
    let zippedExtensions = utils.zip(res.rows, res.destination_addresses)
    
    zippedExtensions.forEach((tuple, i) => {
        tuple[0].elements.forEach((obj, j) => {
            obj.origin = res.origin_addresses[i];
            obj.destination = res.destination_addresses[j];
            obj.hashKey = utils.genHashKey(obj.origin, obj.destination);
        })

        extendedRows.push(tuple[0]);
    });

    return extendedRows;
}

getData = async (query) => {
    let res = await axios.get(query);
    res = res.data;

    let extendedRows = dataProcessing(res);

    if (matrix.length == 0) {
        
        extendedRows.forEach((row) => {
            matrix.push(row.elements);
        });

    } else {

        let zipped = utils.zipEl(matrix, extendedRows);

        zipped.forEach((tuple) => {
            tuple[0] = tuple[0].concat(tuple[1]);
        });

        matrix = matrix.map((row, i) => row = zipped[i][0]);
    }

    return res;
};

for (let i = 0; i < 5; i++) {
    let destinations = quarterArrays[i].join('|');
    let query = `https://maps.googleapis.com/maps/api/distancematrix/json?units=${units}&origins=${origins}&destinations=${destinations}&mode=${mode}&key=${key}`;
    getData(query);
}

setTimeout(() => {
    fs.writeFile('./data/matrix_advanced.json', JSON.stringify(matrix), (err) => {
        if (err) throw err;
        console.log("Saved...");
    });
}, 2000);

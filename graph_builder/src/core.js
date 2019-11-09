const fs = require("fs");
const axios = require("axios");
const keyFile = require("../key.js");

let key = keyFile;
let mode = "transit";
let units = "metric";

// let data = JSON.parse(contents).results;
let content = fs.readFileSync('./coords.csv', 'utf8');
let coordsArray = content.split("|");

let quarterArrays = [];

for(let i = 0; i < coordsArray.length; i += 4) {
    quarterArrays.push([
        coordsArray[i],
        coordsArray[i + 1],
        coordsArray[i + 2],
        coordsArray[i + 3]
    ])
}

let origins = content;
let matrix = [];

const zip = (arr1, arr2) => arr1.map((k, i) => [k, arr2[i].elements]);

getData = async (query) => {
    let res = await axios.get(query);
    res = res.data;

    if (matrix.length == 0) {
        res.rows.forEach((row) => {
            matrix.push(row.elements);
        })
    } else {
        var zipped = zip(matrix, res.rows);

        zipped.forEach((tuple, i) => {
            tuple[0] = tuple[0].concat(tuple[1]);
        })

        matrix = matrix.map((row, i) => row = zipped[i][0])
    }

    return res;
};

for (let i = 0; i < 5; i++) {
    let destinations = quarterArrays[i].join('|');
    let query = `https://maps.googleapis.com/maps/api/distancematrix/json?units=${units}&origins=${origins}&destinations=${destinations}&mode=${mode}&key=${key}`;
    getData(query);
}

setTimeout(() => {
    fs.writeFile('./matrix.json', JSON.stringify(matrix), (err) => {
        if (err) throw err;
        console.log("Saved...");
    });
}, 2000);
// console.log(data);

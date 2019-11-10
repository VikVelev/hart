const fs = require("fs");
const axios = require("axios");
const key = require("../key");

let content = fs.readFileSync('../data/coords.csv', 'utf8');
let coordsArray = content.split("|");

let radius = 40;
let type = "point_of_interest"
let placesDetails = []

getQuery = async (query) => {
    let res = await axios.get(query);
    // console.log(res);
    res = res.data.results;
    placesDetails.push(res);

    return res;
};

coordsArray.forEach(coords => {
    let query = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coords}&radius=${radius}&type=${type}&key=${key}`;
    getQuery(query);
});


setTimeout(() => {
    fs.writeFile('../data/places_details.json', JSON.stringify(placesDetails), (err) => {
        if (err) throw err;
        console.log("Saved...");
    });
}, 2000);
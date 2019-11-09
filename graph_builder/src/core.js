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
    ]);
}

let origins = content;
let matrix = [];

// Matrix with rows with objects
/*
Row Object {
    key: Int32 { crc16(origin) + crc16(destination) }
    origin: "", // element from query_response.origins and query_response.destination
    destination: "",
    ...
}
*/

// crc16 + crc16 = int32 (Maximum int by javascript)
let crc16 = (data) => {
	const crctab16 = new Uint16Array([
		0X0000, 0X1189, 0X2312, 0X329B, 0X4624, 0X57AD, 0X6536, 0X74BF, 0X8C48, 0X9DC1, 0XAF5A, 0XBED3, 0XCA6C, 0XDBE5, 0XE97E, 0XF8F7,
		0X1081, 0X0108, 0X3393, 0X221A, 0X56A5, 0X472C, 0X75B7, 0X643E, 0X9CC9, 0X8D40, 0XBFDB, 0XAE52, 0XDAED, 0XCB64, 0XF9FF, 0XE876,
		0X2102, 0X308B, 0X0210, 0X1399, 0X6726, 0X76AF, 0X4434, 0X55BD, 0XAD4A, 0XBCC3, 0X8E58, 0X9FD1, 0XEB6E, 0XFAE7, 0XC87C, 0XD9F5,
		0X3183, 0X200A, 0X1291, 0X0318, 0X77A7, 0X662E, 0X54B5, 0X453C, 0XBDCB, 0XAC42, 0X9ED9, 0X8F50, 0XFBEF, 0XEA66, 0XD8FD, 0XC974,
		0X4204, 0X538D, 0X6116, 0X709F, 0X0420, 0X15A9, 0X2732, 0X36BB, 0XCE4C, 0XDFC5, 0XED5E, 0XFCD7, 0X8868, 0X99E1, 0XAB7A, 0XBAF3,
		0X5285, 0X430C, 0X7197, 0X601E, 0X14A1, 0X0528, 0X37B3, 0X263A, 0XDECD, 0XCF44, 0XFDDF, 0XEC56, 0X98E9, 0X8960, 0XBBFB, 0XAA72,
		0X6306, 0X728F, 0X4014, 0X519D, 0X2522, 0X34AB, 0X0630, 0X17B9, 0XEF4E, 0XFEC7, 0XCC5C, 0XDDD5, 0XA96A, 0XB8E3, 0X8A78, 0X9BF1,
		0X7387, 0X620E, 0X5095, 0X411C, 0X35A3, 0X242A, 0X16B1, 0X0738, 0XFFCF, 0XEE46, 0XDCDD, 0XCD54, 0XB9EB, 0XA862, 0X9AF9, 0X8B70,
		0X8408, 0X9581, 0XA71A, 0XB693, 0XC22C, 0XD3A5, 0XE13E, 0XF0B7, 0X0840, 0X19C9, 0X2B52, 0X3ADB, 0X4E64, 0X5FED, 0X6D76, 0X7CFF,
		0X9489, 0X8500, 0XB79B, 0XA612, 0XD2AD, 0XC324, 0XF1BF, 0XE036, 0X18C1, 0X0948, 0X3BD3, 0X2A5A, 0X5EE5, 0X4F6C, 0X7DF7, 0X6C7E,
		0XA50A, 0XB483, 0X8618, 0X9791, 0XE32E, 0XF2A7, 0XC03C, 0XD1B5, 0X2942, 0X38CB, 0X0A50, 0X1BD9, 0X6F66, 0X7EEF, 0X4C74, 0X5DFD,
		0XB58B, 0XA402, 0X9699, 0X8710, 0XF3AF, 0XE226, 0XD0BD, 0XC134, 0X39C3, 0X284A, 0X1AD1, 0X0B58, 0X7FE7, 0X6E6E, 0X5CF5, 0X4D7C,
		0XC60C, 0XD785, 0XE51E, 0XF497, 0X8028, 0X91A1, 0XA33A, 0XB2B3, 0X4A44, 0X5BCD, 0X6956, 0X78DF, 0X0C60, 0X1DE9, 0X2F72, 0X3EFB,
		0XD68D, 0XC704, 0XF59F, 0XE416, 0X90A9, 0X8120, 0XB3BB, 0XA232, 0X5AC5, 0X4B4C, 0X79D7, 0X685E, 0X1CE1, 0X0D68, 0X3FF3, 0X2E7A,
		0XE70E, 0XF687, 0XC41C, 0XD595, 0XA12A, 0XB0A3, 0X8238, 0X93B1, 0X6B46, 0X7ACF, 0X4854, 0X59DD, 0X2D62, 0X3CEB, 0X0E70, 0X1FF9,
		0XF78F, 0XE606, 0XD49D, 0XC514, 0XB1AB, 0XA022, 0X92B9, 0X8330, 0X7BC7, 0X6A4E, 0X58D5, 0X495C, 0X3DE3, 0X2C6A, 0X1EF1, 0X0F78,
	]);

    let res = 0x0ffff;

    for (let b of data) {
        res = ((res >> 8) & 0x0ff) ^ crctab16[(res ^ b) & 0xff];
    }

    let result = (~res) & 0x0ffff;

    return result; // ~ means two's complement representation
};

let genHashKey = (origin, destination) => {
    return (crc16(origin) + crc16(destination));
}

let dataProcessing = (res) => {

    let extendedRows = []
    let zippedExtensions = zip(res.rows, res.destination_addresses)
    
    zippedExtensions.forEach((tuple, i) => {
        tuple[0].elements.forEach((obj, j) => {
            obj.origin = res.origin_addresses[i];
            obj.destination = res.destination_addresses[j];
            obj.hashKey = genHashKey(obj.origin, obj.destination);
        })

        extendedRows.push(tuple[0]);
    });

    return extendedRows;
}

// Add origin, destination
const zipEl = (arr1, arr2) => arr1.map((k, i) => [k, arr2[i].elements]);
const zip = (arr1, arr2) => arr1.map((k, i) => [k, arr2[i]]);

getData = async (query) => {
    let res = await axios.get(query);
    res = res.data;

    let extendedRows = dataProcessing(res);

    if (matrix.length == 0) {
        
        extendedRows.forEach((row) => {
            matrix.push(row.elements);
        });

    } else {

        let zipped = zipEl(matrix, extendedRows);

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
    fs.writeFile('./matrix_advanced.json', JSON.stringify(matrix), (err) => {
        if (err) throw err;
        console.log("Saved...");
    });
    console.log(matrix);
}, 2000);

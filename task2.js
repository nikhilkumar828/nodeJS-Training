const csv = require('csvtojson');
const fs = require('fs');
const { pipeline } = require('stream');

const csvFilePath = './assets/task2-data.csv';
const outputFilePath = './assets/task2-output.txt';

//with stream
const readStream = fs.createReadStream(csvFilePath);

const writeStream = fs.createWriteStream(outputFilePath);

pipeline(
    readStream,
    csv(),
    writeStream,
    (err) => {
        if (err) {
            console.error('Failed:', err);
        } else {
            console.log('Completed');
        }
    }
);

// without stream
// csv()
//     .fromFile(csvFilePath)
//     .subscribe((json) => {
//         return new Promise((resolve, reject) => {
//             printToFile(json);
//             resolve();
//         })
//     }, (error) => {
//         console.log(error);
//     }, () => {
//         console.log('Completed');
//     });

// function printToFile(json) {
//     fs.appendFile(outputFilePath, JSON.stringify(json) + "\n", err => {
//         if (err) {
//             console.error(err);
//             return;
//         }
//     })
// }

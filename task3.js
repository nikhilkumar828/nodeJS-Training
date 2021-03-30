import { csv } from 'csvtojson';
import * as fs from 'fs';
import { pipeline } from 'stream';


const csvFilePath = './assets/task2-data.csv';
const outputFilePath = './assets/task3-output.txt';

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

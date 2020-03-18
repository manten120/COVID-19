'use strict';

const fs = require('fs');
const readline = require('readline');
const rs = fs.createReadStream('./csv/2020-10-zensu.csv');
const rl = readline.createInterface({'input': rs, 'output': {}});
const functions = require('./functions.js');

const prefectureDataMap = new Map();

rl.on('line', (lineString)=>{
  functions.ConvertCsvToMap(lineString, prefectureDataMap);
});

rl.on('close', () => {
  functions.selectMenu(prefectureDataMap);
})


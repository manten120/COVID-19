'use strict';

const fs = require('fs');
const readline = require('readline');
const rs = fs.createReadStream('./csv/2020-10-zensu.csv');
const rl = readline.createInterface({'input': rs, 'output': {}});
const functions = require('./functions.js');

const prefectureDataMap = new Map();
let week = [];

rl.on('line', (lineString)=>{
  functions.ConvertCsvToMap(lineString, prefectureDataMap, week);
});

rl.on('close', () => {
  functions.selectMenu(prefectureDataMap, week);
})


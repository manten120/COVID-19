'use strict';

const fs = require('fs');
const readline = require('readline');
const rs = fs.createReadStream('./csv/2020-09-zensu.csv');
const rl = readline.createInterface({'input': rs, 'output': {}});
const yargs = require('yargs');

let command = yargs.argv._[0];

const prefectureDataMap = new Map();

function bar() {console.log('--------------------------------------');}

function searchResult(command) {
  const obj = prefectureDataMap.get(command);
  for (let key in obj ){
    console.log(`${key}: ${obj[key]}`);
  }
}

rl.on('line', (lineString)=>{
  const columns = lineString.split(',');
  const prefecture = columns[0];
  const infectedPeople = parseInt(columns[29]);
  const accumulation = parseInt(columns[30]);
  
  let value = prefectureDataMap.get(prefecture);
  if (!value) {
    value = {
      今週の感染者数: 0,
      累積: 0,
    };
  }
  value.今週の感染者数 = infectedPeople;
  value.累積 = accumulation;
  prefectureDataMap.set(prefecture, value);
});

rl.on('close', ()=>{
  prefectureDataMap.delete('報告数・累積報告数、疾病・都道府県別');
  prefectureDataMap.delete('');

  bar();
  if (command === '総数') {
    console.log(`全国の新型コロナ感染総数`);
    searchResult(command);
  } else if(command === '全国') {
    console.log(prefectureDataMap);
  } else if (command) {
    console.log(`${command}の新型コロナ感染状況`);
    searchResult(command);
  } else {
    console.log(prefectureDataMap);
  }
  bar();
})


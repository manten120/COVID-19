'use strict';

const fs = require('fs');
const readline = require('readline');
const rs = fs.createReadStream('./csv/2020-08-zensu.csv');
const rl = readline.createInterface({'input': rs, 'output': {}});

const prefectureDataMap = new Map();

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
  console.log(prefectureDataMap);
})


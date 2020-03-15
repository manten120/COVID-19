'use strict';

const fs = require('fs');
const readline = require('readline');
const rs = fs.createReadStream('./csv/2020-09-zensu.csv');
const rl = readline.createInterface({'input': rs, 'output': {}});
const prompts = require('prompts');

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

rl.on('close', () => {
  prefectureDataMap.delete('報告数・累積報告数、疾病・都道府県別');
  prefectureDataMap.delete('');

  (async function () {
    // 入力を待ち受ける内容
    let questions = {
      type: "select", // インプットタイプ
      name: "command", // 変数名
      message: "＜ 新型コロナ感染状況 ＞",
      choices: [
        { title: "都道府県名で検索", value: "search" },
        { title: "一覧を表示", value: '全国' },
        { title: "全国の感染者総数を表示", value: "総数" }
      ]
    };

    // promptsの起動
    let response = await prompts(questions);
    let command = response.command;

    if (command === '総数') {
      bar();
      searchResult(command);
      bar();
    } else if (command === '全国') {
      bar();
      console.log(prefectureDataMap);
      bar();
    } else if (command === 'search') {
      (async function () {
        let question = {
          type: "text",
          name: "command",
          message: "都道府県名('県'まで入力)："
        };
        let response = await prompts(question);
        command = response.command;
        bar();
        console.log(`${command}の新型コロナ感染状況`);
        searchResult(command);
        bar();
      })();
    }
  })()
})


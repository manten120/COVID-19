'use strict';

const fs = require('fs');
const readline = require('readline');
const rs = fs.createReadStream('./csv/2020-10-zensu.csv');
const rl = readline.createInterface({'input': rs, 'output': {}});
const prompts = require('prompts');
const functions = require('./functions.js');

const prefectureDataMap = new Map();

rl.on('line', (lineString)=>{
  functions.ConvertCsvToMap(lineString, prefectureDataMap);
});

rl.on('close', () => {
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
      functions.bar();
      functions.searchResult(command, prefectureDataMap);
      functions.bar();
    } else if (command === '全国') {
      functions.bar();
      console.log(prefectureDataMap);
      functions.bar();
    } else if (command === 'search') {
      (async function () {
        let question = {
          type: "text",
          name: "command",
          message: "都道府県名('県'まで入力)："
        };
        let response = await prompts(question);
        command = response.command;
        functions.bar();
        console.log(`${command}の新型コロナ感染状況`);
        functions.searchResult(command, prefectureDataMap);
        functions.bar();
      })();
    }
  })()
})


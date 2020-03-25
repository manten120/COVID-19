const prompts = require('prompts');

const fontColorCyan = '\u001b[36m';
const fontColorRed = '\u001b[31m';
const fontColorReset   = '\u001b[0m';

const ConvertCsvToMap = (lineString, prefectureDataMap, week) => {
  const columns = lineString.split(',');
  const prefecture = columns[0];
  const infectedPeople = parseInt(columns[29]);
  const accumulation = parseInt(columns[30]);
  
  if(prefecture !== '報告数・累積報告数、疾病・都道府県別'
    && prefecture !== '') {
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
      week.push(prefecture);
  }
};

const selectMenu = async function(prefectureDataMap, week) {
  // 入力を待ち受ける内容
  let questions = {
    type: "select", // インプットタイプ
    name: "selected", // 変数名
    message: `\n\n\n＜ ${fontColorRed}新型コロナ感染状況 ${fontColorCyan}${week[0]} ${fontColorReset}＞\n\n`,
    choices: [
      { title: "都道府県名で検索\n", value: "検索" },
      { title: "一覧を表示\n", value: "全国" },
      { title: "全国の感染者総数を表示", value: "総数" }
    ]
  };
  // promptsの起動
  let response = await prompts(questions);
  let selected = response.selected;

  if (selected === '総数') {
    bar();
    searchResult(selected, prefectureDataMap);
    bar();
    setTimeout(selectMenu, 2000, prefectureDataMap, week)
  } else if (selected === '全国') {
    bar();
    console.log(prefectureDataMap);
    bar();
    setTimeout(selectMenu, 5000, prefectureDataMap, week)
  } else if (selected === '検索') {
    (async function () {
      let question = {
        type: "text",
        name: "prefectureName",
        message: "\n都道府県名('県'まで入力)："
      };
      let response = await prompts(question);
      prefectureName = response.prefectureName;
      bar();
      console.log(`${prefectureName}の新型コロナ感染状況\n`);
      searchResult(prefectureName, prefectureDataMap);
      bar();
      setTimeout(selectMenu, 2000, prefectureDataMap, week) 
    })();
  }
};

const bar = () =>{console.log('\n--------------------------------------\n');};


const searchResult = (mapKey, prefectureDataMap) => {
  const obj = prefectureDataMap.get(mapKey);

  for (let key in obj ){
    console.log(`${key}: ${fontColorRed}${obj[key]}${fontColorReset}`);
  }
};

module.exports = {
  ConvertCsvToMap,
  selectMenu,
};

const ConvertCsvToMap = (lineString, prefectureDataMap) => {
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
  }
}


const bar = () =>{console.log('--------------------------------------');};


const searchResult = (command, prefectureDataMap) => {
  const obj = prefectureDataMap.get(command);
  for (let key in obj ){
    console.log(`${key}: ${obj[key]}`);
  }
};


module.exports ={
  ConvertCsvToMap,
  bar,
  searchResult,
}

#!/bin/bash

dirName="./csv"
mkdir -p $dirName

url=`curl -s -H "User-Agent: CrawlBot; your@mail" curl https://www.niid.go.jp/niid/ja/data.html/ | grep "zensu.csv" | awk -F '"' '{print $6}'`

URL="https://www.niid.go.jp${url}"

fileName=`echo ${url} | awk -F '/' '{print $8}'`

if [ ! -e $dirName/$fileName ]; then
  wget ${URL} -P $dirName
  iconv -f SHIFT-JIS -t UTF-8 $dirName/$fileName -o $dirName/$fileName
  sed -i "s/2.*zensu\.csv/$fileName/" ./app.js
fi

node app.js
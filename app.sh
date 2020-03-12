#!/bin/bash

dirname="./csv"
mkdir -p $dirname

url=`curl -H "User-Agent: CrawlBot; your@mail" curl https://www.niid.go.jp/niid/ja/data.html/ | grep "zensu.csv" | awk -F '"' '{print $6}'`

URL="https://www.niid.go.jp${url}"

wget ${URL} -P $dirname


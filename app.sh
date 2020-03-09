#!/bin/bash

dirname="./csv"
mkdir -p $dirname
filename="${dirname}/`date +'%Y%m%d%H%M'`.csv"
echo "Save to $filename"
curl -s -o $filename -H "User-Agent: CrawlBot; your@mail" https://www.niid.go.jp/niid/images/idwr/sokuho/idwr-2020/202008/2020-08-zensu.csv
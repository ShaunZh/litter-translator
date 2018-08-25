#! /usr/bin/env node
 // 引入需要的模块

const axios = require('axios')
const Table = require('cli-table2') //表格输出
const API = 'http://fanyi.youdao.com/openapi.do?keyfrom=toaijf&key=868480929&type=data&doctype=json&version=1.1'

var data = {};
var word;

// 没有参数时显示帮助信息
if (!process.argv[2]) {
  console.log('大人，输入点啥嘛');
  return;
} else {
  word = process.argv[2];
  data.params = {
    q: word
  }
}

axios.get(API, data)
  .then(function (response) {
    let simpleResult ;
    let basicResult = [];
    let webResult = [];
    let phonetic = {};
    simpleResult = response.data.translation;
    if (response.data.basic.explains.length) {
      basicResult = response.data.basic.explains;
    }
    if (response.data.web.length) {
      webResult = response.data.web;
    }
    if (response.data.basic['uk-phonetic'] && response.data.basic['uk-phonetic'].length) {
      phonetic['uk-phonetic'] = response.data.basic['uk-phonetic'];
    }
    if (response.data.basic['us-phonetic'] && response.data.basic['us-phonetic'].length) {
      phonetic['us-phonetic'] = response.data.basic['us-phonetic'];
    }
    // 输出表格
    let table = new Table()
    console.log(`us-(${phonetic['us-phonetic']}), uk-(${phonetic['uk-phonetic']})`  + '\n')
    console.log(basicResult.join(','));
    table.push(['基本释义', simpleResult.join(',')]);
    for (var i = 0; i < webResult.length && i < 3; i++) {
      table.push([`'${webResult[i].key}'`,  webResult[i].value.join(', ')]);
    }
    console.log(table.toString());
  })
  .catch(function (error) {
    console.log(`error: ${error.message}`)
  })
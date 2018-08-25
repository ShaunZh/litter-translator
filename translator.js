#! /usr/bin/env node
// 引入需要的模块

const axios = require('axios')
const Table = require('cli-table2')  //表格输出
const API = 'http://fanyi.youdao.com/openapi.do?keyfrom=toaijf&key=868480929&type=data&doctype=json&version=1.1'

var data = {};
var word;

var table = new Table();

// 没有参数时显示帮助信息
if (!process.argv[2]) {
  console.log('大人，输入点啥嘛');
  return ;
} else {
  word = process.argv[2];
  data.params = {
    q: word
  }
}

axios.get(API, data) 
     .then (function (response) {
       let result = {}
       let result2 = [];
       result[word] = response.data.translation;
       if (response.data.basic.explains.length) {
         result2 = response.data.basic.explains; 
       } 
       // 输出表格
      let table = new Table()
      table.push(result);
      console.log(table.toString());
      console.log(result2);
     })
     .catch (function (error) {
	 console.log('大人, 出错了! 有可能输了小的不知道的词');
     })

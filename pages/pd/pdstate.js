//获取应用实例
var app = getApp()
//分享的统一设置
const onloadstart = require('../../utils/util.js').onloadstart;
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  onShareAppMessage: function(res){
    //首页初始化可转发
    var data = onloadstart.call(this, res);
    return data;
  },
  onLoad: function () {
    var that = this
  }
});
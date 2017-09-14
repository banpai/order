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
  skipmenu: function(){
    wx.redirectTo({
      url: '../dc/dc?flag=2'
    })
  },
  onLoad: function () {
    var that = this
  }
});
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  onLoad: function () {
    var that = this
  },
  savemsg: function(){
    wx.redirectTo({
      url: 'pdstate'
    })
  }
});
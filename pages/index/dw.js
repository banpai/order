//获取应用实例
var app = getApp()
Page({
  data: {
  },
  //初始化
  onLoad: function () {
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        app.globalData.location = res;
        wx.redirectTo({
          url: 'index'
        })
      },
      fail: function(){
        wx.redirectTo({
          url: 'index'
        })
      }
    })
  }
})
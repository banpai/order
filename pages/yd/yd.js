//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    time: "2017-08-26"
  },
  onLoad: function () {
    var that = this
  },
  nextbp: function () {
    wx.navigateTo({
      url: 'ydxq',
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  open: function () {
    var that = this;
    var tarray = [
      "2017-08-26",
      "2017-08-27",
      "2017-08-28",
      "2017-08-29",
      "2017-08-30",
      "2017-08-31"
    ];
    wx.showActionSheet({
      itemList: tarray,
      success: function (res) {
        if (!res.cancel) {
          that.setData({
            time: tarray[res.tapIndex]
          });
        }
      }
    });
  }
})

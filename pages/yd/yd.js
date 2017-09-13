//index.js
//获取点餐数据接口
const time_api = require('../../config').time_api


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
  onLoad: function(){
    var that = this;
    app.ajax(time_api, {}, function(res){
      that.setData({
        tarray:  res.data,
        time: res.data[0]
      })
      // that.data.tarray = res.data;
      console.log(that.data.tarray);
    }, true);
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
      itemList: that.data.tarray,
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

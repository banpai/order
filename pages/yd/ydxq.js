//index.js
//获取点餐数据接口
const getFooter = require('../../template/tecSupport/tecSupport.js').getFooter;
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    time: "2017-08-26"
  },
  onLoad: function () {
    //添加尾部技术支持的信息
    getFooter.call(this);
    var that = this
  },
  nextbp: function () {
    
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

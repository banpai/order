//index.js
//获取点餐数据接口
const time_api = require('../../config').time_api
//添加尾部技术支持信息的方法
const getFooter = require('../../template/tecSupport/tecSupport.js').getFooter;
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    time: "2017-08-26"
  },
  nextbp: function (o) {
    var url = 'ydxq?riqi=' + o.currentTarget.dataset.riqi;
    wx.navigateTo({
      url: url
    });
  },
  onLoad: function(){
    //添加尾部技术支持的信息
    getFooter.call(this);
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
    wx.showActionSheet({
      itemList: that.data.tarray,
      success: function (res) {
        if (!res.cancel) {
          that.setData({
            time: that.data.tarray[res.tapIndex]
          });
        }
      }
    });
  }
})

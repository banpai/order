//index.js
//获取点餐数据接口
const getFooter = require('../../template/tecSupport/tecSupport.js').getFooter;
//分享的统一设置
const onloadstart = require('../../utils/util.js').onloadstart;
//获取应用实例
var app = getApp()
Page({
  data: {
    falg: false,
    motto: 'Hello World',
    userInfo: {},
    time: "2017-08-26"
  },
  onShareAppMessage: function(res){
    //首页初始化可转发
    var data = onloadstart.call(this, res);
    return data;
  },
  onLoad: function (o) {
    //添加尾部技术支持的信息
    getFooter.call(this);
    this.setData({
      riqi: o.riqi
    });
  },
  skipyd: function(o){
    var time = o.currentTarget.dataset.time;
    console.log(this.data.riqi);
    var url = 'ydinput?time=' + time + '&riqi=' + this.data.riqi;
    wx.navigateTo({
      url: url
    });
  }
})

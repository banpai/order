//index.js
//获取点餐数据接口
const getFooter = require('../../template/tecSupport/tecSupport.js').getFooter;
//获取应用实例
var app = getApp()
Page({
  data: {
    falg: false,
    motto: 'Hello World',
    userInfo: {},
    time: "2017-08-26"
  },
  onLoad: function (o) {
    //添加尾部技术支持的信息
    getFooter.call(this);
    console.log(o.riqi);
    var that = this
  },
  skipyd: function(o){
    var time = o.currentTarget.dataset.time;
    console.log(o.currentTarget.dataset.time);
  }
})

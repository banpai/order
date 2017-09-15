//获取应用实例
var app = getApp();
//获取主页数据接口
const indexUrl = require('../../config').index;
//获取点餐数据接口
const menuurl = require('../../config').menu;
//添加尾部技术支持信息的方法
const getFooter = require('../../template/tecSupport/tecSupport.js').getFooter;
//分享的统一设置
const onloadstart = require('../../utils/util.js').onloadstart;
//获取排队的接口
const queue =  require('../../config').queue;
const ajax = require('../../utils/util.js').ajax;
Page({
  data: {
    "cesh": [1, 1, 1]
  },
  //排队方法
  pdfun: function(){
    var postdata = {};
    //获取数据
    ajax(queue, postdata, function (res) {
      console.log(res);
      wx.setStorageSync('queue', res.data);
      var url = '../pd/pd';
      if(res.data.cur_queue){
        url = '../pd/pdstate';
      }
      wx.navigateTo({
        url: url
      });
    }, true);
    
  },
  onShareAppMessage: function(res){
    //首页初始化可转发
    var data = onloadstart.call(this, res);
    return data;
  },
  //查看地图
  seeMap: function () {
    var that = this;
    wx.openLocation({
      latitude: +that.data.info.latitude,
      longitude: +that.data.info.longitude,
      scale: 28
    })
  },
  //打电话
  tapCall: function () {
    var that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.info.tel
    })
  },
  //初始化
  onLoad: function () {
    wx.setStorageSync('letdata', null);
    //添加尾部技术支持的信息
    getFooter.call(this);
    var that = this;
    var latitude = false;
    var longitude = false;
    if(app.globalData.location){
      latitude = app.globalData.location.latitude;
      longitude = app.globalData.location.longitude;
    }
    var postdata = {
      latitude: latitude,
      longitude: longitude
    }
    var postdatastr = JSON.stringify(postdata);
    //获取数据
    app.ajax(indexUrl, postdata, function (res) {
      //渲染其他数据
      that.setData({
        info: res.data
      })
      app.globalData.showdata = res.data;
      //渲染星星的个数
      var starlevel = [];
      if (res.data.level > 0) {
        var i, len;
        for (i = 1, len = res.data.level; i <= len; i++) {
          starlevel.push(1);
        }
        if(i = len){
          that.setData({
            info: res.data,
            starlevel: starlevel
          })
        }
      }
      //调用点餐的接口
      function Cgarry(m) {
        this.cost = m.cost;
        this.number = m.number;
        this.menu = [];
        var that = this;
        m.menu.forEach(function (v, i) {
          that.menu[i] = {};
          that.menu[i].typeName = v.typeName;
          that.menu[i].menuContent = [];
          v.menuContent.forEach(function (m, n) {
            that.menu[i].menuContent[n] = {};
            that.menu[i].menuContent[n].name = m.name;
            that.menu[i].menuContent[n].src = m.src;
            that.menu[i].menuContent[n].sales = m.sales;
            that.menu[i].menuContent[n].rating = m.rating;
            that.menu[i].menuContent[n].price = m.price;
            that.menu[i].menuContent[n].numb = m.numb;
            that.menu[i].menuContent[n].id = m.id;
          }, this);
        }, this);
      }
      app.ajax(menuurl, postdata, function (m) {
        app.globalData.menu = new Cgarry(m.data);
        app.globalData.wmmenu = new Cgarry(m.data);
        app.globalData.pdmenu = new Cgarry(m.data);
        app.globalData.yymenu = new Cgarry(m.data);
      });
    }, true);
  }
});


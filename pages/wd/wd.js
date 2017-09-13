var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var app = getApp()
//获取订单列表接口
const wdurl = require('../../config').wd;
//分享的统一设置
const onloadstart = require('../../utils/util.js').onloadstart;
Page({
    data: {
        tabs: ["待确认", "已确认", "完成"],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0,
        list0: [],
        list1: [],
        list2: [],
        status: 0,
        icon: ''
    },
    onShareAppMessage: function(res){
        //首页初始化可转发
        var data = onloadstart.call(this, res);
        return data;
      },
    onLoad: function () {
        var that = this;
        //获取数据
        app.getAppid(function (appid) {
            var databp = {
                appid: appid,
                status: '0',
                id: -1
            };
            var postdata = JSON.stringify(databp);
            app.ajax(wdurl, databp, function (res) {
                var tabs = that.tabs;
                var activeIndex = that.activeIndex;
                var sliderOffset = that.sliderOffset;
                var sliderLeft = that.sliderLeft;
                that.setData({
                    tabs: tabs,
                    activeIndex: activeIndex,
                    sliderOffset: sliderOffset,
                    sliderLeft: sliderLeft,
                    state: res.data,
                    list0: res.data,
                    icon: app.globalData.showdata.icon
                });
            }, true);
        })
        this.getdata('1', -1);
        this.getdata('2', -1);
        wx.getSystemInfo({
            success: function (res) {
                
                that.setData({
                    sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                    sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
                });
            }
        });
    },
    tabClick: function (e) {
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id,
            status: e.currentTarget.id
        });
    },
    getdata: function(status, id){
        var that = this;
         //获取数据
         app.getAppid(function (appid) {
            var databp = {
                appid: appid,
                status: status,
                id: id
            };
            var postdata = JSON.stringify(databp);
            if(status == 0){
                app.ajax(wdurl, databp, function (res) {
                    that.setData({
                        list0: res.data
                    });
                }, true);
            }else if(status == 1){
                app.ajax(wdurl, databp, function (res) {
                    that.setData({
                        list1: res.data
                    });
                }, true);
            }else if(status == 2){
                app.ajax(wdurl, databp, function (res) {
                    that.setData({
                        list2: res.data
                    });
                }, true);
            }
        })
    }
});
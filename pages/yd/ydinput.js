//添加尾部技术支持信息的方法
const getFooter = require('../../template/tecSupport/tecSupport.js').getFooter;
//分享的统一设置
const onloadstart = require('../../utils/util.js').onloadstart;
//获取应用实例
var app = getApp();
//获取排队的接口
const reservationdetail = require('../../config').reservationdetail;
const ajax = require('../../utils/util.js').ajax;

//封装tusi
function tusi(str, flag, fun) {
  var icon = 'loading';
  if (flag) {
    icon = 'success';
  }
  wx.showToast({
    title: str,
    icon: icon,
    duration: 2000,
    complete: function () {
      if (fun) {
        fun();
      }
    }
  });
}

Page({
  data: {
    name: '',
    tel: '',
    cost:'',
    riqi: '',
    time: '',
    address: "",
    addrdetail: "",
    sex: "1",
    paymoney: '',
    radioItems: [
      { 
        name: '只订座', 
        value: '0' , 
        checked: true,
        msg: '预付 ￥1'
      },
      { 
        name: '提前下单', 
        value: '1',
        msg: '￥1 起订'
      }
    ]
  },
  onShareAppMessage: function(res){
    //首页初始化可转发
    var data = onloadstart.call(this, res);
    return data;
  },
  onShow: function(){
    var that = this;
    var data = JSON.parse(wx.getStorageSync('letdata'));
    if(data){
      that.setData({
        cost: data.cost
      })
    };
  },
  //打电话
  tapCall: function () {
    var that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.info.tel
    })
  },
  //初始化
  onLoad: function (options) {
    this.setData({
      riqi: options.riqi,
      time: options.begintime
    });
    //添加尾部技术支持的信息
    getFooter.call(this);
    var that = this;
    //获取数据
    var postdata = {};
    ajax(reservationdetail, postdata, function (res) {
      console.log(res);
    }, true);
  },
  ceshiradio: function(){
    var that = this;
    setTimeout(function(){
      if(that.data.sex == 1){
        //保存缓存
        var url = '../dc/dc?flag=3';
        wx.navigateTo({
          url: url
        })
      }
    }, 1);
  },
  radioChange: function (e) {
    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }
    this.setData({
      radioItems: radioItems,
      sex: e.detail.value
    });
    
  },
  //请选择收货地址
  skipdz: function () {
    tusi('开发中');
    // var url = "dcxzinput"
    // wx.redirectTo({
    //   url: 'dcxzinput'
    // })
  },
  //提交订单
  sub: function (e) {
    var that = this;
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    if (this.data.name === '') {
      tusi('请填写姓名');
    } else if (this.data.tel === '') {
      tusi('请填写手机号');
    } else if (!myreg.test(that.data.tel)) {
      tusi('请输入有效的手机号');
    } else if (this.data.address === '') {
      tusi('请输入地址');
    } else if (this.data.addrdetail === '') {
      tusi('请输入详细地址');
    } else {
      var mymsgwm = {
        name: that.data.name,
        tel: that.data.tel,
        sex: that.data.sex,
        address: that.data.address,
        addrdetail: that.data.addrdetail
      };
      var str = JSON.stringify(mymsgwm);
      //存本地缓存
      wx.setStorage({
        key: "mymsgwm",
        data: str,
        complete: function () {
          //差一个post提交数据
          var id = '0';
          var url = '../dcxz/dcxzwm?id=' + id;
          tusi('开发中');
          // tusi('提交成功', true, function () {
          //   wx.redirectTo({
          //     url:url
          //   });
          // });
        }
      })
    }
  },
  //同步姓名
  wname: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  //电话
  tel: function (e) {
    this.setData({
      tel: e.detail.value
    })
  },
  //同步姓名
  address: function (e) {
    this.setData({
      address: e.detail.value
    })
  },
  //电话
  addrdetail: function (e) {
    this.setData({
      addrdetail: e.detail.value
    })
  }
})
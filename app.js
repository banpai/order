//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
   
  },
  getAppid: function (bc) {
    var that = this;
    if (that.globalData.appid != "") {
      bc(that.globalData.appid);
    } else {
      //调用微信登录接口
      wx.login({
        success: function (loginCode) {
          var appid = 'wx0c3511d12effe1ae'; //填写微信小程序appid
          var secret = 'bdbeba6230cb8efd543d81963444935d'; //填写微信小程序secret
          var url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' + loginCode.code + '&grant_type=authorization_code';
          //调用request请求api转换登录凭证
          wx.request({
            url: url,
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              that.globalData.appid = res.data.openid;
              bc(res.data.openid); //获取openid
            }
          })
        }
      })
    }
  },
  //封装获取数据的方式
  ajax: function (url, data, fun, post) {
    wx.showLoading({
      title: '加载中',
    });
    var method = "post";
    var header = {
      'content-type': 'application/json'
    };
    if (post) {
      method = "POST";
      header = {
        "Content-Type": "application/x-www-form-urlencoded"
      };
    }
    console.log(method);
    //获取数据
    wx.request({
      url: url,
      method: method,
      data: data,
      header: header,
      success: function (res) {
        console.log(res.data);
        if(res.data.status == 1){
          wx.hideLoading();
          var data = {
            errcode: '0',
            data: res.data.result
          }
          fun(data);
        }else{
          wx.hideLoading();
          var message = "获取数据失败";
          if(res.data.message){
            message = res.data.message;
          }
          wx.showToast({
            title: message,
            icon: 'loading',
            duration: 2000
          })
        }
      },
      fail: function(){
        wx.hideLoading();
        wx.showToast({
          title: '接口调用失败',
          icon: 'loading',
          duration: 2000
        })
      }
    });
  },
  //测试接口
  ceport: {
    //主页信息接口
    //index: "https://www.easy-mock.com/mock/59979e65059b9c566dc7bcc6/index/index",
    index: "http://shanggao.wshoto.com/app/index.php?i=3&c=entry&id=2&do=detail_api&m=weisrc_dish",
    //菜单信息
    //menu: "http://www.easy-mock.com/mock/59979e65059b9c566dc7bcc6/index/menu",
    menu: "http://shanggao.wshoto.com/app/index.php?i=3&c=entry&storeid=2&mode=4&do=menu_api&m=weisrc_dish",
    //状态接口
    // wd: "http://www.easy-mock.com/mock/59979e65059b9c566dc7bcc6/index/state",
    wd: "http://shanggao.wshoto.com/app/index.php?i=3&c=entry&do=order_api&m=weisrc_dish&storeid=2",
    //获取我的订单数据
    state:"http://shanggao.wshoto.com/app/index.php?i=3&c=entry&do=orderdetail_api&m=weisrc_dish&storeid=2",
     //state: "http://www.easy-mock.com/mock/59979e65059b9c566dc7bcc6/index/stateq",
    //支付页面
    //payment: "http://www.easy-mock.com/mock/59979e65059b9c566dc7bcc6/index/payment",
    payment:"http://shanggao.wshoto.com/app/index.php?i=3&c=entry&id=2&do=orderdetail_api&m=weisrc_dish",
    //待支付页面
    dcxz: "http://www.easy-mock.com/mock/59979e65059b9c566dc7bcc6/index/dcxz",
    //post点菜数据接口
    podc: "http://shanggao.wshoto.com/app/index.php?i=3&c=entry&storeid=2&mode=4&do=addtoorder_api&m=weisrc_dish",
    //取消订单接口
    cancelorder_api: "http://shanggao.wshoto.com/app/index.php?i=3&c=entry&storeid=2&mode=4&do=cancelorder_api&m=weisrc_dish"
  },
  globalData: {
    appid: "",
    menu: {
      cost: 0,
      number: 0,
      menu: []
    },
    wmmenu: {
      cost: 0,
      number: 0,
      menu: []
    },
    pdmenu: {
      cost: 0,
      number: 0,
      menu: []
    }
  }
})
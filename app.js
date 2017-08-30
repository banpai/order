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
          that.globalData.appid = loginCode.code;
          bc(loginCode.code);
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
    //获取数据
    wx.request({
      url: url,
      method: method,
      data: data,
      header: header,
      success: function (res) {
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
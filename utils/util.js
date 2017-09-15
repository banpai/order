//获取应用实例
var app = getApp();

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//页面初始化统一分享设置
function onloadstart(res) {
  if (res.from === 'button') {
    // 来自页面内转发按钮
    console.log(res.target)
  }
  var imageUrl = '';
  if (app.globalData.showdata.index_img) {
    imageUrl = app.globalData.showdata.index_img;
  }
  return {
    title: false,
    path: '/pages/index/index',
    imageUrl: imageUrl,
    success: function (res) {
      // 转发成功
    },
    fail: function (res) {
      // 转发失败
    }
  }
}
//封装获取数据的方式
function ajax(url, data, fun, post) {
  console.log(url);
  wx.showLoading({
    title: '加载中',
  });
  var method = "POST";
  var header = {
    'content-type': 'application/json'
  };
  if (post) {
    method = "POST";
    header = {
      "Content-Type": "application/x-www-form-urlencoded"
    };
  }
  if (wx.getStorageSync('sessionKey')) {
    data.sessionkey = wx.getStorageSync('sessionKey').sessionkey;
  }
  var datachuli = JSON.stringify(data);
  //获取数据
  wx.request({
    url: url,
    method: method,
    data: datachuli,
    dataType: 'json',
    // header: header,
    success: function (res) {
      if (res.data.status == 1) {
        wx.hideLoading();
        var data = {
          errcode: '0',
          data: res.data.message
        }
        fun(data);
      } else {
        wx.hideLoading();
        var message = "获取数据失败";
        if (res.data.message) {
          message = res.data.message;
        }
        wx.showToast({
          title: message,
          icon: 'loading',
          duration: 2000
        })
      }
    },
    fail: function (res) {
      wx.hideLoading();
      wx.showToast({
        title: '接口调用失败',
        icon: 'loading',
        duration: 2000
      })
    }
  });
}

module.exports = {
  formatTime: formatTime,
  onloadstart: onloadstart,
  ajax: ajax
}

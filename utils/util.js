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
  if(app.globalData.showdata.index_img){
    imageUrl = app.globalData.showdata.index_img;
  }
  return {
    title: false,
    path: '/pages/index/index',
    imageUrl: imageUrl,
    success: function(res) {
      // 转发成功
    },
    fail: function(res) {
      // 转发失败
    }
  }
}

module.exports = {
  formatTime: formatTime,
  onloadstart: onloadstart
}

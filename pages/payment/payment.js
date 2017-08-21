var app = getApp()
Page({
  data: {
    logs: []
  },
  onLoad: function (options) {
    var that = this;
    //获取数据
    app.ajax(app.ceport.payment, {}, function (res) {
      console.log(res);
      that.setData({
        xs: res.data,
        flag: options.flag,
        id: options.id
      })
    });
  },
  //支付按钮
  pay: function(){
    var that = this;
    var successurl = 'msg_success?flag=1&id=' + this.data.id;
    var failurl = 'msg_fail?flag=0&id=' + this.data.id;
    wx.requestPayment({
      'timeStamp': that.data.xs.timeStamp,
      'nonceStr': that.data.xs.nonceStr,
      'package': that.data.xs.package,
      'signType': 'MD5',
      'paySign': that.data.xs.paySign,
      'success':function(res){
        wx.redirectTo({
          url: successurl
        })
      },
      'fail':function(res){
        wx.redirectTo({
          url: failurl
        })
      }
   })
  }
})

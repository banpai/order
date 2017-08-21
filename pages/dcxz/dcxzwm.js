//获取应用实例
var app = getApp()

//封装tusi
function tusi(str, flag, fun){
  var icon = 'loading';
  if(flag){
    icon = 'success';
  }
  wx.showToast({
    title: str,
    icon: icon,
    duration: 2000,
    complete: function(){
      if(fun){
        fun();
      }
    }
  });
}

Page({
  data: {
    name: '',
    tel: '',
    radioItems: [
      { name: '先生', value: '0' },
      { name: '女士', value: '1', checked: true }
    ]
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
    var that = this
    console.log(app.globalData.dcmenu);
    //获取数据
    app.ajax(app.ceport.dcxz, {}, function (res) {
      that.setData({
        dcxz: res.data
      })
    }, true);
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }
    this.setData({
      radioItems: radioItems
    });
  },
  //提交订单
  sub: function(e){
    var that = this;
    console.log(this.data.name);
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
    if(this.data.name === ''){
      tusi('请填写姓名');
    }else if(this.data.tel === ''){
      tusi('请填写手机号');
    }else if(!myreg.test(that.data.tel)){
      tusi('请输入有效的手机号');
    }else{
      //差一个post提交数据
      var id = '0';
      var url = '../payment/payment?id=' + id;
      tusi('提交成功', true, function(){
        wx.redirectTo({
          url: url
        })
      });
    }
  },
  //同步姓名
  wname: function(e){
    this.setData({
      name: e.detail.value
    })
  },
  //电话
  tel: function(e){
    this.setData({
      tel: e.detail.value
    })
  }
})
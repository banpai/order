//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that = this;
    function Cgarry(m) {
      this.cost = m.cost;
      this.number = m.number;
      this.menu = [];
      var that = this;
      m.menu.forEach(function(v, i) {
        that.menu[i] = {};
        that.menu[i].typeName = v.typeName;
        that.menu[i].menuContent = [];
        v.menuContent.forEach(function(m, n){
          that.menu[i].menuContent[n] = {};
          that.menu[i].menuContent[n].name = m.name;
          that.menu[i].menuContent[n].src = m.src;
          that.menu[i].menuContent[n].sales = m.sales;
          that.menu[i].menuContent[n].rating = m.rating;
          that.menu[i].menuContent[n].price = m.price;
          that.menu[i].menuContent[n].numb = m.numb;
        }, this);
      }, this);
    }
    this.ajax(that.ceport.menu, {}, function (m) {      
      that.globalData.menu = new Cgarry(m.data);
      that.globalData.wmmenu = new Cgarry(m.data);
      that.globalData.pdmenu = new Cgarry(m.data);
    });
  },
  getUserInfo: function (cb) {
    var that = this
    // if (this.globalData.userInfo) {
    //   typeof cb == "function" && cb(this.globalData.userInfo)
    // } else {

    // }
    //调用登录接口
    wx.getUserInfo({
      withCredentials: false,
      success: function (res) {
        that.globalData.userInfo = res.userInfo
        typeof cb == "function" && cb(that.globalData.userInfo)
      }
    })
  },
  //封装获取数据的方式
  ajax: function (url, data, fun) {
    //获取数据
    wx.request({
      url: url,
      method: "GET",
      data: data,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        fun(res.data);
      }
    });
  },
  //测试接口
  ceport: {
    //主页信息接口
    index: "https://www.easy-mock.com/mock/59979e65059b9c566dc7bcc6/index/index",
    //菜单信息
    menu: "http://www.easy-mock.com/mock/59979e65059b9c566dc7bcc6/index/menu"
  },
  globalData: {
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
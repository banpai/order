//获取应用实例
var app = getApp()
Page({
  data: {
    height: 'height:15px;',
    //整个菜单
    menu: [],
    currentPage: 0,
    selected: 0,
    howMuch: 12,
    //总价格
    cost: 0
  },
  //增加吃的
  addToTrolley: function (e) {
    var info = this.data.menu;
    info[this.data.selected].menuContent[e.currentTarget.dataset.index].numb++;
    this.data.number = + this.data.number + 1;
    var number = this.data.number;
    var flag = this.data.flag;
    console.log(flag);
    var cost = this.data.cost + this.data.menu[this.data.selected].menuContent[e.currentTarget.dataset.index].price;
    if (flag === "0") {
      app.globalData.menu.menu[this.data.selected].menuContent[e.currentTarget.dataset.index].numb++;
      app.globalData.menu.cost = cost;
      console.log(app.globalData.wmmenu.cost);
      app.globalData.menu.number = number;
      console.log(app.globalData.menu.cost + "===" + app.globalData.wmmenu.cost);
    } else if (flag === "1") {
      app.globalData.wmmenu.menu[this.data.selected].menuContent[e.currentTarget.dataset.index].numb++;
      app.globalData.wmmenu.cost = cost;
      app.globalData.wmmenu.number = number;
    } else if (flag === "2") {
      app.globalData.pdmenu.menu[this.data.selected].menuContent[e.currentTarget.dataset.index].numb++;
      app.globalData.pdmenu.cost = cost;
      app.globalData.pdmenu.number = number;
    }
    this.setData({
      cost: cost,
      menu: info,
      number: number,
      flag: flag
    })
  },
  //减少吃的
  removeFromTrolley: function (e) {
    var info = this.data.menu;
    var cost = this.data.cost - this.data.menu[this.data.selected].menuContent[e.currentTarget.dataset.index].price;
    var numb;
    var number = this.data.number;
    var flag = this.data.flag;
    if (info[this.data.selected].menuContent[e.currentTarget.dataset.index].numb != 0) {
      info[this.data.selected].menuContent[e.currentTarget.dataset.index].numb--;
      numb = info[this.data.selected].menuContent[e.currentTarget.dataset.index].numb;
      number = +number - 1;
      if (flag === "0") {
        app.globalData.menu.menu[this.data.selected].menuContent[e.currentTarget.dataset.index].numb = numb;
        app.globalData.menu.cost = cost;
        app.globalData.menu.number = number;
      } else if (flag === "1") {
        app.globalData.wmmenu.menu[this.data.selected].menuContent[e.currentTarget.dataset.index].numb = numb;
        app.globalData.wmmenu.cost = cost;
        app.globalData.wmmenu.number = number;
      } else if (flag === "2") {
        app.globalData.pdmenu.menu[this.data.selected].menuContent[e.currentTarget.dataset.index].numb = numb;
        app.globalData.pdmenu.cost = cost;
        app.globalData.pdmenu.number = number;
      }
      this.setData({
        cost: cost,
        menu: info,
        number: number,
        flag: flag
      })
    }
  },
  //切换菜单
  turnMenu: function (e) {
    this.setData({
      selected: e.currentTarget.dataset.index
    })
    console.log(e.currentTarget.dataset.index);
  },
  //监听页面加载
  onLoad: function (options) {
    var that = this;
    console.log(options.flag === "0");
    //重新获取高度
    wx.getSystemInfo({
      success: function (res) {
        var height = "height:" + res.windowHeight + 'px;';
        that.setData({
          height: height,
        })
      }
    });
    var menu;
    //渲染菜单数据
    if (options.flag === "0") {
      menu = app.globalData.menu;
      console.log("001");
    } else if (options.flag === "1") {
      menu = app.globalData.wmmenu;
      console.log("002");
    } else if (options.flag === "2") {
      menu = app.globalData.pdmenu;
      console.log("003");
    }
    that.setData({
      menu: menu.menu,
      cost: menu.cost,
      number: menu.number,
      flag: options.flag
    })
    console.log(options.flag);
  },
  buy: function () {
    //选好了，点击购买
    var url = '../dcxz/dcxz';
    if(this.options.flag == '1'){
      url = '../dcxz/dcxzwm';
    }
    if(this.data.cost != 0){
      wx.redirectTo({
        url: url
      });
    }
  }
})

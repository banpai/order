//添加尾部技术支持信息的方法
const getFooter = require('../../template/tecSupport/tecSupport.js').getFooter;


Page({
    data:{},
    onLoad: function(options){
        //添加尾部技术支持的信息
        getFooter.call(this);
        this.data.flag = options.flag;
        this.data.id = options.id;
    },
    endbp: function(){
        var url = '../state/state?flag=' + this.data.flag + '&id=' + this.data.id;
        wx.redirectTo({
            url: url
        })
    }
});
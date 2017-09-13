/**
 * 小程序配置文件
 */

// 此处主机域名是腾讯云解决方案分配的域名
// 小程序后台服务解决方案：https://www.qcloud.com/solution/la

var host = "https://diancan.wshoto.com";
// var host = "https://api.shanggao.wshoto.com";

//友回忆炸串炒饭的接口参数
var storeid = '&i=3&storeid=6&weid=3';
var ids = '&i=3&id=6&weid=3';
//王兴记的接口参数
// var storeid = '&i=2&storeid=5&weid=2';
// var ids = '&i=2&id=5&weid=2';
//花甲的接口参数
// var storeid = '&i=2&storeid=2&weid=2';
// var ids = '&i=2&id=2&weid=2';

//王兴记上高
// var storeid = '&i=5&storeid=5&weid=5';
// var ids = '&i=5&id=5&weid=5';

//花甲上高
// var storeid = '&i=3&storeid=2&weid=3';
// var ids = '&i=3&id=2&weid=3';



var config = {
    // 下面的地址配合云端 Server 工作
    host,
    storeid,
    ids,
    //主页信息接口
    index: `${host}/app/index.php?c=entry${ids}&do=detail_api&m=weisrc_dish`,
    //菜单信息
    menu: `${host}/app/index.php?c=entry${storeid}&mode=4&do=menu_api&m=weisrc_dish`,
    //状态接口
    wd: `${host}/app/index.php?c=entry&do=order_api&m=weisrc_dish${storeid}`,
    //获取我的订单数据
    state:`${host}/app/index.php?c=entry&do=orderdetail_api&m=weisrc_dish${storeid}`,
    //支付页面
    payment:`${host}/app/index.php?c=entry${ids}&do=orderdetail_api&m=weisrc_dish${storeid}`,
    //待支付页面
    dcxz: "http://www.easy-mock.com/mock/59979e65059b9c566dc7bcc6/index/dcxz",
    //post点菜数据接口
    podc: `${host}/app/index.php?c=entry${storeid}&mode=4&do=addtoorder_api&m=weisrc_dish`,
    //取消订单接口
    cancelorder_api: `${host}/app/index.php?c=entry${storeid}&mode=4&do=cancelorder_api&m=weisrc_dish`,
    //获取时间
    time_api: `${host}/app/index.php?c=entry${storeid}&mode=4&do=time_api&m=weisrc_dish`
};

module.exports = config

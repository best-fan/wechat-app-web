/**
  项目JS主入口
  以依赖layui的layer和form模块为例
**/
layui.define(['layer', 'form', 'element'], function(exports) {
    var layer = layui.layer,
        form = layui.form;
    element = layui.element;
    layer.msg('欢迎管理员');
    exports('main', {}); //注意，这里是模块输出的核心，模块名必须和use时的模块名一致
});

layui.use('laytpl', function() {
    Bmob.initialize("你的Application ID", "你的REST API Key");
    //查询报名人数
    var MyJoinInfo = Bmob.Object.extend("MyJoinInfo");
    var query = new Bmob.Query(MyJoinInfo);
    query.count({
        success: function(count) {
            // 查询成功，返回记录数量
            $(".joinInfo span").text(count);
        },
        error: function(error) {}
    });
    //查询新增用户
    var UserInfo = Bmob.Object.extend("UserInfo");
    var newUser = new Bmob.Query(UserInfo);
    newUser.equalTo("regtime", getdate());
    newUser.count({
        success: function(count) {
            // alert('新增人数' + count.length);
            // 查询成功，返回记录数量
            $(".userNew span").text(count);
        },
        error: function(error) {}
    });


    //查询总用户
    var UserInfo = Bmob.Object.extend("UserInfo");
    var query = new Bmob.Query(UserInfo);
    query.count({
        success: function(count) {
            // 查询成功，返回记录数量
            $(".userAll span").text(count);
        },
        error: function(error) {}
    });
    //查询招聘信息
    var DetailInfo = Bmob.Object.extend("DetailInfo");
    var query = new Bmob.Query(DetailInfo);
    query.count({
        success: function(count) {
            // 查询成功，返回记录数量
            $(".zpInfor span").text(count);
        },
        error: function(error) {}
    });


});

function getdate() {
    var myDate = new Date;
    var year = myDate.getFullYear(); //获取当前年
    var yue = String(myDate.getMonth() + 1); //获取当前月
    var date = String(myDate.getDate()); //获取当前日
    if (yue.length == 1) {
        yue = '0' + yue;
    }
    if (date.length == 1) {
        date = '0' + date;
    }
    var ss = year + '-' + yue + '-' + date;
    return ss
}
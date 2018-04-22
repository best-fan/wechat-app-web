Bmob.initialize("你的Application ID", "你的REST API Key");
layui.define(['layer', 'form', 'element'], function(exports) {
    var $ = layui.jquery,
        layer = layui.layer,
        form = layui.form;
    element = layui.element;
    exports('index_pd', {}); //注意，这里是模块输出的核心，模块名必须和use时的模块名一致
    // alert(localStorage.getItem("name"))
    if (!localStorage.getItem("name")) {
        layer.msg('非法参数，禁止登陆');
        setTimeout(function() {
            window.location.href = "index.php";
        }, 1 * 1000); //加载太快了，2秒后跳转
    } else {
        var GameScore = Bmob.Object.extend("login");
        var query = new Bmob.Query(GameScore);
        query.equalTo("username", localStorage.getItem("name"));
        // 查询所有数据
        query.find({
            success: function(results) {

                if (results.length == 1) {
                    // console.log(results[0].get('nikname'));
                    $('#userName').html(results[0].get('nikname')); //用户名赋值
                    $('#username').html(results[0].get('nikname')); //用户名2赋值
                    localStorage.setItem("nikname", results[0].get('nikname'));
                    localStorage.setItem("login_id", results[0].id); //用户id
                    localStorage.setItem("login_type", results[0].get('type')); //用户id
                    //alert(results[0].id);
                    // alert(localStorage.getItem("login_type"));

                } else {
                    layer.msg('非法参数，禁止登陆');
                    setTimeout(function() {
                        window.location.href = "index.php";
                    }, 1 * 1000);
                }

            },
            error: function(error) {
                alert("查询失败: " + error.code + " " + error.message);
            }
        });

    }
    //alert(getParams("name"));
});

function exit() {

    localStorage.clear();
    window.location.href = "index.php";

}
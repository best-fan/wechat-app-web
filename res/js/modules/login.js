Bmob.initialize("你的Application ID", "你的REST API Key");
layui.use(['form', 'layedit', 'upload', 'laydate'], function() {
    var $ = layui.jquery;
    var form = layui.form,
        layer = layui.layer,
        layedit = layui.layedit;
    // var moneytype = $('input:radio[name="paytype"]:checked').val();
    //自定义验证规则  
    form.verify({
        username: function(value) {
            if (value.length == 0) {
                return '用户名称不能为空';
            }
        },
        password: function(value) {
            if (value.length == 0) {
                return '密码不能为空';
            }
        }
    });

    //创建一个编辑器  
    layedit.build('LAY_demo_editor');

    //监听提交
    form.on('submit(demo1)', function(data) {
        layer.msg('正在登陆,请稍等');
        var GameScore = Bmob.Object.extend("login");
        var query = new Bmob.Query(GameScore);
        query.equalTo("username", $('#username').val());
        query.equalTo("password", $('#password').val());
        // 查询所有数据
        query.find({
            success: function(results) {
                if (results.length == 1) {
                    layer.close();
                    layer.msg('登录成功,请稍等');
                    setTimeout(function() {
                        localStorage.clear();
                        localStorage.setItem("name", $('#username').val());
                        window.location.href = "indexx.php";
                    }, 2 * 1000); //加载太快了，2秒后跳转

                } else {
                    $('#username').val('');
                    $('#password').val('');
                    $('#username').focus();
                    layer.msg('用户名或密码错误');
                }
                // 循环处理查询到的数据
            },
            error: function(error) {
                alert("查询失败: " + error.code + " " + error.message);
            }
        });

        return false;
    });


});
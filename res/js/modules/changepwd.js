Bmob.initialize("你的Application ID", "你的REST API Key");
layui.use(['form', 'layedit', 'upload', 'laydate'], function() {
    var $ = layui.jquery,
        layer = layui.layer,
        form = layui.form;
    element = layui.element;
    $('#nikname').val(localStorage.getItem("nikname"));
    $('#username').val(localStorage.getItem("name"));
    //自定义验证规则  
    form.verify({
        nikname: function(value) {
            if (value.length == 0) {
                return '昵称不能为空';
            }
        }
    });
    //监听提交
    form.on('submit(changePwd)', function(data) {

        if ($('#newpwd').val() == $('#entpwd').val()) {

            var GameScore = Bmob.Object.extend("login");
            var query = new Bmob.Query(GameScore);
            query.equalTo("username", $('#username').val());
            query.equalTo("password", $('#oldpwd').val());
            query.find({
                success: function(results) {
                    if (results.length == 1) {
                        //原来密码正确
                        var login = Bmob.Object.extend("login");
                        var query = new Bmob.Query(login);
                        // 这个 id 是要修改条目的 id，你在生成这个存储并成功时可以获取到，请看前面的文档
                        query.get(localStorage.getItem("login_id"), {
                            success: function(gameScore) {
                                // 回调中可以取得这个 GameScore 对象的一个实例，然后就可以修改它了
                                gameScore.set('nikname', $('#nikname').val());
                                gameScore.set('username', $('#username').val());
                                gameScore.set('password', $('#newpwd').val());
                                gameScore.save();
                                layer.msg('密码、昵称修改成功,请牢记密码', {
                                    icon: 1,
                                    time: 3000 //2秒关闭（如果不配置，默认是3秒）
                                }, function() {
                                    $('#oldpwd').val('');
                                    $('#newpwd').val('');
                                    $('#entpwd').val('');
                                });

                                // The object was retrieved successfully.
                            },
                            error: function(object, error) {
                                layer.msg('网络错误', {
                                    icon: 2,
                                    time: 1500 //2秒关闭（如果不配置，默认是3秒）
                                }, function() {});
                            }
                        });

                    } else {
                        layer.msg('原密码错误，请重新输入', {
                            icon: 2,
                            time: 1500 //2秒关闭（如果不配置，默认是3秒）
                        }, function() {
                            $('#oldpwd').val('');
                            $('#oldpwd').focus();
                        });
                    }
                },
                error: function(error) {
                    alert("查询失败: " + error.code + " " + error.message);
                }
            });

        } else {
            layer.msg('两次密码不一致', {
                icon: 2,
                time: 1500 //2秒关闭（如果不配置，默认是3秒）
            }, function() {
                //do something
                $('#newpwd').val('');
                $('#entpwd').val('');
                $('#newpwd').focus();
            });
        }


        return false;
    });
});
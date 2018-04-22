Bmob.initialize("你的Application ID", "你的REST API Key");
//加载并展示信息
var window = '';
var id = localStorage.getItem("det_id");
layui.use('layer', function() {
    var $ = layui.jquery;
    var GameScore = Bmob.Object.extend("UserInfo"); //接受传值
    var query = new Bmob.Query(GameScore);
    //alert(localStorage.getItem("det_id"));	
    query.get(id, {
        success: function(results) {
            $("#username").val(results.get("username"));
            $("#userphone").val(results.get("userphone"));
            $("#imgSrc").attr("src", results.get("imgSrc"));
        },
        error: function(results, error) {
            alert("查询失败: ");
        }
    });

    var layer = layui.layer;

    layer.load(0, { time: 1.5 * 1000 });
});

//修改信息
layui.use(['form', 'layedit', 'upload', 'laydate'], function() {
    var $ = layui.jquery;
    var form = layui.form,
        layer = layui.layer,
        layedit = layui.layedit,
        upload = layui.upload;
    var tag_token = $(".tag_token").val();
    // var moneytype = $('input:radio[name="paytype"]:checked').val();
    //自定义验证规则  
    form.verify({
        username: function(value) {
            if (value.length == 0) {
                return '用户名称不能为空';
            }
        },
        userphone: function(value) {
            if (value.length == 0) {
                return '手机号不能为空';
            }
        }


        //phone: [/^1[3|4|5|7|8]\d{9}$/, '手机必须11位，只能是数/
    });




    //创建一个编辑器  
    layedit.build('LAY_demo_editor');

    //监听提交
    form.on('submit(demo1)', function(data) {
        //layer.alert(JSON.stringify(data.field.val), {
        // title: '最终的提交信息'
        //})
        var UserInfo = Bmob.Object.extend("UserInfo");
        var UserInfo = new Bmob.Query(UserInfo);
        layer.msg('正在提交，请稍等', {
            time: 2000, //20s后自动关闭
            icon: 6,
        });
        UserInfo.get(id, {
            success: function(UserInfo) {
                UserInfo.set("username", $('#username').val());
                UserInfo.set("userphone", $('#userphone').val());

                UserInfo.save(null, {
                    success: function(object) {
                        //alert("create object success, object id:" + object.id);
                        layer.msg('上传成功,请勿重复提交数据', {
                            icon: 1,
                            time: 2000 //2秒关闭（如果不配置，默认是3秒）
                        }, function() {
                            //do something
                            $("#myform").find("input").each(function() {
                                this.value = ""; //也可以清空数据this.value ="";
                            });
                        });
                    },
                    error: function(model, error) {
                        // alert("create object fail");
                        console.log("查询失败: " + error.code + " " + error.message);
                        layer.msg('上传失败,请稍后再试', {
                            icon: 2,
                            time: 2000 //2秒关闭（如果不配置，默认是3秒）
                        });

                    }
                });
            }
        });
        return false;
    });


});
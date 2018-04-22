Bmob.initialize("你的Application ID", "你的REST API Key");
//加载并展示信息
var window = '';
var id = localStorage.getItem("det_id"); //接受传值
layui.use('layer', function() {
    var $ = layui.jquery;
    var GameScore = Bmob.Object.extend("MyRecommend");
    var query = new Bmob.Query(GameScore);
    //alert(id);	
    query.get(id, {
        success: function(results) {
            $("#userName").val(results.get("userName"));
            $("#userPhone").val(results.get("userPhone"));
            $("#recoName").val(results.get("recoName"));

            //alert(results.get("recoName"));
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
                return '用户名不能为空';
            }
        },

        reconame: function(value) {
            if (value.length == 0) {
                return '推荐人不能为空';
            }
        }

        //   userphone: [/^1[3|4|5|7|8]\d{9}$/, '手机必须11位，只能是数/
    });
    //创建一个编辑器  
    layedit.build('LAY_demo_editor');

    //监听提交
    form.on('submit(demo1)', function(data) {
        //layer.alert(JSON.stringify(data.field.val), {
        // title: '最终的提交信息'
        //})
        var MyRecommend = Bmob.Object.extend("MyRecommend");
        var MyRecommend = new Bmob.Query(MyRecommend);
        layer.msg('正在提交，请稍等', {
            time: 2000, //20s后自动关闭
            icon: 6,
        });
        MyRecommend.get(id, {
            success: function(MyRecommend) {
                MyRecommend.set("userName", $('#userName').val());
                MyRecommend.set("recoName", $('#recoName').val());
                MyRecommend.set("userPhone", $('#userPhone').val());

                MyRecommend.save(null, {
                    success: function(object) {
                        //alert("create object success, object id:" + object.id);
                        layer.msg('上传成功,请勿重复提交数据', {
                            icon: 1,
                            time: 2000 //2秒关闭（如果不配置，默认是3秒）
                        }, function() {
                            //do something
                            //$(" input[ type='text' ] ").val('');
                            $("#myform").find("input,textarea").each(function() {
                                this.value = ""; //也可以清空数据this.value ="";
                            });
                            //$('#detSrc').val("../upimg/demo.png");
                        });
                    },
                    error: function(model, error) {
                        // alert("create object fail");
                        //consoleconsole.log("查询失败: " + error.code + " " + error.message);
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
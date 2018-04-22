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
Bmob.initialize("你的Application ID", "你的REST API Key");
//加载并展示信息
var window = '';
var id = localStorage.getItem("det_id");
layui.use('layer', function() {
    var $ = layui.jquery;
    var GameScore = Bmob.Object.extend("MyJoinInfo"); //接受传值
    var query = new Bmob.Query(GameScore);
    //alert(id);	
    query.get(id, {
        success: function(results) {
            $("#userName").val(results.get("userName"));
            $("#userPhone").val(results.get("userPhone"));
            $("#myJoinName").val(results.get("myJoinName"));
            //alert(results.get("myJoinName"));
        },
        error: function(results, error) {
            alert("查询失败: ");
        }
    });

    var layer = layui.layer;

    layer.load(0, { time: 1.5 * 1000 });
});
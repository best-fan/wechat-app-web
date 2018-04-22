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
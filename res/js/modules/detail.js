Bmob.initialize("你的Application ID", "你的REST API Key");

var window = '';
layui.use('layer', function() {
    var $ = layui.jquery;
    var GameScore = Bmob.Object.extend("DetailInfo");
    var query = new Bmob.Query(GameScore);
    //alert(localStorage.getItem("det_id"));
    var id = localStorage.getItem("det_id");
    query.get(id, {
        success: function(results) {
            $("#detName").val(results.get("detName"));
            $("#detAddr").val(results.get("detAddr"));
            $("#detPayMin").val(results.get("detPayMin"));
            $("#detPayMax").val(results.get("detPayMax"));
            $("#payDescription").val(results.get("payDescription").replace(new RegExp("<br/>", "g"), "\n"));
            $("#boardDescription").val(results.get("boardDescription").replace(new RegExp("<br/>", "g"), "\n"));
            $("#recruitDescription").val(results.get("recruitDescription").replace(new RegExp("<br/>", "g"), "\n"));
            $("#kindlyReminder").val(results.get("kindlyReminder").replace(new RegExp("<br/>", "g"), "\n"));
            $("#detCompany").val(results.get("detCompany").replace(new RegExp("<br/>", "g"), "\n"));
            $("#detSrc").attr("src", results.get("detSrc"));
            $("#detSrcUrl").val(results.get("detSrc"));
            $("#entNum").val(results.get("entNum"));
            var paytype = results.get("payType");
            $("input[type=radio][value=0]").attr("checked", 'checked')
            if (paytype == 0) {
                var update = $("#update-form")
                update.find("input[type=radio][value=0]").next().find("i").click(); //将value是female的单选框选中
                $("#payTypeOne").attr("disabled", 'disabled');
            } else if (paytype == 1) {
                var update = $("#update-form")
                update.find("input[type=radio][value=1]").next().find("i").click(); //将value是female的单选框选中
                $("#payTypeZero").attr("disabled", 'disabled');
                $("#detPayMin").hide();
                $("#detPayM_M").hide();
            }

        },
        error: function(results, error) {
            alert("查询失败: ");
        }
    });

    var layer = layui.layer;

    layer.load(0, { time: 1.5 * 1000 })
});
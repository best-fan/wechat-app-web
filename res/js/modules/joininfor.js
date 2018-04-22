Bmob.initialize("你的Application ID", "你的REST API Key");
var test = '[';
layui.use('layer', function() {
    if (localStorage.getItem("login_type") == '1') {
        var layer = layui.layer;
        layer.msg('权限不足，无法查看', { icon: 4 });
    } else {
        var GameScore = Bmob.Object.extend("MyJoinInfo");
        var query = new Bmob.Query(GameScore);
        //console.log(res)     
        query.find({
            success: function(results) {
                //alert("共查询到 " + results.length + " 条记录");
                // 循环处理查询到的数据
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    // alert(object.id + ' - ' + object.get('playerName'));
                    var str = ''; //中间变量
                    var type = ''; //工资类型
                    var minpay = '';
                    if (object.get('payType') == '1') {
                        type = '日结';
                        minpay = '';
                    } else {
                        type = '月结';
                        minpay = object.get('detPayMin');
                    }
                    if (i < results.length - 1) {
                        str = '{"id":"' + object.id + '","userName": "' + object.get('userName') + '","userPhone": "' + object.get('userPhone') + '","myjoinName": "' + object.get('myJoinName') + '","createAt": "' + object.createdAt + '"},'
                        test = test + str;
                    } else {
                        str = '{"id":"' + object.id + '","userName": "' + object.get('userName') + '","userPhone": "' + object.get('userPhone') + '","myjoinName": "' + object.get('myJoinName') + '","createAt": "' + object.createdAt + '"}]'
                        test = test + str;

                    }
                    // console(object.id);
                    // console(object.createdAt);
                    // console(object.updatedAt);
                    // console(object.id + ' - ' + object.get('playerName'));
                }
                // console.log(test);
                test = eval('(' + test + ')');
                // console.log(res);
                //  console.log(test);
            },
            error: function(error) {
                alert("查询失败: " + error.code + " " + error.message);
            }
        });
        // layer.msg('也可以这样', {
        //     time: 2000, //20s后自动关闭
        // });
        // alert('aaa');

        var layer = layui.layer;
        // layer.open({
        //     type: 3,
        //     time: 2000,
        //     //content: '正在加载' //这里content是一个普通的String
        // });
        layer.load(0, { time: 2.5 * 1000 })
    }
});

layui.use('table', function() {
    var table = layui.table;
    setTimeout(function() {
        //展示数据
        table.render({
            elem: '#demo',
            height: 700,
            size: 'lg',
            cols: [
                [ //标题栏
                    { field: 'id', title: 'ID', width: 260, },
                    { field: 'userName', title: '用户姓名', width: 100, },
                    { field: 'userPhone', title: '手机号', width: 150, sort: true, },
                    { field: 'myjoinName', title: '公司名称', width: 280, sort: true, },
                    { field: 'createAt', title: '报名时间', sort: true, minwidth: 100, },
                    { field: '', title: '操作', fixed: 'right', width: 178, align: 'center', toolbar: '#barDemo' }

                ]
            ],
            data: test,
            even: true,
            page: true
        });
    }, 3 * 1000); //延时3秒加载数据
    //其他操作
    //监听工具条
    table.on('tool(demo)', function(obj) {
        var data = obj.data;
        if (obj.event === 'detail') {
            layer.msg('ID：' + data.id + ' 的查看操作');
            layer.open({
                type: 2,
                area: ['100%', '100%'],
                maxmin: true,
                content: 'detjoininfor.html' //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no']
            });
            localStorage.setItem('det_id', data.id);
        } else if (obj.event === 'del') {
            layer.confirm('真的删除行么', function(index) {
                obj.del();
                layer.close(index);
            });
        } else if (obj.event === 'edit') {
            layer.open({
                type: 2,
                area: ['100%', '100%'],
                maxmin: true,
                content: 'setjoininfor.html' //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no']
            });
            localStorage.setItem('det_id', data.id);
        }
    });

});
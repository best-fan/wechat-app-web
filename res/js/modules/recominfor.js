Bmob.initialize("你的Application ID", "你的REST API Key");
var test = '[';
layui.use('layer', function() {
    if (localStorage.getItem("login_type") == '1') {
        var layer = layui.layer;
        layer.msg('权限不足，无法查看', { icon: 4 });
    } else {


        var MR = Bmob.Object.extend("MyRecommend");
        var query = new Bmob.Query(MR);
        query.find({
            success: function(results) {
                // alert("共查询到 " + results.length + " 条记录");
                // 循环处理查询到的数据
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    // alert(object.id + ' - ' + object.get('playerName'));
                    if (i < results.length - 1) {
                        var s = '{"id":"' + object.id + '","userName": "' + object.get('userName') + '","userPhone": "' + object.get('userPhone') + '","createAt": "' + object.createdAt + '","recoName": "' + object.get('recoName') + '"},'
                        test = test + s;
                    } else {
                        var s = '{"id":"' + object.id + '","userName": "' + object.get('userName') + '","userPhone": "' + object.get('userPhone') + '","createAt": "' + object.createdAt + '","recoName": "' + object.get('recoName') + '"}]'
                        test = test + s;

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


        var layer = layui.layer;
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
                    { field: 'id', title: 'ID', width: 120, sort: true, fixed: 'left' },
                    { field: 'userName', title: '用户名', width: 100, },
                    { field: 'userPhone', title: '手机号', width: 150, },
                    { field: 'recoName', title: '推荐人', width: 100, },
                    { field: 'createAt', title: '推荐时间', sort: true, minwidth: 180, },
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
                content: 'detrecominfor.html' //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: 
            });
            localStorage.setItem('det_id', data.id);
        } else if (obj.event === 'del') {
            //  layer.msg('ID：' + data.id + ' 的查看操作');
            layer.confirm('真的删除ID:' + data.id + '的数据吗？', function(index) {
                var UserInfo = Bmob.Object.extend("MyRecommend");
                var query = new Bmob.Query(UserInfo);
                query.get(data.id, {
                    success: function(object) {
                        // The object was retrieved successfully.
                        object.destroy({
                            success: function(deleteObject) {
                                //  alert("delete success");
                                layer.msg('删除成功', {
                                    icon: 1,
                                    time: 2000 //2秒关闭（如果不配置，默认是3秒）
                                }, function() {
                                    //do something
                                    obj.del();
                                    layer.close(index);
                                });

                            },
                            error: function(GameScoretest, error) {
                                alert("delete fail");
                            }
                        });
                    },
                    error: function(object, error) {
                        alert("query object fail");
                    }
                });

            });
        } else if (obj.event === 'edit') {
            layer.open({
                type: 2,
                area: ['100%', '100%'],
                maxmin: true,
                content: 'setrecominfor.html' //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: 
            });
            localStorage.setItem('det_id', data.id);
        }
    });

});
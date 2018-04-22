Bmob.initialize("你的Application ID", "你的REST API Key");
var test = '[';
layui.use('layer', function() {
    if (localStorage.getItem("login_type") == '1' || localStorage.getItem("login_type") == '2') {
        var layer = layui.layer;
        layer.msg('权限不足，无法查看', { icon: 4 });
    } else {
        var GameScore = Bmob.Object.extend("UserInfo");
        var query = new Bmob.Query(GameScore);
        query.find({
            success: function(results) {
                // alert("共查询到 " + results.length + " 条记录");
                // 循环处理查询到的数据
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    // alert(object.id + ' - ' + object.get('playerName'));
                    if (i < results.length - 1) {
                        var s = '{"id":"' + object.id + '","username": "' + object.get('username') + '","userphone": "' + object.get('userphone') + '","createAt": "' + object.createdAt + '","imgSrc": "' + object.get('imgSrc') + '"},'
                        test = test + s;
                    } else {
                        var s = '{"id":"' + object.id + '","username": "' + object.get('username') + '","userphone": "' + object.get('userphone') + '","createAt": "' + object.createdAt + '","imgSrc": "' + object.get('imgSrc') + '"}]'
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
                //console.log(test);
            },
            error: function(error) {
                alert("查询失败:aaa " + error.code + " " + error.message);
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
                    { field: 'username', title: '用户名', width: 80, },
                    { field: 'userphone', title: '手机号', width: 150, },
                    { field: 'createAt', title: '创建时间', sort: true, width: 180, },
                    { field: 'img', title: '头像', width: 60, templet: '<div><img style="max-height: 100%;" src="{{d.imgSrc}}"></img></div>' },
                    { field: 'imgSrc', title: '图片地址', minWidth: 600 },
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
            //layer.msg('ID：' + data.id + ' 的查看操作');
            layer.open({
                type: 2,
                area: ['100%', '100%'],
                maxmin: true,
                content: 'detuserinfor.html', //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content:
            });
            localStorage.setItem('det_id', data.id); //存储客户端临时信息的对象,localStorage.setItem("key","value");以“key”为名称存储一个值“value”,localStorage.getItem("key");获取名称为“key”的值
        } else if (obj.event === 'del') {
            //  layer.msg('ID：' + data.id + ' 的查看操作');
            layer.confirm('真的删除ID:' + data.id + '的数据吗？', function(index) {
                var UserInfo = Bmob.Object.extend("UserInfo");
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
                content: 'setuserinfor.html', //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content:
            });
            localStorage.setItem('det_id', data.id); //存储客户端临时信息的对象,localStorage.setItem("key","value");以“key”为名称存储一个值“value”,localStorage.getItem("key");获取名称为“key”的值
            //alert(localStorage.getItem("det_id"));
        }
    });

});
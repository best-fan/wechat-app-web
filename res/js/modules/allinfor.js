Bmob.initialize("你的Application ID", "你的REST API Key");
var test = '[';

layui.use('layer', function() {

    if (localStorage.getItem("login_type") == '2') {
        var layer = layui.layer;
        layer.msg('权限不足，无法查看', { icon: 4 });
    } else {
        // alert(localStorage.getItem("login_type"))
        var GameScore = Bmob.Object.extend("DetailInfo");
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
                        str = '{"id":"' + object.id + '","detName": "' + object.get('detName') + '","detAddr": "' + object.get('detAddr') + '","entNum": "' + object.get('entNum') + '","detPayMin": "' + minpay + '","detPayMax": "' + object.get('detPayMax') + '","payDescription": "' + object.get('payDescription') + '","boardDescription": "' + object.get('boardDescription') + '","recruitDescription": "' + object.get('recruitDescription') + '","detCompany": "' + object.get('detCompany') + '","kindlyReminder": "' + object.get('kindlyReminder') + '","createAt": "' + object.createdAt + '","payType": "' + type + '"},'
                        test = test + str;
                    } else {
                        str = '{"id":"' + object.id + '","detName": "' + object.get('detName') + '","detAddr": "' + object.get('detAddr') + '","entNum": "' + object.get('entNum') + '","detPayMin": "' + minpay + '","detPayMax": "' + object.get('detPayMax') + '","payDescription": "' + object.get('payDescription') + '","boardDescription": "' + object.get('boardDescription') + '","recruitDescription": "' + object.get('recruitDescription') + '","detCompany": "' + object.get('detCompany') + '","kindlyReminder": "' + object.get('kindlyReminder') + '","createAt": "' + object.createdAt + '","payType": "' + type + '"}]'
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
                // console.log(test);
            },
            error: function(error) {
                alert("查询失败: " + error.code + " " + error.message);
            }
        });
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
                    { field: 'detName', title: '公司名称', width: 260, },
                    { field: 'detAddr', title: '工作城市', width: 100, },
                    { field: 'entNum', title: '报名人数', width: 100, sort: true, },
                    { field: 'detPayMin', title: '最低薪资', width: 100, sort: true, },
                    { field: 'detPayMax', title: '最高薪资', width: 100, sort: true, },
                    { field: 'payType', title: '工资类型', width: 100, sort: true },
                    { field: 'payDescription', title: '薪资说明', width: 100 },
                    { field: 'detCompany', title: '公司介绍', width: 100 },
                    { field: 'boardDescription', title: '食宿说明', width: 100 },
                    { field: 'recruitDescription', title: '招聘要求', width: 100 },
                    { field: 'kindlyReminder', title: '温馨提示', width: 100 },
                    { field: 'createAt', title: '创建时间', sort: true, minwidth: 100, },
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
                content: 'detail.html', //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no'],

            });
            localStorage.setItem('det_id', data.id); //存储客户端临时信息的对象,localStorage.setItem("key","value");以“key”为名称存储一个值“value”,localStorage.getItem("key");获取名称为“key”的值
            //alert(localStorage.getItem("det_id"));
        } else if (obj.event === 'del') {
            layer.confirm('真的删除ID:' + data.id + '的数据吗？', function(index) {
                var UserInfo = Bmob.Object.extend("DetailInfo");
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
                content: 'setinfor.html', //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no'],

            });
            localStorage.setItem('det_id', data.id); //存储客户端临时信息的对象,localStorage.setItem("key","value");以“key”为名称存储一个值“value”,localStorage.getItem("key");获取名称为“key”的值
            //alert(localStorage.getItem("det_id"));
        }
    });

});